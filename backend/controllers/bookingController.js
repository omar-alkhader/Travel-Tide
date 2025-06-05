const db = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");

exports.createBooking = catchAsync(async (req, res, next) => {
  const {
    tourist_id,
    flight_dep_id,
    flight_ret_id,
    departure_date,
    return_date,
    hotel_id,
    checkin,
    checkout,
    travellers,
    total_price,
    hasDiscount,
    city,
    guide_daily_site_ids: guides,
  } = req.body;

  const missingFields = [];
  if (!tourist_id) missingFields.push("tourist_id");
  if (!travellers) missingFields.push("travellers");
  if (total_price === undefined || total_price === null)
    missingFields.push("total_price");

  if (missingFields.length > 0) {
    return next(
      new AppError(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  const parsedTotalPrice = parseFloat(total_price);
  if (isNaN(parsedTotalPrice)) {
    return next(new AppError("Invalid total price format", 400));
  }

  await db.query("BEGIN");

  const bookingResult = await db.query(
    `
    INSERT INTO Booking (
      tourist_id, flight_dep_id, flight_ret_id, departure_date, return_date,
      hotel_id, checkin, checkout, travellers, total_price, has_discount, status,city
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *`,
    [
      tourist_id,
      flight_dep_id || null,
      flight_ret_id || null,
      departure_date || null,
      return_date || null,
      hotel_id || null,
      checkin || null,
      checkout || null,
      travellers,
      parsedTotalPrice,
      hasDiscount,
      "pending", // initially pending
      city,
    ]
  );

  const booking = bookingResult.rows[0];

  if (Array.isArray(guides) && guides.length > 0) {
    for (const guideDailySiteId of guides) {
      await db.query(
        `INSERT INTO booking_guide(guide_daily_site, booking_id)
         VALUES ($1, $2)`,
        [guideDailySiteId, booking.id]
      );
      await db.query(
        `UPDATE Guides_daily_sites
         SET travellers = travellers + $1
         WHERE id = $2`,
        [travellers, guideDailySiteId]
      );
    }
  }

  const points = Math.floor(parsedTotalPrice * 0.1);
  await db.query(
    `UPDATE Users SET points = COALESCE(points, 0) + $1 WHERE id = $2`,
    [points, tourist_id]
  );

  if (hasDiscount) {
    await db.query(`UPDATE Users SET points = points - 500 WHERE id = $1`, [
      tourist_id,
    ]);
  }

  await db.query("COMMIT");

  res.status(201).json({
    success: true,
    message: "Booking created successfully.",
    booking,
    pointsAwarded: points,
  });
});

exports.confirmBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await db.query(
    `UPDATE booking SET status = 'confirmed' WHERE id = $1 RETURNING *`,
    [id]
  );

  if (result.rowCount === 0) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Booking confirmed",
    booking: result.rows[0],
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { rows: bookingRows } = await db.query(
    `SELECT * FROM Booking WHERE id = $1`,
    [id]
  );

  if (bookingRows.length === 0) {
    return next(new AppError("Booking not found", 404));
  }

  const booking = bookingRows[0];

  try {
    await db.query("BEGIN");

    const guideResult = await db.query(
      `SELECT guide_daily_site FROM booking_guide WHERE booking_id = $1`,
      [id]
    );

    const guides = guideResult.rows;

    if (guides.length > 0) {
      for (const guide of guides) {
        await db.query(
          `UPDATE guides_daily_sites SET travellers = travellers - $1 WHERE id = $2`,
          [booking.travellers, guide.guide_daily_site]
        );
      }

      await db.query(`DELETE FROM booking_guide WHERE booking_id = $1`, [id]);
    }

    if (booking.has_discount) {
      await db.query(`UPDATE users SET points = points + 1000 WHERE id = $1`, [
        booking.tourist_id,
      ]);
    }

    await db.query(`DELETE FROM booking WHERE id = $1`, [id]);

    await db.query("COMMIT");

    res.status(200).json({
      status: "success",
      message: "Booking and associated guide data deleted successfully.",
    });
  } catch (err) {
    await db.query("ROLLBACK");
    return next(new AppError("Failed to delete booking: " + err.message, 500));
  }
});
// bookingController.js
// exports.getLatestBookingForUser = catchAsync(async (req, res, next) => {
//   const { tourist_id } = req.params;
//   const isThereUser = (
//     await db.query(`SELECT * FROM users WHERE id = $1`, [tourist_id])
//   ).rows;
//   console.log(isThereUser);
//   if (isThereUser.length == 0) {
//     console.log("hello");
//     return next(new AppError("we dont have uesr please relog in", 404));
//   }
//   const result = await db.query(
//     `SELECT * FROM booking WHERE tourist_id = $1 ORDER BY id DESC LIMIT 1`,
//     [tourist_id]
//   );
//   console.log(result.rows);
//   if (result.rows.length === 0) {
//     return res.status(200).json({
//       status: "success",
//       booking: [],
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     booking: result.rows[0],
//   });
// });
exports.getLatestBookingForUser = catchAsync(async (req, res, next) => {
  const { tourist_id } = req.params;

  // Check if the user exists
  const isThereUser = (
    await db.query(`SELECT * FROM users WHERE id = $1`, [tourist_id])
  ).rows;

  if (isThereUser.length === 0) {
    return next(new AppError("We don't have this user, please relog in", 404));
  }

  // Get the latest booking
  const bookingResult = await db.query(
    `SELECT * FROM booking WHERE tourist_id = $1 ORDER BY id DESC LIMIT 1`,
    [tourist_id]
  );

  if (bookingResult.rows.length === 0) {
    return res.status(200).json({
      status: "success",
      booking: [],
      guides: [],
    });
  }

  const booking = bookingResult.rows[0];

  // Fetch all guides associated with the booking
  const guidesResult = await db.query(
    `SELECT gds.*, g.name as guide_name 
     FROM booking_guide gb
     JOIN guides_daily_sites gds ON gb.guide_daily_site = gds.id
     JOIN guide g ON g.id = gds.guide_id
     WHERE gb.booking_id = $1`,
    [booking.id]
  );

  // Attach guides to the booking response
  res.status(200).json({
    status: "success",
    booking: booking,
    guides: guidesResult.rows,
  });
});

const db = require("../db");

// const createBooking = async (req, res) => {
//   try {
//     const {
//       user_id,
//       departure_flight_id,
//       return_flight_id,
//       hotel_id,
//       start_date,
//       end_date,
//       num_participant,
//       has_guide,
//       guide_price,
//       meal_type,
//     } = req.body;

//     let total_price = 0;

//     // Flights
//     if (departure_flight_id) {
//       const depFlight = await db.query("SELECT * FROM Flights WHERE id = $1", [
//         departure_flight_id,
//       ]);
//       if (!depFlight.rows.length)
//         return res.status(404).json({ message: "Departure flight not found" });
//       const flight = depFlight.rows[0];
//       if (flight.available_seats < num_participant) {
//         return res
//           .status(400)
//           .json({ message: "Not enough seats on departure flight" });
//       }
//       total_price += flight.price * num_participant;
//     }

//     if (return_flight_id) {
//       const retFlight = await db.query("SELECT * FROM Flights WHERE id = $1", [
//         return_flight_id,
//       ]);
//       if (!retFlight.rows.length)
//         return res.status(404).json({ message: "Return flight not found" });
//       const flight = retFlight.rows[0];
//       if (flight.available_seats < num_participant) {
//         return res
//           .status(400)
//           .json({ message: "Not enough seats on return flight" });
//       }
//       total_price += flight.price * num_participant;
//     }

//     // Guide
//     const guideCost = has_guide ? parseFloat(guide_price || 0) : 0;
//     total_price += guideCost;

//     // Meal
//     const meal_price = meal_type === "breakfast" ? 15 * num_participant : 0;
//     total_price += meal_price;

//     // Fetch user points
//     const userRes = await db.query("SELECT points FROM Users WHERE id = $1", [
//       user_id,
//     ]);
//     if (!userRes.rows.length)
//       return res.status(404).json({ message: "User not found" });

//     const userPoints = userRes.rows[0].points;

//     let applied_discount = 0;
//     if (userPoints >= 100) {
//       applied_discount = 30;
//       total_price -= applied_discount;
//       // Deduct points
//       await db.query("UPDATE Users SET points = points - 100 WHERE id = $1", [
//         user_id,
//       ]);
//     }

//     // Insert booking
//     const result = await db.query(
//       `
//       INSERT INTO Bookings
//         (tourist_id, departure_flight_id, return_flight_id, hotel_id, start_date, end_date,
//          total_price, num_participant, has_guide, guide_price, meal_type, meal_price)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
//       RETURNING *
//     `,
//       [
//         user_id,
//         departure_flight_id,
//         return_flight_id,
//         hotel_id,
//         start_date,
//         end_date,
//         total_price,
//         num_participant,
//         has_guide,
//         guideCost,
//         meal_type,
//         meal_price,
//       ]
//     );

//     // Decrease seats
//     if (departure_flight_id) {
//       await db.query(
//         "UPDATE Flights SET available_seats = available_seats - $1 WHERE id = $2",
//         [num_participant, departure_flight_id]
//       );
//     }
//     if (return_flight_id) {
//       await db.query(
//         "UPDATE Flights SET available_seats = available_seats - $1 WHERE id = $2",
//         [num_participant, return_flight_id]
//       );
//     }

//     // Reward points (after discount applied)
//     await db.query("UPDATE Users SET points = points + $1 WHERE id = $2", [
//       Math.floor(total_price * 0.1),
//       user_id,
//     ]);

//     res.status(201).json({
//       message: "Booking created successfully",
//       booking: {
//         ...result.rows[0],
//         applied_discount,
//         total_price,
//       },
//     });
//   } catch (err) {
//     console.error("Booking error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
exports.createBooking = async (req, res) => {
  try {
    const {
      id,
      tourist_id,
      dep_flight_id,
      ret_flight_id,
      hotel_id,
      departure_date,
      return_date,
      check_in,
      check_out,
      travellers,
      guide_price,
      total_price,
    } = req.body;

    const query = `
      INSERT INTO Booking (
        id, tourist_id, dep_flight_id, ret_flight_id, hotel_id,
        departure_date, return_date, check_in, check_out,
        travellers, guide_price, total_price
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12
      )
      RETURNING *;
    `;

    const values = [
      id,
      tourist_id,
      dep_flight_id || null,
      ret_flight_id || null,
      hotel_id || null,
      departure_date,
      return_date,
      check_in,
      check_out,
      travellers,
      guide_price,
      total_price,
    ];

    const result = await pool.query(query, values);
    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createBooking };

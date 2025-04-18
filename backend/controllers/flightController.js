const db = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");

// exports.searchRoundTripFlights = catchAsync(async (req, res) => {
//   const {
//     num_participant,
//     departure_date,
//     return_date,
//     departure_city,
//     arrival_city,
//     return_departure_city,
//     return_arrival_city,
//   } = req.query;
//   console.log("hello from here");
//   if (!num_participant || !departure_date || !return_date) {
//     return next(
//       new AppError(
//         "num_participant, departure_date, and return_date are required.",
//         400
//       )
//     );
//   }

//   // Get all flights with enough seats and later than earliest departure
//   const query = `
//       SELECT * FROM Flights
//       WHERE seats >= $1
//         AND departure_date >= $2
//     `;
//   const { rows } = await db.query(query, [num_participant, departure_date]);

//   const groupedByAirline = {};

//   for (const flight of rows) {
//     const airline = flight.airline_name;
//     if (!groupedByAirline[airline]) {
//       groupedByAirline[airline] = { departures: [], returns: [] };
//     }

//     const isDeparture =
//       new Date(flight.departure_date) >= new Date(departure_date) &&
//       new Date(flight.departure_date) < new Date(return_date) &&
//       (!departure_city || flight.departure_city === departure_city) &&
//       (!arrival_city || flight.arrival_city === arrival_city);

//     const isReturn =
//       new Date(flight.departure_date) >= new Date(return_date) &&
//       (!return_departure_city ||
//         flight.departure_city === return_departure_city) &&
//       (!return_arrival_city || flight.arrival_city === return_arrival_city);

//     if (isDeparture) groupedByAirline[airline].departures.push(flight);
//     if (isReturn) groupedByAirline[airline].returns.push(flight);
//   }

//   const result = {};

//   for (const airline in groupedByAirline) {
//     const { departures, returns } = groupedByAirline[airline];
//     const pairs = [];

//     departures.forEach((depart) => {
//       const matchingReturn = returns.find(
//         (ret) =>
//           ret.departure_city === depart.arrival_city &&
//           ret.arrival_city === depart.departure_city &&
//           new Date(ret.departure_date) > new Date(depart.departure_date)
//       );

//       if (matchingReturn) {
//         pairs.push({
//           departure: {
//             departure_city: depart.departure_city,
//             flight_number: depart.flight_number,
//             airline_icon: depart.airline_icon,
//             seats: depart.seats,
//             arrival_city: depart.arrival_city,
//             departure_time: depart.departure_time,
//             arrival_time: depart.arrival_time,
//             departure_date: depart.departure_date,
//             arrival_date: depart.arrival_date,
//             num_stops: depart.num_stops,
//             duration: depart.trip_duration,
//             price: depart.price_jod,
//           },
//           return: {
//             num_stops: matchingReturn.num_stops,
//             arrival_time: matchingReturn.arrival_time,
//             departure_time: matchingReturn.departure_time,
//             airline_icon: matchingReturn.airline_icon,
//             flight_number: matchingReturn.flight_number,
//             departure_city: matchingReturn.departure_city,
//             arrival_city: matchingReturn.arrival_city,
//             departure_date: matchingReturn.departure_date,
//             arrival_date: matchingReturn.arrival_date,
//             price: matchingReturn.price_jod,
//             seats: matchingReturn.seats,
//             duration: matchingReturn.trip_duration,
//           },
//         });
//       }
//     });

//     if (pairs.length > 0) result[airline] = pairs;
//   }

//   res.status(200).json({
//     status: "success",
//     results: Object.values(result).flat().length,
//     data: result,
//   });
// });
exports.searchRoundTripFlights = catchAsync(async (req, res, next) => {
  const {
    num_participant,
    departure_date,
    return_date,
    departure_city,
    arrival_city,
  } = req.query;

  // Validate required parameters
  if (
    !num_participant ||
    !departure_date ||
    !return_date ||
    !departure_city ||
    !arrival_city
  ) {
    return next(
      new AppError(
        "num_participant, departure_date, return_date, departure_city, and arrival_city are required.",
        400
      )
    );
  }

  // Convert num_participant to an integer
  const numParticipants = parseInt(num_participant, 10);
  console.log(numParticipants);
  if (isNaN(numParticipants)) {
    return next(new AppError("num_participant must be a valid integer.", 400));
  }

  console.log("Query Parameters:", {
    numParticipants,
    departure_date,
    return_date,
    departure_city,
    arrival_city,
  });

  // SQL queries
  const departureQuery = `
    SELECT * FROM Flights 
    WHERE trip_type = 'departure'
      AND seats >= $1
      AND departure_date = $2
      AND departure_city = $3
      AND arrival_city = $4
  `;

  const returnQuery = `
    SELECT * FROM Flights 
    WHERE trip_type = 'return'
      AND seats >= $1
      AND departure_date = $2
      AND departure_city = $4
      AND arrival_city = $3
  `;

  try {
    // Execute queries
    const departureFlights = await db.query(departureQuery, [
      numParticipants,
      departure_date,
      departure_city,
      arrival_city,
    ]);

    const returnFlights = await db.query(returnQuery, [
      numParticipants,
      return_date,
      departure_city,
      arrival_city,
    ]);

    console.log("Departure Flights:", departureFlights.rows);
    console.log("Return Flights:", returnFlights.rows);

    const groupedByAirline = {};

    // Group departures and returns by airline
    for (const depart of departureFlights.rows) {
      for (const ret of returnFlights.rows) {
        if (
          ret.departure_city === depart.arrival_city &&
          ret.arrival_city === depart.departure_city &&
          new Date(ret.departure_date) > new Date(depart.departure_date)
        ) {
          const airline = depart.airline_name;

          if (!groupedByAirline[airline]) {
            groupedByAirline[airline] = [];
          }

          groupedByAirline[airline].push({
            departure: {
              flight_number: depart.flight_number,
              departure_city: depart.departure_city,
              arrival_city: depart.arrival_city,
              departure_date: depart.departure_date,
              arrival_date: depart.arrival_date,
              price: depart.price_jod,
              seats: depart.seats,
              duration: depart.trip_duration,
            },
            return: {
              flight_number: ret.flight_number,
              departure_city: ret.departure_city,
              arrival_city: ret.arrival_city,
              departure_date: ret.departure_date,
              arrival_date: ret.arrival_date,
              price: ret.price_jod,
              seats: ret.seats,
              duration: ret.trip_duration,
            },
          });
        }
      }
    }

    const totalPairs = Object.values(groupedByAirline).flat().length;

    res.status(200).json({
      status: "success",
      results: totalPairs,
      data: groupedByAirline,
    });
  } catch (err) {
    console.error("Database Query Error:", err);
    return next(new AppError("An error occurred while fetching flights.", 500));
  }
});
exports.getFlightById = catchAsync(async (req, res) => {
  console.log("hello from id");
  const { id } = req.params;
  const query = `SELECT * FROM Flights WHERE flight_id = $1`;
  const { rows } = await db.query(query, [id]);

  if (rows.length === 0) {
    return next(new AppError("Flight not found", 400));
  }

  res.status(200).json({ status: "success", data: rows[0] });
});

exports.getOneRoundTripFlight = catchAsync(async (req, res) => {
  const {
    departure_city,
    arrival_city,
    departure_date,
    return_date,
    num_participant,
  } = req.query;

  const participantCount = parseInt(num_participant);

  // 1. Get all matching departure flights
  const { rows: departureFlights } = await db.query(
    `
      SELECT * FROM flights
      WHERE departure_city = $1 AND arrival_city = $2
      AND DATE(departure_time) = $3
      AND seats >= $4
      ORDER BY departure_time ASC
      `,
    [departure_city, arrival_city, departure_date, participantCount]
  );

  // 2. Try to find a matching return flight for each departure (same airline)
  for (const dep of departureFlights) {
    const { rows: returnFlights } = await db.query(
      `
        SELECT * FROM flights
        WHERE departure_city = $2 AND arrival_city = $1
        AND DATE(departure_time) = $3
        AND seats >= $4
        AND airline_name = $5
        ORDER BY departure_time ASC
        LIMIT 1
        `,
      [
        departure_city,
        arrival_city,
        return_date,
        participantCount,
        dep.airline_name,
      ]
    );

    if (returnFlights.length > 0) {
      return res.status(200).json({
        status: "success",
        data: {
          departure: dep,
          return: returnFlights[0],
        },
      });
    }

    // 3. No matching round-trip found
    return next(
      new AppError("No valid round-trip flight found with the same airline"),
      404
    );
  }
});

exports.deleteFlight = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM Flights WHERE flight_id = $1 RETURNING *`;
  const { rows } = await db.query(deleteQuery, [id]);

  if (rows.length === 0) {
    return next(new AppError("Flight not found", 400));
  }

  res.status(200).json({
    status: "success",
    message: "Flight deleted successfully",
    deleted: rows[0],
  });
};
exports.updateFlight = async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  if (fields.length === 0) {
    return next(new AppError("No fields provided for update", 400));
  }

  // Build SET part of the query dynamically
  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  const updateQuery = `
      UPDATE Flights
      SET ${setClause}
      WHERE flight_id = $${fields.length + 1}
      RETURNING *
    `;

  const result = await db.query(updateQuery, [...values, id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Flight not found" });
  }

  res.status(200).json({
    status: "success",
    data: result.rows[0],
  });
};

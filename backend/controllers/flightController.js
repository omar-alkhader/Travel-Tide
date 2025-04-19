const db = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");

// exports.searchRoundTripFlights = catchAsync(async (req, res, next) => {
//   const {
//     num_participant,
//     departure_date,
//     return_date,
//     departure_city,
//     arrival_city,
//   } = req.query;

//   // Validate required parameters
//   if (
//     !num_participant ||
//     !departure_date ||
//     !return_date ||
//     !departure_city ||
//     !arrival_city
//   ) {
//     return next(
//       new AppError(
//         "num_participant, departure_date, return_date, departure_city, and arrival_city are required.",
//         400
//       )
//     );
//   }

//   // Convert num_participant to an integer
//   const numParticipants = parseInt(num_participant, 10);
//   console.log(numParticipants);
//   if (isNaN(numParticipants)) {
//     return next(new AppError("num_participant must be a valid integer.", 400));
//   }

//   console.log("Query Parameters:", {
//     numParticipants,
//     departure_date,
//     return_date,
//     departure_city,
//     arrival_city,
//   });

//   // SQL queries
//   const departureQuery = `
//     SELECT * FROM Flights
//     WHERE trip_type = 'departure'
//       AND seats >= $1
//       AND departure_date = $2
//       AND departure_city = $3
//       AND arrival_city = $4
//   `;

//   const returnQuery = `
//     SELECT * FROM Flights
//     WHERE trip_type = 'return'
//       AND seats >= $1
//       AND departure_date = $2
//       AND departure_city = $4
//       AND arrival_city = $3
//   `;

//   try {
//     // Execute queries
//     const departureFlights = await db.query(departureQuery, [
//       numParticipants,
//       departure_date,
//       departure_city,
//       arrival_city,
//     ]);

//     const returnFlights = await db.query(returnQuery, [
//       numParticipants,
//       return_date,
//       departure_city,
//       arrival_city,
//     ]);

//     console.log("Departure Flights:", departureFlights.rows);
//     console.log("Return Flights:", returnFlights.rows);

//     const groupedByAirline = {};

//     // Group departures and returns by airline
//     for (const depart of departureFlights.rows) {
//       for (const ret of returnFlights.rows) {
//         if (
//           ret.departure_city === depart.arrival_city &&
//           ret.arrival_city === depart.departure_city &&
//           new Date(ret.departure_date) > new Date(depart.departure_date)
//         ) {
//           const airline = depart.airline_name;

//           if (!groupedByAirline[airline]) {
//             groupedByAirline[airline] = [];
//           }

//           groupedByAirline[airline].push({
//             departure: {
//               flight_number: depart.flight_number,
//               departure_city: depart.departure_city,
//               arrival_city: depart.arrival_city,
//               departure_date: depart.departure_date,
//               arrival_date: depart.arrival_date,
//               price: depart.price_jod,
//               seats: depart.seats,
//               duration: depart.trip_duration,
//             },
//             return: {
//               flight_number: ret.flight_number,
//               departure_city: ret.departure_city,
//               arrival_city: ret.arrival_city,
//               departure_date: ret.departure_date,
//               arrival_date: ret.arrival_date,
//               price: ret.price_jod,
//               seats: ret.seats,
//               duration: ret.trip_duration,
//             },
//           });
//         }
//       }
//     }

//     const totalPairs = Object.values(groupedByAirline).flat().length;

//     res.status(200).json({
//       status: "success",
//       results: totalPairs,
//       data: groupedByAirline,
//     });
//   } catch (err) {
//     console.error("Database Query Error:", err);
//     return next(new AppError("An error occurred while fetching flights.", 500));
//   }
// });

// exports.searchRoundTripFlights = async (req, res) => {
//   const {
//     num_participant: numParticipants,
//     departure_date: departureDate,
//     return_date: returnDate,
//     departure_city: departureCity,
//     arrival_city: arrivalCity,
//   } = req.query;

//   // Validate input
//   if (
//     !departureCity ||
//     !arrivalCity ||
//     !departureDate ||
//     !returnDate ||
//     !numParticipants
//   ) {
//     return res.status(400).json({ message: "Invalid input parameters" });
//   }

//   try {
//     // Query for round-trip flights
//     const flights = await db.query(
//       `
//       SELECT
//         dep.id AS departure_flight_id,
//         dep.airline_name AS airline,
//         dep.flight_number AS departure_flight_number,
//         dep.departure_city AS departure_city,
//         dep.arrival_city AS arrival_city,
//         dep.departure_time AS departure_time,
//         dep.departure_date AS departure_date,
//         dep.arrival_time AS arrival_time,
//         dep.arrival_date AS arrival_date,
//         dep.price AS departure_price,
//         dep.num_stops AS departure_stops,
//         dep.trip_duration AS departure_duration,
//         dep.seats AS departure_seats,

//         ret.id AS return_flight_id,
//         ret.flight_number AS return_flight_number,
//         ret.departure_city AS return_departure_city,
//         ret.arrival_city AS return_arrival_city,
//         ret.departure_time AS return_departure_time,
//         ret.departure_date AS return_departure_date,
//         ret.arrival_time AS return_arrival_time,
//         ret.arrival_date AS return_arrival_date,
//         ret.price AS return_price,
//         ret.num_stops AS return_stops,
//         ret.trip_duration AS return_duration,
//         ret.seats AS return_seats
//       FROM flights AS dep
//       JOIN flights AS ret
//         ON dep.arrival_city = ret.departure_city
//         AND dep.departure_city = ret.arrival_city
//         AND dep.airline_name = ret.airline_name -- Ensure the same airline
//       WHERE
//         dep.departure_city = $1
//         AND dep.arrival_city = $2
//         AND dep.departure_date = $3
//         AND dep.seats >= $4
//         AND ret.departure_date = $5
//         AND ret.seats >= $4;
//       `,
//       [departureCity, arrivalCity, departureDate, numParticipants, returnDate]
//     );

//     // Map the results to the desired format
//     const formattedFlights = flights.rows.map((flight) => ({
//       id: flight.departure_flight_id,
//       price: flight.departure_price,
//       airline: flight.airline,
//       flightNumber: flight.departure_flight_number,
//       departure: {
//         city: flight.departure_city,
//         time: flight.departure_time,
//         date: flight.departure_date,
//       },
//       arrival: {
//         city: flight.arrival_city,
//         time: flight.arrival_time,
//         date: flight.arrival_date,
//       },
//       stops: flight.departure_stops,
//       duration: flight.departure_duration,
//       returnFlight: {
//         id: flight.return_flight_id,
//         airline: flight.airline,
//         flightNumber: flight.return_flight_number,
//         departure: {
//           city: flight.return_departure_city,
//           time: flight.return_departure_time,
//           date: flight.return_departure_date,
//         },
//         arrival: {
//           city: flight.return_arrival_city,
//           time: flight.return_arrival_time,
//           date: flight.return_arrival_date,
//         },
//         stops: flight.return_stops,
//         duration: flight.return_duration,
//       },
//     }));

//     // Return the response
//     res.status(200).json({
//       status: "success",
//       results: formattedFlights.length,
//       flights: formattedFlights,
//     });
//   } catch (err) {
//     console.error("Error searching round-trip flights:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
exports.searchRoundTripFlights = async (req, res) => {
  const {
    num_participant: numParticipants,
    departure_date: departureDate,
    return_date: returnDate,
    departure_city: departureCity,
    arrival_city: arrivalCity,
  } = req.query;

  // Validate input
  if (
    !departureCity ||
    !arrivalCity ||
    !departureDate ||
    !returnDate ||
    !numParticipants
  ) {
    return res.status(400).json({ message: "Invalid input parameters" });
  }

  try {
    // Query for round-trip flights
    const flights = await db.query(
      `
      SELECT 
        dep.id AS departure_flight_id,
        dep.airline_name AS airline,
        dep.flight_number AS departure_flight_number,
        dep.departure_city AS departure_city,
        dep.arrival_city AS arrival_city,
        dep.departure_time AS departure_time,
        dep.departure_date AS departure_date,
        dep.arrival_time AS arrival_time,
        dep.arrival_date AS arrival_date,
        dep.price AS departure_price,
        dep.num_stops AS departure_stops,
        TO_CHAR(dep.trip_duration, 'HH24:MI:SS') AS departure_duration, -- Ensure duration is a string
        dep.seats AS departure_seats,

        ret.id AS return_flight_id,
        ret.flight_number AS return_flight_number,
        ret.departure_city AS return_departure_city,
        ret.arrival_city AS return_arrival_city,
        ret.departure_time AS return_departure_time,
        ret.departure_date AS return_departure_date,
        ret.arrival_time AS return_arrival_time,
        ret.arrival_date AS return_arrival_date,
        ret.price AS return_price,
        ret.num_stops AS return_stops,
        TO_CHAR(ret.trip_duration, 'HH24:MI:SS') AS return_duration, -- Ensure duration is a string
        ret.seats AS return_seats
      FROM flights AS dep
      JOIN flights AS ret
        ON dep.arrival_city = ret.departure_city
        AND dep.departure_city = ret.arrival_city
        AND dep.airline_name = ret.airline_name -- Ensure the same airline
      WHERE 
        dep.departure_city = $1 
        AND dep.arrival_city = $2
        AND dep.departure_date = $3
        AND dep.seats >= $4
        AND ret.departure_date = $5
        AND ret.seats >= $4;
      `,
      [departureCity, arrivalCity, departureDate, numParticipants, returnDate]
    );

    // Map the results to the desired format
    const formattedFlights = flights.rows.map((flight) => {
      // Calculate total price for all participants
      const totalDeparturePrice = flight.departure_price * numParticipants;
      const totalReturnPrice = flight.return_price * numParticipants;
      const totalPrice = totalDeparturePrice + totalReturnPrice;
      console.log(totalDeparturePrice, totalReturnPrice);
      return {
        id: flight.departure_flight_id,
        pricePerPerson: flight.departure_price,
        totalPrice, // Total price for all participants
        airline: flight.airline,
        flightNumber: flight.departure_flight_number,
        departure: {
          city: flight.departure_city,
          time: flight.departure_time,
          date: flight.departure_date,
        },
        arrival: {
          city: flight.arrival_city,
          time: flight.arrival_time,
          date: flight.arrival_date,
        },
        stops: flight.departure_stops,
        duration: flight.departure_duration, // Duration as a string
        returnFlight: {
          id: flight.return_flight_id,
          airline: flight.airline,
          flightNumber: flight.return_flight_number,
          departure: {
            city: flight.return_departure_city,
            time: flight.return_departure_time,
            date: flight.return_departure_date,
          },
          arrival: {
            city: flight.return_arrival_city,
            time: flight.return_arrival_time,
            date: flight.return_arrival_date,
          },
          stops: flight.return_stops,
          duration: flight.return_duration, // Duration as a string
        },
      };
    });

    // Return the response
    res.status(200).json({
      status: "success",
      results: formattedFlights.length,
      flights: formattedFlights,
    });
  } catch (err) {
    console.error("Error searching round-trip flights:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
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

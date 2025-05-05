const db = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");

exports.searchRoundTripFlights = catchAsync(async (req, res, next) => {
  const fields = {};
  Object.entries(req.query).forEach(([k, v]) => (fields[k] = v.toLowerCase()));
  console.log(fields);
  const {
    num_participant: numParticipants,
    departure_date: departureDate,
    return_date: returnDate,
    departure_city: departureCity,
    arrival_city: arrivalCity,
  } = fields;

  if (
    !departureCity ||
    !arrivalCity ||
    !departureDate ||
    !returnDate ||
    !numParticipants
  ) {
    return next(new AppError("Invalid input parameters", 400));
  }

  const query = `
    SELECT * FROM flights
    WHERE LOWER(departure_city) = LOWER($1) 
      AND LOWER(arrival_city) = LOWER($2)
      AND departure_date = $3
      AND seats >= $4
    ORDER BY departure_time ASC
  `;

  const departureValues = [
    departureCity,
    arrivalCity,
    departureDate,
    numParticipants,
  ];
  const returnValues = [
    arrivalCity,
    departureCity,
    returnDate,
    numParticipants,
  ];

  const { rows: departureFlights } = await db.query(query, departureValues);
  const { rows: returnFlights } = await db.query(query, returnValues); // same query for return

  if (departureFlights.length == 0 || returnFlights.length == 0) {
    return res.status(200).json({
      status: "success",
      results: 0,
      flights: [],
      message: "there are no flights with dates you specified",
    });
  }
  const matchedFlights = [];
  const integerNumParticipant = parseInt(numParticipants);
  for (const dep of departureFlights) {
    const match = returnFlights.find(
      (ret) =>
        ret.airline_name === dep.airline_name &&
        ret.seats >= integerNumParticipant
    );

    if (match) {
      const totalPrice = (+dep.price + +match.price) * integerNumParticipant;
      matchedFlights.push({
        id: dep.id,
        pricePerPerson: dep.price,
        totalPrice,
        airline: dep.airline_name,
        flightNumber: dep.flight_number,
        departure: {
          city: dep.departure_city,
          time: dep.departure_time,
          date: dep.departure_date,
        },
        arrival: {
          city: dep.arrival_city,
          time: dep.arrival_time,
          date: dep.arrival_date,
        },
        stops: dep.num_stops,
        duration: dep.trip_duration,
        returnFlight: {
          id: match.id,
          airline: match.airline_name,
          flightNumber: match.flight_number,
          departure: {
            city: match.departure_city,
            time: match.departure_time,
            date: match.departure_date,
          },
          arrival: {
            city: match.arrival_city,
            time: match.arrival_time,
            date: match.arrival_date,
          },
          stops: match.num_stops,
          duration: match.trip_duration,
        },
      });
    }
  }

  if (matchedFlights.length === 0) {
    return next(
      new AppError("No round-trip flights found with matching criteria", 404)
    );
  }

  res.status(200).json({
    status: "success",
    results: matchedFlights.length,
    flights: matchedFlights,
  });
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

// exports.getOneRoundTripFlight = catchAsync(async (req, res, next) => {
//   const {
//     departure_city,
//     arrival_city,
//     departure_date,
//     return_date,
//     num_participant,
//   } = req.query;

//   const participantCount = parseInt(num_participant);

//   // 1. Get all matching departure flights
//   const { rows: departureFlights } = await db.query(
//     `
//     SELECT * FROM flights
//     WHERE departure_city = $1 AND arrival_city = $2
//     AND DATE(departure_time) = $3
//     AND seats >= $4
//     ORDER BY departure_time ASC
//     `,
//     [departure_city, arrival_city, departure_date, participantCount]
//   );

//   // 2. Try to find a matching return flight for each departure (same airline)
//   for (const dep of departureFlights) {
//     const { rows: returnFlights } = await db.query(
//       `
//       SELECT * FROM flights
//       WHERE departure_city = $1 AND arrival_city = $2
//       AND DATE(departure_time) = $3
//       AND seats >= $4
//       AND airline_name = $5
//       ORDER BY departure_time ASC
//       LIMIT 1
//       `,
//       [
//         arrival_city, // Inverted
//         departure_city, // Inverted
//         return_date,
//         participantCount,
//         dep.airline_name,
//       ]
//     );

//     if (returnFlights.length > 0) {
//       const ret = returnFlights[0];

//       // Calculate prices
//       const totalDeparturePrice = dep.price * participantCount;
//       const totalReturnPrice = ret.price * participantCount;
//       const totalPrice = totalDeparturePrice + totalReturnPrice;

//       const formattedFlight = {
//         id: dep.id,
//         pricePerPerson: dep.price,
//         totalPrice,
//         airline: dep.airline_name,
//         flightNumber: dep.flight_number,
//         departure: {
//           city: dep.departure_city,
//           time: dep.departure_time,
//           date: dep.departure_date,
//         },
//         arrival: {
//           city: dep.arrival_city,
//           time: dep.arrival_time,
//           date: dep.arrival_date,
//         },
//         stops: dep.num_stops,
//         duration: dep.trip_duration, // can also be converted using TO_CHAR if needed
//         returnFlight: {
//           id: ret.id,
//           airline: ret.airline_name,
//           flightNumber: ret.flight_number,
//           departure: {
//             city: ret.departure_city,
//             time: ret.departure_time,
//             date: ret.departure_date,
//           },
//           arrival: {
//             city: ret.arrival_city,
//             time: ret.arrival_time,
//             date: ret.arrival_date,
//           },
//           stops: ret.num_stops,
//           duration: ret.trip_duration,
//         },
//       };

//       return res.status(200).json({
//         status: "success",
//         data: formattedFlight,
//       });
//     }
//   }

//   // 3. No matching round-trip found
//   return next(
//     new AppError("No valid round-trip flight found with the same airline", 404)
//   );
// });
exports.getOneRoundTripFlight = catchAsync(async (req, res, next) => {
  const {
    departure_city,
    arrival_city,
    departure_date,
    return_date,
    num_participant,
  } = req.body;

  const participantCount = parseInt(num_participant);

  // 1. Get all matching departure flights
  const { rows: departureFlights } = await db.query(
    `
    SELECT * FROM flights
    WHERE departure_city = $1 AND arrival_city = $2
    AND departure_date = $3
    AND seats >= $4
    ORDER BY departure_date ASC
    `,
    [departure_city, arrival_city, departure_date, participantCount]
  );

  // 2. Try to find a matching return flight for each departure (same airline)
  for (const dep of departureFlights) {
    const { rows: returnFlights } = await db.query(
      `
      SELECT * FROM flights
      WHERE departure_city = $1 AND arrival_city = $2
      AND departure_date = $3
      AND seats >= $4
      AND airline_name = $5
      ORDER BY departure_date ASC
      LIMIT 1
      `,
      [
        arrival_city, // Inverted
        departure_city, // Inverted
        return_date,
        participantCount,
        dep.airline_name,
      ]
    );

    if (returnFlights.length > 0) {
      const ret = returnFlights[0];

      // Calculate prices
      const totalDeparturePrice = dep.price * participantCount;
      const totalReturnPrice = ret.price * participantCount;
      const totalPrice = totalDeparturePrice + totalReturnPrice;

      const formattedFlight = {
        id: dep.id,
        pricePerPerson: dep.price,
        totalPrice,
        airline: dep.airline_name,
        flightNumber: dep.flight_number,
        departure: {
          city: dep.departure_city,
          time: dep.departure_time,
          date: dep.departure_date,
        },
        arrival: {
          city: dep.arrival_city,
          time: dep.arrival_time,
          date: dep.arrival_date,
        },
        stops: dep.num_stops,
        duration: dep.trip_duration, // can also be converted using TO_CHAR if needed
        returnFlight: {
          id: ret.id,
          airline: ret.airline_name,
          flightNumber: ret.flight_number,
          departure: {
            city: ret.departure_city,
            time: ret.departure_time,
            date: ret.departure_date,
          },
          arrival: {
            city: ret.arrival_city,
            time: ret.arrival_time,
            date: ret.arrival_date,
          },
          stops: ret.num_stops,
          duration: ret.trip_duration,
        },
      };

      return res.status(200).json({
        status: "success",
        data: formattedFlight,
      });
    }
  }

  // 3. No matching round-trip found
  return next(
    new AppError("No valid round-trip flight found with the same airline", 404)
  );
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

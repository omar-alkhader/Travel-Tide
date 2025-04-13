const db = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");

exports.searchRoundTripFlights = catchAsync(async (req, res) => {
  const {
    num_participant,
    departure_date,
    return_date,
    departure_city,
    arrival_city,
    return_departure_city,
    return_arrival_city,
  } = req.query;

  if (!num_participant || !departure_date || !return_date) {
    return next(
      new AppError(
        "num_participant, departure_date, and return_date are required.",
        400
      )
    );
  }

  // Get all flights with enough seats and later than earliest departure
  const query = `
      SELECT * FROM Flights 
      WHERE seats >= $1 
        AND departure_date >= $2
    `;
  const { rows } = await db.query(query, [num_participant, departure_date]);

  const groupedByAirline = {};

  for (const flight of rows) {
    const airline = flight.airline_name;
    if (!groupedByAirline[airline]) {
      groupedByAirline[airline] = { departures: [], returns: [] };
    }

    const isDeparture =
      new Date(flight.departure_date) >= new Date(departure_date) &&
      new Date(flight.departure_date) < new Date(return_date) &&
      (!departure_city || flight.departure_city === departure_city) &&
      (!arrival_city || flight.arrival_city === arrival_city);

    const isReturn =
      new Date(flight.departure_date) >= new Date(return_date) &&
      (!return_departure_city ||
        flight.departure_city === return_departure_city) &&
      (!return_arrival_city || flight.arrival_city === return_arrival_city);

    if (isDeparture) groupedByAirline[airline].departures.push(flight);
    if (isReturn) groupedByAirline[airline].returns.push(flight);
  }

  const result = {};

  for (const airline in groupedByAirline) {
    const { departures, returns } = groupedByAirline[airline];
    const pairs = [];

    departures.forEach((depart) => {
      const matchingReturn = returns.find(
        (ret) =>
          ret.departure_city === depart.arrival_city &&
          ret.arrival_city === depart.departure_city &&
          new Date(ret.departure_date) > new Date(depart.departure_date)
      );

      if (matchingReturn) {
        pairs.push({
          departure: {
            flight_number: depart.flight_number,
            departure_city: depart.departure_city,
            arrival_city: depart.arrival_city,
            departure_date: depart.departure_date,
            arrival_date: depart.arrival_date,
            price: depart.price,
            seats: depart.seats,
            duration: depart.duration,
          },
          return: {
            flight_number: matchingReturn.flight_number,
            departure_city: matchingReturn.departure_city,
            arrival_city: matchingReturn.arrival_city,
            departure_date: matchingReturn.departure_date,
            arrival_date: matchingReturn.arrival_date,
            price: matchingReturn.price,
            seats: matchingReturn.seats,
            duration: matchingReturn.duration,
          },
        });
      }
    });

    if (pairs.length > 0) result[airline] = pairs;
  }

  res.status(200).json({
    status: "success",
    results: Object.values(result).flat().length,
    data: result,
  });
});
exports.getFlightById = catchAsync(async (req, res) => {
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

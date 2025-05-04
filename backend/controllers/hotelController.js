const db = require("../db");
const hotelModel = require("../models/hotelModel");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
const hotelImageUrl = "http://localhost:6600/images/hotels/";
exports.getAllHotels = catchAsync(async (req, res, next) => {
  const hotels = hotelModel.findAllHotels();
  res.status(200).json({
    status: "success",
    data: {
      hotels,
    },
  });
});
exports.createHotel = catchAsync(async (req, res, next) => {
  const hotel = await hotelModel.createHotel(req.body);
  res.status(201).json({
    status: "success",
    data: {
      hotel,
    },
  });
});
exports.getHotel = catchAsync(async (req, res, next) => {
  if (!req.params.cityName) {
    return next(new AppError("please provide a valid id", 404));
  }

  const hotel = await hotelModel.getHotel(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      hotel,
    },
  });
});
exports.getHotelByCity = catchAsync(async (req, res, next) => {
  const { cityName } = req.params;
  if (!cityName) {
    return next(new AppError("pleave provide valid city_id"), 404);
  }
  const cityResult = await db.query(
    `SELECT id FROM city WHERE LOWER(name) = LOWER($1)`,
    [cityName]
  );
  if (cityResult.rows.length === 0) {
    return next(new AppError("City not found", 404));
  }
  const cityId = cityResult.rows[0].id;
  const hotels = await hotelModel.getHotelsByCity(cityId);
  res.status(200).json({
    status: "success",
    hotels,
  });
});
exports.getHotelsWithFlight = catchAsync(async (req, res, next) => {
  const {
    departure_city,
    arrival_city,
    departure_date,
    return_date,
    num_participant,
  } = req.query;
  console.log({
    departure_city,
    arrival_city,
    departure_date,
    return_date,
    num_participant,
  });
  const participantCount = parseInt(num_participant);

  if (
    !departure_city ||
    !arrival_city ||
    !departure_date ||
    !return_date ||
    !participantCount
  ) {
    return next(new AppError("Missing required query parameters", 400));
  }

  // 1. Find one matching round-trip flight
  const { rows: departureFlights } = await db.query(
    `
    SELECT * FROM flights
    WHERE LOWER(departure_city) = LOWER($1) AND LOWER(arrival_city) = LOWER($2)
    AND departure_date = $3
    AND seats >= $4
    ORDER BY departure_time ASC
    LIMIT 1
    `,
    [departure_city, arrival_city, departure_date, participantCount]
  );

  if (departureFlights.length === 0) {
    return next(new AppError("No departure flights found", 404));
  }

  const dep = departureFlights[0];

  const { rows: returnFlights } = await db.query(
    `
    SELECT * FROM flights
    WHERE LOWER(departure_city) = LOWER($1) AND LOWER(arrival_city) = LOWER($2)
    AND departure_date = $3
    AND seats >= $4
    AND airline_name = $5
    ORDER BY departure_time ASC
    LIMIT 1
    `,
    [
      arrival_city,
      departure_city,
      return_date,
      participantCount,
      dep.airline_name,
    ]
  );

  if (returnFlights.length === 0) {
    return next(new AppError("No return flights found", 404));
  }

  const ret = returnFlights[0];

  const totalDeparturePrice = dep.price * participantCount;
  const totalReturnPrice = ret.price * participantCount;
  const totalFlightPrice = totalDeparturePrice + totalReturnPrice;
  console.log(ret.id);
  const flightInfo = {
    id: dep.id,
    totalPrice: totalFlightPrice,
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

  // 2. Fetch hotels in arrival city
  const { rows: hotels } = await db.query(
    `
    SELECT h.id, h.name, h.address, h.photo, h.stars,h.room_type, h.price, c.name AS city_name
    FROM hotels h
    JOIN city c ON h.city_id = c.id
    WHERE LOWER(c.name) = LOWER($1)
    `,
    [arrival_city]
  );

  const start = new Date(dep.departure_date);
  const end = new Date(ret.departure_date);
  const timeDiff = Math.abs(end - start);
  const totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const tripDates = `${start.toLocaleString("default", {
    month: "short",
  })} ${start.getDate()} - ${end.toLocaleString("default", {
    month: "short",
  })} ${end.getDate()}, ${end.getFullYear()}`;

  // 3. Combine hotels with flight
  const result = hotels.map((hotel) => ({
    hotel: {
      name: hotel.name,
      address: hotel.address,
      stars: hotel.stars,
      image: hotelImageUrl + hotel.photo,
      price: hotel.price * totalNights,
      room_type: hotel.room_type,
    },
    flight: flightInfo,
    price: hotel.price * totalNights + totalFlightPrice,
    tripDates,
    totalNights,
  }));

  res.status(200).json({
    status: "success",
    results: result.length,
    packages: result,
  });
});

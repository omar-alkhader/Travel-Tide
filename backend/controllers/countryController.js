const pool = require("../db");
const AppError = require("../utlis/AppError");
const catchAsync = require("../utlis/catchAsync");
exports.getAllCountries = catchAsync(async (req, res, next) => {
  const rows = await pool.query(`
            SELECT *
            FROM country`);
  const allCountries = rows.rows;
  res.status(200).json({
    status: "success",
    data: {
      countries: allCountries,
    },
  });
});
exports.getCountryCities = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!isFinite(id)) next(new AppError("please provide valid city id", 404));
  const rows = await pool.query(
    `
            SELECT *
            FROM city
            WHERE city.country_id = $1;
        `,
    [id]
  );
  const cities = rows.rows;
  res.status(200).json({
    status: "success",
    data: {
      cities,
    },
  });
});

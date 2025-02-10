const pool = require("../db");
exports.getAllCountries = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getCountryCities = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isFinite(id)) throw new Error("please provide valid city id");
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

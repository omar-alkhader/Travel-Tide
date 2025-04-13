const db = require("../db");
class City {
  static async findAllCities() {
    const query = `SELECT *
                FROM city`;
    const result = await db.query(query);
    return result.rows;
  }
  static async findCityById(id) {
    const query = `SELECT *
            FROM city
            WHERE id = $1`;
    const params = [id];
    const result = await db.query(query, params);
    return result.rows;
  }
  static async findCityByIdAndUpdate(id, body) {
    const setClause = Object.entries(body)
      .map(([col], index) => `${col} = $${index + 1}`)
      .join(", ");
    const values = Object.entries(body).map(([_, value]) => value);
    values.push(id);
    let query = `UPDATE city
          SET ${setClause}
          WHERE id = $${values.length}
          RETURNING *
        `;
    const result = await db.query(query, [...values]);
    return result;
  }
  static async findCityByIdAndDelete(id) {
    const query = `DELETE FROM city
        WHERE id = $1 RETURNING *
        `;
    const params = [id];
    const result = await db.query(query, params);
    return result;
  }
  static async insertCity(body) {
    const query = `INSERT INTO city(name,photo,country_id)
        VALUES($1,$2,$3) RETURNING *`;
    const params = [body.name, body.photo, body.country_id];
    const result = await db.query(query, params);
    return result;
  }
  static async findCityByCountry(country_id) {
    const query = `SELECT *
            FROM city
            WHERE country_id = $1`;
    const params = [country_id];
    const result = await db.query(query, params);
    return result.rows;
  }
}
module.exports = City;

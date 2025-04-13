const db = require("../db");
class Country {
  static async findAllCountries() {
    const query = `SELECT *
        FROM country`;
    const result = await db.query(query);
    return result.rows;
  }
  static async findCountryById(id) {
    const query = `SELECT *
        FROM country
        WHERE id = $1`;
    const params = [id];
    const result = await db.query(query, params);
    return result.rows;
  }
  static async findCountryByIdAndUpdate(id, body) {
    const setClause = Object.entries(body)
      .map(([col], index) => `${col} = $${index + 1}`)
      .join(", ");
    const values = Object.entries(body).map(([_, value]) => value);
    values.push(id);
    let query = `UPDATE country
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, [...values]);
    return result;
  }
  static async findCountryByIdAndDelete(id) {
    const query = `DELETE FROM country
    WHERE id = $1 RETURNING *
    `;
    const params = [id];
    const result = await db.query(query, params);
    return result;
  }
  static async insertCountry(body) {
    const query = `INSERT INTO country(name,photo)
    VALUES($1,$2) RETURNING *`;
    const params = [body.name, body.photo];
    const result = await db.query(query, params);
    return result;
  }
}

module.exports = Country;

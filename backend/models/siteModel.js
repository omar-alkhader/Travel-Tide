const db = require("../db");
class Site {
  static async findAllSites() {
    const query = `SELECT *
                FROM site`;
    const result = await db.query(query);
    return result.rows;
  }
  static async findSiteById(id) {
    const query = `SELECT *
            FROM site
            WHERE id = $1`;
    const params = [id];
    const result = await db.query(query, params);
    return result.rows;
  }
  static async findSiteByIdAndUpdate(id, body) {
    const setClause = Object.entries(body)
      .map(([col], index) => `${col} = $${index + 1}`)
      .join(", ");
    const values = Object.entries(body).map(([_, value]) => value);
    values.push(id);
    let query = `UPDATE site
          SET ${setClause}
          WHERE id = $${values.length}
          RETURNING *
        `;
    const result = await db.query(query, [...values]);
    return result;
  }
  static async findSiteByIdAndDelete(id) {
    const query = `DELETE FROM site
        WHERE id = $1 RETURNING *
        `;
    const params = [id];
    const result = await db.query(query, params);
    return result;
  }
  static async insertSite(body) {
    const query = `INSERT INTO site(name,city_id)
        VALUES($1,$2) RETURNING *`;
    const params = [body.name, body.city_id];
    const result = await db.query(query, params);
    return result;
  }
  static async findSiteByCity(city_id) {
    const query = `SELECT *
            FROM site
            WHERE city_id = $1`;
    const params = [city_id];
    const result = await db.query(query, params);
    return result.rows;
  }
}
module.exports = Site;

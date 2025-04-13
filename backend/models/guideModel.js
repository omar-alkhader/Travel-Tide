const db = require("../db");
class Guide {
  static async createGuide({ name, email, hashedPassword }) {
    const query = `
      INSERT INTO guide (name,email,password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [name, email, hashedPassword];
    const result = await db.query(query, values);
    return result.rows[0];
  }
  static async findAllGuides() {
    const query = ` SELECT *
            FROM guide
        `;
    const result = await db.query(query);
    const data = result.rows;
    return data;
  }
  static async getGuide(id) {
    const query = `
            SELECT *
            FROM guide
            WHERE id = $1
        `;
    const params = [id];
    const result = await db.query(query, params);
    return result.rows[0];
  }
  static async findByIdAndUpdate(id, updates) {
    const setClause = Object.entries(updates)
      .map(([col], index) => `${col} = $${index + 1}`)
      .join(", ");
    const values = Object.entries(updates).map((_, value) => value);
    values.push(id);
    const query = `UPDATE guide
    SET ${setClause}
    WHERE id = $${values.length} RETURNING *`;
    const result = await db.query(query, [...values]);
    return result;
  }
  static async findByIdAndDelete(id) {
    const query = `DELETE FROM guide
    WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await db.query(query, params);
    return result;
  }
}
module.exports = Guide;

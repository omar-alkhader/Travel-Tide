const db = require("../db");
const bcrypt = require("bcryptjs");
class User {
  static async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [username, email, hashedPassword];
    const result = await db.query(query, values);
    return result.rows[0];
  }
  static async findAllUsers() {
    const query = ` SELECT *
            FROM users
        `;
    const result = await db.query(query);
    const data = result.rows;
    return data;
  }
  static async getUser(id) {
    const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
    const params = [id];
    const result = await db.query(query, params);
    return result.rows[0];
  }
}
module.exports = User;

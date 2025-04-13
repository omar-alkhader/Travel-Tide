const db = require("../db");
const bcrypt = require("bcryptjs");
class User {
  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [name, email, hashedPassword];
    const result = await db.query(query, values);
    return result;
  }
  static async findAllUsers() {
    const query = ` SELECT *
            FROM users
        `;
    const result = await db.query(query);
    return result;
  }
  static async getUserByEmail(email) {
    const query = `
            SELECT *
            FROM users
            WHERE email = $1
        `;
    const params = [email];
    const result = await db.query(query, params);
    return result;
  }
  static async findUserByIdAndDelete(id) {
    const query = `
            SELECT *
            FROM users
            WHERE id = $1
        `;
    const params = [id];
    const result = await db.query(query, params);
    return result;
  }
}
module.exports = User;

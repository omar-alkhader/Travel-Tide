const db = require("../db");
class Review {
  static async getAllReview() {
    const query = `SELECT *
            FROM review
        `;
    const result = await db.query(query);
    return result.rows;
  }
  static async createReview(rating, description, user_id) {
    const query = `INSERT INTO review(rating,comment,user_id)
        VALUES($1,$2,$3) RETURNING *;
        `;
    const params = [rating, description, user_id];
    const result = await db.query(query, params);
    console.log(result);
    return result.rows;
  }
  static async getReviewById(id) {
    const query = `
            SELECT *
            FROM review
            WHERE user_id = $1
            LIMIT 1
        `;
    const params = [id];
    const result = await db.query(query, params);
    return result.rows[0];
  }
}
module.exports = Review;

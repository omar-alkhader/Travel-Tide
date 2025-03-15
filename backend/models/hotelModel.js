const db = require("../db");
class Hotel {
  static async findAllHotels() {
    const query = `SELECT *
        FROM hotels`;
    const result = await db.query(query);
    return result.rows;
  }
  static async createHotel(body) {
    ({ name, address, summary, rooms, price, photo, rating, city_id } = body);
    const query = `
        INSERT INTO hotels(name,address,summary,rooms,price,photo,rating,city_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
      `;
    const params = [
      name,
      address,
      summary,
      rooms,
      price,
      photo,
      rating,
      city_id,
    ];
    const hotel = await db.query(query, params);
    return hotel.rows;
  }
  static async getHotel(id) {
    const query = `
    SELECT * 
    FROM hotels
    WHERE id = $1`;
    const params = [id];
    const hotel = await db.query(query, params);
    return hotel.rows;
  }
  static async getHotelsByCity(city_id) {
    const query = `
    SELECT * 
    FROM hotels
    WHERE city_id = $1`;
    const params = [city_id];
    const hotel = await db.query(query, params);
    return hotel.rows;
  }
}
module.exports = Hotel;

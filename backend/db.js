// const { Pool } = require("pg");

// // Create a new Pool instance (connection pool)
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "travel-tide",
//   password: "test123456",
//   port: 5432,
// });
// module.exports = pool;
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      user: "postgres",
      host: "localhost",
      database: "travel-tide",
      password: "test123456",
      port: 5432,
    });

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  async query(text, params) {
    const start = Date.now();
    const result = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = new Database();

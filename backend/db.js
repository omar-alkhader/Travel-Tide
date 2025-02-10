const { Pool } = require("pg");

// Create a new Pool instance (connection pool)
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "travel-tide",
  password: "test123456",
  port: 5432, 
});
module.exports = pool;

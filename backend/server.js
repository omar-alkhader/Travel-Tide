const dotenv = require("dotenv");
const app = require("./app");

// Test the connection

app.listen(6600, "127.0.0.1", () => {
  console.log("server is running");
});

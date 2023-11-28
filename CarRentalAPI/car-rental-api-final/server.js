const express = require("express");
const connectDB = require("./config/db");
const app = express();
// ----------------------------------
// Configurations
// ---------------------------------
// asyncErrors to express error Handler
require("express-async-errors");
// Read env file
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env?.PORT || 8080;
const HOST = process.env?.HOST || "127.0.0.1";
// Conenct to db;
connectDB();

// Middlewares
// Parse json data
app.use(express.json());
// Morgan- logger
app.use("/img", express.static("./upload"));
app.use(require("./middlewares/logger"));

// Authentication
app.use(require("./middlewares/authentication"));

// Routes
app.use(require("./routes"));

// error Handler
app.use(require("./middlewares/errorHandler"));
// RUN SERVER
app.listen(PORT, console.log(`http://${HOST}:${PORT}`.green.underline));

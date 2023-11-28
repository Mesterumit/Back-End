const { connect } = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const res = await connect(process.env.MONGO_DB);
    console.log(`Connect to DB! ${res.connection.host}`.yellow.underline);
  } catch (err) {
    console.log(`${err.message}`.red);
  }
};

module.exports = connectDB;

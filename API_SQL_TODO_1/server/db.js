const {Sequelize} = require('sequelize');
const color = require('colors')

// mysql
const sequelize = new Sequelize(
   
     {
    dialect:'sqlite',
    // host:process.env.DB_HOST,
    storage: './db.sqlite'
})

// postgres
// having problem with running with postgres
// const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB2_USER,
//     process.env.DB2_PASSWORD,
//     {
//       dialect: "postgres",
//       host: process.env.DB_HOST,
//     }
//   );

const connectDB = async ()=>{
    sequelize.sync();
    await sequelize.authenticate();
    console.log("Connected to DB".yellow.underline)
}

module.exports = {connectDB , sequelize };









// this is with MySql

// const { Sequelize, DataTypes } = require('sequelize');
// require('dotenv').config();

// // Get the MySQL URI from the environment variable
// const { DATABASE_URL } = process.env;

// // Create a Sequelize instance
// const sequelize = new Sequelize(DATABASE_URL);

// // Define a model
// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   age: {
//     type: DataTypes.INTEGER
//   }
// });

// // Connect to the database and sync the model
// async function connectToDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to the database has been established successfully.');

//     await sequelize.sync({ force: true });
//     console.log('All models were synchronized successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// // Call the function to establish the connection and sync the model
// connectToDatabase();

// and need to create a .env file
// in it (DATABASE_URL=mysql://username:password@localhost:3306/database_name

// in order to get a "user_name,password and database_name"
//CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
// CREATE DATABASE your_database_name;
// GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';

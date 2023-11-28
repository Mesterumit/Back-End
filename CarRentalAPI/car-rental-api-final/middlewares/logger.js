const morgan = require('morgan');
const fs = require('fs');

// Get current date and time 
const now = new Date().toISOString();
const [date, time] = now.split('T');

module.exports = morgan('combined', {
    stream: fs.createWriteStream(`./logs/${date}.log`, {flags:'a+'})
})

const logger = require('morgan')
const fs = require('node:fs')

const now = new Date()

// Write logs of files - day by day
const Today = new Date().toISOString().split('T')

module.exports = logger('combined',{
stream : fs.createWriteStream(`./logs/${Today}`,{flags:'a+'})
})
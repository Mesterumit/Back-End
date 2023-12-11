// Express - Personnel API 
const express = require('express')
const app = express();

// Import required Modules
require('colors');
require('express-async-errors')
require('dotenv').config()
const connectDB = require('./config/db')
const logger = require('morgan');
const session = require('cookie-session')
const Personnal = require('./models/Personnal')

// Configuration
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || 'production';

// Connect DB 
connectDB();


// Middlewares
app.use(express.json());
if(MODE==='development')
    app.use(logger('dev'));
app.use(session({secret:process.env.SESSION_KEY}))
// Auth middleware 
app.use(async(req, res, next)=>{
    req.isLogin = false 
    if(req.session?.id){
        const user = await Personnal.findById(req.session.id)
        req.isLogin = Boolean(user)
    }
    next();
})





// Home Path 
app.all('/', (req, res)=>{
    res.status(200).json({
        success: true, 
        error: false, 
        message: 'Welcome to PERSONNEL API', 
        session:req.session, 
        isLogin: req.isLogin
    })
})



// App routes 
app.use('/api/departments', require('./routes/department'))
app.use('/api/personnals', require('./routes/personnal'));

// Express error handler 
app.use(require('./middlewares/errorHandler'))



// Run the server 
app.listen(PORT, console.log(`Server running on ${MODE} mode on port ${PORT}`.green.underline));


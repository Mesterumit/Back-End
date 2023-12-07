
const {connect} = require('mongoose')

const dbConnection = function() {
    // Connect:
    connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

/* ------------------------------------------------------- */
module.exports = {
    
    dbConnection
}
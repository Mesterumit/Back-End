const {Schema, model} = require('mongoose');
const reservationSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
    },
    carId: {
        type: Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true,
    },
    startDate:{
        type: Date, 
        required: true, 
    },
    endDate:{
        type: Date, 
        required: true, 
    }
}, {timestamps: true});


module.exports = model('Reservation', reservationSchema)
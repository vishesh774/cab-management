const mongoose = require('mongoose');

const Bookings = new mongoose.Schema({
    Cab_Id: String,
    City_Id: String,
    User_Id: String
}, {
    timestamps: true
});


const BookingsModel = mongoose.model('bookings', Bookings);
module.exports = BookingsModel;
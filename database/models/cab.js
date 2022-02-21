const mongoose = require('mongoose');

const CabSchema = new mongoose.Schema({
    Cab_Id: String,
    City_Id: String,
    baseCity: String
}, {
    timestamps: true
});


const Cab = mongoose.model('Cab', CabSchema);
module.exports = Cab;
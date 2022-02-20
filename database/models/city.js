const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: String,
    City_Id: String
}, {
    timestamps: true
});


const City = mongoose.model('City', CitySchema);
module.exports = City;
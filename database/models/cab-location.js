const mongoose = require('mongoose');

const CabLocation = new mongoose.Schema({
    Cab_Id: String,
    City_Id: String
}, {
    timestamps: true
});


const CabLocationModel = mongoose.model('CabLocation', CabLocation);
module.exports = CabLocationModel;
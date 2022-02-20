const mongoose = require('mongoose');

const CabStatusSchema = new mongoose.Schema({
    Cab_Id: String,
    City_Id: String,
    status: String
}, {
    timestamps: true
});

const CabStatus = mongoose.model('CabStatus', CabStatusSchema);
module.exports = CabStatus;
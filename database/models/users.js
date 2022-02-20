const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    User_Id: String
}, {
    timestamps: true
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
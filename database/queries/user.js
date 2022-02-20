const Users = require("../models/users");

async function findUserById(value) {
    return Users.findOne({ 'User_Id': value }).then(function (data) {
        return data
    });
}
module.exports = findUserById;
const City = require("../models/city");

async function findCityByName(value, param) {
    return City.findOne({ [param]: value }).then(function (data) {
        return data
    });
}
module.exports = findCityByName;
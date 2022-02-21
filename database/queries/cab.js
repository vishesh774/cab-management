const Cab = require("../models/cab");

async function findCabByKeyName(value, param) {
    return Cab.findOne({ [param]: value }).then(function (data) {
        console.log('cab in DB')
        console.log(data);
        return data
    });
}
module.exports = findCabByKeyName;
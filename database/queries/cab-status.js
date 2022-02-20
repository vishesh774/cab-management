const { func } = require("joi");
const CabState = require("../models/cab-state");

async function findCabStateByKeyName(value, param) {
    return CabState.findOne({ [param]: value }).sort({ createdAt: -1}).then(function (data) {
        return data
    });
}
async function findCabsByStateAndLocation(City_Id, status) {
    return CabState.find({
        City_Id,
        status
    }).sort({
        updatedAt: -1
    }).then(function(data) {
        return data
    });
}
module.exports = {
    findCabStateByKeyName,
    findCabsByStateAndLocation
};
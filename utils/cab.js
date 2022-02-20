const { findCabsByStateAndLocation } = require("../database/queries/cab-status")
const { DEFAULT_CAB_STATE } = require("./cab-status");
const { getMostIdleCab } = require("./time-calculation");

async function getAvailableCab(City_Id) {
    const availableCabs = await findCabsByStateAndLocation(City_Id, DEFAULT_CAB_STATE);
    console.log(availableCabs);
    if (availableCabs.length > 0) {
        if (availableCabs.length > 1) {
            // implement a tie breaker technique
            return getMostIdleCab(availableCabs)
        } else {
            return availableCabs[0];
        }
    } else {
        return {};
    }
}
module.exports = {
    getAvailableCab
}
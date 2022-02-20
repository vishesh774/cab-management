var express = require('express');
const findCabByKeyName = require('../database/queries/cab');
const { findCabStateByKeyName } = require('../database/queries/cab-status');
const { createCabStatusMachine } = require('../utils/cab-status');
var router = express.Router();

/* GET home page. */
router.post('/', async function(req, res, next) {
    // get the current status of the cab
    const {
        Cab_Id,
        status,
        city
    } = req.body;
    if (!(Cab_Id && status)) {
        res.status(400).send({
            error: `Input Params missing. Make sure CabId and status both are passed`
        })
    } else {
        const cab = await findCabByKeyName(Cab_Id, 'Cab_Id');
        if (!cab) {
            res.status(400).send({
                error: `Cab not found with this id to update`
            })
        } else {
            const cabStatus = await findCabStateByKeyName(Cab_Id, 'Cab_Id');
            if(cabStatus.status === status) {
                res.status(200).send({
                    message: `Cab is already in the ${status} state`
                })
            } else {
                const cityName = status === "IDLE" ? city : '';
                // generate cab state machine and update the location to new one
                const cabStatusMachine = createCabStatusMachine(cabStatus.status, Cab_Id, cityName);
                const updatedStateOfCab = cabStatusMachine.transition(cabStatusMachine.value, 'switch');
                res.status(200).send({
                    message: `Cab Status has been updated. New State is ${updatedStateOfCab}`
                })
            }
        }
    }
});

module.exports = router;

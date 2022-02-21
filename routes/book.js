var express = require('express');
const BookingsModel = require('../database/models/bookings');
const User = require('../database/models/users');
const { getBookings } = require('../database/queries/bookings');
const findCityByName = require('../database/queries/city');
const findUserById = require('../database/queries/user');
const { getAvailableCab } = require('../utils/cab');
const { DEFAULT_CAB_STATE, createCabStatusMachine } = require('../utils/cab-status');
var router = express.Router();

/* GET home page. */
router.post('/', async function(req, res, next) {
    const {
        City_Id,
        User_Id
    } = req.body;
    const city = await findCityByName(City_Id, 'City_Id');
    if (city) {
        let user = await findUserById(User_Id);
        if (!user) {
            const newUser = new User({
                User_Id
            });
            user = await newUser.save();
        }
        // find a vacant cab
        const cab = await getAvailableCab(City_Id);
        if (Object.keys(cab).length > 0) {
            const newBooking = new BookingsModel({
                City_Id,
                User_Id,
                Cab_Id: cab.Cab_Id
            });
            await newBooking.save()
            // transition the cab status to ON_TRIP
            const cabStatusMachine = createCabStatusMachine(DEFAULT_CAB_STATE, cab.Cab_Id, '');
            const updatedStateOfCab = cabStatusMachine.transition(cabStatusMachine.value, 'switch');
            res.status(200).send({
                message: `New Booking Created Successfully and cab marked as ${updatedStateOfCab}`
            })
        } else {
            res.status(500).send({
                message: "Now Idle Cabs found in the location"
            })
        }
    } else {
        res.status(400).send({
            error: "Not a valid city id in location"
        });
    }
});
router.post('/anal', async function(req, res, next) {
    // find the city with max demand
        const bookings = await getBookings();
        res.status(200).send({
            maxBookings: bookings
        });
    });
module.exports = router;
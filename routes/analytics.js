var express = require('express');
const { getBookings } = require('../database/queries/bookings');
var router = express.Router();

router.post('/', async function(req, res, next) {
// find the city with max demand
    const bookings = await getBookings();
    res.status(200).send({
        maxBookings: bookings
    });
});

module.exports = router;
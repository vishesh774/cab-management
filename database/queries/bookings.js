const BookingsModel = require("../models/bookings");

async function getBookings() {
    return BookingsModel.find().then((bookings) => {
        let maxBookingCity = "";
        const cityBookingsMap = {};
        bookings.forEach((booking) => {
            if (!cityBookingsMap[booking.City_Id]) {
                cityBookingsMap[booking.City_Id] = 0;
            }
            cityBookingsMap[booking.City_Id] += 1;
        });

        // all the cities with bookings count

        const maxBookings = Math.max(Object.values(cityBookingsMap));
        Object.keys(cityBookingsMap).forEach((city) => {
            if (cityBookingsMap[city] === maxBookings) {
                maxBookingCity = city
            }
        })
        return maxBookingCity;
    });
}
module.exports = {
    getBookings
}
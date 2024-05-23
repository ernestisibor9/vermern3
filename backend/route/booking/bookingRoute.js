const express = require('express');
const { addBooking, singleBooking, deleteBooking, getBookingsOfUser } = require('../../controller/booking/bookingController');
const route = express.Router();


route.post('/addbooking', addBooking);
route.get('/getonebooking/:id', singleBooking);
route.delete('/deletebooking/:id', deleteBooking);
route.get('/getbookingsofuser/:id', getBookingsOfUser);

module.exports = route;
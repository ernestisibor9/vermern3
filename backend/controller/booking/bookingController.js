const express = require('express');
const Booking = require('../../model/booking/Booking');
const Movie = require('../../model/movie/Movie');
const User = require('../../model/user/User');


const addBooking = async (req, res) => {
    const{movie, date, seatNumber, user} = req.body;
    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    if(!existingUser){
        return res.status(400).json({ message: "User not found" });
    }
    if(!existingMovie){
        return res.status(400).json({ message: "Movie not found" });
    }
    try {
        const createBooking = await Booking.create({
            movie: movie,
            date: new Date(`${date}`),
            seatNumber: seatNumber,
            user: user
        })
        if(!createBooking){
            return res.status(400).json({ message: "Booking failed" });
        }
        existingUser.bookings.push(createBooking);
        existingMovie.bookings.push(createBooking);
        await existingUser.save();
        await existingMovie.save();
        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            booking: createBooking,
        })
    } 
    catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

// Fetch single booking
const singleBooking = async(req, res) => {
    const id = req.params.id;
    try{
        const booking = await Booking.findById(id);
        if(!booking){
            throw new Error("Booking not found");
        }
        return res.status(200).json({
            success: true,
            message: "Booking successfully found",
            booking: booking,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};

// Delete booking
const deleteBooking = async(req, res) => {
    const id = req.params.id;
    try{
        const booking = await Booking.findByIdAndDelete(id).populate('user movie');
        if(!booking){
            throw new Error("Booking not found");
        }
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save();
        await booking.movie.save();
        console.log(booking);
        return res.status(200).json({
            success: true,
            message: "Booking successfully deleted",
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};

// Get the bookings of the specified user
const getBookingsOfUser = async(req, res) => {
    const id = req.params.id;
    try{
        const booking = await Booking.find({user: id});
        if(!booking){
            throw new Error("Booking not found");
        }
        return res.status(200).json({
            success: true,
            message: "Booking successfully found",
            booking: booking,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};


module.exports = {addBooking, singleBooking, deleteBooking, getBookingsOfUser};
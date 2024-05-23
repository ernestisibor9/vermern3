const express = require('express');
const Movie = require('../../model/movie/Movie');
const jwt = require('jsonwebtoken');
const Admin = require('../../model/admin/Admin');


const addMovie = async (req, res) => {
    // Extract the token
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken){
        return res.status(404).json({message: 'token not found'});
    }
    // console.log(extractedToken);
    // verify the token
    const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET);
    // console.log(decodedToken);
    // check if the token is valid
    if(!decodedToken){
        return res.status(404).json({message: 'token is not valid'});
    }
    console.log(decodedToken.id);

    // Create a new movie
    const{title, description, posterUrl, featured, actors, releaseDate} = req.body;

    if(!title || !description || !posterUrl){
        return res.status(400).json({message: 'Please enter all fields'});
    }

    let existingAdmin;
    try{
        existingAdmin = await Admin.findById(decodedToken.id);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

    try{
        const createMovie = await Movie.create({
            title: title,
            description: description,
            posterUrl: posterUrl,
            featured: featured,
            actors: actors,
            releaseDate: new Date(`${releaseDate}`),
            admin: decodedToken.id,
        }) 
        if(!createMovie){
            return res.status(400).json({message: 'Something went wrong'});
        }
        existingAdmin.addedMovie.push(createMovie);
        await existingAdmin.save();
        return res.status(201).json({
            success: true,
            message: 'Movie created successfully',
            movie: createMovie,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

// Fetch all movies
const getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find().populate('admin');
        movies.forEach(movie => {
            console.log(movie.admin.email);
        });
        return res.status(200).json({
            success: true,
            movies: movies,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};

// Fetch single movie
const singleMovie = async(req, res) => {
    const id = req.params.id;
    try{
        const movie = await Movie.findById(id);
        if(!movie){
            throw new Error("Movie not found");
        }
        return res.status(200).json({
            success: true,
            message: "Movie successfully found",
            movie: movie,
        });
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
};

module.exports = {addMovie, getAllMovies, singleMovie}
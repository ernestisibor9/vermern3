const express = require('express');
const { addMovie, getAllMovies, singleMovie } = require('../../controller/movie/MovieController');
const route = express.Router();


route.post('/addmovie', addMovie)
route.get('/getallmovie', getAllMovies)
route.get('/getonemovie/:id', singleMovie)

module.exports = route;
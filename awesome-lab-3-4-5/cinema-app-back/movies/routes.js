const movieService = require('./movieService');
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    let movie = {
        name: req.body.name,
        startDate: req.body.startDate,
        originCountry: req.body.originCountry,
        genre: req.body.genre
    };
    movieService.createMovie(movie)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while creating the movie."}));
});
router.get('/', (req, res) => {
    movieService.findAll()
        .then(movieData => {
            res.send('movies', {movies: movieData})
        }).catch(err => {
        res.send({error: err.message || "Some error occurred while getting movies."});
    });
});
router.get('/:movieId', (req, res) => {
    movieService.findOne(req.params.movieId)
        .then(movieData => res.send({
            movie: movieData
        }))
        .catch(err => {
            res.send({err: err.message || "No such movie."});
        });
});
router.put('/:movieId', (req, res) => {
    let movie = {
        name: req.body.name,
        startDate: req.body.startDate,
        originCountry: req.body.originCountry,
        genre: req.body.genre
    };
    movieService.updateMovie(req.params.movieId, movie)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while updating movie."}));
});
router.delete('/:movieId', (req, res) => {
    movieService.deleteMovie(req.params.movieId)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while deleting movie."}));
});

module.exports = router;

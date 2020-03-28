const movieService = require('./movieService');
const express = require("express");
const router = express.Router();


//movies
router.post('/', async (req, res) => {
    let movie = {
        name: req.body.name,
        startDate: req.body.startDate,
        originCountry: req.body.originCountry,
        genre: req.body.genre
    };
    const created = await movieService.createMovie(movie);
    res.send(created);
});

router.get('/', async (req, res) => {
    const movies = await movieService.findAll();
    res.send({movies:movies});
});


router.get('/:movieId', async (req, res) => {
    const movie = await movieService.findOne(req.params.movieId);
    res.send(movie);
});

router.put('/:movieId', async (req, res) => {
    let movie = {
        name: req.body.name,
        startDate: req.body.startDate,
        originCountry: req.body.originCountry,
        genre: req.body.genre
    };
    const updated = await movieService.updateMovie(req.params.movieId, movie);
    res.send(updated);
});

router.delete('/:movieId', async (req, res) => {
    const deleted = await movieService.deleteMovie(req.params.movieId);
    res.send(deleted);
});

module.exports = router;

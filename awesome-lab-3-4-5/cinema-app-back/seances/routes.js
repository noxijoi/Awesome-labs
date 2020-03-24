const seanceService = require('./seancesService');
const movieService = require('../movies/movieService');
const cinemasService = require('../cinemas/cinemaService');

const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    let seance = {
        date: req.body.date,
        movieId: req.body.movieId,
        cinemaId: req.body.cinemaId,
        ticketCount: +req.body.ticketCount
    };
    const created = await seanceService.createSeance(seance);
    res.send(created);
});

router.get('/', async (req, res) => {
    const seances = await seanceService.findAll()
    res.send(seances);
});

router.get('/:seanceId', async (req, res) => {
    let seance = await seanceService.findOne(req.params.seanceId);
    let seanceMovie = await movieService.findOne(seance.movie);
    let seanceCinema = await cinemasService.findOne(seance.cinema);
    seance.movie = seanceMovie;
    seance.cinema = seanceCinema;
    res.send(seance);
});

router.put('/:seanceId', async (req, res) => {
    let seance = {
        date: req.body.date,
        movie: req.body.movie,
        cinema: req.body.cinema,
        tickerCount: req.body.tickerCount
    };
    const updates = await seanceService.updateSeance(req.params.seanceId, seance);
    res.send(updates);
});

router.delete('/:seanceId', async  (req, res) => {
    const deleted = await seanceService.deleteSeance(req.params.seanceId);
    res.send(deleted);
});


module.exports = router;

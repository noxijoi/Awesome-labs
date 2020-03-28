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
    const seances = await seanceService.findAll();
    let seancesDtos =[];
    for (const seance of seances) {
        const movie = await movieService.findOne(seance.movieId);
        const cinema = await  cinemasService.findOne(seance.cinemaId);
        let dto = {};
        dto.ticketCount = seance.ticketCount;
        dto.date = seance.date;
        dto.movie = movie;
        dto.cinema = cinema;
        dto._id=seance._id;
        seancesDtos.push(dto)
    }
    res.send(seancesDtos);
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
        ticketCount: req.body.ticketCount
    };
    const updates = await seanceService.updateSeance(req.params.seanceId, seance);
    res.send(updates);
});

router.delete('/:seanceId', async  (req, res) => {
    const deleted = await seanceService.deleteSeance(req.params.seanceId);
    res.send(deleted);
});


module.exports = router;

const seanceService = require('./seancesService');
const movieService = require('../movies/movieService');
const cinemasService = require('../cinemas/cinemaService');

const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    let seance = {
        date: req.body.date,
        movieId: req.body.movieId,
        cinemaId: req.body.cinemaId,
        ticketCount: +req.body.ticketCount
    };
    seanceService.createSeance(seance)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while creating the seance."}));
});
router.get('/', (req, res) => {
    seanceService.findAll()
        .then(seanceData => {
            res.send({seances: seanceData})
        })
        .catch(err => {
            res.send({error: err.message || "Some error occurred while getting seances."});
        });
});
router.get('/:seanceId', async (req, res) => {
    let seance = await seanceService.findOne(req.params.seanceId);
    let movies = await movieService.findAll();
    let cinemas = await cinemasService.findAll();
    res.send({
        seance: seance,
        movies: movies,
        cinemas: cinemas
    })
});
router.put('/:seanceId', (req, res) => {
    let seance = {
        date: req.body.date,
        movie: req.body.movie,
        cinema: req.body.cinema,
        tickerCount: req.body.tickerCount
    };
    seanceService.updateSeance(req.params.seanceId, seance)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while updating seance."}));
});
router.delete('/:seanceId', (req, res) => {
    seanceService.deleteSeance(req.params.seanceId)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while deleting seance."}));
});


module.exports = router;

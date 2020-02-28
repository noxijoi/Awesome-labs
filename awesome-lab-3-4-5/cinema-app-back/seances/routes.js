const seanceService = require('./seancesService');
const movieService = require('../movies/movieService');
const cinemasService = require('../cinemas/cinemaService');

module.exports = (app) => {
    //seances
    app.post('/seances', (req, res) => {
        let seance = {
            date: req.body.date,
            movieId: req.body.movieId,
            cinemaId: req.body.cinemaId,
            ticketCount: +req.body.ticketCount
        };
        seanceService.createSeance(seance)
            .then(res.render('ok', {message: "seance created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the seance."}));
    });
    app.get('/seances', (req, res) => {
        seanceService.findAll()
            .then(seanceData => {
                res.render('seances', {seances: seanceData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while getting seances."});
        });
    });
    app.get('/seances/newseance', async (req, res) => {
        let movies = await movieService.findAll();
        let cinemas = await cinemasService.findAll();
        res.render('seanceForm', {
            cinemas: cinemas,
            movies: movies
        });

    });
    app.get('/seances/:seanceId', async (req, res) => {
        let seance = await seanceService.findOne(req.params.seanceId);
        let movies = await movieService.findAll();
        let cinemas = await cinemasService.findAll();
        res.render('seanceForm', {
            seance: seance,
            movies: movies,
            cinemas: cinemas
        })
    });
    app.post('/seances/:seanceId', (req, res) => {
        let seance = {
            date: req.body.date,
            movie: req.body.movie,
            cinema: req.body.cinema,
            tickerCount: req.body.tickerCount
        };
        seanceService.updateSeance(req.params.seanceId, seance)
            .then(res.render('ok', {message: "seance updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating seance."}));
    });
    app.get('/seances/del/:seanceId', (req, res) => {
        seanceService.deleteSeance(req.params.seanceId)
            .then(res.render('ok', {message: "seance deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting seance."}));
    });
};

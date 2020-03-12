const seanceService = require('./seancesService');
const movieService = require('../movies/movieService');
const cinemasService = require('../cinemas/cinemaService');

module.exports = (app) => {
    //seances
    app.post('/api/seances', (req, res) => {
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
    app.get('/api/seances', (req, res) => {
        seanceService.findAll()
            .then(seanceData => {res.send({seances: seanceData})})
            .catch(err => {res.send({error: err.message || "Some error occurred while getting seances."});
        });
    });
    app.get('/api/seances/:seanceId', async (req, res) => {
        let seance = await seanceService.findOne(req.params.seanceId);
        let movies = await movieService.findAll();
        let cinemas = await cinemasService.findAll();
        res.send({
            seance: seance,
            movies: movies,
            cinemas: cinemas
        })
    });
    app.post('/api/seances/:seanceId', (req, res) => {
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
    app.get('/seances/del/:seanceId', (req, res) => {
        seanceService.deleteSeance(req.params.seanceId)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while deleting seance."}));
    });
};

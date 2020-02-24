const seanceService = require('./seancesService');

module.exports = (app) => {
    //seances
    app.post('/seances', (req, res) => {
        let seance = {
            date: req.body.date,
            movie: req.body.movie,
            cinema: req.body.cinema,
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
    app.get('/seances/newseance', (req, res) => {
        res.render('seanceForm')
    });
    app.get('/seances/:seanceId', (req, res) => {
        seanceService.findOne(req.params.seanceId)
            .then(seanceData => res.render('seanceForm', {
                seance: seanceData
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such seance."});
            });
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

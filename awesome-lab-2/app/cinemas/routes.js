const cinemaService = require('./cinemaService');

module.exports = (app) => {
    //cinemas
    app.post('/cinemas', (req, res) => {
        let cinema = {
            name: req.body.name,
            address: req.body.address
        };
        cinemaService.createCinema(cinema)
            .then(res.render('ok', {message: "cinema created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the Cinema."}));
    });
    app.get('/cinemas', (req, res) => {
        cinemaService.findAll()
            .then(cinemasData => {
                res.render('cinemas', {cinemas: cinemasData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while creating the cinema."});
        });
    });
    app.get('/cinemas/newCinema', (req, res) => {
        res.render('cinemaForm')
    });
    app.get('/cinemas/:cinemaId', (req, res) => {
        cinemaService.findOne(req.params.cinemaId)
            .then(cinemaData => res.render('cinemaForm', {
                cinema: cinemaData
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such cinema."});
            });
    });
    app.post('/cinemas/:cinemaId', (req, res) => {
        let cinema = {
            name: req.body.name,
            address: req.body.address
        };
        cinemaService.updateCinema(req.params.cinemaId, cinema)
            .then(res.render('ok', {message: "cinema updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating cinema."}));
    });
    app.get('/cinemas/del/:cinemaId', (req, res) => {
        cinemaService.deleteCinema(req.params.cinemaId)
            .then(res.render('ok', {message: "cinema deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting cinema."}));
    });
};

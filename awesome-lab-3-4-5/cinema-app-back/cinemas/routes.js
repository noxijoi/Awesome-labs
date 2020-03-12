const cinemaService = require('./cinemaService');

module.exports = (app) => {
    //cinemas
    app.post('/api/cinemas', (req, res) => {
        let cinema = {
            name: req.body.name,
            address: req.body.address
        };
        cinemaService.createCinema(cinema)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while creating the Cinema."}));
    });
    app.get('/api/cinemas', (req, res) => {
        cinemaService.findAll()
            .then(cinemasData => {
                res.send({cinemas: cinemasData})
            }).catch(err => {
            res.send({error: err.message || "Some error occurred while creating the cinema."});
        });
    });
    app.get('/api/cinemas/newCinema', (req, res) => {
        res.send('cinemaForm')
    });
    app.get('/api/cinemas/:cinemaId', (req, res) => {
        cinemaService.findOne(req.params.cinemaId)
            .then(cinemaData => res.send({
                cinema: cinemaData
            }))
            .catch(err => {
                res.send({error: err.message || "No such cinema."});
            });
    });
    app.post('/api/cinemas/:cinemaId', (req, res) => {
        let cinema = {
            name: req.body.name,
            address: req.body.address
        };
        cinemaService.updateCinema(req.params.cinemaId, cinema)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while updating cinema."}));
    });
    app.get('/api/cinemas/del/:cinemaId', (req, res) => {
        cinemaService.deleteCinema(req.params.cinemaId)
            .then(res.status(200).json())
            .catch(err => res.send({error: err.message || "Some error occurred while deleting cinema."}));
    });
};

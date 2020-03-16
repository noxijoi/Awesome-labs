const cinemaService = require('./cinemaService');
const express = require("express");
const router = express.Router();


router.post('/', async (req, res) => {
    let cinema = {
        name: req.body.name,
        address: req.body.address
    };
    const createdCinema = await cinemaService.createCinema(cinema);
    res.send(createdCinema);
});
router.get('/', (req, res) => {
    cinemaService.findAll()
        .then(cinemasData => {
            res.send({cinemas: cinemasData})
        }).catch(err => {
        res.send({error: err.message || "Some error occurred while creating the cinema."});
    });
});
router.get('/:cinemaId', (req, res) => {
    cinemaService.findOne(req.params.cinemaId)
        .then(cinemaData => res.send({
            cinema: cinemaData
        }))
        .catch(err => {
            res.send({error: err.message || "No such cinema."});
        });
});
router.put('/:cinemaId', (req, res) => {
    let cinema = {
        name: req.body.name,
        address: req.body.address
    };
    cinemaService.updateCinema(req.params.cinemaId, cinema)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while updating cinema."}));
});
router.delete('/:cinemaId', (req, res) => {
    cinemaService.deleteCinema(req.params.cinemaId)
        .then(res.status(200).json())
        .catch(err => res.send({error: err.message || "Some error occurred while deleting cinema."}));
});

module.exports = router;

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

router.get('/', async (req, res) => {
    const cinemas = await cinemaService.findAll();
    res.send({cinemas: cinemas});
});

router.get('/:cinemaId', async (req, res) => {
    const cinema = await cinemaService.findOne(req.params.cinemaId)
    res.send(cinema);
});

router.put('/:cinemaId', async (req, res) => {
    let cinema = {
        name: req.body.name,
        address: req.body.address
    };
    const updatedCinema = await cinemaService.updateCinema(req.params.cinemaId, cinema);
    res.send(updatedCinema);
});

router.delete('/:cinemaId', async (req, res) => {
    const deleted  = await cinemaService.deleteCinema(req.params.cinemaId);
    res.send(deleted);
});

module.exports = router;

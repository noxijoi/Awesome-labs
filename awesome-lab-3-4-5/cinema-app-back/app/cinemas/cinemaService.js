const Cinema = require('./cinema.model');


const findAll = () => {
    return Cinema.find();
};

function findOne(id) {
    return Cinema.findById(id);
}

function createCinema(cinema) {
    const newCinema = new Cinema({...cinema});
    return newCinema.save();
}

function updateCinema(id, user) {
    return Cinema.findByIdAndUpdate(id, user)
}

function deleteCinema(id) {
    return Cinema.findByIdAndRemove(id);
}

module.exports = {
    createCinema: createCinema,
    findOne: findOne,
    findAll: findAll,
    updateCinema: updateCinema,
    deleteCinema: deleteCinema
};

const Seance = require('./seance.model');


const findAll = () => {
    return Seance.find();
};

function findOne(id) {
    return Seance.findById(id);
}

function createSeance(seance) {
    const newSeance = new Seance({...seance});
    return seance.save();
}

function updateSeance(id, seance) {
    return Seance.findByIdAndUpdate(id, seance)
}

function deleteSeance(id) {
    return Seance.findByIdAndRemove(id);
}

module.exports = {
    createSeance: createSeance,
    findOne: findOne,
    findAll: findAll,
    updateSeance: updateSeance,
    deleteSeance: deleteSeance
};

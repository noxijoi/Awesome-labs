const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = mongoose.Schema({
    name: {type: Date, required: true},
    address: {type: String, required: true}
});

module.exports = mongoose.model('Seance', CinemaSchema);

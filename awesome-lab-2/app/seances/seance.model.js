const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeanceSchema = mongoose.Schema({
    date: {type: Date, required: true},
    movie: {type: String, required: true},
    cinema: {type: String, required: true},
    ticketCount: {type: Number, required: true}
});

module.exports = mongoose.model('Seance', SeanceSchema);

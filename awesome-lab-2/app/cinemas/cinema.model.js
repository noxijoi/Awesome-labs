const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true}
});

module.exports = mongoose.model('Cinema', CinemaSchema);

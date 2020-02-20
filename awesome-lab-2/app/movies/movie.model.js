const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = mongoose.Schema({
    name: {type: String, required: true},
    startDate: {type: Date, required: true},
    originCountry: {type: String, required: true},
    genre: {type: String, required: true}

});

module.exports = mongoose.model('Movie', MovieSchema);

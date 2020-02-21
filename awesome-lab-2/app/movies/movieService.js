const Movie = require('./movie.model');


const findAll = () => {
    return Movie.find();
};

function findOne(id) {
    return Movie.findById(id);
}

function createMovie(movie) {
    const newMovie = new Movie({...movie});
    return newMovie.save();
}

function updateMovie(id, movie) {
    return Movie.findByIdAndUpdate(id, movie)
}

function deleteMovie(id) {
    return Movie.findByIdAndRemove(id);
}

module.exports = {
    createMovie: createMovie,
    findOne: findOne,
    findAll: findAll,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie
};

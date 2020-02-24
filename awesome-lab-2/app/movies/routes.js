const movieService = require('./movieService');

module.exports = (app) => {

    //movies
    app.post('/movies', (req, res) => {
        let movie = {
            name: req.body.name,
            startDate: req.body.startDate,
            originCountry: req.body.originCountry,
            genre: req.body.genre
        };
        movieService.createMovie(movie)
            .then(res.render('ok', {message: "movie created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the movie."}));
    });
    app.get('/movies', (req, res) => {
        movieService.findAll()
            .then(movieData => {
                res.render('movies', {movies: movieData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while getting movies."});
        });
    });
    app.get('/movies/newMovie', (req, res) => {
        res.render('movieForm')
    });
    app.get('/movies/:movieId', (req, res) => {
        movieService.findOne(req.params.movieId)
            .then(movieData => res.render('movieForm', {
                movie: movieData
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such movie."});
            });
    });
    app.post('/movies/:movieId', (req, res) => {
        let movie = {
            name: req.body.name,
            startDate: req.body.startDate,
            originCountry: req.body.originCountry,
            genre: req.body.genre
        };
        movieService.updateMovie(req.params.movieId, movie)
            .then(res.render('ok', {message: "movie updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating movie."}));
    });
    app.get('/movies/del/:movieId', (req, res) => {
        movieService.deleteMovie(req.params.movieId)
            .then(res.render('ok', {message: "movie deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting movie."}));
    });
};

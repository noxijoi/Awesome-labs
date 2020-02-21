const userService = require('./users/userService');
const cinemaService = require('./cinemas/cinemaService');
const movieService = require('./movies/movieService');
const seanceService = require('./seances/seancesService');

module.exports = (app) => {
    // users
    app.post('/users', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.createUser(user)
            .then(res.render('ok', {message: "user created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the User."}));
    });
    app.get('/users', (req, res) => {
        userService.findAll()
            .then(usersData => {
                res.render('users', {users: usersData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while creating the User."});
        });
    });
    app.get('/users/newUser', (req, res) => {
        res.render('userForm')
    });
    app.get('/users/:userId', (req, res) => {
        userService.findOne(req.params.userId)
            .then(userData => res.render('userForm', {
                user: userData,
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such user."});
            });
    });
    app.post('/users/:userId', (req, res) => {
        let user = {
            login: req.body.login,
            password: req.body.password
        };
        userService.updateUser(req.params.userId, user)
            .then(res.render('ok', {message: "user updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating user."}));
    });
    app.get('/users/del/:userId', (req, res) => {
        userService.deleteUser(req.params.userId)
            .then(res.render('ok', {message: "user deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting user."}));
    });
    //cinemas
    app.post('/cinemas', (req, res) => {
        let cinema = {
            name: req.body.name,
            address: req.body.address
        };
        cinemaService.createCinema(cinema)
            .then(res.render('ok', {message: "cinema created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the Cinema."}));
    });
    app.get('/cinemas', (req, res) => {
        cinemaService.findAll()
            .then(cinemasData => {
                res.render('cinemas', {cinemas: cinemasData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while creating the cinema."});
        });
    });
    app.get('/cinemas/newCinema', (req, res) => {
        res.render('cinemaForm')
    });
    app.get('/cinemas/:cinemaId', (req, res) => {
        cinemaService.findOne(req.params.cinemaId)
            .then(cinemaData => res.render('cinemaForm', {
                cinema: cinemaData
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such cinema."});
            });
    });
    app.post('/cinemas/:cinemaId', (req, res) => {
        let cinema = {
            name: req.body.name,
            address: req.body.address
        };
        cinemaService.updateCinema(req.params.cinemaId, cinema)
            .then(res.render('ok', {message: "cinema updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating cinema."}));
    });
    app.get('/cinemas/del/:cinemaId', (req, res) => {
        cinemaService.deleteCinema(req.params.cinemaId)
            .then(res.render('ok', {message: "cinema deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting cinema."}));
    });
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
    //seances
    app.post('/seances', (req, res) => {
        let seance = {
            date: req.body.date,
            movie: req.body.movie,
            cinema: req.body.cinema,
            tickerCount: req.body.tickerCount
        };
        seanceService.createSeance(seance)
            .then(res.render('ok', {message: "seance created"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while creating the seance."}));
    });
    app.get('/seances', (req, res) => {
        seanceService.findAll()
            .then(seanceData => {
                res.render('seances', {seances: seanceData})
            }).catch(err => {
            res.render('error', {message: err.message || "Some error occurred while getting seances."});
        });
    });
    app.get('/seances/newseance', (req, res) => {
        res.render('seanceForm')
    });
    app.get('/seances/:seanceId', (req, res) => {
        seanceService.findOne(req.params.seanceId)
            .then(seanceData => res.render('seanceForm', {
                seance: seanceData
            }))
            .catch(err => {
                res.render('error', {err: err.message || "No such seance."});
            });
    });
    app.post('/seances/:seanceId', (req, res) => {
        let seance = {
            date: req.body.date,
            movie: req.body.movie,
            cinema: req.body.cinema,
            tickerCount: req.body.tickerCount
        };
        seanceService.updateSeance(req.params.seanceId, seance)
            .then(res.render('ok', {message: "seance updated"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while updating seance."}));
    });
    app.get('/seances/del/:seanceId', (req, res) => {
        seanceService.deleteSeance(req.params.seanceId)
            .then(res.render('ok', {message: "seance deleted"}))
            .catch(err => res.render('error', {message: err.message || "Some error occurred while deleting seance."}));
    });
};

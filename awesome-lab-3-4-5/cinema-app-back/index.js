const express = require('express');

const app = express();

const config = require('./config');
const mongoose = require('mongoose');

const userRouter = require('./users/routes');
const seancesRouter = require('./seances/routes');
const moviesRouter = require('./movies/routes');
const cinemasRouter = require('./cinemas/routes');

mongoose.Promise = global.Promise;

mongoose.connect(config.db.url, {
    user: config.db.login,
    pass: config.db.password
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.method);
    console.log(req.url);
    console.log(req.body);
    next();
});
app.use('/api/users', userRouter);
app.use('/api/seances', seancesRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/cinemas', cinemasRouter);

app.listen(3030, () => console.log("Listening on port " + 3030 + " "));

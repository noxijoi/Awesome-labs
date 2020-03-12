const express = require('express');

const app = express();

const config = require('./config');
const mongoose = require('mongoose');

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

app.use((req, res, next)=>{
    console.log(req.method);
    console.log(req.url);
    console.log(req.body);
    next();
});

require('./seances/routes')(app);
require('./users/routes')(app);
require('./movies/routes')(app);
require('./cinemas/routes')(app);

app.listen(3000, () => console.log("Listening on port " + 3000 + " "));

const express = require('express');
const bodyParser = require('body-parser');

const mustacheExpress = require('mustache-express');
const userService = require('./app/users/userService');

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

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


app.get('/', function (req, res) {
    res.render('homepage');
});

require('./app/routes')(app);

app.listen(3000, () => console.log("Listening on port " + 3000 + " "));

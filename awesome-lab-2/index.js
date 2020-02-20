const express = require('express');
const bodyParser = require('body-parser');

const mustacheExpress = require('mustache-express');

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

app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next)=>{
   console.log(req.method);
   console.log(req.url);
   console.log(req.body);
   next();
});


require('./app/routes')(app);

app.listen(3000, () => console.log("Listening on port " + 3000 + " "));

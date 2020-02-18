const path = require('path');
const express = require('express');
const layout = require('express-layout');
const mustache = require('mustache-express');
const app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/',function(req, res){
	res.render('homepage.mustache');
});

app.listen(3000, ()=>console.log("Listening on port " + 3000 + " "));
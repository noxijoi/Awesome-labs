const path = require('path');
const express = require('express');
const layout = require('express-layout');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const userService = require('./app/users/userService')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

const client = new MongoClient(config.db.url);
client.connect()
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/',function(req, res){
	res.render('homepage');
});

app.get('/users',(req, res)=>{
	let users =  userService.getAllUsers();
	res.render('users', {users:users});
});

app.listen(3000, ()=>console.log("Listening on port " + 3000 + " "));

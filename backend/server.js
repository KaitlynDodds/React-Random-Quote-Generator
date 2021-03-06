'use strict';

const express 		= require('express'),
	  mongoose		= require('mongoose'),
	  bodyParser 	= require('body-parser');

const DEFAULT_PORT	= 3000;

var app = express();

// routes
const quoteRoutes 	= require('./routes/quotes');


// APP CONFIG ////////////////////

mongoose.connect('mongodb://127.0.0.1/quotes_generator');

app.set("port", process.env.PORT || DEFAULT_PORT);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// APP MIDDLEWARE ///////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// APP ROUTES ///////////////////

app.get('/', (req, res) => {
	res.json({message: "Connected"});
});

app.use('/quotes', quoteRoutes);


// SERVE APP ////////////////////
app.listen(app.get('port'), () => { console.log(`API listening on port ${app.get('port')}`) });
var express = require('express');
var app = express();



app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('data'));

app.listen(2605, function(){
	console.log('Gaffe, j\'ecoute tout');
});

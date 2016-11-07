var express = require('express');
var app = express();



app.listen(2605, function(){
	console.log('Gaffe, j\'ecoute tout');
});

// app.use('/static', express.static('index.html'));
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/newCustomer', function(req, res){
	var customerItem = req.body;
	fs.readFile(__dirname + '/../public/crm.json', 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}
		var crm = JSON.parse(data);
		crm.customers.push(customerItem);
		crm = JSON.stringify(crm);
		fs.writeFile(__dirname + '/../public/crm.json', crm, function(err){
			if(err){
				return console.log(err);
			}
			res.send('Bien joué');
			return console.log('Saved !');
		});
	});
});


app.post('/editCustomer', function(req, res){
	var customerItem = req.body;
	fs.readFile(__dirname + '/../public/crm.json', 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}
		var crm = JSON.parse(data);
		crm.customers[customerItem.id - 1] = customerItem;
		crm = JSON.stringify(crm);
		console.log(crm);

		fs.writeFile(__dirname + '/..public/crm.json', crm, function(err){
			if(err){
				return console.log(err);
			}
			return console.log('Changes Saved');
		});
	});
	res.send('Everything is ok');
});



app.listen(2605, function(){
	console.log('Gaffe, j\'ecoute tout');
});
app.use(express.static(__dirname + '/../public'));

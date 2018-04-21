var express = require('express')
var app = express()
var fs = require('fs');
var http = require('http');
var url = require('url');

app.set('port', (process.env.PORT || 5000))

app.get('/v1/library', function(request, response) {
	fs.readFile( __dirname + "/library.json", 'utf8', function (err, data) {
		console.log("Request for the full library.")
		response.end(data);
	});
})

app.get('/v1/collections', function(request, response) {
	fs.readFile( __dirname + "/collections.json", 'utf8', function (err, data) {
		console.log("Request for the list of collections.")
		response.end(data);
	});
})

app.get('/v1/song', function(request, response) {
	var songId = url.parse(request.url, true).query.id
	fs.readFile( __dirname + "/songs/" + songId + ".txt", 'utf8', function (err, data) {
		console.log("Request for song " + songId + ".")
		response.end('{ "id": "'+songId+'", "song": "'+data+'" }');
	});
})

app.put('/v1/songOpened', function(request, response) {
	var songId = url.parse(request.url, true).query.id
	console.log("Request to increase popularity of song " + songId + ".")
	response.end();
})

app.put('/v1/collectionOpened', function(request, response) {
	var collectionId = url.parse(request.url, true).query.id
	console.log("Request to increase popularity of collection " + collectionId + ".")
	response.end();
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
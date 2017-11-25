var express = require('express')
var app = express()
var fs = require('fs');
var http = require('http');
var url = require('url');

app.set('port', (process.env.PORT || 5000))

app.get('/library', function(request, response) {
	fs.readFile( __dirname + "/public/songs.json", 'utf8', function (err, data) {
		console.log("Request for the full library.")
		response.end(data);
	});
})

app.get('/song', function(request, response) {
	var songId = url.parse(request.url, true).query.id
	fs.readFile( __dirname + "/public/" + songId + ".cmpf", 'utf8', function (err, data) {
		console.log("Request for song "+ songId)
		response.end('{ "id": "'+songId+'", "song": "'+data+'" }');
	});
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
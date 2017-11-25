var express = require('express')
var app = express()
var fs = require('fs');

app.set('port', (process.env.PORT || 5000))

app.get('/library', function(request, response) {
	fs.readFile( __dirname + "/public/songs.json", 'utf8', function (err, data) {
		console.log("Opening "+__dirname)
		response.end(data);
	});
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
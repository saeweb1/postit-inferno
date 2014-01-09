
var express = require('express'),
	mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	ObjectId = mongodb.ObjectID,
	app = express();


app.use(express.bodyParser());


// eine Liste aller Postits zurückgeben
app.get('/postits', function (request, response) {
	MongoClient.connect('mongodb://localhost:27017/postit-inferno', {}, function (err, db) {
		var collection = db.collection('postits');

		collection.find().toArray(function (err, data) {
			response.json(data);
		});
	});
});


// ein Postit zurückgeben
app.get('/postits/:id', function (request, response) {
	MongoClient.connect('mongodb://localhost:27017/postit-inferno', {}, function (err, db) {
		var collection = db.collection('postits');

		collection.findOne({_id : new ObjectId(request.params.id)}, function (err, data) {
			response.json(data);
		});
	});
});


// einen neuen postit abspeichern
app.post('/postits', function (request, response) {
	MongoClient.connect('mongodb://localhost:27017/postit-inferno', {}, function (err, db) {
		var collection = db.collection('postits');

		console.log(err);

		collection.insert(request.body, function (err, data) {
			response.json(data);
		});
	});
});


// einen Postit aktualisieren
app.put('/postits/:id', function (request, response) {
	MongoClient.connect('mongodb://localhost:27017/postit-inferno', {}, function (err, db) {
		var collection = db.collection('postits');

		collection.update({_id : new ObjectId(request.params.id)}, request.body, function (err, data) {
			response.json(data);
		});
	});
});

// alle postits löschen
app.delete('/postits', function (request, response) {
	MongoClient.connect('mongodb://localhost:27017/postit-inferno', {}, function (err, db) {
		var collection = db.collection('postits');

		collection.remove({}, function (err, data) {
			response.json(data);
		});
	});
});

// einen Postit löschen
app.delete('/postits/:id', function (request, response) {
	MongoClient.connect('mongodb://localhost:27017/postit-inferno', {}, function (err, db) {
		var collection = db.collection('postits');

		collection.remove({_id : new ObjectId(request.params.id)}, function (err, data) {
			response.json(data);
		});
	});
});




app.listen(3000);

console.log('express server listening on port 3000');
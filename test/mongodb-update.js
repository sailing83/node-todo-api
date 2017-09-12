const {MongoClient, ObjectID} = require('mongodb');	//Destructing 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
	//Connect to MongoDB Server
	if(error) {
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("59b7cf8e9b0be77b7de56567")
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	}, (error) => {
		console.log(error);
	});

	db.close();
} );
const {MongoClient, ObjectID} = require('mongodb');	//Destructing 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
	//Connect to MongoDB Server
	if(error) {
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');

	//deleteMany
	db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
		console.log('Deleted successfully.');
		console.log(result);
	}, (error) => {
		console.log('Failed to delete', error);
	});

	//deleteOne
	db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
		console.log('Deleted successfully.');
		console.log(result);
	}, (error) => {
		console.log('Failed to delete', error);
	});

	//findOneAndDelete
	db.collection('Todos').findOneAndDelete({
		completed: true
	}).then((result) => {
		console.log('Deleted successfully.');
		console.log(result);
	}, (error) => {
		console.log('Failed to delete', error);
	});

	db.close();
} );
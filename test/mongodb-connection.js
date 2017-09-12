//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');	//Destructing 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
	//Connect to MongoDB Server
	if(error) {
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (error, result) => {
	// 	if(error) {
	// 		return console.log('Unable to insert Todos', error);
	// 	}
	// 	console.log(JSON.stringify(result.ops));
	// });

	// db.collection('Users').insertOne({
	// 	name: 'Fan',
	// 	age: 30,
	// 	location: 'Australia'
	// }, (error, result) => {
	// 	if(error) {
	// 		return console.log('Unable to insert Users', error);
	// 	}
	// 	console.log(JSON.stringify(result.ops));
	// });

	db.close();
} );
const {MongoClient, ObjectID} = require('mongodb');	//Destructing 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
	//Connect to MongoDB Server
	if(error) {
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');

	db.collection('Todos').find().toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Unable to fetch Todos', error);
	});	//Fetch data from MongoDB, collection: Todos

	db.collection('Todos').find({completed: false, text: 'Something to do'}).toArray().then((docs) => {
		console.log('Todos, not completed');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Unable to fetch Todos', error);
	});	//Fetch data based on condition

	db.collection('Todos').find({
		_id: new ObjectID('59b7d4afcd3c56672aa58297')
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Unable to fetch Todos', error);
	});	//Fetch data based on id

	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (error) => {
		console.log('Unable to fetch Todos', error);
	})

	db.close();
} );
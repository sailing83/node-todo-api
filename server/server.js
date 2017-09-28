var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		task: req.body.task
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (error) => {
		res.status(400).send(error);
	})
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({
			todos
		});
	}, (error) => {
		res.status(400).send(error);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	//Validate id using isValid
	if(!ObjectID.isValid(id)) {
		return res.status(404).send('Id is invalid.');
	}

	Todo.findById(id).then((todo) => {
		if(!todo) {	//if todo isn't found
			return res.status(404).send('Todo not found');
		}
		res.send({todo});
	}).catch((error) => {
		res.status(400).send();	//If query fails
	})
});

app.listen(3000, () => {
	console.log('App started on port 3000.');
});

module.exports = {
	app
};

// var user = new User({
// 	email: 'abcde'
// });

// otherTodo.save().then((doc) => {
// 	console.log('Saved todo', JSON.stringify(doc, undefined, 2));
// }, (error) => {
// 	console.log('Unable to save todo', error);
// });

// user.save().then((doc) => {
// 	console.log('Saved user', JSON.stringify(doc, undefined, 2));
// }, (error) => {
// 	console.log('Unable to save user', error);
// });
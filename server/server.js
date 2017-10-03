require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {	//Add a todo task
	var todo = new Todo({
		task: req.body.task
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (error) => {
		res.status(400).send(error);
	});
});

app.post('/users', (req, res) => {	//Add a user
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	user.save().then((user) => {
		//res.send(user);
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((error) => {
		res.status(400).send(error);
	});
})

app.get('/todos', (req, res) => {	//Get all todo tasks
	Todo.find().then((todos) => {
		res.send({
			todos
		});
	}, (error) => {
		res.status(400).send(error);
	});
});

app.get('/todos/:id', (req, res) => {	//Get a todo task by id
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

app.delete('/todos/:id', (req, res) => {	//Delete a todo task by id
	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send('Id is invalid.');
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return res.status(404).send('Todo not found');
		}
		res.send({todo});
	}).catch((error) => {
		res.status(400).send();
	})
});

app.patch('/todos/:id', (req, res) => {
	var id =req.params.id;
	var body = _.pick(req.body, ['task', 'completed']);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send('Id is invalid.');
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then((todo) => {
			if(!todo) {
				return res.status(404).send();
			}
			res.send({todo});
		}).catch((err) => {
			res.status(400).send();
		});
});

app.listen(port, () => {
	console.log(`App started on port ${port}.`);
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
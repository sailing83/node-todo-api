var express = require('express');
var bodyParser = require('body-parser');

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


app.listen(3000, () => {
	console.log('App started on port 3000.');
});

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
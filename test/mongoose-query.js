const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '59cce2da8c45ca53d09fa8fa';

if(!ObjectID.isValid(id)) {
	console.log('Id provided is invalid.');
}

Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos: ', todos);
});

Todo.findOne({
	_id: id
}).then((oneTodo) => {
	console.log('One Todo: ', oneTodo);
});

Todo.findById(id).then((todo) => {
	if(!todo) {
		return console.log('Unable to find todo.');
	}
	console.log('One todo by Id: ', todo);
}).catch((e) => {
	console.log(e);
});
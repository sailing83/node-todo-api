const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'fan@example.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'salt_value').toString()
	}]
}, {
	_id: userTwoId,
	email: 'jen@example.com',
	password: 'userTwoPass'	//no auth token
}];

const todos = [{
	_id: new ObjectID(),
	task: "First test todo11"
}, {
	_id: new ObjectID(),
	task: "Second test todo22",
	completed: true,
	completedAt: 1000
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	});
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();
		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, users, populateTodos, populateUsers};
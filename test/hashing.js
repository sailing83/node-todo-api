const {SHA256, SHA1} = require('crypto-js');
const jwt = require('jsonwebtoken');

//Use SHA256 and SHA1 provided by crypto-js library to encrypt data
var message = 'I am user number 1';
var hash = SHA256(message).toString();
var sha1 = SHA1(message).toString();

console.log(hash);
console.log(sha1);

//The basic idea behind verifying data
var data = {
	id: 5
};
var token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

/*
//Change the data without token
token.data.id = 666;
token.hash = SHA256(JSON.stringify(token.data)).toString();
*/

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
	console.log('Data was not changed.');
} else {
	console.log('Data was changed. Don\'t trust.');
}

//Use JWT(Json Web Token) to verify data
var jdata = {
	id: 3,
	name: 'fan'
};

var token = jwt.sign(jdata, 'somesecret');
console.log(token);
var decoded = jwt.verify(token, 'somesecret');
console.log(decoded);
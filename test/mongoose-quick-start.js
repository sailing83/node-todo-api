var mongoose = require('mongoose');

//Open a connection to the test database on our locally running instance of MongoDB.
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	//Connected!
	
	//With Mongoose, everything is derived from a Schema
	//Create a schema:
	var kittySchema = mongoose.Schema({
		name: String
	});

	//Compiling our schema into a Model
	// var Kitten = mongoose.model('Kitten', kittySchema);

	// var silence = new Kitten({name: 'Silence'});
	// console.log(silence.name);

	//Let's take a look at how to add "speak" functionality to our documents
	kittySchema.methods.speak = function() {
		var greeting = this.name 
			? "Meow name is " + this.name
			: "I don't have a name";
		console.log(greeting);
	}
	var Kitten = mongoose.model('Kitten', kittySchema);

	var fluffy = new Kitten({name: 'fluffy'});
	fluffy.speak();

	//Save to mongodb
	fluffy.save(function(error, fluffy) {
		if(error) return console.error(error);
		fluffy.speak();
	});

	Kitten.find(function(error, kittens) {
		if(error) return console.error(error);
		console.log(kittens);
	})
});
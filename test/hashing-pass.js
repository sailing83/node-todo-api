const bcrypt = require('bcryptjs');

var password = 'abc123!';
var hashedPassword = ''

bcrypt.genSalt(10, (error, salt) => {
	bcrypt.hash(password, salt, (error, hash) => {
		hashedPassword = hash;
		console.log(hashedPassword);
	});
});

hashedPassword = '$2a$10$f5l/gbtVw2MgJ0/u5lqPouve3Tv2i3b1yPB1kLk.3sUMaf.VIhyou';

bcrypt.compare(password, hashedPassword, (error, result) => {
	console.log(result);
});

const mongoose = require('mongoose')
if (process.env.NODE_ENV == 'production') {
	var connectionURL = process.enc.connectionURL
} 
else 
{
	const misc = require('../misc.js')
	var connectionURL = 'mongodb+srv://' + 
}


mongoose.set('useFindAndModify', false);

mongoose.connect( connectionURL, {
	useNewUrlParser : true,
	useCreateIndex: true
})

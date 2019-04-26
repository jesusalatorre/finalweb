const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://ferdav:conchitasconcrema@cluster0-n1oxt.mongodb.net/finalWeb?retryWrites=true'

mongoose.set('useFindAndModify', false);

mongoose.connect( connectionURL, {
	useNewUrlParser : true,
	useCreateIndex: true
})

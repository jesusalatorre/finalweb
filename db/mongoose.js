const mongoose = require('mongoose')
const misc = require('../misc.js')
const connectionURL = 'mongodb+srv://' + misc.dbData + '@cluster0-n1oxt.mongodb.net/finalWeb?retryWrites=true'

mongoose.set('useFindAndModify', false);

mongoose.connect( connectionURL, {
	useNewUrlParser : true,
	useCreateIndex: true
})

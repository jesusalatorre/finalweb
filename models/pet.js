const mongoose = require('mongoose')
const validator = require('validator')

const petSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	animalType: {
		type: String,
		required: true
	},
	breed: {
		type: String,
		required: true
	},
	specialCare: {
		type: Boolean,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	sterilization: {
		type: Boolean,
		required: true
	},
	adopted: {
		type: Boolean,
		required: true
	},
	data: {
		type: Buffer
	},
	contentType: {
		type: String
	},
	createdBy: {
	    type: mongoose.Schema.Types.ObjectId,
	    required: true,
	    ref: 'User',
 	},
  	adoptedBy: {
  		type: mongoose.Schema.Types.ObjectId,
	    ref: 'User',
  	}
})

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet
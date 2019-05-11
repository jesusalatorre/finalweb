const mongoose = require('mongoose')
const validator = require('validator')

const petSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	animalType: {
		type: String,
		required: true, 
		validate(value) {
			if (value == '-1') {
				throw new Error('Choose an animal type.')
			}
		}
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
		required: true,
		validate(value) {
			if (value < 0) {
				throw new Error('The age of the pet should be greater than 0.')
			}
		}
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
	ownerEmail: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
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
const mongoose = require('mongoose')
const validator = require('validator')

const petSchema = mongoose.Schema({
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
	}
})

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet
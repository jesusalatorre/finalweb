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
	}
/*
Calara cómo jala bien esto
	ownedBy: {
		type: mongoose.Schema.type.

	}
*/
})

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet
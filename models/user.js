const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema( {
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true,
		validate(value) {
			if (value < 18) {
				throw new Error('You should at least be 18 years old to make an account.')
			}
		}
	},
	email: {
		type: String,
		required: true,
		validate(value) {
			if(!validator.isEmail(value)) {
				throw new Error('Invalid email address')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		trim: true
	},
	location: {
		type: String,
		required: true
	}
})

userSchema.pre('save', function(next){
	const user = this
	//Falta hacer el hashing de la password
	next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
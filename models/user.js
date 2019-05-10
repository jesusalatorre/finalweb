const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema( {
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
		unique: true,
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
	},
	tokens: [{
		token: {
			type:String,
			required: true
		}
	}]
},{
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
})


userSchema.virtual('petsForAdoption', {
	ref: 'Pet',
	localField: '_id',
	foreignField: 'createdBy'
})

userSchema.virtual('petsAdopted', {
	ref: 'Pet',
	localField: '_id',
	foreignField: 'adoptedBy'
})

userSchema.methods.toJSON = function() {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

userSchema.statics.findByCredentials = function(email, password) {
	return new Promise( function(resolve, reject) {
		User.findOne({ email }).then(function(user) {
			if( !user ) {
				return reject('User does not exist')
			}
			bcrypt.compare(password, user.password).then(function (match) {
				if (match) {
					return resolve(user)
				} else {
					return reject('User or password does not match!')
				}
			}).catch( function(error) {
				return reject('User or password does not match!')
			})
		})
	})
}

userSchema.methods.generateToken = function() {
	const user = this
	if(process.env.NODE_ENV === 'production') {
	  var SECRET = process.env.SECRET
	}
	else
	{
	  const config = require('../misc.js')
	  var SECRET = config.secret 
	}
	const token = jwt.sign({ _id: user._id.toString() }, SECRET, { expiresIn: '7 days'})
	user.tokens = user.tokens.concat({ token })
	return new Promise(function( resolve, reject) {
		user.save().then(function(user){
	    	return resolve(token)
	    }).catch(function(error) {
	    	return reject(error)
	    })
	})
}

userSchema.pre('save', function(next){
	const user = this
	if( user.isModified('password')) {
		bcrypt.hash(user.password, 8).then(function(hash) {
			user.password = hash
			next()
		}).catch(function(error) {
			return next(error)
		})
	} else {
		next()
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
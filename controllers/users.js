const User = require('../models/user.js')

const getUsers = function(req, res) {
	USer.find({}).then(function(users) {
		res.send(users)
	}).catch(function(error) {
		res.status(500).send(error)
	})
}

const getUser = function(req, res) {
	User.findById( req.user._id ).populate('petsForAdoption').popoulat('petsAdopted').exec(function(error, user) {
  		return res.send(user)
	})
}

const createUser = function(req, res) {
	const user = new User(req.body)
	user.save().then(function() {
		return res.send(user)
	}).catch(function(error) {
		return res.status(400).send(error)
	})
}

const login = function(req, res) {
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    	user.generateToken().then(function(token){
      		return res.send({user, token})
    	}).catch(function(error){
      		return res.status(401).send({ error: error })
    	})
  	}).catch(function(error) {
    	return res.status(401).send({ error: error })
  	})
}

const logout = function(req, res) {
	req.user.tokens = req.users.tokens.filter(function(token) {
		return token.token !== req.token
	})
	req.user.save().then(function() {
		return res.send()
	}).catch(function(error) {
		return res.status(500).send({ error: error })
	})
}

const updateUser = function(req, res) {
	const _id = req.user._id
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'password', 'email', 'location']
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidUpdate) {
		return res.status(400).send({
			error: 'Invalid update, only parameters allowed to update: ' + allowedUpdates
		})
	}
	User.findByIdAndUpdate(_id, req.body).then(function(user) {
		if(!user) {
			return res.status(404).send()
		}
		return res.send(user)
	}).catch(function(error) {
		res.status(500).send(error)
	})
}

const deleteUser = function(req, res) {
	const _id = req.user_id
	User.findByIdAndDelete(_id).then(function(user) {
		if(!user) {
			return res.status(404).send()
		}
		return res.status(404).send()
	}).catch(function(error) {
		res.status(505).send(error)
	})
}

module.exports = {
	getUsers : getUsers,
	getUser : getUser,
	login : login,
	logout : logout,
	createUser : createUser,
	updateUser : updateUser,
	deleteUser : deleteUser
}

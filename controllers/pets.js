const Pet = require('../models/pet.js')

const getPets = function(req, res) {
	Pet.find({}).then(function(pets) {
		res.send(pets)
	}).catch(function(error) {
		res.send(500).send(error)
	})
}

const getPet = function(req, res) {
	const _id = req.params._id
	console.log("prueba" + _id)
	Pet.findOne({_id}).then(function(pet) {
		if(!pet){
			return res.status(404).send({error: `Pet with id ${_id} not found.`})
		}
		return res.sned(pet)
	}).catch(function(error) {
		return res.status(500).send({ error: error })
	})
}

const createPet = function(req, res) {
	const pet = new Pet({
		name: req.body.name,
		animalType: req.body.animalType,
		breed: req.body.breed,
		specialCare: req.body.specialCare,
		age: req.body.age,
		sterilization: req.body.sterilization,
		adopted: false,
		createdBy: req.user._id
	})
	pet.save().then(function() {
		return res.send(pet)
	}).catch(function(error) {
		return res.status(400).send({ error : error })
	})
}

const updatePet = function(req, res) {
	const _id = req.params.idconst
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name','animalType','breed', 'age', 'adopted', 'adoptedBy']
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

	if( !isValidUpdate ) {
		return res.status(400).send({
			error: 'Invalid update, only allowed to update: ' +  allowedUpdates
		})
	}
	Pet.findOneAndUpdate({_id}, req.body).then(function(pet) {
		if(!pet) {
			return res.status(404).send({ error: `Pet with id ${_id} not found.` })
		}
		return res.send(pet)
	}).catch(function(error) {
		res.status(500).send({ error: error })
	})
}

const deletePet = function(req, res) {
	const _id = req.params.idconst
	Pet.findOneAndDelete({_id, createdBy: req.user._id}).then(function(pet){
		if(!pet) {
			return res.status(404).send({ error: `Pet with id ${_id} not found.`})
		}
		return res.send(todo)
	}).catch(function(error) {
		res.status(505).send({error:error})
	})
}

module.exports = {
	getPets : getPets,
	getPet : getPet,
	createPet : createPet,
	updatePet : updatePet,
	deletePet : deletePet
}


const fs = require('fs')
const Pet = require('../models/pet.js')

const getPets = function(req, res) {
	Pet.find({}).then(function(pets) {
		res.send(pets)
	}).catch(function(error) {
		res.send(500).send(error)
	})
}

const getPet = function(req, res) {
	const _id = req.params.id
	console.log("prueba" + _id)
	Pet.findOne({_id}).then(function(pet) {
		if(!pet){
			return res.status(404).send({error: `Pet with id ${_id} not found.`})
		}
		return res.send(pet)
	}).catch(function(error) {
		return res.status(500).send({ error: error })
	})
}

const getPetPic = function(req, res) {
	const _id = req.params.id
	console.log("Busco la foto" + _id)
	Pet.findOne({_id}).then(function(pet) {
		if(!pet){
			return res.status(404).send({error: `Pet with id ${_id} not found.`})
		}
		return res.contentType(pet.contentType).send(pet.data)
	}).catch(function(error) {
		return res.status(500).send({ error: error })
	})
}

const createPet = function(req, res) {
	var img64Data = req.body.image_path
	let buff = new Buffer(img64Data, 'base64')
	console.log("Ando en createPet")
	
	fs.writeFileSync('./petpics/out.jpg', buff);
	const pet = new Pet({
		name: req.body.name,
		animalType: req.body.animalType,
		breed: req.body.breed,
		specialCare: req.body.specialCare,
		age: req.body.age,
		sterilization: req.body.sterilization,
		adopted: false,
		createdBy: req.user._id,
		data: fs.readFileSync('./petpics/out.jpg'), //Hay que cambiar esto para que agarre el path especificado por el usuario, o añadirle fotos nosotros o algo así
		contentType: 'image/png',
		ownerEmail: req.user.email,
		location: req.user.location
	})
	console.log(pet)
	pet.save().then(function() {
		return res.send(pet)
	}).catch(function(error) {
		return res.status(400).send({ error : error })
	})
}

const updatePet = function(req, res) {
	const _id = req.params.id
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name','animalType','breed', 'age', 'adopted']
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

const adoptPet = function(req, res) {
	const _id = req.params.id
	const adoptedBy = req.user._id
	Pet.findOneAndUpdate({_id},{adoptedBy, adopted: true}).then(function(pet) {
		if(!pet) {
			return res.status(404).send({error: `Pet with id ${_id} not found.`})
		}
		if(pet.adopted == false){
			return res.send(pet)
		}
		else {
			return res.status(500).send({error: `Pet with id ${_id} already adopted. Keep looking por another pet!!!`})
		}
	}).catch(function(error) {
		res.status(505).send({error:error})
	})
}

const deletePet = function(req, res) {
	const _id = req.params.id
	Pet.findOneAndDelete({_id, createdBy: req.user._id}).then(function(pet){
		if(!pet) {
			return res.status(404).send({ error: `Pet with id ${_id} not found.`})
		}
		return res.send(pet)
	}).catch(function(error) {
		res.status(505).send({error:error})
	})
}

module.exports = {
	getPets : getPets,
	getPet : getPet,
	getPetPic : getPetPic,
	createPet : createPet,
	adoptPet : adoptPet,
	updatePet : updatePet,
	deletePet : deletePet
}

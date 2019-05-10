const cors = require('cors')
const express = require('express')

const router = express.Router()

router.all('*', cors())

const users = require('./controllers/users.js')
const pets = require('./controllers/pets.js')
const auth = require('./middleware/auth')


router.get('/users', auth, users.getUser)		//Regresa toda la info del usuario
router.post('/users/login', users.login)		//Login del usuario
router.post('/users/logout', auth, users.logout)//Logout del usuario en curso
router.post('/users', users.createUser)  		//Sign up de un nuevo usuario
router.patch('/users', auth, users.updateUser)	//Actualiza la info del current user
router.delete('/users', auth, users.deleteUser)	//Elimina el documento del current user

router.get('/pets/:id/pic', pets.getPetPic)			//Regresa la foto que le fue asignada
router.get('/pets/:id', auth, pets.getPet)		//Regresa la info de una pet en específico
router.get('/pets', auth, pets.getPets)			//Regresa todas las pets disponibles
router.post('/pets', auth, pets.createPet)		//Crea un nuevo documento de pet
router.post('/pets/:id/adopt', auth, pets.adoptPet)//Asigna al usuario la mascota que quiera adoptar
router.patch('/pets/:id', auth, pets.updatePet)	//Modifica los datos del documento pet que matche el id
router.delete('/pets/:id', auth, pets.deletePet)//Elimina el documento del pet especificado

router.get('*', function(req, res) {
	res.send({
		error: 'This route does not exist, try /users or /pets'
	})
})

module.exports = router
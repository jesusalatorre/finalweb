const cors = require('cors')
const express = require('express')

const router = express.Router()

router.all('*', cors())

const users = require('./controllers/users.js')
const pets = require('./controllers/pets.js')
const auth = require('./middleware/auth')



router.get('/users', auth, users.getUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.get('/pets/:id', auth, pets.getPet)
router.get('/pets', auth, pets.getPets)
router.post('/pets', auth, pets.createPet)
router.patch('/pets/:id', auth, pets.updatePet)
router.delete('/pets/:id', auth, pets.deletePet)

router.get('*', function(req, res) {
	res.send({
		error: 'This route does not exist, try /users or /pets'
	})
})

module.exports = router
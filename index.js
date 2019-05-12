const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose.js')

const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(router)

app.listen(port, function() {
	console.log('Server up and running in port ' + port)
})

const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose.js')

const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(router)
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.listen(port, function() {
	console.log('Server up and running in port ' + port)
})

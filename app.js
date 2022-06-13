
//get express and use in this machine
//require package
const express = require('express')

//require body parser for forms 
const bodyParser= require('body-parser')

//get mongoose
const mongoose = require('mongoose')

//get cors
const cors= require('cors')

const path = require("path");

//start express framework
const app = express()

//allows access control of the api
app.use(
cors({
    origin: "*",
  })
);

//body-parser before your CRUD handlers!
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

//use express framework
app.use(express.json())

//make uploads folder publicly accessible
app.use(express.static(path.join(__dirname,"public")))

//connect mongoose to database
//avoid warning : use parser statement
mongoose.connect('mongodb://marwakhalid:iamnotdumb@marwa-shard-00-00.x9zjp.mongodb.net:27017,marwa-shard-00-01.x9zjp.mongodb.net:27017,marwa-shard-00-02.x9zjp.mongodb.net:27017/reactApp?ssl=true&replicaSet=atlas-6szo5v-shard-0&authSource=admin&retryWrites=true&w=majority'
, {useNewUrlParser:true})

//connection handler
const db = mongoose.connection

//let me know that connection is established :(
db.once('open', () => {
    console.log('Mongoose connected to db...'); 
})

//import module.. js file of products
const movieRouter = require('./routes/movies')

//add middleware.. for all requests,send to router
app.use('/movies', movieRouter)

//listen to server after starting

const PORT = process.env.PORT || 3500;

//app.get('/movies')

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});

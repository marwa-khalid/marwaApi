//create routes for fuctions to accept requests
//project has many entities
//different requests have different url , different url have different handlers

const express = require('express');
const multer = require('multer')

//need router from express
//it will specify all urls
const router = express.Router();

//get handle of schema, get access of js file
const Movie = require('../structure/detail');

//storage
const Storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null,'./public/uploads')
    },
    filename: (req, file, cb)=>{
        cb(null,file.fieldname+ "_" + Date.now() + "_" + file.originalname)
    },
})
  
const upload = multer({
    storage: Storage
}).single('image')

//async will not lock process
//get all records
router.get('/', async(req,res)=>{
    //fetch all movies and send
    try{
        //await for async return
        const movies = await Movie.find()
        //send in json format.. .send will send in text form
        res.json(movies)
        console.log("Get Request Worked")
    }
    catch(err){
        res.send('Error: ' + err)
    }
})

//get single record
router.get('/:id', async(req,res)=>{
    //fetch one movies and send
    try{
        //await for async return
        const movie = await Movie.findById(req.params.id)
        //send in json format.. .send will send in text form
        res.json(movie)
        console.log("Get Request by ID Worked")
    }
    catch(err){
        res.send('Error: ' + err)
        console.log("didnt work")
    }
})

//insert data in database
router.post('/',upload, async(req,res) =>{
    //sending data from client side
    
    const movie = new Movie({
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
        image: req.file.filename
    })

    //save data in database
    movie.save(function(err) {
        if(err) {
            res.send(err)
            console.log("Can't add new movie: " + err);
        } 
        else {
            //display in json format
            res.json(movie)
            console.log("New movie added")
        }
    })
})

//update/patch a record
router.patch('/:id',upload,  async(req,res) =>{
    const movie  = await Movie.findById(req.params.id)

    movie.name = req.body.name
    movie.year = req.body.year
    movie.description = req.body.description
    movie.image = req.body.image
    
    movie.save((err) =>{
        if(err) {
            res.send(err)
            console.log("Can't update data: " + err)
        } 
        else {
            //display in json format
            res.json(movie)
            console.log("Data Updated")
        }
    })   
})

//delete a record
router.delete('/:id', async(req,res) =>{
    const movie  = await Movie.findById(req.params.id)
    
    movie.remove(err =>{
        if(err) {
            res.send(err)
            console.log("Can't delete record: " + err)
        } 
        else {
            //display in json format
            res.json("Record Deleted")
            console.log("Record Deleted")
        }
    })  
})
//export module router
//it will be accesible in app.js
module.exports = router
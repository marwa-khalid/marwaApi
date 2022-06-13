//handle only one record
//schema for database

const mongoose = require('mongoose')

const movieDetail = new mongoose.Schema({
    name: {
        //properties
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required:false
    }
})

//export schema
module.exports = mongoose.model('Movie', movieDetail)
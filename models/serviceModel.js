const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    serviceImg:{
        type:String,
        required:true
    }
})

const services = mongoose.model("services",serviceSchema)

module.exports = services
const mongoose = require('mongoose')

const bokkingSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true,
    },
    servicename:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
    },
    userId:{
        type:String,
        required:true
    }
})

const bookings = mongoose.model("bookings",bokkingSchema)

module.exports = bookings

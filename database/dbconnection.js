const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(req=>{
    console.log("MongoDB Atlas connected successfully with csServer");
}).catch(err=>{
    console.log("mongoDB Atlas connection failed!!!");
    console.log(err);
})
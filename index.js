require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/route')
require('./database/dbconnection')

const csServer = express()

csServer.use(cors())
csServer.use(express.json())
csServer.use(router)
csServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

csServer.listen(PORT,()=>{
    console.log(`csServer Started at port ${PORT} and waiting for client request!!!`);
})

csServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>csServer Started at port and waiting for client request!!!</h1>`)
})

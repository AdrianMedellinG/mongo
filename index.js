//Requerir dotenv para poder traer datos seguros (bases de datos)
//console.log(process.env.URL)
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
} = process.env

const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
//Conectando a base de datos
mongoose.connect(URL)
.then(()=>{
    console.log("Conectado a la base de datos de mongo")
    //Levantando el server
    app.listen(8080, () =>{
        console.log("Server Listening...")
    })
})
.catch((error)=>{
    console.log("Error",error)
})
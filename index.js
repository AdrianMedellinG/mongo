//Requerir dotenv para poder traer datos seguros (bases de datos)
//console.log(process.env.URL)
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const { request } = require('express')
const app = express()
// Middlewares
app.use(express.json()) // parseando a json

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
} = process.env

//Schemas de mongo
const koderSchema = new mongoose.Schema({
    nombre: {
        type:String,
        minlenght: 3,
        maxlenght: 20,
        required:true
    },
    modulo: {
        type:String,
    },
    generacion: {
        type:String,
        required:true
    },
    edad: {
        type:Number,
        minlenght: 18,
        maxlenght: 150,
    },
    sexo: {
        type:String,
        enum: ["F","M"]
    }
})

//Modelos -> Collection
const Koder = mongoose.model("koders", koderSchema)

//Endpoints
app.post("/koders", async (request,response)=>{
    const { body } = request

try {
    const koder = await Koder.create(body)
    console.log("koder",koder)
        response.status(201)
        response.json({
            success: true,
            data: {koder}
        })
} catch(error) {
    console.log("error",error)
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
}  
})



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
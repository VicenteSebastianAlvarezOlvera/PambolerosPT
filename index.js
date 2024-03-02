const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Configura body-parser para analizar JSON
const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const server = http.createServer(app);

//Modelos
const Canchas = require('./models/Canchas');
const Equipos = require('./models/Equipos');
const Partidos = require('./models/Partidos');
const Roles = require('./models/Roles');
const Usuarios = require('./models/Usuarios');

//Conectar a la base de datos en MongoDB/Atlas
async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
    }
}
connect();

app.listen(process.env.PORT, () => {
    console.log('La aplicación está corriendo en el puerto 2000.');
});

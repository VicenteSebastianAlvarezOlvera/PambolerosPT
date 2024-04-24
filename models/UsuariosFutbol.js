const mongoose = require('mongoose');

const UsuariosFutbolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipos', // Cambia 'Config' al nombre correcto de tu modelo Config
    },
    rol:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles', // Cambia 'Config' al nombre correcto de tu modelo Config
      },
    numero: {
        type: String,
    },
    posicion:{
        type: String,
    }
});

const UsuariosFutbol = mongoose.model('UsuariosFutbol', UsuariosFutbolSchema)

module.exports = UsuariosFutbol;
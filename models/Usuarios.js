const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    /*id: {
        type: String,
        required: true
    },*/
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
});

const Usuarios = mongoose.model('Usuarios', UsuariosSchema)

module.exports = Usuarios;
const mongoose = require('mongoose');

const EquiposSchema = new mongoose.Schema({
    /*id: {
        type: String,
        required: true
    },*/
    nombre: {
        type: String,
        required: true
    },
    Capitan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuariosFutbol', // Cambia 'Config' al nombre correcto de tu modelo Config
    }
});

const Equipos = mongoose.model('Equipos', EquiposSchema);

module.exports = Equipos;
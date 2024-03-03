const mongoose = require('mongoose');

const canchasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    dueno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuariosFutbol', // Cambia 'Config' al nombre correcto de tu modelo Config
    }
});

const Canchas = mongoose.model('Canchas', canchasSchema);

module.exports = Canchas;
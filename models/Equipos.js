const mongoose = require('mongoose');

const EquiposSchema = new mongoose.Schema({
    /*id: {
        type: String,
        required: true
    },*/
    nombre: {
        type: String,
        required: true
    }
});

const Equipos = mongoose.model('Equipos', EquiposSchema);

module.exports = Equipos;
const mongoose = require('mongoose');

const PartidosSchema = new mongoose.Schema({
    /*id: {
        type: String,
        required: true
    },*/
    cancha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canchas',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    Equipo1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipos',
        required: true
    },
    Equipo2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipos',
        required: true
    },
    Ganador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipos',
        required: true
    }
});

const Partidos = mongoose.model('Partidos', PartidosSchema);

module.exports = Partidos;
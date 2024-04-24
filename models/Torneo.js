const mongoose = require('mongoose');

const TorneosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        ref: 'Canchas',
        required: true
    },
    partidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partidos',
        required: true
    }],
    Fecha_inicio: {
        type: Date,
        required: true
    },
    Fecha_Fin: {
        type: Date,
    },
    Equipos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipos',
        required: true
    }]
});

const Torneos = mongoose.model('Torneos', TorneosSchema);

module.exports = Torneos;
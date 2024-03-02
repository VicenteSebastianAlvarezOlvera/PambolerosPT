const mongoose = require('mongoose');

const canchasSchema = new mongoose.Schema({
    /*id: {
        type: String,
        required: true
    },*/
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
});

const Canchas = mongoose.model('Canchas', canchasSchema);

module.exports = Canchas;
const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
    /*id: {
        type: String,
        required: true
    },*/
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

const Roles = mongoose.model('Roles', RolesSchema);
module.exports = Roles;
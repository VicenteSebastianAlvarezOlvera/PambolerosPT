const mongoose = require('mongoose');

// Define el esquema de Mongoose para el archivo config.json
const configCanchasSchema = new mongoose.Schema({

  // Define los campos que deseas en tu tabla
  Cancha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Canchas',
  },
  "6-8": Boolean,
  "8-10": Boolean,
  "10-12": Boolean,
  "12-14": Boolean,
  "14-16": Boolean,
  "16-18": Boolean
});

// Define el modelo de Mongoose para el archivo config.json
const ConfigCanchas = mongoose.model('ConfigCanchas', configCanchasSchema);

// Exporta el modelo para su uso en otros lugares
module.exports = ConfigCanchas;

const { Router } = require('express');
const bcryptjs = require('bcryptjs');

const { getUsuario, postUsuario } = require('../controllers/usuarios');

const router = Router();
router.get('/data', getUsuario);
router.post('/data', postUsuario);

module.exports = router;
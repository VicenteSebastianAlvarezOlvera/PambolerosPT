const { Router } = require('express');
const bcryptjs = require('bcryptjs');

const { getUsuario, postUsuario, postUsuarioCancha } = require('../controllers/usuarios');

const router = Router();
router.get('/data', getUsuario);
router.post('/data', postUsuario);
router.post('/dataCancha', postUsuarioCancha);
//router.post('/dataEquipo', postUsuarioEquipo);

module.exports = router;
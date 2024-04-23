const { Router } = require('express');
const bcryptjs = require('bcryptjs');

const { getUsuario, postUsuario, postUsuarioCancha, postUsuarioEquipo } = require('../controllers/usuarios');

const router = Router();
router.post('/getdata', getUsuario);
router.post('/data', postUsuario);
router.post('/dataCancha', postUsuarioCancha);
router.post('/dataEquipo', postUsuarioEquipo);

module.exports = router;
const { Router } = require('express');

const { getUsuario, postUsuario, postUsuarioCancha, postUsuarioEquipo, postConfigCanchas, getConfigCanchas, getEquipos, agregarIntegrante,
    eliminarIntegrante } = require('../controllers/usuarios');

const router = Router();
router.post('/getdata', getUsuario);
router.post('/data', postUsuario);
router.post('/dataCancha', postUsuarioCancha);
router.post('/dataEquipo', postUsuarioEquipo);
router.post('/ConfigCanchas', postConfigCanchas);
router.post('/GetGetConfigCanchas', getConfigCanchas);
router.post('/GetEquipos', getEquipos);
router.post('/agregarIntegrante', agregarIntegrante);
router.post('/eliminarIntegrante', eliminarIntegrante);

module.exports = router;
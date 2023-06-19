const { Router } = require('express');

const { getAgentes, getAgentesById, crearAgente, actualizarAgente, eliminarAgente } = require('../controller/agentes');

const router = Router();

//Ruta para obtener todos los agentes
router.use("/agentes", getAgentes);

//Ruta para obtener todos los agentes
router.use("/agente/:id", getAgentesById);

//Ruta para crear agente
router.post("/", crearAgente);

//Ruta para actualizar agente por id
router.put('/:id', actualizarAgente);

//Ruta para eliminar por id
router.delete('/:id', eliminarAgente);

module.exports = router;
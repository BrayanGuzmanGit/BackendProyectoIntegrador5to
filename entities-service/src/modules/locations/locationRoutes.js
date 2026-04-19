const express = require('express');
const router = express.Router();
const locationController = require('./locationController');
const { authMiddleware, roleMiddleware } = require('../../middlewares/authMiddleware');


// === Rutas de Predios ===
router.post('/predios', authMiddleware, roleMiddleware('Propietario'), locationController.createPredio);
router.get('/predios', authMiddleware, roleMiddleware('Propietario'), locationController.getMyPredios);
router.post('/predios/link', authMiddleware, roleMiddleware('Propietario'), locationController.linkLugarPredio);


// === Rutas de Lugares de Producción ===
router.post('/lugares', authMiddleware, roleMiddleware('Productor'), locationController.createLugarProduccion);
router.get('/lugares/:id_productor', authMiddleware, roleMiddleware('Productor'), locationController.getMyLugares);


// === Ruta para listar lotes por lugar de produccion
router.get('/lotes/:id_lugar', authMiddleware, roleMiddleware('Productor'), locationController.getLotesPorLugar);


// === Rutas de departamentos y municipios
router.get('/departamentos', locationController.getDepartamentos);
router.get('/municipios', locationController.getMunicipios);


// Lot Creation (Only Productor per logic requested)
router.post('/lotes', authMiddleware, roleMiddleware('Productor'), locationController.addLot);

module.exports = router;

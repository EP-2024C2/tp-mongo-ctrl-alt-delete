const { Router } = require('express')
const fabricantesController = require('../controllers/fabricantes.controller')

const route = Router()

route.get('/fabricantes', fabricantesController.getAllFabricantes)

route.get('/fabricantes/:id', fabricantesController.getFabricanteById )

route.post('/fabricantes', fabricantesController.createFabricante)

route.put('/fabricantes/:id', fabricantesController.updateFabricante)

route.delete('/fabricantes/:id', fabricantesController.deleteFabricanteById)

route.get('/fabricantes/:id/productos', fabricantesController.getFabricanteWhitAllComponents)

module.exports = route
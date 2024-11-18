const { Router } = require('express')
const fabricantesController = require('../controllers/fabricantes.controller')
const { fabricantesMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const Fabricante = require('../schemas/fabricantesSchema.js')

const route = Router()

route.get('/fabricantes', fabricantesController.getAllFabricantes)

route.get('/fabricantes/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.getFabricanteById )

route.post('/fabricantes',
            fabricantesController.createFabricante)

route.put('/fabricantes/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.updateFabricante)

route.delete('/fabricantes/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.deleteFabricanteById)

route.get('/fabricantesProductos/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.getFabricanteWithAllProducts)

module.exports = route
const { Router } = require('express')
const fabricantesController = require('../controllers/fabricantes.controller')
const { fabricantesMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const fabricanteSchema = require('../schemas/fabricantes.schema')
const {productosArraySchema} = require('../schemas/productos.schema')

const route = Router()

route.get('/fabricantes', fabricantesController.getAllFabricantes)

route.get('/fabricantes/:id', fabricantesMiddleware.validateIdFabricante, fabricantesController.getFabricanteById )

route.post('/fabricantes',schemaValidator(fabricanteSchema), fabricantesController.createFabricante)

route.put('/fabricantes/:id', fabricantesMiddleware.validateIdFabricante, fabricantesController.updateFabricante)

route.delete('/fabricantes/:id', fabricantesMiddleware.validateIdFabricante, fabricantesController.deleteFabricanteById)

route.get('/fabricantes/:id/productos',schemaValidator(productosArraySchema), fabricantesMiddleware.validateIdFabricante, fabricantesController.getFabricanteWhitAllComponents)

module.exports = route
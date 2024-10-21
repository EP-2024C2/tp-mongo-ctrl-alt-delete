const { Router } = require('express')
const componentesController = require('../controllers/componentes.controller')
const { componentesMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const componenteSchema = require('../schemas/componentes.schema')
const {productosArraySchema} = require('../schemas/productos.schema')

const route = Router()

route.get('/componentes', componentesController.getAllComponentes)

route.get('/componentes/:id', componentesMiddleware.validateIdComponente, componentesController.getComponenteById )

route.post('/componentes',
    schemaValidator(componenteSchema), 
    componentesController.createComponente)

route.put('/componentes/:id', componentesMiddleware.validateIdComponente, componentesController.updateComponente)

route.delete('/componentes/:id', componentesMiddleware.validateIdComponente, componentesController.deleteComponenteById)

route.get('/componentes/:id/productos', componentesMiddleware.validateIdComponente, componentesController.getComponentWhitAllProducts)

module.exports = route
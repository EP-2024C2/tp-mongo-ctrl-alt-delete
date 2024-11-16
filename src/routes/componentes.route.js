const { Router } = require('express')
const componentesController = require('../controllers/componentes.controller')
const { componentesMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const {Componente} = require('../schemas/componentesSchema.js')

const route = Router()

route.get('/componentes', componentesController.getAllComponentes)

route.get('/componentes/:componenteId', componentesMiddleware.validateIdComponente, componentesController.getComponenteById )

route.post('/componentes',
    schemaValidator(componenteSchema), 
    componentesController.createComponente)

route.put('/componentes/:componenteId', componentesMiddleware.validateIdComponente, componentesController.updateComponente)

route.delete('/componentes/:componenteId', componentesMiddleware.validateIdComponente, componentesController.deleteComponenteById)

route.get('/componentes/:componenteId/productos', componentesMiddleware.validateIdComponente, componentesController.getComponentWhitAllProducts)

module.exports = route
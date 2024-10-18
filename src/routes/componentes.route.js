const { Router } = require('express')
const componentesController = require('../controllers/componentes.controller')
const { componentesMiddleware } = require('../middlewares')

const route = Router()

route.get('/componentes', componentesController.getAllComponentes)

route.get('/componente/:id', componentesMiddleware.validateIdComponente, componentesController.getComponenteById )

route.post('/componentes', componentesController.createComponente)

route.put('/componentes/:id', componentesMiddleware.validateIdComponente, componentesController.updateComponente)

route.delete('/componentes/:id', componentesMiddleware.validateIdComponente, componentesController.deleteComponenteById)

route.get('/componentes/:id/productos', componentesMiddleware.validateIdComponente, componentesController.getComponentWhitAllProducts)

module.exports = route
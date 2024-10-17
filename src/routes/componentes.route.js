const { Router } = require('express')
const componentesController = require('../controllers/componentes.controller')

const route = Router()

route.get('/componentes', componentesController.getAllComponentes)

route.get('/componente/:id', componentesController.getComponenteById )

route.post('/componentes', componentesController.createComponente)

route.put('/componentes/:id', componentesController.updateComponente)

route.delete('/componentes/:id', componentesController.deleteComponenteById)

route.get('/componentes/:id/productos', componentesController.getComponentWhitAllProducts)

module.exports = route
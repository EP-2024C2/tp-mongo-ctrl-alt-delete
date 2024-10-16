const { Router } = require('express')
const componentesController = require('../controllers/componentes.controller')

const route = Router()

route.get('/componentes', componentesController.getAllComponentes)

route.get('/componente/:id', componentesController.getComponenteById )

module.exports = route
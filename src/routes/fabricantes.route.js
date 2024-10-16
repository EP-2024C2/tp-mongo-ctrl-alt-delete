const { Router } = require('express')
const fabricantesController = require('../controllers/fabricantes.controller')

const route = Router()

route.get('/fabricantes', fabricantesController.getAllFabricantes)

route.get('/fabricante/:id', fabricantesController.getFabricanteById )

module.exports = route
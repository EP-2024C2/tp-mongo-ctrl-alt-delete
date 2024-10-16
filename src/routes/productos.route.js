const { Router } = require('express')
const productosController = require('../controllers/productos.controller')

const route = Router()

route.get('/series', productosController.getAllProductos)

route.get('/producto/:id', productosController.getProductoById )

module.exports = route
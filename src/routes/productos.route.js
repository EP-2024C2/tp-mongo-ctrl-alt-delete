const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const { productosMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const productosSchema = require('../schemas/productos.schema')

const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:id',
    productosMiddleware.validateIdProducto,
    productosController.getAllProductos
)

route.post('/productos',
    schemaValidator(productosSchema), 
    productosController.createProducto
)

module.exports = route
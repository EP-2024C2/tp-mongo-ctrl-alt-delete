const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const { productosMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const productosSchema = require('../schemas/productos.schema')

const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:id',
    productosMiddleware.validateIdProducto,
    productosController.getProductoById
)

route.post('/productos',
    schemaValidator(productosSchema), 
    productosController.createProduct
)

route.put('/productos/:id',productosMiddleware.validateIdProducto, productosController.updateProduct)

route.delete('/producto/:id',productosMiddleware.validateIdProducto, productosController.deleteProductById)

route.get('/productos/:id/fabricantes', productosMiddleware.validateIdProducto, productosController.getProductWhitAllFabricantes)

route.get('/productos/:id/componentes', productosMiddleware.validateIdProducto, productosController.getProductWhitAllComponents)

module.exports = route
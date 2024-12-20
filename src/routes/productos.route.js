const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const { productosMiddleware, fabricantesMiddleware } = require('../middlewares')

const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:productoId',
    productosMiddleware.validateIdProducto,
    productosController.getProductoById
)

route.post('/productos',
    productosController.createProducto
)

route.put('/productos/:productoId',productosMiddleware.validateIdProducto, productosController.updateProducto)

route.delete('/productos/:productoId',productosMiddleware.validateIdProducto, productosController.deleteProductoById)

route.get('/productosFabricantes/:productoId', productosMiddleware.validateIdProducto, productosController.getProductoWithAllFabricantes)

route.post('/productosFabricantes/:productoId/',
    productosMiddleware.validateIdProducto,
    productosController.addFabricantesToProducto)

route.post('/productos/:productoId/componentes',
    productosMiddleware.validateIdProducto,
    productosController.addComponenteToProducto)

route.get('/productos/:minPrecio/:maxPrecio',productosMiddleware.validarPrecios, productosController.filterProductoMinMaxPrecio)

route.put('/productos/:productoId/fabricantes/:fabricanteId', 
    productosMiddleware.validateIdProducto,
    fabricantesMiddleware.validateIdFabricante,
    productosController.addFabricanteToProductoById
)

module.exports = route
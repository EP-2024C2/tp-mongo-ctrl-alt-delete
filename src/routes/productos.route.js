const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const { productosMiddleware, fabricantesMiddleware, componentesMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const {productosSchema} = require('../schemas/productos.schema')
const {fabricanteSchema,fabricantesArraySchema} = require('../schemas/fabricantes.schema')
const {componenteSchema,componentesArraySchema} = require('../schemas/componentes.schema')

const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:productoId',
    productosMiddleware.validateIdProducto,
    productosController.getProductoById
)

route.post('/productos',
    schemaValidator(productosSchema), 
    productosController.createProducto
)

route.put('/productos/:productoId',productosMiddleware.validateIdProducto, productosController.updateProducto)

route.delete('/productos/:productoId',productosMiddleware.validateIdProducto, productosController.deleteProductoById)

route.get('/productos/:productoId/fabricantes', productosMiddleware.validateIdProducto, productosController.getProductoWhitAllFabricantes)

route.post('/productos/:productoId/fabricantes',
    productosMiddleware.validateIdProducto,
    schemaValidator(fabricantesArraySchema), 
    productosController.addFabricantesToProducto)

route.get('/productos/:productoId/componentes', productosMiddleware.validateIdProducto, productosController.getProductoWhitAllComponents)

route.post('/productos/:productoId/componentes',
    productosMiddleware.validateIdProducto,
    schemaValidator(componentesArraySchema), 
    productosController.addComponentesToProducto)

route.get('/productos/:minPrecio/:maxPrecio',productosMiddleware.validarPrecios, productosController.filterProductoMinMaxPrecio)

route.put('/productos/:productoId/fabricantes/:fabricanteId', 
    productosMiddleware.validateIdProducto,
    fabricantesMiddleware.validateIdFabricante,
    productosController.addFabricanteToProductoById
)

route.put('/productos/:productoId/componentes/:componenteId',
    productosMiddleware.validateIdProducto,
    componentesMiddleware.validateIdComponente,
    productosController.addComponenteToProductoById
)

module.exports = route
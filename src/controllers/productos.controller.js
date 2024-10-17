const { Componentes, Productos, Fabricantes } = require('../models')

const controller = {}

const getAllProductos = async (req, res) =>{
    const data = await Productos.findAll({})
    res.status(200).json(data)
}

controller.getAllProductos = getAllProductos

const getProductoById = async(req, res) => {
    const id =  req.params.id;
    const producto = await Productos.findOne({where: {id}});
    res.status(200).json(producto)
    //faltaría poner el status 404, que lo pide la consigna, debería ser un middleware
}
controller.getProductoById = getProductoById

const createProduct = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    const product = await Productos.create({
        nombre,
        descripcion,
        precio,
        pathImg
    })
    res.status(201).json(product)
    //middleware status 400, faltaría
}
controller.createProduct = createProduct

const updateProduct = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    const id = req.params.id
    const product = await Productos.findByPk(id)
    product.nombre = nombre;
    product.descripcion = descripcion;
    product.precio = precio;
    product.pathImg = pathImg;
    await product.save()
    res.status(200).json(product)
    //faltaría middleware con status 404
}
controller.updateProduct = updateProduct

const deleteProductById = async (req, res) => {
    const idProduct = req.params.id
    const r = await Productos.destroy( {where: {id:idProduct}})
    res.status(200).json({mensaje:  `Producto eliminado`})
    //faltaría status 404 y 500
}
controller.deleteProductById = deleteProductById

const getProductWhitAllFabricantes = async(req, res) => {
    const id =  req.params.id;
    const producto = await Productos.findOne({
        where: {id},
        include: {
            model: Fabricantes,
            as: 'Fabricantes'
        }
    });
    res.status(200).json(producto)
    //faltaría poner el status 404, que lo pide la consigna, debería ser un middleware
}
controller.getProductWhitAllFabricantes = getProductWhitAllFabricantes

const getProductWhitAllComponents = async(req, res) => {
    const id =  req.params.id;
    const producto = await Productos.findOne({
        where: {id},
        include: {
            model: Componentes,
            as: 'Componentes'
        }
    });
    res.status(200).json(producto)
    //faltaría poner el status 404, que lo pide la consigna, debería ser un middleware
}
controller.getProductWhitAllComponents = getProductWhitAllComponents

module.exports = controller
const { Componentes, Productos } = require('../models')

const controller = {}

const getAllProductos = async (req, res) =>{
    const data = await Productos.findAll({})
    res.status(200).json(data)
}

controller.getAllProductos = getAllProductos

const getProductoById = async(req, res) => {
    const id =  req.params.id;
    const producto = await Productos.findOne({
        where: {id},
        include: {
            model: Componentes,
            as: 'Componentes'
        }
    });
    res.status(200).json(producto)
}
controller.getProductoById = getProductoById

const createProducto = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    const producto = await Productos.create({
        nombre,
        descripcion,
        precio,
        pathImg
    })
    res.status(201).json(producto)
}
controller.createProducto = createProducto

module.exports = controller
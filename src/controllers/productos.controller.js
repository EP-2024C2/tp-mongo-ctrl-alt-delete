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
}
controller.getProductoById = getProductoById

const createProducto = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    const producto = await Productoos.create({
        nombre,
        descripcion,
        precio,
        pathImg
    })
    res.status(201).json(producto)
}
controller.createProducto = createProducto

const updateProducto = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    const id = req.params.id

    await Productos.update(
        { nombre, descripcion, precio, pathImg },
        { where: { id } }
    );
    const updatedProducto = await Productos.findByPk(id);
    res.status(200).json(updatedProducto)
}
controller.updateProducto = updateProducto

const deleteProductoById = async (req, res) => {
    const idProducto = req.params.id
    const r = await Productos.destroy( {where: {id:idProducto}})
    res.status(200).json({mensaje:  `Producto eliminado`})
}
controller.deleteProductoById = deleteProductoById

const getProductoWhitAllFabricantes = async(req, res) => {
    const id =  req.params.id;
    const producto = await Productos.findOne({
        where: {id},
        include: {
            model: Fabricantes,
            as: 'Fabricantes',
            through: {
                attributes: []
            }
        }
    });
    res.status(200).json(producto)
}
controller.getProductoWhitAllFabricantes = getProductoWhitAllFabricantes

const getProductoWhitAllComponents = async(req, res) => {
    const id =  req.params.id;
    const producto = await Productos.findOne({
        where: {id},
        include: {
            model: Componentes,
            as: 'Componentes',
            through: {
                attributes: []
            }
        }
    });
    res.status(200).json(producto)
}
controller.getProductoWhitAllComponents = getProductoWhitAllComponents

const addFabricantesToProducto = async (req, res) => {
    const arrayFabricantes = req.body
    const id = req.params.id
    const productos = await Productos.findByPk(id) 
     
    let promesas = [];
    arrayFabricantes.forEach(fabricante => {
        promesas.push( Fabricantes.create(fabricante) )
    });
    const fabricantes = await Promise.all(promesas)
    productos.addFabricantes(fabricantes)
    res.status(201).json({message: 'Los fabricantes fueron asociados al producto'})
}

controller.addFabricantesToProducto = addFabricantesToProducto

const addComponentesToProducto = async (req, res) => {
    const arrayComponentes = req.body
    const id = req.params.id
    const productos = await Productos.findByPk(id) 
     
    let promesas = [];
    arrayComponentes.forEach(componente => {
        promesas.push( Componentes.create(componente) )
    });
    const componentes = await Promise.all(promesas)
    productos.addComponentes(componentes)
    res.status(201).json({message: 'Los componentes fueron asociados al producto'})
}

controller.addComponentesToProducto = addComponentesToProducto

module.exports = controller
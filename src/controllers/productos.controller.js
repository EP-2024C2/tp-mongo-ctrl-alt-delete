const { Componentes, Productos, Fabricantes } = require('../models')
const { Sequelize, DataTypes } = require('sequelize');

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
    const producto = await Productos.create({
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
    try{
        const idProducto = req.params.id
        const r = await Productos.destroy( {where: {id:idProducto}})
        res.status(200).json({mensaje:  `Producto eliminado`})
    }
    catch(error){
        console.error(error);
        res.status(500).json({mensaje:  `Ha ocurrido un error`})
    }
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

const filterProductoMinMaxPrecio = async (req,res) => {
    const { minPrecio, maxPrecio } = req.params;
    const productos = await Productos.findAll({
        where: {
            precio: {
                [Sequelize.Op.gte]: Number(minPrecio),
                [Sequelize.Op.lte]: Number(maxPrecio)
            }
        }
    });
    res.status(200).json(productos);
}
controller.filterProductoMinMaxPrecio = filterProductoMinMaxPrecio

const addFabricanteToProductoById = async (req, res) => {
    const { productoId, fabricanteId } = req.params;
    const producto = await Productos.findByPk(productoId);
    const fabricante = await Fabricantes.findByPk(fabricanteId);
    await producto.addFabricantes(fabricante);
    res.status(201).json({ message: 'Fabricante asociado al producto con éxito' });
}
controller.addFabricanteToProductoById = addFabricanteToProductoById

const addComponenteToProductoById = async (req, res) => {
    const { productoId, componenteId } = req.params;
    const producto = await Productos.findByPk(productoId);
    const componente = await Componentes.findByPk(componenteId);
    await producto.addComponentes(componente);
    res.status(201).json({ message: 'Componente asociado al producto con éxito' });
}
controller.addComponenteToProductoById = addComponenteToProductoById

module.exports = controller
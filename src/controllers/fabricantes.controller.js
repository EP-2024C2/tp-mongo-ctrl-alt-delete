const { Fabricantes, Productos } = require('../models')

const controller = {}

const getAllFabricantes = async (req, res) =>{
    const data = await Fabricantes.findAll({})
    res.status(200).json(data)
}

controller.getAllFabricantes = getAllFabricantes

const getFabricanteById = async(req, res) => {
    const id =  req.params.id;
    const fabricante = await Fabricantes.findOne({ where: {id} });
    res.status(200).json(fabricante)
}

controller.getFabricanteById = getFabricanteById

const createFabricante = async (req, res) => {
    const {nombre, direccion, numeroContacto, pathImgPerfil} = req.body
    const fabricante = await Fabricantes.create({
        nombre,
        direccion,
        numeroContacto, 
        pathImgPerfil 
    })
    res.status(201).json(fabricante)
    
}
controller.createFabricante = createFabricante

const updateFabricante = async (req, res) => {
    const {nombre, direccion,numeroContacto,pathImgPerfil} = req.body
    const id = req.params.id
    await Fabricantes.update(
        { nombre, direccion, numeroContacto, pathImgPerfil },
        { where: { id } }
    );
    const fabricante = await Fabricantes.findByPk(id)
    res.status(200).json(fabricante)
}
controller.updateFabricante = updateFabricante

const deleteFabricanteById = async (req, res) => {
    try{
    const idFabricante = req.params.id
    const r = await Fabricantes.destroy( {where: {id:idFabricante}})
    res.status(200).json({mensaje:  `Fabricante eliminado`})
    }
    catch(error){
        console.error(error);
        res.status(500).json({mensaje:  `Ha ocurrido un error`})
    }
}
controller.deleteFabricanteById = deleteFabricanteById

const getFabricanteWhitAllProducts = async(req, res) => {
    const id =  req.params.id;
    const fabricante = await Fabricantes.findOne({
        where: {id},
        include: {
            model: Productos, 
            as: 'Productos',
            through: {
                attributes: []
            }
        }
    });
    res.status(200).json(fabricante)
}
controller.getFabricanteWhitAllProducts = getFabricanteWhitAllProducts

module.exports = controller
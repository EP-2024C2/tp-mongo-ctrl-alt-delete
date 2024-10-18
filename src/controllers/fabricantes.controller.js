const { Fabricantes, Componentes } = require('../models')

const controller = {}

const getAllFabricantes = async (req, res) =>{
    const data = await Fabricantes.findAll({})
    res.status(200).json(data)
}

controller.getAllFabricantes = getAllFabricantes

const getFabricanteById = async(req, res) => {
    const id =  req.params.id;
    const componente = await Fabricantes.findOne({ where: {id} });
    res.status(200).json(Fabricantes)
}

controller.getFabricanteById = getFabricanteById

const createFabricante = async (req, res) => {
    const {nombre, direccion, numeroContacto, pathImgPerfil} = req.body
    const product = await Fabricantes.create({
        nombre,
        direccion,
        numeroContacto, 
        pathImgPerfil 
    })
    res.status(201).json(product)
    
}
controller.createFabricante = createFabricante

const updateFabricante = async (req, res) => {
    const {nombre, descripcion} = req.body
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
    const idFabricante = req.params.id
    const r = await Fabricantes.destroy( {where: {id:idFabricante}})
    res.status(200).json({mensaje:  `Fabricante eliminado`})
    //faltaría status 404 y 500
}
controller.deleteFabricanteById = deleteFabricanteById

const getFabricanteWhitAllComponents = async(req, res) => {
    const id =  req.params.id;
    const producto = await Fabricantes.findOne({
        where: {id},
        include: {
            model: Componentes,
            as: 'Componentes'
        }
    });
    res.status(200).json(producto)
}
controller.getFabricanteWhitAllComponents = getFabricanteWhitAllComponents

module.exports = controller
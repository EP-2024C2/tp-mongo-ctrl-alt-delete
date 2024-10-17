const { Componentes, Productos } = require('../models')

const controller = {}

const getAllComponentes = async (req, res) =>{
    const data = await Componentes.findAll({})
    res.status(200).json(data)
}

controller.getAllComponentes = getAllComponentes

const getComponenteById = async(req, res) => {
    const id =  req.params.id;
    const componentes = await Componentes.findOne({ where: {id} });
    res.status(200).json(componentes)
}

controller.getComponenteById = getComponenteById

const createComponente = async (req, res) => {
    const {nombre, descripcion} = req.body
    const componente = await Componentes.create({
        nombre,
        descripcion,
        
    })
    res.status(201).json(componente)
    //middleware status 400, faltaría
}
controller.createComponente = createComponente

const updateComponente = async (req, res) => {
    const {nombre, descripcion} = req.body
    const id = req.params.id
    const componente = await Componentes.findByPk(id)
    componente.nombre = nombre;
    componente.descripcion = descripcion;
    await componente.save()
    res.status(200).json(componente)
    //faltaría middleware con status 404
}
controller.updateComponente = updateComponente

const deleteComponenteById = async (req, res) => {
    const idComponente = req.params.id
    const r = await Componentes.destroy( {where: {id:idComponente}})
    res.status(200).json({mensaje:  `Componente eliminado`})
    //faltaría status 404 y 500
}
controller.deleteComponenteById = deleteComponenteById


const getComponentWhitAllProducts = async(req, res) => {
    const id =  req.params.id;
    const componente = await Componentes.findOne({
        where: {id},
        include: {
            model: Productos,
            as: 'Productos'
        }
    });
    res.status(200).json(componente)
    //faltaría poner el status 404, que lo pide la consigna, debería ser un middleware
}
controller.getComponentWhitAllProducts = getComponentWhitAllProducts

module.exports = controller
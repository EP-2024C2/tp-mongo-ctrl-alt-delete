const { Componentes, Productos } = require('../models')

const controller = {}

const getAllComponentes = async (req, res) =>{
    const data = await Componentes.findAll({})
    res.status(200).json(data)
}

controller.getAllComponentes = getAllComponentes

const getComponenteById = async(req, res) => {
    const id =  req.params.componenteId;
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
}
controller.createComponente = createComponente

const updateComponente = async (req, res) => {
    const {nombre, descripcion} = req.body
    const id = req.params.componenteId
    const [updated] = await Componentes.update(
        { nombre, descripcion },
        { where: { id } }
    );
    const componente = await Componentes.findByPk(id)
    res.status(200).json(componente)
}
controller.updateComponente = updateComponente

const deleteComponenteById = async (req, res) => {
    try{
    const componenteId = req.params.componenteId
    const r = await Componentes.destroy( {where: {id:componenteId}})
    res.status(200).json({mensaje:  `Componente eliminado`})
    }
    catch(error){
        console.error(error);
        res.status(500).json({mensaje:  `Ha ocurrido un error`})
    }
}
controller.deleteComponenteById = deleteComponenteById


const getComponentWhitAllProducts = async(req, res) => {
    const id =  req.params.componenteId;
    const componente = await Componentes.findOne({
        where: {id},
        include: {
            model: Productos,
            as: 'Productos'
        }
    });
    res.status(200).json(componente)
}
controller.getComponentWhitAllProducts = getComponentWhitAllProducts

module.exports = controller
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

module.exports = controller
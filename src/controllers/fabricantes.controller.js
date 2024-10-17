const { Fabricantes } = require('../models')

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

module.exports = controller
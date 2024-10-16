const { Componentes, Prodcutos } = require('../models')

const controller = {}

const getAllProductos = async (req, res) =>{
    const data = await Prodcutos.findAll({})
    res.status(200).json(data)
}

controller.getAllProductos = getAllProductos

const getProductoById = async(req, res) => {
    const id =  req.params.id;
    const producto = await Prodcutos.findOne({
        where: {id},
        include: {
            model: Componentes,
            as: 'Componentes'
        }
    });
    res.status(200).json(producto)
}
controller.getProductoById = getProductoById

module.exports = controller
const { Fabricantes } = require('../models')
const middleware = {}
const validateIdFabricante = async (req, res, next)=>{
    const id = req.params.id
    const producto = await Fabricantes.findByPk(id)
    if (!producto)
        return res.status(404).json({mensaje: `El id=${id} no exite.`})
    next()
}
middleware.validateIdFabricante = validateIdFabricante

module.exports = middleware


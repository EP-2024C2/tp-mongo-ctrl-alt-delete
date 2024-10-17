const { Productos } = require('../models')
const middleware = {}
const validateIdProducto = async (req, res, next)=>{
    const id = req.params.id
    const producto = await Productos.findByPk(id)
    if (!producto)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middleware.validateIdProducto = validateIdProducto

module.exports = middleware


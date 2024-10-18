const { Componentes } = require('../models')
const middleware = {}
const validateIdComponente = async (req, res, next)=>{
    const id = req.params.id
    const producto = await Componentes.findByPk(id)
    if (!producto)
        return res.status(404).json({mensaje: `El id=${id} no exite.`})
    next()
}
middleware.validateIdComponente = validateIdComponente

module.exports = middleware


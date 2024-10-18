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

function validarPrecios(req, res, next) {
    const { minPrecio, maxPrecio } = req.params;

    const min = Number(minPrecio);
    const max = Number(maxPrecio);

    if (min < 0 || max < 0) {
        return res.status(400).json({ error: 'Los precios no pueden ser menores a 0.' });
    }

    next();
}
middleware.validarPrecios = validarPrecios
  

module.exports = middleware


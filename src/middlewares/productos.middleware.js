const Producto = require('../schemas/productosSchema');

const middleware = {};

const validateIdProducto = async (req, res, next) => {
  const id = req.params.productoId;

  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: `El producto con id=${id} no existe.` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Hubo un error al buscar el producto.', error: error.message });
  }
};

middleware.validateIdProducto = validateIdProducto;

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

module.exports = middleware;



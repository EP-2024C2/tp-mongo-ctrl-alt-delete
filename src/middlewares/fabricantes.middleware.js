const Fabricante = require('../schemas/fabricantesSchema'); // Correcto importando el modelo de Mongoose

const middleware = {};

const validateIdFabricante = async (req, res, next) => {
  const id = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findById(id);
    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${id} no existe.` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Hubo un error al buscar el fabricante.', error: error.message });
  }
};

middleware.validateIdFabricante = validateIdFabricante;

module.exports = middleware;
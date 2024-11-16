const Componente = require('../schemas/componentesSchema.js'); // Asegúrate de que el modelo de Componentes está configurado con Mongoose
const middleware = {};

const validateIdComponente = async (req, res, next) => {
  const id = req.params.componenteId;

  const componente = await Componente.findById(id);

  if (!componente) {
    return res.status(404).json({ mensaje: `El id=${id} no existe.` });
  }

  next();
};

middleware.validateIdComponente = validateIdComponente;

module.exports = middleware;
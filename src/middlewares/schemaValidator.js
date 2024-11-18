const schemaValidator = (model) => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      if (Array.isArray(data)) {
        // Si es un array, validamos cada objeto por separado
        for (let i = 0; i < data.length; i++) {
          const instance = new model(data[i]); // Creamos una nueva instancia
          const validationError = instance.validateSync(); // Validamos la instancia
          if (validationError) {
            throw new Error(`Error en el objeto ${i + 1}: ${validationError.message}`);
          }
        }
      } else {
        // Si no es un array, validamos una sola instancia
        const instance = new model(data); // Creamos una nueva instancia
        const validationError = instance.validateSync(); // Validamos la instancia
        if (validationError) {
          throw new Error(`Error: ${validationError.message}`);
        }
      }

      next(); // Si todo está bien, continuamos al siguiente middleware
    } catch (error) {
      res.status(400).json({ message: error.message }); 
    }
  };
};

module.exports = schemaValidator;

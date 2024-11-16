const mongoose = require('mongoose');

const schemaValidator = (model) => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const validationError = model.validateSync(data[i]); 
          if (validationError) {
            throw new Error(`Error en el objeto ${i + 1}: ${validationError.message}`);
          }
        }
      } else {
        const validationError = model.validateSync(data);
        if (validationError) {
          throw new Error(`Error: ${validationError.message}`);
        }
      }

      next(); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
};

module.exports = schemaValidator;

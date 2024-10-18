const Joi = require('joi')

const componenteSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages( {
            "any.required":"El nombre es requerido",
            "string.min": "El nombre debe tener como mínimo {#limit} caracteres",
            "string.max": "El nombre debe tener como máximo {#limit} caracteres",
            "string.empty": "El nombre no puede ser vacio"
        }),
        descripcion: Joi.string().allow("").optional()
    }
).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

const componentesArraySchema = Joi.array().items(componenteSchema).min(1).messages({
    'array.min': 'Debes enviar al menos un componente',
  });

module.exports = {componenteSchema, componentesArraySchema}
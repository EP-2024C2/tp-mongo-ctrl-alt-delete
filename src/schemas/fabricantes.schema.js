const Joi = require('joi')

const fabricanteSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages( {
            "any.required":"El nombre es requerido",
            "string.min": "El nombre debe tener como mínimo {#limit} caracteres",
            "string.max": "El nombre debe tener como máximo {#limit} caracteres",
            "string.empty": "El nombre no puede ser vacio"
        }),
        direccion: Joi.string().required().min(3).max(255).messages( {
            "any.required":"La direccion es requerida",
            "string.min": "La direccion debe tener como mínimo {#limit} caracteres",
            "string.max": "La direccion debe tener como máximo {#limit} caracteres",
            "string.empty": "La direccion no puede ser vacia"
        }),
        numeroContacto: Joi.string().required().min(8).messages( {
            "any.required":"numeroContacto es requerido",
            "string.min": "numeroContacto debe tener como mínimo {#limit} caracteres",
        }),
        pathImgPerfil: Joi.string().allow("").optional()
    }
).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

const fabricantesArraySchema = Joi.array().items(fabricanteSchema).min(1).messages({
    'array.min': 'Debes enviar al menos un fabricante',
  });

module.exports = {fabricanteSchema, fabricantesArraySchema}
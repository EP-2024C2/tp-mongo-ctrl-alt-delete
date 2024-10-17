// const Joi = require('joi')
// const validateDate = require('../utils/date.validator')
// const termporaSchema = Joi.object().keys(
//     {
//         descripcion: Joi.string().required().min(10).max(255).messages( {
//             "any.required":"descripcion es requerido",
//             "string.min": "descripcion debe tener como mínimo {#limit} caracteres",
//             "string.max": "descripcion debe tener como máximo {#limit} caracteres",
//             "string.empty": "descripcion no puede ser vacio"
//         }),
//         fechaInicio: Joi.string().custom(validateDate).required().messages({
//           "any.custom": "El formato de la fecha debe ser YYYY-MM-DD",
//           "any.required": "fechaInicio es requerido", 
//         }),
//         capitulos: Joi.number().min(1).max(100).required().messages({
//             "any.required": "capitulos es requerido",
//             "number.min": "capitulos debe tener como mínimo {#limit}",
//             "number.max": "capitulos debe tener como máximo {#limit}",
//         })
//     }
// ).unknown(false).messages ({
//     'object.unknown': 'El atributo {#label} no está permitido.'
// })

// module.exports = termporaSchema
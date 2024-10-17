// const Joi = require('joi')

// const seriesSchema = Joi.object().keys(
//     {
//         nombre: Joi.string().required().min(3).max(255).messages( {
//             "any.required":"nombre es requerido",
//             "string.min": "nombre debe tener como mínimo {#limit} caracteres",
//             "string.max": "nombre debe tener como máximo {#limit} caracteres",
//             "string.empty": "nombre no puede ser vacio"
//         }),
//         plataforma: Joi.string().required().valid("netflix","star+", "flow").messages({
//           "any.required": "plataforma es requerido",
//           "any.only":"Las plataformas disponbiles son netflix,star+, flow"   
//         }),
//         disponible: Joi.boolean().required().messages({
//             "any.required": "disponbile es requerido"
//         })
//     }
// ).unknown(false).messages ({
//     'object.unknown': 'El atributo {#label} no está permitido.'
// })

// module.exports = seriesSchema
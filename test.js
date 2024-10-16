const seriesSchema = require('./src/schemas/series.schema')



const resultado = seriesSchema.validate( {
    "nombre": "alerta roja",
  "plataforma": "star++",
  "disponible": false,
  "fafhdashf":"Fafadsfasd"
}, {abortEarly:false}
)
console.log(resultado.error)




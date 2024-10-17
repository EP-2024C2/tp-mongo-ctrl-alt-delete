// const { Router } = require('express')
// const seriesController= require('../controllers/series.controller')
// const {seriesMiddleware} = require('../middlewares')
// const schemaValidator = require('../middlewares/schemaValidator')
// const seriesSchema = require('../schemas/series.schema')
// const temporadaSchema = require('../schemas/temporadas.schema')
// const temporadaController = require('../controllers/temporadas.controller')
// const route = Router()

// route.get('/series', seriesController.getAllSeries )

// route.get('/series/:id', 
//     seriesMiddleware.validateIdSerie, 
//     seriesController.getSerieById)

// route.get('/series/:id/temporadas', 
//     seriesMiddleware.validateIdSerie, 
//     temporadaController.getTemporadasBySerie
//     )

// route.delete('/series/:id',
//     seriesMiddleware.validateIdSerie, 
//     seriesController.deleteById)

// route.post('/series', schemaValidator(seriesSchema), seriesController.createSerie)

// route.post('/series/:id/temporadas', 
//     seriesMiddleware.validateIdSerie, 
//     schemaValidator(temporadaSchema),
//     temporadaController.createTemporada
// )


// route.put('/series/:id', schemaValidator(seriesSchema), seriesMiddleware.validateIdSerie, seriesController.updateSerie)

// route.post('/series/:id/actores', seriesMiddleware.validateIdSerie, seriesController.addActorToSerie)
// route.post('/series/:id/actor', seriesMiddleware.validateIdSerie, seriesController.addOrFindActorToSerie)


// module.exports = route
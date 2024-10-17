// const { Model } = require('sequelize')
// const { Series, Temporada, Capitulo, Actor } = require('../models')
// const series = require('../models/series')
// const { defaults } = require('joi')
// const controller = {}

// const getAllSeries = async (req, res) =>{
//     const data = await Series.findAll({})
//     res.status(200).json(data)
// }
// controller.getAllSeries = getAllSeries

// const getSerieById= async (req, res)=>{
//     const id = req.params.id
//     const serie = await Series.findOne( {
//         where: {id},
//         include: [
//                 {
//                     model: Actor,
//                     as: 'Actors'
//                 },
//                 {
//                     model: Temporada,
//                     as: 'seasons',
//                     include: [{
//                         model: Capitulo,
//                         as: 'episodios'
//                     }]
//                 }
//             ]
//     })
//     res.status(200).json(serie)
// }
// controller.getSerieById = getSerieById

// const deleteById = async (req, res) => {
//     const idSerie = req.params.id
//     const r = await Series.destroy( {where: {id:idSerie}})
//     res.status(204).json({mensaje:  `filas afectados ${r}`})
// }
// controller.deleteById = deleteById

// const createSerie = async (req, res) => {
//     const {nombre, plataforma, disponible} = req.body
//     const serie = await Series.create({
//         nombre,
//         plataforma,
//         disponible
//     })
//     res.status(201).json(serie)
// }
// controller.createSerie = createSerie

// const updateSerie = async (req, res) => {
//     const {nombre, disponible, plataforma} = req.body
//     const id = req.params.id
//     const serie = await Series.findByPk(id)
//     serie.nombre = nombre;
//     serie.disponible = disponible;
//     serie.plataforma = plataforma
//     await serie.save()
//     res.status(200).json(serie)
// }
// controller.updateSerie = updateSerie


// const addActorToSerie = async (req, res) => {
//     const arrayActores = req.body
//     const id = req.params.id
//     const serie = await Series.findByPk(id) 
     
//     let promesas = [];
//     arrayActores.forEach(actor => {
//         promesas.push( Actor.create(actor) )
//     });
//     const actores = await Promise.all(promesas)
//     serie.addActors(actores)
//     res.status(201).json({message: 'Actor agregado a la serie'})
// }
// controller.addActorToSerie = addActorToSerie

// const addOrFindActorToSerie = async (req, res) => {
//     const {id, nombre, fechaNacimiento, nombreArtistico} = req.body
//     const idSerie = req.params.id
//     const serie = await Series.findByPk(idSerie) 
 
//     const [actor, _ ] = await Actor.findOrCreate(
//         {
//             where: {id: id || 0} , 
//             defaults: {
//                 id: null,
//                 nombre, 
//                 fechaNacimiento, 
//                 nombreArtistico
//             }
//         })
//     serie.addActors([actor])
//     res.status(201).json({message: 'Actor agregado a la serie'})
// }
// controller.addOrFindActorToSerie = addOrFindActorToSerie

// module.exports = controller
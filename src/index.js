const express = require('express')
const iniciarBD = require('./initDB')
const routes = require('./routes')
const db = require('./models')
const app = express()
const PORT = 3001

app.use(express.json())
app.use(routes.componentesRoute)
app.use(routes.productosRoute)
app.use(routes.fabricantesRoute)
app.listen(PORT, async ()=>{
    db.sequelize.sync({force:true})
    await iniciarBD(); 
    
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})
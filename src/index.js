const express = require('express')
const routes = require('./routes')
const db = require('./models')
const app = express()
const PORT = 3001

app.use(express.json())
app.use(routes.componentesRoute)
app.use(routes.productosRoute)
app.use(routes.fabricantesRoute)
app.listen(PORT, async ()=>{    
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})
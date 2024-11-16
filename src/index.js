const express = require('express')
const {connectToDatabase} = require("./db/mongo.db");
const routes = require('./routes')
const app = express()
const PORT = process.env.LISTENER_PORT || 3001

app.use(express.json())
// app.use(routes.componentesRoute)
// app.use(routes.productosRoute)
app.use(routes.fabricantesRoute)
app.listen(PORT, async ()=>{    
    await connectToDatabase();
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})
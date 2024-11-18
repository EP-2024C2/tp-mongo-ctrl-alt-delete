const mongoose = require('mongoose');

// Importar los seeders
const seedFabricantes = require('./seeders/fabricantes-seed'); // Asegúrate de que sea correcto
const seedProductos = require('./seeders/productos-seed');
const seedComponentes = require('./seeders/componentes-seed');


// Conectar a la base de datos de MongoDB
async function conectarBD() {
  try {
    await mongoose.connect('mongodb://admin:admindb@localhost:28018/local?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Función principal para inicializar la base de datos
async function iniciarBD(populateDatabase) {
  try {
    // Conectarse a la base de datos de MongoDB
    await conectarBD();

    // Limpiar las colecciones antes de insertar los datos (similar a force: true en Sequelize)
    if (populateDatabase) {
      await limpiarColecciones();

      // Ejecutar los seeders
      await seedFabricantes();
      await seedProductos();
      await seedComponentes();

      console.log('Base de datos inicializada y poblada con datos.');
    } else {
      console.log('Base de datos inicializada sin poblar.');
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    mongoose.disconnect(); // Desconectar de la base de datos
  }
}

// Función para limpiar todas las colecciones antes de insertar datos (equivalente al "force" de Sequelize)
async function limpiarColecciones() {
  try {
    const collections = ['fabricantes', 'productos', 'componentes'];
    for (let collection of collections) {
      await mongoose.connection.db.dropCollection(collection);
      console.log(`Colección ${collection} limpiada.`);
    }
  } catch (error) {
    console.error('Error al limpiar colecciones:', error);
  }
}

// Leer argumento de la línea de comandos
const syncDatabase = process.argv[2] === 'true'; // Comprobar si el segundo argumento es 'true'

// Iniciar la base de datos
iniciarBD(syncDatabase);

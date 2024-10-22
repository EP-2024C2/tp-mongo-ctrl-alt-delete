const seedFabricantes = require('./seeders/fabricantes-seed'); // Ajusta la ruta al seeder de fabricantes
const seedProductos = require('./seeders/productos-seed'); // Ajusta la ruta al seeder de productos
const seedComponentes = require('./seeders/componentes-seed'); // Ajusta la ruta al seeder de componentes
const seedProductoComponente = require('./seeders/producto-componente-seed'); // Ajusta la ruta al seeder de relaciones
const seedProductoFabricante = require('./seeders/producto-fabricante-seed'); // Ajusta la ruta al seeder de relaciones

const db = require('./models')

async function iniciarBD(populateDatabase) {
  try {
    await db.sequelize.sync({ force: true });

    if (populateDatabase) {
      await seedFabricantes.up(db.sequelize.getQueryInterface());
      await seedProductos.up(db.sequelize.getQueryInterface());
      await seedComponentes.up(db.sequelize.getQueryInterface());
      await seedProductoComponente.up(db.sequelize.getQueryInterface());
      await seedProductoFabricante.up(db.sequelize.getQueryInterface());
    }
    
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}
// Leer argumento de la línea de comandos
const syncDatabase = process.argv[2] === 'true'; // Comprobar si el segundo argumento es 'true'

iniciarBD(syncDatabase);

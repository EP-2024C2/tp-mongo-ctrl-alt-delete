const seedFabricantes = require('./seeders/fabricantes-seed'); // Ajusta la ruta al seeder de fabricantes
const seedProductos = require('./seeders/productos-seed'); // Ajusta la ruta al seeder de productos
const seedComponentes = require('./seeders/componentes-seed'); // Ajusta la ruta al seeder de componentes
const seedProductoComponente = require('./seeders/producto-componente-seed'); // Ajusta la ruta al seeder de relaciones
const seedProductoFabricante = require('./seeders/producto-fabricante-seed'); // Ajusta la ruta al seeder de relaciones

const db = require('./models')

async function iniciarBD() {
  try {
    await db.sequelize.sync({ force: true }); // Sincroniza la base de datos y elimina datos existentes
    console.log('Base de datos sincronizada.');


    // Ejecuta los seeders
    await seedFabricantes.up(db.sequelize.getQueryInterface());
    console.log('Seeders de Fabricantes ejecutados.');

    await seedProductos.up(db.sequelize.getQueryInterface());
    console.log('Seeders de Productos ejecutados.');

    await seedComponentes.up(db.sequelize.getQueryInterface());
    console.log('Seeders de Componentes ejecutados.');

    await seedProductoComponente.up(db.sequelize.getQueryInterface());
    console.log('Seeders de Producto_Componente ejecutados.');

    await seedProductoFabricante.up(db.sequelize.getQueryInterface());
    console.log('Seeders de Producto_Fabricante ejecutados.');

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

module.exports = iniciarBD;

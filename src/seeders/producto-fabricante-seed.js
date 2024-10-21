'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Producto_Fabricante', [
      {
        ProductoId: 1, // ID del producto relacionado
        FabricanteId: 1, // ID del fabricante relacionado
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 2,
        FabricanteId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 3,
        FabricanteId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 4,
        FabricanteId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 5,
        FabricanteId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Producto_Fabricante', null, {});
  }
};

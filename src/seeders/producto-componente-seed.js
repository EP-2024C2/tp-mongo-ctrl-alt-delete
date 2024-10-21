'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Producto_Componente', [
      {
        ProductoId: 1, // ID del producto relacionado
        ComponenteId: 1, // ID del componente relacionado (ej. tarjeta gráfica)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 1,
        ComponenteId: 2, // Otro componente para el mismo producto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 2,
        ComponenteId: 3, // ID de otro producto relacionado con su componente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 3,
        ComponenteId: 1, // Relacionando un producto con un componente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 4,
        ComponenteId: 4, // Otro producto y su componente
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductoId: 5,
        ComponenteId: 5, // Relacionando el último producto
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Producto_Componente', null, {});
  }
};

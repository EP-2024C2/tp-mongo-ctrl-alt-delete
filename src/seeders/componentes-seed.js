'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Componentes', [
      {
        nombre: 'NVIDIA GeForce RTX 3060',
        descripcion: 'Placa de video potente con 12GB de memoria GDDR6, ideal para juegos y edición de video.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'AMD Ryzen 5 5600X',
        descripcion: 'Procesador de 6 núcleos y 12 hilos, excelente para gaming y multitarea.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Corsair Vengeance LPX 16GB',
        descripcion: 'Memoria RAM DDR4 de 16GB, 3200MHz, ideal para juegos y aplicaciones exigentes.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Samsung 970 EVO Plus 1TB',
        descripcion: 'Unidad SSD NVMe de 1TB, velocidad de lectura y escritura excepcional para mejorar el rendimiento del sistema.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cooler Master Hyper 212',
        descripcion: 'Sistema de refrigeración por aire, compatible con múltiples sockets, ideal para mantener bajas temperaturas.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Componentes', null, {});
  }
};

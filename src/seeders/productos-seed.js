'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Productos', [
      {
        nombre: 'Laptop Dell',
        descripcion: 'Notebook ultradelgada con pantalla de 13 pulgadas y excelente rendimiento.',
        precio: 1299.99,
        pathImg: '/images/laptop-dell-xps-13.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'MacBook Pro 14"',
        descripcion: 'Notebook potente con procesador Apple M1, ideal para tareas exigentes.',
        precio: 1999.99,
        pathImg: '/images/macbook-pro-14.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'HP Spectre',
        descripcion: 'Notebook convertible con pantalla táctil y diseño premium de 13 pulgadas.',
        precio: 1599.99,
        pathImg: '/images/hp-spectre-x360.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Asus ROG Zephyrus',
        descripcion: 'Notebook gamer compacta con procesador AMD Ryzen y gráficos NVIDIA RTX.',
        precio: 1799.99,
        pathImg: '/images/asus-rog-zephyrus-g14.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Lenovo ThinkPad',
        descripcion: 'Notebook empresarial ultraligera con excelente duración de batería.',
        precio: 1399.99,
        pathImg: '/images/lenovo-thinkpad-x1-carbon.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Productos', null, {});
  }
};

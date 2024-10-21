'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Fabricantes', [
      {
        nombre: 'Dell',
        direccion: '1 Dell Way, Round Rock, TX',
        numeroContacto: '+1-800-456-3355',
        pathImgPerfil: '/images/fabricantes/dell-logo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Apple',
        direccion: '1 Apple Park Way, Cupertino, CA',
        numeroContacto: '+1-800-275-2273',
        pathImgPerfil: '/images/fabricantes/apple-logo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'HP',
        direccion: '1501 Page Mill Road, Palo Alto, CA',
        numeroContacto: '+1-800-474-6836',
        pathImgPerfil: '/images/fabricantes/hp-logo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Asus',
        direccion: '15 Li-Te Road, Taipei 112, Taiwan',
        numeroContacto: '+886-2-2894-3447',
        pathImgPerfil: '/images/fabricantes/asus-logo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Lenovo',
        direccion: '1009 Think Place, Morrisville, NC',
        numeroContacto: '+1-855-253-6686',
        pathImgPerfil: '/images/fabricantes/lenovo-logo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Fabricantes', null, {});
  }
};

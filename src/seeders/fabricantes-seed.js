// seeds/fabricanteSeed.js
const mongoose = require('mongoose');
const Fabricante = require('../schemas/fabricantesSchema'); // Asegúrate de importar el modelo correcto

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://admin:admindb@localhost:27017/libro?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a la base de datos');

  // Datos para insertar
  const fabricantes = [
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
  ];

  // Verificar si ya existen datos en la colección
  Fabricante.countDocuments({}).then(count => {
    if (count === 0) {
      // Insertar datos si la colección está vacía
      Fabricante.insertMany(fabricantes)
        .then(() => {
          console.log('Datos insertados correctamente');
          mongoose.disconnect(); // Cerrar la conexión
        })
        .catch(err => {
          console.error('Error al insertar los datos:', err);
          mongoose.disconnect();
        });
    } else {
      console.log('La colección ya contiene datos. No se insertaron nuevos.');
      mongoose.disconnect();
    }
  }).catch(err => {
    console.error('Error al contar los documentos:', err);
    mongoose.disconnect();
  });
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

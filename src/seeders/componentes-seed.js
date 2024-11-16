// seeds/componenteSeed.js
const mongoose = require('mongoose');
const Componente = require('../schemas/componentesSchema'); // Asegúrate de tener el modelo correcto

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://admin:admindb@localhost:27017/libro?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a la base de datos');

  // Datos para insertar
  const componentes = [
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
  ];

  // Verificar si ya existen datos en la colección
  Componente.countDocuments({}).then(count => {
    if (count === 0) {
      // Insertar datos si la colección está vacía
      Componente.insertMany(componentes)
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

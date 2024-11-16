// seeds/productoSeed.js
const mongoose = require('mongoose');
const Producto = require('../schemas/productosSchema'); // Asegúrate de importar el modelo correcto

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://admin:admindb@localhost:27017/libro?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a la base de datos');

  // Datos para insertar
  const productos = [
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
  ];

  // Verificar si ya existen datos en la colección
  Producto.countDocuments({}).then(count => {
    if (count === 0) {
      // Insertar datos si la colección está vacía
      Producto.insertMany(productos)
        .then(() => {
          console.log('Productos insertados correctamente');
          mongoose.disconnect(); // Cerrar la conexión
        })
        .catch(err => {
          console.error('Error al insertar los productos:', err);
          mongoose.disconnect();
        });
    } else {
      console.log('La colección de productos ya contiene datos. No se insertaron nuevos.');
      mongoose.disconnect();
    }
  }).catch(err => {
    console.error('Error al contar los documentos:', err);
    mongoose.disconnect();
  });
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

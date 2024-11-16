// const Componente = require('../schemas/componentesSchema'); // Importando el modelo de Mongoose
// const Producto = require('../schemas/productosSchema'); // Importando el modelo de Mongoose

// const controller = {};

// // Obtener todos los componentes
// const getAllComponentes = async (req, res) => {
//   try {
//     const data = await Componente.find(); // find() en Mongoose obtiene todos los documentos
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al obtener los componentes', error: error.message });
//   }
// };

// controller.getAllComponentes = getAllComponentes;

// // Obtener un componente por ID
// const getComponenteById = async (req, res) => {
//   const id = req.params.componenteId;

//   try {
//     const componente = await Componente.findById(id); // findById() en Mongoose
//     if (!componente) {
//       return res.status(404).json({ mensaje: `Componente con id=${id} no encontrado` });
//     }
//     res.status(200).json(componente);
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al obtener el componente', error: error.message });
//   }
// };

// controller.getComponenteById = getComponenteById;

// // Crear un nuevo componente
// const createComponente = async (req, res) => {
//   const { nombre, descripcion } = req.body;

//   try {
//     const componente = new Componente({
//       nombre,
//       descripcion
//     });

//     await componente.save(); // En Mongoose, usamos save() para guardar el documento
//     res.status(201).json(componente);
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al crear el componente', error: error.message });
//   }
// };

// controller.createComponente = createComponente;

// // Actualizar un componente por ID
// const updateComponente = async (req, res) => {
//   const { nombre, descripcion } = req.body;
//   const id = req.params.componenteId;

//   try {
//     const componente = await Componente.findByIdAndUpdate(id, { nombre, descripcion }, { new: true }); // findByIdAndUpdate actualiza el documento
//     if (!componente) {
//       return res.status(404).json({ mensaje: `Componente con id=${id} no encontrado` });
//     }
//     res.status(200).json(componente);
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al actualizar el componente', error: error.message });
//   }
// };

// controller.updateComponente = updateComponente;

// // Eliminar un componente por ID
// const deleteComponenteById = async (req, res) => {
//   const id = req.params.componenteId;

//   try {
//     const componente = await Componente.findByIdAndDelete(id); // findByIdAndDelete elimina el documento
//     if (!componente) {
//       return res.status(404).json({ mensaje: `Componente con id=${id} no encontrado` });
//     }
//     res.status(200).json({ mensaje: 'Componente eliminado' });
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al eliminar el componente', error: error.message });
//   }
// };

// controller.deleteComponenteById = deleteComponenteById;

// const getComponentWhitAllProducts = async (req, res) => {
//   const id = req.params.componenteId;

//   try {
//     const componente = await Componente.findById(id).populate('productos'); // populate() en Mongoose para obtener relaciones
//     if (!componente) {
//       return res.status(404).json({ mensaje: `Componente con id=${id} no encontrado` });
//     }
//     res.status(200).json(componente);
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al obtener el componente con productos', error: error.message });
//   }
// };

// controller.getComponentWhitAllProducts = getComponentWhitAllProducts;

// module.exports = controller;

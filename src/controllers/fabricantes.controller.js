const Fabricante = require('../schemas/fabricantesSchema');
const Producto = require('../schemas/productosSchema');

const controller = {};

// Obtener todos los fabricantes
const getAllFabricantes = async (req, res) => {
  try {
    const fabricantes = await Fabricante.find();
    res.status(200).json(fabricantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los fabricantes.' });
  }
};

controller.getAllFabricantes = getAllFabricantes;

// Obtener fabricante por ID
const getFabricanteById = async (req, res) => {
  const id = req.params.fabricanteId;
  
  try {
    const fabricante = await Fabricante.findById(id); 

    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${id} no existe.` });
    }
    
    res.status(200).json(fabricante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el fabricante.' });
  }
};

controller.getFabricanteById = getFabricanteById;

// Crear un nuevo fabricante
const createFabricante = async (req, res) => {
  const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;
  try {
    const fabricante = new Fabricante({
      nombre,
      direccion,
      numeroContacto,
      pathImgPerfil
    });
    
    console.log("Fabricante creado:", fabricante);
    await fabricante.save(); // Guarda el nuevo fabricante en la base de datos
    res.status(201).json(fabricante); // Responde con el fabricante creado
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      mensaje: 'Error al crear el fabricante.',
      error: error
     });
  }
};

controller.createFabricante = createFabricante;

// Actualizar un fabricante
const updateFabricante = async (req, res) => {
  const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;
  const id = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findByIdAndUpdate(
      id,
      { nombre, direccion, numeroContacto, pathImgPerfil },
      { new: true }
    );

    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${id} no existe.` });
    }

    res.status(200).json(fabricante); // Devuelve el fabricante actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al actualizar el fabricante.' ,
      error: error
    });
  }
};

controller.updateFabricante = updateFabricante;

// Eliminar un fabricante por ID
const deleteFabricanteById = async (req, res) => {
  const fabricanteId = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findByIdAndDelete(fabricanteId); // Elimina el fabricante

    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${fabricanteId} no existe.` });
    }

    // Eliminar el fabricante de los productos asociados
    const productos = await Producto.find({ fabricantes: fabricanteId });
    for (let producto of productos) {
      producto.fabricantes = producto.fabricantes.filter(f => f.toString() !== fabricanteId);
      await producto.save();
    }

    res.status(200).json({ mensaje: 'Fabricante eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el fabricante.' });
  }
};

controller.deleteFabricanteById = deleteFabricanteById;

// Obtener un fabricante con todos sus productos asociados
const getFabricanteWithAllProducts = async (req, res) => {
  const id = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findById(id).populate('productos');
    
    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${id} no existe.` });
    }

    res.status(200).json(fabricante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el fabricante con sus productos.' });
  }
};

controller.getFabricanteWithAllProducts = getFabricanteWithAllProducts;

// Asociar productos a un fabricante (relación bidireccional)
const addProductosToFabricante = async (req, res) => {
  const { productos } = req.body;  // Esperamos un array de productos
  const fabricanteId = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findById(fabricanteId);
    if (!fabricante) {
      return res.status(404).json({ mensaje: 'Fabricante no encontrado' });
    }

    // Asociar los productos al fabricante
    for (let productoData of productos) {
      const producto = await Producto.findById(productoData._id);
      if (!producto) {
        return res.status(404).json({ mensaje: `Producto con ID ${productoData._id} no encontrado` });
      }

      // Asociar el fabricante al producto si no está asociado
      if (!producto.fabricantes.includes(fabricante._id)) {
        producto.fabricantes.push(fabricante._id);
        await producto.save();
      }

      // Asociar el producto al fabricante si no está asociado
      if (!fabricante.productos.includes(producto._id)) {
        fabricante.productos.push(producto._id);
      }
    }

    await fabricante.save();
    res.status(200).json({ mensaje: 'Productos asociados al fabricante correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      mensaje: 'Error al asociar productos al fabricante',
      error: error
     });
  }
};

controller.addProductosToFabricante = addProductosToFabricante;

module.exports = controller;

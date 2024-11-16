const Fabricante = require('../schemas/fabricantesSchema');
const Producto = require('../schemas/productosSchema');

const controller = {};

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

const createFabricante = async (req, res) => {
  const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;

  try {
    const fabricante = new Fabricante({
      nombre,
      direccion,
      numeroContacto,
      pathImgPerfil
    });

    await fabricante.save(); // Guarda el nuevo fabricante en la base de datos
    res.status(201).json(fabricante); // Responde con el fabricante creado
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el fabricante.' });
  }
};

controller.createFabricante = createFabricante;

const updateFabricante = async (req, res) => {
  const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;
  const id = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findByIdAndUpdate(
      id, // Buscar por ID
      { nombre, direccion, numeroContacto, pathImgPerfil }, // Campos a actualizar
      { new: true } // Retorna el documento actualizado
    );

    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${id} no existe.` });
    }

    res.status(200).json(fabricante); // Devuelve el fabricante actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el fabricante.' });
  }
};

controller.updateFabricante = updateFabricante;

const deleteFabricanteById = async (req, res) => {
  const fabricanteId = req.params.fabricanteId;

  try {
    const fabricante = await Fabricante.findByIdAndDelete(fabricanteId); // Elimina el fabricante

    if (!fabricante) {
      return res.status(404).json({ mensaje: `El fabricante con id=${fabricanteId} no existe.` });
    }

    res.status(200).json({ mensaje: 'Fabricante eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el fabricante.' });
  }
};

controller.deleteFabricanteById = deleteFabricanteById;

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

module.exports = controller;

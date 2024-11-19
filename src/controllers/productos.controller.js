const Producto = require('../schemas/productosSchema');
const Fabricante = require('../schemas/fabricantesSchema');
const Componente = require('../schemas/componentesSchema');

const controller = {};

const getAllProductos = async (req, res) => {
    try {
        const data = await Producto.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.getAllProductos = getAllProductos;

const getProductoById = async (req, res) => {
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.getProductoById = getProductoById;

const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg, fabricantes } = req.body;

    try {
        for (let fabricanteId of fabricantes) {
            const fabricanteExistente = await Fabricante.findById(fabricanteId);
            if (!fabricanteExistente) {
                return res.status(400).json({ mensaje: `El fabricante con ID ${fabricanteId} no existe.` });
            }
        }

        const producto = new Producto({
            nombre,
            descripcion,
            precio,
            pathImg,
            fabricantes,  
        });

        await producto.save();

        for (let fabricanteId of fabricantes) {
            const fabricante = await Fabricante.findById(fabricanteId);
            if (fabricante) {
                fabricante.productos.push(producto._id);
                await fabricante.save(); 
            }
        }

        res.status(201).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto.',
            error: error
        });
    }
};

controller.createProducto = createProducto;

const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body;
    const id = req.params.productoId;

    try {
        const producto = await Producto.findByIdAndUpdate(id, {
            nombre,
            descripcion,
            precio,
            pathImg
        }, { new: true });

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar Producto. ',
            error: error
         });
    }
};

controller.updateProducto = updateProducto;

const deleteProductoById = async (req, res) => {
    const idProducto = req.params.productoId;
    try {
        const producto = await Producto.findByIdAndDelete(idProducto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        for (let fabricanteId of producto.fabricantes) {
            const fabricante = await Fabricante.findById(fabricanteId);
            if (fabricante) {
                fabricante.productos = fabricante.productos.filter(prodId => prodId.toString() !== idProducto);
                await fabricante.save();
            }
        }

        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.deleteProductoById = deleteProductoById;

const getProductoWithAllFabricantes = async (req, res) => {
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id).populate('fabricantes');
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.getProductoWithAllFabricantes = getProductoWithAllFabricantes;

const addFabricantesToProducto = async (req, res) => {
    const arrayFabricantes = req.body;
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        for (let fabricanteData of arrayFabricantes) {
            const fabricanteExistente = await Fabricante.findById(fabricanteData);
            if (!fabricanteExistente) {
                return res.status(400).json({ mensaje: `El fabricante con ID ${fabricanteData._id} no existe.` });
            }
            producto.fabricantes.push(fabricanteData);

            fabricanteExistente.productos.push(producto._id);
            await fabricanteExistente.save();
        }

        await producto.save();
        res.status(201).json({ message: 'Los fabricantes fueron asociados al producto' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addFabricantesToProducto = addFabricantesToProducto;

const filterProductoMinMaxPrecio = async (req, res) => {
    const { minPrecio, maxPrecio } = req.params;
    try {
        const productos = await Producto.find({
            precio: { $gte: minPrecio, $lte: maxPrecio }
        });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.filterProductoMinMaxPrecio = filterProductoMinMaxPrecio;

const addFabricanteToProductoById = async (req, res) => {
    const { productoId, fabricanteId } = req.params;
    try {
        const producto = await Producto.findById(productoId);
        const fabricante = await Fabricante.findById(fabricanteId);
        if (!producto || !fabricante) {
            return res.status(404).json({ message: 'Producto o fabricante no encontrado' });
        }

        producto.fabricantes.push(fabricante);
        await producto.save();

        fabricante.productos.push(producto._id);
        await fabricante.save();

        res.status(201).json({ message: 'Fabricante asociado al producto con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addFabricanteToProductoById = addFabricanteToProductoById;

const addComponenteToProducto = async (req, res) => {
    const { productoId } = req.params;
    const { componentes } = req.body; 

    try {
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        for (let componenteData of componentes) {
            producto.componentes.push(componenteData);
        }

        await producto.save();
        res.status(201).json({ message: 'Componentes asociados al producto con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error al asociar componentes al producto',
            error: error
         });
    }
};

controller.addComponenteToProducto = addComponenteToProducto;

module.exports = controller;

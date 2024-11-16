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
        const producto = await Producto.findById(id).populate('fabricantes').populate('componentes');
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.getProductoById = getProductoById;

// Crear un nuevo producto
const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body;
    try {
        const producto = new Producto({
            nombre,
            descripcion,
            precio,
            pathImg
        });
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
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

// Obtener un producto con todos los componentes
const getProductoWithAllComponents = async (req, res) => {
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id).populate('componentes');
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.getProductoWithAllComponents = getProductoWithAllComponents;

// Asociar fabricantes a un producto
const addFabricantesToProducto = async (req, res) => {
    const arrayFabricantes = req.body;
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Asociar fabricantes
        for (let fabricanteData of arrayFabricantes) {
            const fabricante = new Fabricante(fabricanteData);
            await fabricante.save();
            producto.fabricantes.push(fabricante);
        }
        await producto.save();
        res.status(201).json({ message: 'Los fabricantes fueron asociados al producto' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addFabricantesToProducto = addFabricantesToProducto;

// Asociar componentes a un producto
const addComponentesToProducto = async (req, res) => {
    const arrayComponentes = req.body;
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Asociar componentes
        for (let componenteData of arrayComponentes) {
            const componente = new Componente(componenteData);
            await componente.save();
            producto.componentes.push(componente);
        }
        await producto.save();
        res.status(201).json({ message: 'Los componentes fueron asociados al producto' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addComponentesToProducto = addComponentesToProducto;

// Filtrar productos por precio
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

// Asociar un fabricante a un producto por ID
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
        res.status(201).json({ message: 'Fabricante asociado al producto con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addFabricanteToProductoById = addFabricanteToProductoById;

// Asociar un componente a un producto por ID
const addComponenteToProductoById = async (req, res) => {
    const { productoId, componenteId } = req.params;
    try {
        const producto = await Producto.findById(productoId);
        const componente = await Componente.findById(componenteId);
        if (!producto || !componente) {
            return res.status(404).json({ message: 'Producto o componente no encontrado' });
        }
        producto.componentes.push(componente);
        await producto.save();
        res.status(201).json({ message: 'Componente asociado al producto con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addComponenteToProductoById = addComponenteToProductoById;

module.exports = controller;

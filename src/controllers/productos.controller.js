const Producto = require('../schemas/productosSchema');
const Fabricante = require('../schemas/fabricantesSchema');
const Componente = require('../schemas/componentesSchema');

const controller = {};

// Obtener todos los productos
const getAllProductos = async (req, res) => {
    try {
        const data = await Producto.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.getAllProductos = getAllProductos;

// Obtener producto por ID
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

// Crear un nuevo producto
const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg, fabricantes } = req.body;

    try {
        // Verificar si todos los fabricantes existen
        for (let fabricanteId of fabricantes) {
            const fabricanteExistente = await Fabricante.findById(fabricanteId);
            if (!fabricanteExistente) {
                return res.status(400).json({ mensaje: `El fabricante con ID ${fabricanteId} no existe.` });
            }
        }

        // Si todos los fabricantes existen, creamos el producto
        const producto = new Producto({
            nombre,
            descripcion,
            precio,
            pathImg,
            fabricantes,  // Asignamos el array de fabricantes al producto
        });

        await producto.save();

        // Ahora, actualizar los fabricantes para que cada uno tenga el ID del producto asociado
        for (let fabricanteId of fabricantes) {
            const fabricante = await Fabricante.findById(fabricanteId);
            if (fabricante) {
                fabricante.productos.push(producto._id); // Añadimos el producto al array de productos del fabricante
                await fabricante.save(); // Guardamos el fabricante actualizado
            }
        }

        res.status(201).json(producto); // Responde con el producto creado
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el producto.' });
    }
};

controller.createProducto = createProducto;

// Actualizar un producto por ID
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

// Eliminar un producto por ID
const deleteProductoById = async (req, res) => {
    const idProducto = req.params.productoId;
    try {
        const producto = await Producto.findByIdAndDelete(idProducto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminar el ID del producto de los fabricantes relacionados
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

// Obtener un producto con todos los fabricantes asociados
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

// Asociar fabricantes a un producto
const addFabricantesToProducto = async (req, res) => {
    const arrayFabricantes = req.body;
    const id = req.params.productoId;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si todos los fabricantes existen antes de asociarlos
        for (let fabricanteData of arrayFabricantes) {
            const fabricanteExistente = await Fabricante.findById(fabricanteData);
            if (!fabricanteExistente) {
                return res.status(400).json({ mensaje: `El fabricante con ID ${fabricanteData._id} no existe.` });
            }
            producto.fabricantes.push(fabricanteData);

            // Actualizar también el fabricante para agregar el producto a su lista
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

        // Asociar el fabricante al producto
        producto.fabricantes.push(fabricante);
        await producto.save();

        // También actualizamos el fabricante para agregar el producto
        fabricante.productos.push(producto._id);
        await fabricante.save();

        res.status(201).json({ message: 'Fabricante asociado al producto con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.addFabricanteToProductoById = addFabricanteToProductoById;

// Asociar un componente a un producto por ID
const addComponenteToProducto = async (req, res) => {
    const { productoId } = req.params;
    const { componentes } = req.body; // Esperamos un array de componentes (con datos completos)

    try {
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Asociar componentes al producto
        console.log(componentes)
        for (let componenteData of componentes) {
            producto.componentes.push(componenteData);
        }

        await producto.save();
        res.status(201).json({ message: 'Componentes asociados al producto con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al asociar componentes al producto',
            error: error
         });
    }
};

controller.addComponenteToProducto = addComponenteToProducto;

module.exports = controller;

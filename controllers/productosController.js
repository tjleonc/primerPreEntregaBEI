let productos = []; // Base de datos simulada

exports.obtenerProductos = (req, res) => {
    res.json(productos);
};

exports.crearProducto = (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.file ? req.file.filename : null // Puedes manejar la lógica de las imágenes como desees
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
};

exports.actualizarProducto = (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;
    producto.imagen = req.file ? req.file.filename : producto.imagen;
    res.json(producto);
};

exports.eliminarProducto = (req, res) => {
    productos = productos.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
};

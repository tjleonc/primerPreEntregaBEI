const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuración de Multer para manejar archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let productos = [];

router.get('/', (req, res) => {
    res.render('index', { productos });
});

router.get('/agregar', (req, res) => {
    res.render('agregar');
});

router.post('/agregar', upload.single('imagen'), (req, res) => {
    const nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.file ? req.file.filename : null
    };
    productos.push(nuevoProducto);
    res.redirect('/productos');
});

module.exports = router;

const express = require('express');
const path = require('path');
const app = express();
const productosRouter = require('./routes/productos');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/productos', productosRouter);

app.get('/', (req, res) => {
    res.redirect('/productos');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

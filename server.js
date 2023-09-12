const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const path = require('path'); // Agrega la importación de 'path'
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Configura el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views')); // Directorio de vistas

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de contacto
app.get('/contacto', (req, res) => {
  res.render('form', { title: 'Formulario' });
});

// Ruta para manejar el formulario POST
app.post('/contacto', [
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('email').isEmail().withMessage('El correo electrónico no es válido'),
  check('birthdate').isDate().withMessage('La fecha de nacimiento no es válida'),
  check('message').isLength({ max: 50 }).withMessage('El mensaje no puede tener más de 50 caracteres')
], (req, res) => {
  console.log('Formulario enviado:', req.body); // Agrega este console.log
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('form', { title: 'Formulario', errors: errors.array() });
  }
  res.render('success', { title: 'Éxito', data: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

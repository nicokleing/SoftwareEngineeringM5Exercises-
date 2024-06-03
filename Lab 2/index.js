const express = require('express');
const app = express();
const path = require('path');

// Importa todas las rutas del calculador
const calculatorRoutes = require('./routes/calculatorRoutes');

// Configura el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Mapea las rutas del calculador a nuestra aplicación
app.use(calculatorRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

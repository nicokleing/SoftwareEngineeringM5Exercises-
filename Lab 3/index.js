const express = require('express');
const path = require('path');  // Asegúrate de que path esté importado
const app = express();
const calculatorRoutes = require('./routes/calculatorRoutes');
const port = 3000;

// Usar el middleware express.static para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de la calculadora
app.use('/', calculatorRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

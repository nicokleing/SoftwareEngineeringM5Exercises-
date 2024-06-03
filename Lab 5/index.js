const express = require("express"); // Importa el paquete express
const friendRoutes = require('./routes/friendRoutes'); // Importa las rutas de amigos

const app = express(); // Crea una nueva instancia de una aplicación Express
const port = 3000; // Define el puerto en el cual la app correrá

// Middleware para analizar solicitudes con contenido JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/', express.static('public'));

// Usa las rutas de amigos para las solicitudes a '/friends'
app.use('/friends', friendRoutes);

// Inicia la aplicación en el puerto especificado
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require('express');
const path = require('path');

require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear server de express
const app = express();

// Configuración de CORS
app.use(cors()); // se habilita cors

// Lectura y parseo del body
app.use(express.json()); // se habilita json

// Base de datos
dbConnection(); // conexion a la base de datos


// Rutas
app.use('/api/productos/', require('./routes/producto'));

app.listen(process.env.PORT, () => {
    console.log('El servidor esta corriendo en el puerto ' + process.env.PORT);
});
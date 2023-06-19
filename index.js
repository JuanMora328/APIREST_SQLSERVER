const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./DB/config');


//Se crea el servidor de Express
const app = express();

//Ejecutar la conexión con la DB
dbConnection();

//CORS es un modulo que nos permite recibir peticiones desde cualquier otro servidor
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/agente', require('./routes/agentes'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo ${process.env.PORT} `);
});
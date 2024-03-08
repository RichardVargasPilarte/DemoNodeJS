const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {

        });
        console.log('Conexion a la base de datos establecida con exito');
    } catch (error) {
        console.error(error);
        throw new Error('Error al conectar se a la base de datos');
    }
}

module.exports = {
    dbConnection
};
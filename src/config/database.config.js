import mongoose from 'mongoose';
import {insertBaseProducts} from '../utils.js'//Configuración Inicial

// Configura cadena de conexión
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;

// Configura carga y conexión
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    insertBaseProducts()
});

export default db;
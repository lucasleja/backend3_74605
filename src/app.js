import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// 🆕 Importamos la función setupSwagger desde nuestro nuevo archivo
import { setupSwagger } from './utils/swagger.js'; // Asegúrate que la ruta sea correcta


import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT||8080;
/* const connection = mongoose.connect(`URL DE MONGO`) */

const PathDB = 'mongodb+srv://lejarragalucas:808MJQbvJmz5ZhYF@cluster0.27oim.mongodb.net/backend_70290?retryWrites=true&w=majority&appName=Cluster0'
const connectMongoDB = async () => {
    try {
        await mongoose.connect(PathDB)
        console.log("Conectado a la base de datos MongoDB");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB()


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Es bueno mantener este middleware
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.use('/api/mocks', mocksRouter); 

// 🆕 Configuración de Swagger UI: Llamamos a la función setupSwagger
setupSwagger(app); // Pasamos la instancia de Express 'app'

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

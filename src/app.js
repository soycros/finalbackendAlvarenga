import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import userRouter from './routes/userRouter.js';
import sessionsRouter from './routes/sessions.router.js';
import passwordRouter from './routes/password.router.js';
import './config/passport.config.js';

dotenv.config();

const app = express();

// Conexión a MongoDB
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/class-zero';
mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Rutas
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/password', passwordRouter);

// Inicio del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

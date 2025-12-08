import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Routers
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/userRouter.js';
import sessionsRouter from './routes/sessions.router.js';
import { passwordRouter } from './routes/password.router.js';
import purchaseRouter from './routes/purchase.router.js';
import productsRouter from './routes/products.router.js';
import adoptionRouter from './routes/adoption.router.js';
import mocksRouter from './routes/mocks.router.js';
import petsRouter from './routes/pets.router.js';

// Configuración de Passport
import './config/passport.config.js';

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// ✅ Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Final Backend API',
      version: '1.0.0',
      description: 'Documentación de la API del proyecto final',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Rutas
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/password', passwordRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/adoptions', adoptionRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/pets', petsRouter);

// ✅ Exportar la app SIEMPRE (para tests y producción)
export default app;

// 🚀 Conexión a MongoDB + servidor SOLO si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/class-zero';

  mongoose.connect(uri)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión:', err));

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
    console.log(`📖 Swagger disponible en http://localhost:${PORT}/api/docs`);
  });
}

console.log("✅ app.js exportado correctamente");

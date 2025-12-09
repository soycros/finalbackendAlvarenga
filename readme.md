# Express + Mongoose

## 📌 Consigna
- Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB llamada **“class-zero”** a través de mongoose.
- Crear un model de usuarios llamado **`userModel.js`** que utilice una colección llamada **“users”** y tenga la siguiente estructura de datos:
  - `name`: string, required.
  - `age`: number, required.
  - `email`: string, required, unique.
- Crear un router llamado **`userRouter.js`** que tenga su ruta principal en **`/api/users`**.
- Desarrollar en el router los endpoints correspondientes al CRUD pensado para trabajar con el model de forma asíncrona.
- Corroborar los resultados con Postman.

---

# Proyecto Final Backend

## 🐳 Imagen en Docker Hub
Disponible en: [soycros/finalbackend-alvarenga:1.0.0](https://hub.docker.com/r/soycros/finalbackend-alvarenga)

---

## 🚀 Ejecutar con Docker

### Opción A: Docker Run
```bash
docker run -p 8080:8080 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/class-zero" \
  -e MAIL_USER="fakeuser@example.com" \
  -e MAIL_PASS="fakepassword123" \
  soycros/finalbackend-alvarenga:1.0.0
Opción B: Docker Compose (App + Mongo)
version: "3.9"
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/class-zero
      - MAIL_USER=fakeuser@example.com
      - MAIL_PASS=fakepassword123
    volumes:
      - .:/app
      - /app/node_modules
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:


Ejecutar:
docker compose up --build


🔑 Variables de entorno
PORT (default: 8080)

MONGO_URI (ejemplo: mongodb://mongo:27017/class-zero)

MAIL_USER (dummy: fakeuser@example.com)

MAIL_PASS (dummy: fakepassword123)

📖 Documentación Swagger
Disponible en: http://localhost:8080/api/docs

✅ Endpoints principales
Users
POST /api/users → Registrar usuario

GET /api/users → Listar usuarios (requiere JWT + rol admin)

DELETE /api/users/:id → Eliminar usuario (requiere JWT + rol admin)

Adoptions
POST /api/adoptions → Crear adopción

GET /api/adoptions → Listar adopciones

GET /api/adoptions/:id → Obtener adopción por ID

PUT /api/adoptions/:id → Actualizar adopción

DELETE /api/adoptions/:id → Eliminar adopción

🧪 Tests
Los tests funcionales se ejecutan con:

bash
NODE_ENV=test npm run test:e2e
Incluyen cobertura completa para adoption.router.js.


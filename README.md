# Event Platform API

API REST para una Plataforma de Eventos e Inscripciones, desarrollada con Node.js, Express y MongoDB.

## Temática del proyecto

El proyecto representa la base backend de una plataforma donde los usuarios podrán registrarse, iniciar sesión, consultar eventos e inscribirse a actividades.

Esta primera iteración se enfoca en la arquitectura inicial del proyecto, separando responsabilidades en rutas, controladores, servicios, repositorios, DAOs y modelos.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- JavaScript ES Modules

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/HSC2121/event-platform-api.git
cd event-platform-api

Instalar dependencias:

npm install
Configuración de variables de entorno

Crear un archivo .env en la raíz del proyecto usando como referencia .env.example.

PORT=8080
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/event_platform
JWT_SECRET=your_jwt_secret_here

Ejecución del proyecto

Modo desarrollo:

npm run dev

Modo producción:

npm start

Ejecutar pruebas:

npm test
Estructura de carpetas
src/
├── app.js
├── server.js
├── config/
│   ├── env.config.js
│   └── database.config.js
├── routes/
│   ├── index.routes.js
│   ├── health.routes.js
│   ├── events.routes.js
│   └── sessions.routes.js
├── controllers/
│   ├── health.controller.js
│   ├── events.controller.js
│   └── sessions.controller.js
├── services/
│   ├── events.service.js
│   └── sessions.service.js
├── repositories/
│   ├── events.repository.js
│   └── sessions.repository.js
├── dao/
│   ├── events.dao.js
│   └── users.dao.js
├── models/
│   ├── event.model.js
│   └── user.model.js
├── middlewares/
│   └── error.middleware.js
└── utils/
Documentación de la API
Health check

Verifica que el servidor esté funcionando.

GET /api/health

Respuesta esperada:

{
  "status": "success",
  "message": "Server is active"
}
Events

Obtiene el listado de eventos desde la capa DAO.

GET /api/events

Respuesta esperada:

{
  "status": "success",
  "payload": []
}

Flujo implementado:

Route -> Controller -> Service -> Repository -> DAO -> Model
Sessions

Ruta inicial para el recurso sessions. Todavía no incluye lógica de autenticación.

GET /api/sessions

Respuesta esperada:

{
  "status": "success",
  "message": "Sessions route available"
}
```

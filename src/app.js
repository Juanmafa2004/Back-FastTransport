// import express, { json } from 'express';

// app.js
import express, { json } from 'express';
import cors from 'cors';
import { createPool } from 'mysql2/promise';
import { swaggerUi, swaggerSpec } from './swagger.js';
import routerUsers from './controllers/users.js';

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(cors());
app.use(json());



// documentacion swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/usuarios', routerUsers); // ✅ Aquí estás registrando las rutas


// Configuración de la conexión a MySQL
const pool = createPool({
  host: 'localhost', // o tu IP/host de base de datos
  password: 'tu_contraseña_mysql',
  database: 'fast_transport',
});


// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

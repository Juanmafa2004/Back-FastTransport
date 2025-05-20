// import express, { json } from 'express';

// app.js
import express, { json } from 'express';
import cors from 'cors';
import { createPool } from 'mysql2/promise';
import { swaggerUi, swaggerSpec } from './swagger.js';
import routerUsers from './controllers/users.js';
import routerClientes from './controllers/clientes.js';
import routerEstadoEnvio from './controllers/estadoEnvio.js';
import routerRutas from './controllers/rutas.js';
import routerEnvio from './controllers/envio.js';
import { handleError } from './util/responseUtil.js';
const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(cors());
app.use(json());



// documentacion swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/usuarios', routerUsers); // ✅ Aquí estás registrando las rutas
app.use('/clientes', routerClientes); // ✅ Aquí estás registrando las rutas
app.use('/estado_envio', routerEstadoEnvio); // ✅ Aquí estás registrando las rutas
app.use('/envio', routerEnvio); // ✅ Aquí estás registrando las rutas
app.use('/rutas', routerRutas); // ✅ Aquí estás registrando las rutas


app.use(handleError);


// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

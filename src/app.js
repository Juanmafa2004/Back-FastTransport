import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { swaggerUi, swaggerSpec } from './swagger.js';
import routerUsers from './controllers/users.js';
import routerClientes from './controllers/clientes.js';
import routerEstadoEnvio from './controllers/estadoEnvio.js';
import routerRutas from './controllers/rutas.js';
import routerEnvio from './controllers/envio.js';
import routerConductor from './controllers/conductor.js';
import { handleError } from './util/responseUtil.js';
import { PORT } from './config.js';
const app = express();


// Middleware
app.use(corsMiddleware());
app.use(json());
app.disable('x-powered-by');



// documentacion swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/usuarios', routerUsers); // ✅ Aquí estás registrando las rutas
app.use('/clientes', routerClientes); // ✅ Aquí estás registrando las rutas
app.use('/estado_envio', routerEstadoEnvio); // ✅ Aquí estás registrando las rutas
app.use('/envio', routerEnvio); // ✅ Aquí estás registrando las rutas
app.use('/rutas', routerRutas); // ✅ Aquí estás registrando las rutas
app.use('/conductor', routerConductor); // ✅ Aquí estás registrando las rutas

app.use(handleError);


// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

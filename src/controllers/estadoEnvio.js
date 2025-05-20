import { Router } from 'express';
import { getAllEstadoEnvio } from '../handler/HandleEstadoEnvio.js';
import { sendResponse } from '../util/responseUtil.js';


const routerEstadoEnvio = Router();

/**
 * @swagger
 * /estado_envio:
 *   get:
 *     summary: Obtiene todos los estados de envío (puede filtrar por id_estado_envio y/o nombre_estado)
 *     tags:
 *       - EstadoEnvio
 *     parameters:
 *       - in: query
 *         name: id_estado_envio
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del estado de envío para filtrar
 *       - in: query
 *         name: nombre_estado
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del estado de envío para filtrar
 *     responses:
 *       200:
 *         description: Lista de estados de envío obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error al obtener los estados de envío
 */
routerEstadoEnvio.get('/', async (req, res) => {
    try {
        const { id_estado_envio, nombre_estado } = req.query;
        const params = {};
        if (id_estado_envio) params.id_estado_envio = Number(id_estado_envio);
        if (nombre_estado) params.nombre_estado = nombre_estado;

        const estadoEnvio = await getAllEstadoEnvio(params);
        sendResponse(res, 200, 'Estados de envío obtenidos correctamente', estadoEnvio);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener los estados de envío');
    }
})
export default routerEstadoEnvio;
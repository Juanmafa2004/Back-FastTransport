import { Router } from 'express';
import { getAllEnvio } from '../handler/handleEnvio.js';
import { sendResponse } from '../util/responseUtil.js';

const routerEnvio = Router();

/**
 * @swagger
 * /envio:
 *   get:
 *     summary: Obtiene todos los envíos (puede filtrar por id_envio, id_cliente o id_usuario)
 *     tags:
 *       - Envio
 *     parameters:
 *       - in: query
 *         name: id_envio
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del envío para filtrar
 *       - in: query
 *         name: id_cliente
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del cliente para filtrar
 *       - in: query
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del usuario para filtrar
 *     responses:
 *       200:
 *         description: Lista de envíos obtenida correctamente
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
 *         description: Error al obtener los envíos
 */

routerEnvio.get('/', async (req, res) => {
    try {
        const { id_estado_envio, nombre_estado } = req.query;
        const params = {};
        if (id_estado_envio) params.id_estado_envio = Number(id_estado_envio);
        if (nombre_estado) params.nombre_estado = nombre_estado;

        const estadoEnvio = await getAllEnvio(params);
        sendResponse(res, 200, 'Estados de envío obtenidos correctamente', estadoEnvio);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener los estados de envío');
    }
})

export default routerEnvio;


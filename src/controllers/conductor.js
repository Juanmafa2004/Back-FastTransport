import { Router } from 'express';
import { sendResponse } from '../util/responseUtil.js';
import { getAllConductor } from '../handler/handleConductor.js';

const routerConductor = Router();

/**
 * @swagger
 * /conductor:
 *   get:
 *     summary: Obtiene todos los conductores (puede filtrar por id_conductor y/o nombre)
 *     tags:
 *       - Conductor
 *     parameters:
 *       - in: query
 *         name: id_conductor
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del conductor para filtrar
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del conductor para filtrar
 *       - in: query
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del usuario para filtrar
 *     responses:
 *       200:
 *         description: Lista de conductores obtenida correctamente
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
 *         description: Error al obtener los conductores
 */
routerConductor.get('/', async (req, res) => {
    try {
        const { id_conductor, nombre,id_usuario } = req.query;
        const params = {};
        if (id_conductor) params.id_conductor = Number(id_conductor);
        if (nombre) params.nombre = nombre;
        if (id_usuario) params.id_usuario = Number(id_usuario);

        const conductores = await getAllConductor(params);
        sendResponse(res, 200, 'Conductores obtenidos correctamente', conductores);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener los conductores');
    }
});

export default routerConductor;
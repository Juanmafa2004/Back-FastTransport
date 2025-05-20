import { Router } from 'express';
import { sendResponse } from '../util/responseUtil.js';
import {getAllRutas} from '../handler/handleRutas.js';

const routerRutas = Router();

/**
 * @swagger
 * /rutas:
 *   get:
 *     summary: Obtiene todos las rutas (puede filtrar por id_ruta y/o nombre_ruta)
 *     tags:
 *       - Rutas
 *     parameters:
 *       - in: query
 *         name: id_ruta
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del ruta para filtrar
 *       - in: query
 *         name: nombre_ruta
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nombre de la ruta para filtrar
 *     responses:
 *       200:
 *         description: Lista de rutas obtenidas correctamente
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
 *         description: Error al obtener las Rutas
 */
routerRutas.get('/', async (req, res) => {
    try {
        const { id_ruta, nombre_ruta } = req.query;
        const params = {};
        if (id_ruta) params.id_ruta = Number(id_ruta);
        if (nombre_ruta) params.nombre_ruta = nombre_ruta;

        const rutas = await getAllRutas(params);
        sendResponse(res, 200, 'Rutas obtenidas correctamente', rutas);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener las Rutas');
    }});

export default routerRutas;
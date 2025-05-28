import { Router } from 'express';
import { sendResponse } from '../util/responseUtil.js';
import { getAllRutas, getRutasByConductor, updateRuta, getAllRutasActivate } from '../handler/handleRutas.js';

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
    }
});

/**
 * @swagger
 * /rutas/conductor/{id_conductor}:
 *   get:
 *     summary: Obtiene todas las rutas de un conductor específico
 *     tags:
 *       - Rutas
 *     parameters:
 *       - in: path
 *         name: id_conductor
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del conductor
 *     responses:
 *       200:
 *         description: Rutas obtenidas correctamente
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
 *         description: Error al obtener las rutas del conductor
 */
routerRutas.get('/conductor/:id_conductor', async (req, res) => {
    try {
        const { id_conductor } = req.params;
        const rutas = await getRutasByConductor(id_conductor);
        sendResponse(res, 200, 'Rutas obtenidas correctamente', rutas);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener las rutas del conductor');
    }
});

/**
 * @swagger
 * /rutas/{id_ruta}:
 *   patch:
 *     summary: Modifica una ruta por su ID
 *     tags:
 *       - Rutas
 *     parameters:
 *       - in: path
 *         name: id_ruta
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_ruta:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               id_estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ruta actualizada correctamente
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
 *                   type: object
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error al actualizar la ruta
 */

routerRutas.patch('/:id_ruta', async (req, res) => {
    try {
        const { id_ruta } = req.params;
        const data = req.body;
        const result = await updateRuta(Number(id_ruta), data);
        if (result.affectedRows === 0) {
            sendResponse(res, 404, 'Ruta no encontrada');
        } else {
            // Obtener la ruta actualizada
            const rutas = await getAllRutas({ id_ruta: Number(id_ruta) });
            sendResponse(res, 200, 'Ruta actualizada correctamente', rutas[0]);
        }
    } catch (error) {
        sendResponse(res, 500, 'Error al actualizar la ruta');
    }
});

/**
 * @swagger
 * /rutas/activas:
 *   get:
 *     summary: Obtiene todas las rutas activas (id_estado = 1, puede filtrar por id_ruta y/o nombre_ruta)
 *     tags:
 *       - Rutas
 *     parameters:
 *       - in: query
 *         name: id_ruta
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID de la ruta para filtrar
 *       - in: query
 *         name: nombre_ruta
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre de la ruta para filtrar
 *     responses:
 *       200:
 *         description: Lista de rutas activas obtenida correctamente
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
 *         description: Error al obtener las rutas activas
 */
routerRutas.get('/activas', async (req, res) => {
    try {
        const { id_ruta, nombre_ruta } = req.query;
        const params = {};
        if (id_ruta) params.id_ruta = Number(id_ruta);
        if (nombre_ruta) params.nombre_ruta = nombre_ruta;

        const rutas = await getAllRutasActivate(params);
        sendResponse(res, 200, 'Rutas activas obtenidas correctamente', rutas);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener las rutas activas');
    }
});

export default routerRutas;
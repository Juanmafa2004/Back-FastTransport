import { Router } from 'express';
import { getAllEnvio, createEnvio, updateEnvio } from '../handler/handleEnvio.js';
import { sendResponse } from '../util/responseUtil.js';

const routerEnvio = Router();

/**
 * @swagger
 * /envio:
 *   get:
 *     summary: Obtiene todos los envíos (puede filtrar por id_envio, id_cliente, id_usuario o id_ruta)
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
 *       - in: query
 *         name: id_ruta
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID de la ruta para filtrar
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
        const { id_envio, id_cliente, id_usuario, id_ruta } = req.query;
        const params = {};
        if (id_envio) params.id_envio = Number(id_envio);
        if (id_cliente) params.id_cliente = Number(id_cliente);
        if (id_usuario) params.id_usuario = Number(id_usuario);
        if (id_ruta) params.id_ruta = Number(id_ruta);

        const envios = await getAllEnvio(params);
        sendResponse(res, 200, 'Envíos obtenidos correctamente', envios);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener los envíos');
    }
});

/**
 * @swagger
 * /envio:
 *   post:
 *     summary: Crea un nuevo envío
 *     tags:
 *       - Envio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *               id_ruta:
 *                 type: integer
 *               id_estado_envio:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               fecha_solicitud:
 *                 type: string
 *                 format: date
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               direccion_origen:
 *                 type: string
 *               direccion_destino:
 *                 type: string
 *     responses:
 *       201:
 *         description: Envío creado correctamente
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
 *       500:
 *         description: Error al crear el envío
 */
routerEnvio.post('/', async (req, res) => {
    try {
        const envio = req.body;
        const result = await createEnvio(envio);
        sendResponse(res, 201, 'Envío creado correctamente', result);
    } catch (error) {
        sendResponse(res, 500, 'Error al crear el envío');
    }
});

/**
 * @swagger
 * /envio/{id_envio}:
 *   patch:
 *     summary: Modifica un envío por su ID
 *     tags:
 *       - Envio
 *     parameters:
 *       - in: path
 *         name: id_envio
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del envío a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *               id_estado_envio:
 *                 type: integer
 *               direccion_origen:
 *                 type: string
 *               direccion_destino:
 *                 type: string
 *               fecha_solicitud:
 *                 type: string
 *                 format: date
 *               fecha_entrega:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *               id_ruta:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Envío actualizado correctamente
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
 *         description: Envío no encontrado
 *       500:
 *         description: Error al actualizar el envío
 */
routerEnvio.patch('/:id_envio', async (req, res) => {
    try {
        const { id_envio } = req.params;
        const data = req.body;
        const result = await updateEnvio(Number(id_envio), data);
        if (result.affectedRows === 0) {
            sendResponse(res, 404, 'Envío no encontrado');
        } else {
            sendResponse(res, 200, 'Envío actualizado correctamente', result);
        }
    } catch (error) {
        sendResponse(res, 500, 'Error al actualizar el envío');
    }
});

export default routerEnvio;


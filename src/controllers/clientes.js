import { Router } from 'express';
import { getAllClientes } from '../handler/handleClientes.js';
import { sendResponse } from '../util/responseUtil.js';

const routerClientes = Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtiene todos los clientes (puede filtrar por id_cliente y/o id_usuario)
 *     tags:
 *       - Clientes
 *     parameters:
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
 *         description: Lista de clientes obtenida correctamente
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
 *         description: Error al obtener los clientes
 */
routerClientes.get('/', async (req, res) => {
    try {
        const { id_cliente, id_usuario } = req.query;
        const params = {};
        if (id_cliente) params.id_cliente = Number(id_cliente);
        if (id_usuario) params.id_usuario = Number(id_usuario);

        const clientes = await getAllClientes(params);
        sendResponse(res, 200, 'Clientes obtenidos correctamente', clientes);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener los clientes');
    }
});

export default routerClientes;
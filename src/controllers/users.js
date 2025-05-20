import { Router } from 'express';
import { getAllUsers,loginUser,findUserByCorreo } from '../handler/handlerusers.js';//de la bd
import { sendResponse } from '../util/responseUtil.js';


const routerUsers = Router();
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
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
 *         description: Error al obtener los usuarios
 */
routerUsers.get('/', async (req, res) => {
     try {
        const users = await getAllUsers();
        sendResponse(res, 200, 'Usuarios obtenidos correctamente', users);
    } catch (error) {
        sendResponse(res, 500, 'Error al obtener los usuarios');
    }
});

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve id_rol y rol
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
 *                   properties:
 *                     id_rol:
 *                       type: integer
 *                     rol:
 *                       type: string
 *       401:
 *         description: Credenciales incorrectas
 */
routerUsers.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const userByCorreo = await findUserByCorreo(correo);
        if (!userByCorreo) {
            sendResponse(res, 400, 'Usuario no registrado');
            return;
        }
        const user = await loginUser(correo, contrasena);
        if (user) {
            sendResponse(res, 200, 'Login exitoso', user);
        } else {
            // Aquí podrías enviar un correo notificando el intento fallido
            sendResponse(res, 401, 'El usuario y/o la contraseña son incorrectos');
        }
    } catch (error) {
        sendResponse(res, 500, 'Error en el login');
    }
});

export default routerUsers;
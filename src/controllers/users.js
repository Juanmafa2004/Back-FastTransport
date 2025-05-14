import { Router } from 'express';
import { getAllUsers } from '../handler/handlerusers.js';//de la bd


const routerUsers = Router();
routerUsers.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

export default routerUsers;
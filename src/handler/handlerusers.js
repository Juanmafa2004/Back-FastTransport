import { connection } from '../db.js';



export const getAllUsers = async () => {
    try {
        const [rows] = await connection.query('SELECT * FROM usuario;');
        return rows;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}



export const loginUser = async (correo, contrasena) => {
    try {
        const [rows] = await connection.query(
            `SELECT u.id_rol, r.nombre_rol AS rol,u.correo
             FROM usuario u
             JOIN rol r ON u.id_rol = r.id_rol
             WHERE u.correo = ? AND u.contrasena = ?`,
            [correo, contrasena]
        );
        return rows[0] || null;
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw error;
    }
};


export const findUserByCorreo = async (correo) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM usuario WHERE correo = ?',
            [correo]
        );
        return rows[0] || null;
    } catch (error) {
        console.error('Error en findUserByCorreo:', error);
        throw error;
    }
};
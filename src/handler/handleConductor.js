import { connection } from "../db.js";


export const getAllConductor = async (params = {}) => {
    try {
        let query = 'SELECT * FROM conductor';
        const values = [];
        const conditions = [];

        if (params.id_conductor) {
            conditions.push('id_conductor = ?');
            values.push(params.id_conductor);
        }
        if (params.nombre) {
            conditions.push('nombre = ?');
            values.push(params.nombre);
        }
        if(params.id_usuario) {
            conditions.push('id_usuario = ?');
            values.push(params.id_usuario);
        }
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await connection.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error al obtener los conductores:', error);
        throw error;
    }
}
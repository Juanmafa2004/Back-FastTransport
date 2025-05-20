import { connection } from "../db.js";


export const getAllEstadoEnvio = async (params = {}) => {
    try {
        let query = 'SELECT * FROM estado_envio';
        const values = [];
        const conditions = [];

        if (params.id_estado_envio) {
            conditions.push('id_estado_envio = ?');
            values.push(params.id_estado_envio);
        }
        if (params.nombre_estado) {
            conditions.push('nombre_estado = ?');
            values.push(params.nombre_estado);
        }
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await connection.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error al obtener los estados de envío:', error);
        throw error;
    }
}
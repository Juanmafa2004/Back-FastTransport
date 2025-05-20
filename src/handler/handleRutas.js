import { connection } from "../db.js";


export const getAllRutas = async (params = {}) => {
    try {
        let query = 'SELECT * FROM ruta';
        const values = [];
        const conditions = [];

        if (params.id_ruta) {
            conditions.push('id_ruta = ?');
            values.push(params.id_ruta);
        }
        if (params.nombre_ruta) {
            conditions.push('nombre_ruta = ?');
            values.push(params.nombre_ruta);
        }
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await connection.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error al obtener las rutas:', error);
        throw error;
    }
}

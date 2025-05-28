import { connection } from "../db.js";


export const getAllRutas = async (params = {}) => {
    try {
        let query = 'SELECT * FROM ruta';
        const values = [];
        const conditions = [];

        // Filtro fijo: solo rutas con id_estado = 1

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
export const getAllRutasActivate = async (params = {}) => {
    try {
        let query = 'SELECT * FROM ruta';
        const values = [];
        const conditions = [];

        // Filtro fijo: solo rutas con id_estado = 1
        conditions.push('id_estado = ?');
        values.push(1);

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


export const getRutasByConductor = async (id_conductor) => {
    try {
        const query = `
            SELECT r.*
            FROM ruta_conductor rc
            JOIN ruta r ON rc.id_ruta = r.id_ruta
            JOIN conductor c ON rc.id_conductor = c.id_conductor
            WHERE c.id_conductor = ?
        `;
        const [rows] = await connection.query(query, [id_conductor]);
        return rows;
    } catch (error) {
        console.error('Error al obtener las rutas por conductor:', error);
        throw error;
    }
}

export const updateRuta = async (id_ruta, data) => {
    try {
        const campos = [];
        const values = [];

        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id_ruta' && value !== undefined) {
                campos.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        values.push(id_ruta);

        const query = `
            UPDATE ruta
            SET ${campos.join(', ')}
            WHERE id_ruta = ?
        `;

        const [result] = await connection.query(query, values);
        return result;
    } catch (error) {
        console.error('Error al actualizar la ruta:', error);
        throw error;
    }
}
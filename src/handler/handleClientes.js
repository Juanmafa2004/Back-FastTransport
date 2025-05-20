import { connection } from "../db.js";


/**
 * Obtiene todos los clientes o filtra por id_cliente y/o id_usuario si se proporcionan.
 * @param {Object} params - Parámetros opcionales de filtro.
 * @param {number} [params.id_cliente] - ID del cliente.
 * @param {number} [params.id_usuario] - ID del usuario.
 * @returns {Promise<Array>} Lista de clientes.
 */

export const getAllClientes = async (params = {}) => {
    try {
        let query = 'SELECT * FROM cliente';
        const values = [];
        const conditions = [];

        if (params.id_cliente) {
            conditions.push('id_cliente = ?');
            values.push(params.id_cliente);
        }
        if (params.id_usuario) {
            conditions.push('id_usuario = ?');
            values.push(params.id_usuario);
        }
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await connection.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
};



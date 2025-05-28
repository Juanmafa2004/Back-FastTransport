import { connection } from "../db.js";



export const getAllEnvio = async (params = {}) => {
    try {
        const queryParts = [];
        const values = [];

        // Base query
        let query = `
  SELECT 
    envio.*,
    cliente.nombre AS cliente_nombre,
    cliente.tipo_cliente,
    cliente.direccion AS cliente_direccion,
    cliente.fecha_registro AS cliente_fecha_registro,
    cliente.id_usuario AS cliente_id_usuario,
    usuario.correo AS correo_cliente,
    estado_envio.nombre_estado,
    ruta.nombre_ruta,
    ruta.descripcion AS ruta_descripcion
  FROM envio
  JOIN cliente ON envio.id_cliente = cliente.id_cliente
  JOIN usuario ON cliente.id_usuario = usuario.id_usuario
  JOIN estado_envio ON envio.id_estado_envio = estado_envio.id_estado_envio
  LEFT JOIN ruta ON envio.id_ruta = ruta.id_ruta
`;

        // Solo permitimos claves específicas y numéricas
        if (params?.id_envio && Number.isInteger(Number(params.id_envio))) {
            queryParts.push('envio.id_envio = ?');
            values.push(Number(params.id_envio));
        }
        if (params?.id_cliente && Number.isInteger(Number(params.id_cliente))) {
            queryParts.push('envio.id_cliente = ?');
            values.push(Number(params.id_cliente));
        }
        if (params?.id_usuario && Number.isInteger(Number(params.id_usuario))) {
            queryParts.push('cliente.id_usuario = ?');
            values.push(Number(params.id_usuario));
        }
        if (params?.id_ruta && Number.isInteger(Number(params.id_ruta))) {
            queryParts.push('envio.id_ruta = ?');
            values.push(Number(params.id_ruta));
        }

        if (queryParts.length > 0) {
            query += ' WHERE ' + queryParts.join(' AND ');
        }

        query += ' ORDER BY envio.fecha_solicitud DESC, envio.fecha_entrega ASC';

        const [rows] = await connection.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error al obtener los envíos:', error);
        throw error;
    }
};



export const createEnvio = async (envio) => {
    try {
        const campos = [
            'id_cliente',
            'id_estado_envio',
            'direccion_origen',
            'direccion_destino',
            'fecha_solicitud',
            'fecha_entrega',
            'descripcion'
        ];
        const values = [
            envio.id_cliente,
            envio.id_estado_envio,
            envio.direccion_origen,
            envio.direccion_destino,
            envio.fecha_solicitud,
            envio.fecha_entrega,
            envio.descripcion
        ];

        // Solo agrega id_ruta si está presente y no es null/undefined
        if (envio.id_ruta !== undefined && envio.id_ruta !== null) {
            campos.push('id_ruta');
            values.push(envio.id_ruta);
        }

        const query = `
            INSERT INTO envio (${campos.join(', ')})
            VALUES (${campos.map(() => '?').join(', ')})
        `;

        const [result] = await connection.query(query, values);
        return result;
    } catch (error) {
        console.error('Error al crear el envío:', error);
        throw error;
    }
}



export const updateEnvio = async (id_envio, data) => {
    try {
        const campos = [];
        const values = [];

        // Solo agrega los campos que están presentes en data
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id_envio' && value !== undefined) {
                campos.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        values.push(id_envio);

        const query = `
            UPDATE envio
            SET ${campos.join(', ')}
            WHERE id_envio = ?
        `;

        const [result] = await connection.query(query, values);
        return result;
    } catch (error) {
        console.error('Error al actualizar el envío:', error);
        throw error;
    }
}
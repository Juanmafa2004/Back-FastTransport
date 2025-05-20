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
      JOIN ruta ON envio.id_ruta = ruta.id_ruta
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

        if (queryParts.length > 0) {
            query += ' WHERE ' + queryParts.join(' AND ');
        }

        const [rows] = await connection.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error al obtener los envíos:', error);
        throw error;
    }
};


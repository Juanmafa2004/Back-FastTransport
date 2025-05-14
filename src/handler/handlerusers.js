import mysql from 'mysql2/promise'


const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fast_transport',
    port: 3306
}


const connection = await mysql.createConnection(config);


export const getAllUsers = async () => {
    try {
        const [rows] = await connection.query('SELECT * FROM usuario;');
        return rows;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}


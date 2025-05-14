// src/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Ventas',
        version: '1.0.0',
        description: 'Documentación de la API para gestión de usuarios, productos, stock y ventas.',
    },
    servers: [
        {
            url: 'http://localhost:3000', // Usar variable de entorno alojado el back
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/controllers/*.js'], // Ruta a los comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec }
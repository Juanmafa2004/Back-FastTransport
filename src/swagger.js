// src/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Envios',
        version: '1.0.0',
        description: 'Documentación de la API para gestión de usuarios y envios.',
    },
    servers: [
        {
            url: 'http://localhost:3000', // Usar variable de entorno alojado el back
            description: 'Localhost'
        },
        {
            url: 'https://4s1nkwvt-3000.use.devtunnels.ms',
            description: 'Túnel de desarrollo'
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/controllers/*.js'], // Ruta a los comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec }
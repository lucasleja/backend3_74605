// src/utils/swagger.js

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Opciones de configuración para swagger-jsdoc
// Aquí defines la información general de tu API y dónde buscará los comentarios de documentación.
const options = {
    definition: {
        openapi: '3.0.0', // Versión de OpenAPI que estás utilizando
        info: {
            title: 'Documentación API Adoptme', // Título de tu API (lo he adaptado a tu proyecto)
            version: '1.0.0', // Versión de tu API
            description: 'Documentación para la API de Adoptme, gestionando usuarios, mascotas y adopciones.', // Descripción general
            termsOfService: 'https://mi-dominio.com/terminos', // Opcional: Términos de servicio
            contact: {
                name: 'Equipo de Desarrollo Backend', // Nombre de tu equipo
                url: 'https://mi-dominio.com', // URL de contacto
                email: 'contacto@mi-dominio.com', // Email de contacto
            },
            license: { // Información de licencia
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT', // Corregí la URL
            },
        },
        servers: [ // Define los servidores donde tu API puede estar desplegada
            {
                url: 'http://localhost:8080', // Servidor local (usando tu puerto 8080)
                description: 'Servidor Local de Desarrollo',
            },
            {
                url: 'https://mi-dominio.com', // Opcional: Servidor de producción
                description: 'Servidor de Producción',
            }
        ],
    },
    // Rutas a los archivos donde Swagger buscará los comentarios JSDoc.
    // **IMPORTANTE**: Estas rutas son relativas a la raíz de tu proyecto (donde ejecutas 'node src/app.js').
    // Por eso, incluimos './src/' al principio.
    apis: [
        './src/routes/*.js', // Busca comentarios en todos los archivos .js dentro de src/routes/
        './src/dao/models/*.js' // Busca comentarios en todos los archivos .js dentro de src/dao/models/ (para esquemas)
    ],
};

// Genera la especificación OpenAPI a partir de las opciones
const swaggerSpect = swaggerJSDoc(options);

// Función para configurar Swagger UI en tu aplicación Express
// Esta función será importada y llamada en app.js
export const setupSwagger = (app) => {
    // Usa '/apidocs' como la ruta para acceder a la documentación en el navegador
    app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));
};
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'Documentación API Adoptme', 
            version: '1.0.0', 
            description: 'Documentación para la API de Adoptme, gestionando usuarios, mascotas y adopciones.', 
            termsOfService: 'https://mi-dominio.com/terminos', 
            contact: {
                name: 'Equipo de Desarrollo Backend', 
                url: 'https://mi-dominio.com', 
                email: 'contacto@mi-dominio.com', 
            },
            license: { 
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT', 
            },
        },
        servers: [ 
            {
                url: 'http://localhost:8080', 
                description: 'Servidor Local de Desarrollo',
            },
            {
                url: 'https://mi-dominio.com', 
                description: 'Servidor de Producción',
            }
        ],
    },
    
    apis: [
        './src/routes/*.js', 
        './src/dao/models/*.js' 
    ],
};


const swaggerSpect = swaggerJSDoc(options);


export const setupSwagger = (app) => {
    
    app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));
};
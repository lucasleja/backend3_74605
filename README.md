🐾 Adoptme Backend API
¡Bienvenido al repositorio de la API Backend de Adoptme! Este proyecto es una aplicación de gestión de usuarios, mascotas y procesos de adopción, construida con Node.js y Express, utilizando MongoDB como base de datos.


🌟 Características Principales
Gestión de Usuarios: CRUD completo para usuarios (crear, leer, actualizar, eliminar).

Gestión de Mascotas: Funcionalidades para registrar y gestionar mascotas.

Gestión de Adopciones: Proceso para registrar la adopción de mascotas por parte de usuarios.

Autenticación: Sistema de autenticación robusto utilizando JSON Web Tokens (JWT) y bcrypt para el hash de contraseñas.

Subida de Archivos: Soporte para subida de archivos (ej. imágenes de mascotas) con Multer.

Módulos de Mocking: Herramientas para generar datos de prueba (usuarios y mascotas) de forma masiva, ideal para desarrollo y testing.

Documentación Interactiva: API documentada con Swagger/OpenAPI para facilitar la exploración y prueba de los endpoints.

Tests Funcionales: Pruebas automatizadas para asegurar el correcto funcionamiento de los endpoints críticos.


🚀 Tecnologías Utilizadas
Este proyecto utiliza el siguiente stack tecnológico:

Node.js: Entorno de ejecución JavaScript.

Express.js: Framework web para Node.js.

MongoDB: Base de datos NoSQL.

Mongoose: ODM (Object Data Modeling) para MongoDB.

Bcrypt: Para el hash de contraseñas.

JSON Web Tokens (JWT): Para autenticación basada en tokens.

Cookie-parser: Middleware para parsear cookies.

Dotenv: Para cargar variables de entorno desde un archivo .env.

Multer: Middleware para manejar multipart/form-data (principalmente para subida de archivos).

@faker-js/faker: Librería para generar datos de prueba realistas.

Swagger-jsdoc & Swagger-ui-express: Para la documentación interactiva de la API (OpenAPI).

Jest: Framework de testing para JavaScript.

Supertest: Librería para probar APIs HTTP.

Cross-env: Para configurar variables de entorno de forma compatible entre plataformas.

Nodemon: Herramienta para desarrollo que reinicia el servidor automáticamente.


📦 Instalación
Para configurar y ejecutar el proyecto en tu máquina local, sigue estos pasos:

Clona el repositorio:

git clone https://github.com/lucasleja/backend3_74605.git
cd backend3_74605

Instala las dependencias:
Las "dependencias" son las librerías y paquetes que tu proyecto necesita para funcionar. Se instalan usando npm (Node Package Manager).

npm install


⚙️ Ejecución del Proyecto
Modo Desarrollo
Para iniciar el servidor en modo desarrollo con nodemon:

npm run dev

El servidor se ejecutará en http://localhost:8080 (o el puerto que hayas configurado).

Modo Producción
Para iniciar el servidor en modo producción:

npm start

El servidor se ejecutará en http://localhost:8080


📄 Documentación de la API (Swagger)
La API está documentada utilizando Swagger/OpenAPI, lo que te permite explorar y probar los endpoints directamente desde tu navegador.

Para acceder a la documentación:

Asegúrate de que tu servidor esté corriendo (npm run dev o npm start).

Abre tu navegador y ve a:

http://localhost:8080/apidocs

Aquí podrás ver los detalles de los endpoints de Users, Pets, Adoptions, etc., y realizar peticiones de prueba.


🧪 Tests Funcionales
El proyecto incluye tests funcionales para asegurar la correcta operación de los endpoints. Utilizamos Jest y Supertest para estas pruebas.

Para ejecutar los tests:

npm test

Esto ejecutará todos los tests definidos en la carpeta test/.


🤖 Módulos de Mocking
El proyecto incluye endpoints especiales para generar datos de prueba, lo cual es muy útil para el desarrollo y las pruebas.

src/mocks/users.js: Genera 50 usuarios de prueba con datos aleatorios (nombre, email, contraseña encriptada "coder123", rol "user" o "admin", y array de pets vacío).

Endpoint: GET /api/mocks/mockingusers

Función: mockUsers

src/mocks/pets.js: Genera 10 mascotas de prueba con nombre y raza aleatorios.

Endpoint: GET /api/mocks/mockingpets

Función: mockPets

src/mocks/generateData.js: Permite generar e insertar un número específico de usuarios y mascotas directamente en la base de datos.

Endpoint: POST /api/mocks/generateData

Función: generateData

Cuerpo de la Petición (ejemplo):

{
  "users": 5,
  "pets": 10
}


🔗 Enlace a Docker Hub
Puedes encontrar la imagen oficial de este proyecto en Docker Hub aquí:

https://hub.docker.com/repository/docker/lucasleja/mi-servidor-node/general


✉️ Contacto
Para cualquier consulta o sugerencia, puedes contactar al equipo de desarrollo en: lejarragalucas@gmail.com

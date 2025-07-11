/* import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/',usersController.getAllUsers);

router.get('/:uid',usersController.getUser);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);


export default router; */

import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: El ID auto-generado del usuario (MongoDB ObjectId)
 *           example: 60d0fe4f7e1b7e001f000001
 *         first_name:
 *           type: string
 *           description: El nombre del usuario
 *           example: Juan
 *         last_name:
 *           type: string
 *           description: El apellido del usuario
 *           example: Pérez
 *         email:
 *           type: string
 *           format: email
 *           description: El email único del usuario
 *           example: juan.perez@example.com
 *         password:
 *           type: string
 *           description: La contraseña del usuario (encriptada/hash)
 *           example: "$2a$10$abcdefghijklmnopqrstuvw.xyz123456"
 *         role:
 *           type: string
 *           description: Rol del usuario (user o admin)
 *           enum: [user, admin]
 *           default: user
 *         pets:
 *           type: array
 *           description: IDs de las mascotas asociadas al usuario
 *           items:
 *             type: string
 *             format: ObjectId
 *           example: []
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     description: Retorna una lista de todos los usuarios registrados en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Users]
 *     description: Retorna un único usuario basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a obtener
 *         example: 60d0fe4f7e1b7e001f000001
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     description: Actualiza la información de un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *         example: 60d0fe4f7e1b7e001f000001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: NuevoNombre
 *               last_name:
 *                 type: string
 *                 example: NuevoApellido
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nuevo.email@example.com
 *               password:
 *                 type: string
 *                 example: nuevaContraseñaSegura
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     description: Elimina un usuario de la base de datos por su ID.
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *         example: 60d0fe4f7e1b7e001f000001
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User deleted
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

router.delete('/:uid', usersController.deleteUser);

export default router;
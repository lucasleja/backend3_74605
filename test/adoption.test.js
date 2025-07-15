import supertest from 'supertest';
import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import adoptionModel from '../src/dao/models/Adoption.js';

import app from '../src/app.js';

const requester = supertest(app); 

describe('Tests sobre el router /api/adoptions', () => {  
    describe('GET /api/adoptions', () => {
        it('Debe devolver un status 200 y un objeto con propiedades status (success) y payload (array)', async () => {
            const response = await requester.get('/api/adoptions');
            const { statusCode, body } = response;
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('payload');
            expect(Array.isArray(body.payload)).toBe(true);
        });
        it('El array de la propiedad payload debe devolver objetos de adopción con propiedades _id, owner y pet', async () => {
            const response = await requester.get('/api/adoptions');
            const { body } = response;
            if (body.payload.length > 0) {
                body.payload.forEach(adoption => {
                    expect(adoption).toHaveProperty('_id');
                    expect(adoption).toHaveProperty('owner');
                    expect(adoption).toHaveProperty('pet');
                });
            }
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        let userId;
        let petId;
        let adoptionId;
        beforeEach(async () => {
            const user = await userModel.create({
                first_name: "TestUser",
                last_name: "Adoption",
                email: `test${Date.now()}@example.com`, // Email único
                password: "testpassword",
                role: "user"
            });
            const pet = await petModel.create({
                name: "TestPet",
                specie: "Dog",
                birthDate: "2023-01-01",
                adopted: false, 
                owner: null,
                image: ""
            });
            const adoption = await adoptionModel.create({ owner: user._id, pet: pet._id });
            userId = user._id;
            petId = pet._id;
            adoptionId = adoption._id;
        });
        
        afterEach(async () => {
            await userModel.deleteOne({ _id: userId }); 
            await petModel.deleteOne({ _id: petId }); 
            await adoptionModel.deleteOne({ _id: adoptionId }); 
        });
        it('Debe devolver un status 200 y un objeto con propiedades status (success) y payload (objeto de adopción)', async () => {
            const response = await requester.get(`/api/adoptions/${adoptionId}`);
            const { statusCode, body } = response;
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('payload');
            expect(typeof body.payload).toBe('object');
            expect(body.payload).toHaveProperty('_id', adoptionId.toString()); 
        });
        it('Si recibe un aid inexistente, debe devolver un objeto con status (error) y error (Adoption not found)', async () => {
            
            const nonExistentId = '60d0fe4f7e1b7e001f000000'; 
            const response = await requester.get(`/api/adoptions/${nonExistentId}`);
            const { statusCode, body } = response;
            expect(statusCode).toBe(404); 
            expect(body).toHaveProperty('status', 'error');
            expect(body).toHaveProperty('error', 'Adoption not found');
        });
    });
    describe('POST /api/adoptions/:uid/:pid', () => {
        let userId;
        let petId;
        
        beforeEach(async () => {
            const user = await userModel.create({
                first_name: "Adopter",
                last_name: "Test",
                email: `adopter${Date.now()}@example.com`,
                password: "password123",
                role: "user"
            });
            const pet = await petModel.create({
                name: "AdoptablePet",
                specie: "Cat",
                birthDate: "2024-01-01",
                adopted: false,
                owner: null,
                image: ""
            });
            userId = user._id;
            petId = pet._id;
        });
        afterEach(async () => {
            await userModel.deleteOne({ _id: userId });
            await petModel.deleteOne({ _id: petId });
            await adoptionModel.deleteOne({ owner: userId, pet: petId });
        });
        it('Debe devolver un status 200 y un mensaje de éxito ("Pet adopted")', async () => {
            const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
            const { statusCode, body } = response;
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('message', 'Pet adopted');
            const petInDB = await petModel.findById(petId);
            expect(petInDB).toHaveProperty('adopted', true);
        });
        it('Debe guardar la adopción en la base de datos', async () => {
            await requester.post(`/api/adoptions/${userId}/${petId}`);
            const adoptionInDB = await adoptionModel.findOne({ owner: userId, pet: petId });
            expect(adoptionInDB).toBeTruthy(); 
        });
        it('Si el uid es inexistente, debe devolver un error "User not found"', async () => {
            const nonExistentUserId = '60d0fe4f7e1b7e001f000000'; 
            const response = await requester.post(`/api/adoptions/${nonExistentUserId}/${petId}`);
            const { statusCode, body } = response;
            expect(statusCode).toBe(404);
            expect(body).toHaveProperty('status', 'error');
            expect(body).toHaveProperty('error', 'User not found');
        });
        it('Si el pid es inexistente, debe devolver un error "Pet not found"', async () => {
            const nonExistentPetId = '60d0fe4f7e1b7e001f000000'; 
            const response = await requester.post(`/api/adoptions/${userId}/${nonExistentPetId}`);
            const { statusCode, body } = response;
            expect(statusCode).toBe(404); 
            expect(body).toHaveProperty('status', 'error');
            expect(body).toHaveProperty('error', 'Pet not found');
        });
        it('Si la mascota ya está adoptada, debe devolver un error "Pet is already adopted"', async () => {
            await requester.post(`/api/adoptions/${userId}/${petId}`);
            const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
            const { statusCode, body } = response;
            expect(statusCode).toBe(400); 
            expect(body).toHaveProperty('status', 'error');
            expect(body).toHaveProperty('error', 'Pet is already adopted');
        });
    });
});
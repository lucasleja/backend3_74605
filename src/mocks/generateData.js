import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

// funcion generar usuario
const generateMockUser = () => {
  const hashedPassword = bcrypt.hashSync('coder123', 10);
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  };
};

// funcion para generar mascot
const generateMockPet = () => {
  return {
    name: faker.animal.type(), // tipo de animal
    specie: faker.animal.type(), 
    birthDate: faker.date.birthdate({ min: 1, max: 10, mode: 'age' }),
    adopted: faker.datatype.boolean(),
    owner: null,
    image: faker.image.urlPicsumPhotos()
  };
};

// endpoint /api/mocks/generatedata
export const generateData = async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    // generamos e insertarmos usuario
    const mockUsers = Array.from({ length: Number(users) }, generateMockUser);
    const insertedUsers = await userModel.insertMany(mockUsers);

    // generamos e insertamos macosta
    const mockPets = Array.from({ length: Number(pets) }, generateMockPet);
    const insertedPets = await petModel.insertMany(mockPets);

    res.status(200).json({
      message: 'Datos generados e insertados exitosamente',
      users: insertedUsers.length,
      pets: insertedPets.length
    });
  } catch (error) {
    console.error('Error al generar datos:', error);
    res.status(500).json({ error: 'Error al generar los datos' });
  }
};
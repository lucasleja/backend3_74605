import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const generateMockUser = async () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: await bcrypt.hash('coder123', 10),
  role: faker.helpers.arrayElement(['user', 'admin']),
  pets: []
});

export const mockUsers = async (req, res) => {
  const users = [];

  for (let i = 0; i < 50; i++) {
    users.push(await generateMockUser());
  }

  res.json({ status: 'success', users });
};
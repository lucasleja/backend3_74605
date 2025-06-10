import { faker } from '@faker-js/faker';

export const mockPets = (req, res) => {
  const pets = Array.from({ length: 10 }, () => {
    const animalType = faker.animal.type(); // "dog", "cat", "rabbit", etc.

    return {
      name: faker.person.firstName(), // se usa nombre persona como nombre d mascota
      breed: faker.animal[animalType]?.() || 'Mixed' // raza si exisno, sino mixed
    };
  });

  res.json({ status: 'success', pets });
};
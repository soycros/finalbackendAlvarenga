import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export const generateUsers = (numUsers = 1) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 70 }),
      password: bcrypt.hashSync("coder123", 10),
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }
  return users;
};

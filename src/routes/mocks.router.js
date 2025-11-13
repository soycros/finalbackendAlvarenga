import { Router } from "express";
import { faker } from "@faker-js/faker";
import { generateUsers } from "../utils/mocking.js";
import userModel from "../models/userModel.js";
import petModel from "../models/Pet.js";

const router = Router();

router.get("/mockingusers", (req, res) => {
  const count = Number(req.query.count) || 50;
  const users = generateUsers(count);
  res.json({ status: "success", payload: users });
});

router.get("/mockingpets", (req, res) => {
  const count = Number(req.query.count) || 20;
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.dog(),
      type: "dog",
      owner: null
    });
  }
  res.json({ status: "success", payload: pets });
});

router.post("/generateData", async (req, res) => {
  try {
    const usersCount = Number(req.body.users) || 0;
    const petsCount = Number(req.body.pets) || 0;

    const mockUsersFull = generateUsers(usersCount);
    const mockUsersForDb = mockUsersFull.map(u => ({
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      age: u.age,
      password: u.password,
      role: u.role
    }));

    const insertedUsers = await userModel.insertMany(mockUsersForDb);

    const mockPets = [];
    for (let i = 0; i < petsCount; i++) {
      mockPets.push({
        name: faker.animal.dog(),
        type: "dog",
        owner: null
      });
    }
    const insertedPets = await petModel.insertMany(mockPets);

    res.json({
      status: "success",
      message: `Insertados ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;

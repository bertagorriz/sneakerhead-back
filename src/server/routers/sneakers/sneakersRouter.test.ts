import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../../database/models/User.js";
import { userDataHashed, userToken } from "../../../mocks/userMocks.js";
import Sneaker from "../../../database/models/Sneaker.js";
import { app } from "../../app/app.js";
import paths from "../../paths/paths.js";
import { getSneakersDataMock } from "../../../mocks/factories/sneakersFactory.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const sneakerList = getSneakersDataMock(5);

describe("Given a GET '/sneakers' endpoint", () => {
  beforeEach(async () => {
    await User.create(userDataHashed);
    await Sneaker.create(sneakerList);
  });

  describe("When it receives a request with valid credentials", () => {
    test("Then it should return the response's method status with status code '200' and a list of 5 sneakers", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .get(paths.senakers)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(expectedStatusCode);

      expect(response.body.sneakers).toHaveLength(5);
    });
  });
});

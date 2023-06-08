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
  await Sneaker.deleteMany();
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

describe("Given a DELETE 'delete/:id' endpoint", () => {
  beforeEach(async () => {
    await Sneaker.create(sneakerList);
  });

  describe("When it receives a request with a valid id", () => {
    test("Then it should return the response's method status with status code '200' and the response's method json with 'Sneaker successfully deleted' message", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Sneaker successfully deleted";

      const sneaker = await Sneaker.find().exec();

      const response = await request(app)
        .delete(`/sneakers/delete/${sneaker[0]._id.toString()}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with an error with status code '404' and the message 'Sneaker not found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Sneaker not found";
      const sneakerId = "647b581ff9c460904e828107";

      const response = await request(app)
        .delete(`/sneakers/delete/${sneakerId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

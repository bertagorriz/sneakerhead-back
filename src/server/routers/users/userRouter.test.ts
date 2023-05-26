import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import paths from "../../paths/paths.js";
import { app } from "../../app/app.js";
import { type UserCredentials } from "../../types";
import {
  userData,
  userDataHashed,
  userDataInvalidPassword,
  userDataNoPassword,
} from "../../../mocks/userMocks.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../../database/models/User.js";

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

const mockUserCredentials: UserCredentials = userData;

const mockUserHashed: UserCredentials = userDataHashed;

const mockInvalidUserPassword: UserCredentials = userDataInvalidPassword;

const mockUserNoPassword: UserCredentials = userDataNoPassword;

describe("Given a POST '/user/login' endpoint", () => {
  beforeEach(async () => {
    await User.create(mockUserHashed);
  });

  describe("When it receives a request with valid credentials", () => {
    test("Then it should return the response's method status with status code '200' and a 'token'", async () => {
      const expectedStatusCode = 200;

      const newUser = await User.findOne({
        username: mockUserCredentials.username,
      }).exec();

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockUserCredentials)
        .expect(expectedStatusCode);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub as string;

      expect(userId).toStrictEqual(newUser?._id.toString());
    });
  });

  describe("When it receives a request with invalid username", () => {
    test("Then it should return the response's method status with status code '401' and the message 'Wrong credentials'", async () => {
      const expectedStatusCode = 401;
      const expectedMessage = "Wrong credentials";

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockInvalidUserPassword)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request without password", () => {
    test("Then it should return the response's method status with status code '400' and the message 'Validation Failed'", async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "Validation Failed";

      const response = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockUserNoPassword)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userData, userDataCredentials } from "../../../mocks/userMocks.js";
import { type UserCredentialsRequest } from "../../types";
import { loginUser } from "./userController.js";
import User from "../../../database/models/User.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const req: Pick<UserCredentialsRequest, "body"> = {
    body: userData,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const token = { token: "token" };

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(userDataCredentials),
  });

  describe("When it receives a request with valid credentials", () => {
    bcrypt.compare = jest.fn().mockReturnValue(true);

    jwt.sign = jest.fn().mockReturnValue(token);

    test("Then it should call the response's method status with status code '200'", async () => {
      const expectedStatusCode = 200;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with wrong credentials and a next function", () => {
    test("Then it sould call the next function with '401' status code and 'Wrong credentials' message", async () => {
      bcrypt.compare = jest.fn().mockReturnValue(false);

      const expectedError = responseErrorData.wrongCredentials;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

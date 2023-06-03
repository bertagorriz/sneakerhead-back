import "../../../loadEnvironment.js";
import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userToken } from "../../../mocks/userMocks";
import { type CustomRequest } from "../../../types";
import { auth } from "./authMiddleware";
import { responseErrorData } from "../../../utils/responseData/responseErrorData";

beforeEach(() => {
  jest.clearAllMocks();
});

const res = {};
const req: Partial<CustomRequest> = {
  header: jest.fn().mockReturnValue(`Bearer ${userToken}`),
};
const next = jest.fn();

describe("Given an auth middleware", () => {
  describe("When it receives a request with 'Authorization' header and a next function with a valid token", () => {
    test("Then it should call the received next function", () => {
      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with 'Authorization' header and a next fucntion with an invalid token", () => {
    test("Then it should call the received next function with an error with status code '401' and the message 'Invalid token'", () => {
      const expectedError = responseErrorData.invalidToken;
      expectedError.name = "JsonWebTokenError";

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with 'Authorization' header without a 'Bearer' and a next function", () => {
    test("Then it should call the received next function with an error with status code '401' and the message 'Missing token'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue(userToken),
      };

      const expectedError = responseErrorData.tokenNotFound;

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

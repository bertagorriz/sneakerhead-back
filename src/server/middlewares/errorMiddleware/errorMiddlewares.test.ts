import { type Request, type Response, type NextFunction } from "express";
import type CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "./errorMiddlewares.js";
import { notFoundError } from "./errorMiddlewares.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req = {};
const next = jest.fn();

const error = responseErrorData.endpointNotFound;

describe("Given a generalError middleware", () => {
  describe("When it receives an error with status code '404' and the message 'Endpoint not found'", () => {
    test("Then it should call the response's status method with status code '404'", () => {
      const expectedStatusCode = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with message 'Endpoint not found'", () => {
      const expectedMessage = "Endpoint not found";

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives an error without status code", () => {
    const error = new Error();

    test("Then it should call the response's status method with status code '500'", () => {
      const expectedStatusCode = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with message 'General error'", () => {
      const expectedMessage = "General error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the response's method with status code '404' and the message 'Endpoint not found'", () => {
      const error = responseErrorData.endpointNotFound;

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

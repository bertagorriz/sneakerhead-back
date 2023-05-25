import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { generalError } from "./errorMiddlewares.js";
import { notFoundError } from "./errorMiddlewares.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req = {};
const next = jest.fn();

const error = new CustomError(404, "Not found");

describe("Given a generalError middleware", () => {
  describe("When it receives an error with status code '404' and the message 'Not found'", () => {
    test("Then it should call the response's method with status code '404'", () => {
      const expectedStatusCode = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method with message 'Not found'", () => {
      const expectedMessage = "Not found";

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

    test("Then it should call the response's method with status code '500'", () => {
      const expectedStatusCode = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method with message 'General error'", () => {
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
    test("Then it should call the response's method with status code '404' and the message 'Not found'", () => {
      const error = new CustomError(404, "Not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

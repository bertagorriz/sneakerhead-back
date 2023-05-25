import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { generalError } from "./errorMiddlewares.js";

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives an error with status code '404' and the message 'Not found'", () => {
    const error = new CustomError(404, "Not found");

    generalError(error, req as Request, res as Response, next as NextFunction);

    test("Then it should call the response's method with status code '404'", () => {
      const expectedStatusCode = 404;

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method with message 'Not found'", () => {
      const expectedMessage = "Not found";

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives an error without status code", () => {
    const error = new Error();

    generalError(
      error as CustomError,
      req as Request,
      res as Response,
      next as NextFunction
    );

    test("Then it should call the response's method with status code '500'", () => {
      const expectedStatusCode = 500;

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method with message 'Not found'", () => {
      const expectedMessage = "General error";

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});

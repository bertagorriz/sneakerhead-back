import { type NextFunction, type Request, type Response } from "express";
import Sneaker from "../../../database/models/Sneaker.js";
import { mockSneakers } from "../../../mocks/sneakerMocks.js";
import { deleteSneakers, getSneakers } from "./sneakerController.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";
import { type CustomRequest } from "../../../types.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getSenakers controller", () => {
  const req = {};

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a response", () => {
    Sneaker.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockSneakers),
    });

    test("Then it should call the response's method with status 200", async () => {
      const expectedStatusCode = 200;

      await getSneakers(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a list of two sneakers", async () => {
      const expectedSneakers = { sneakers: mockSneakers };

      await getSneakers(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(expectedSneakers);
    });
  });

  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with the message 'Server error'", async () => {
      const error = responseErrorData.serverError;

      Sneaker.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getSneakers(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deleteSneakers controller", () => {
  const req: Partial<CustomRequest> = {
    params: { id: mockSneakers[0]._id.toString() },
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a valid sneaker id, a response and a next function", () => {
    Sneaker.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockSneakers),
    });

    test("Then it should call the response's method status with status 200", async () => {
      const expectedStatusCode = 200;

      await deleteSneakers(
        req as CustomRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a message 'Sneaker successfully deleted'", async () => {
      const expectedMessage = "Sneaker successfully deleted";

      await deleteSneakers(
        req as CustomRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with an invalid id, a response and a next function", () => {
    test("Then it should call the next function with the message 'Sneaker not found'", async () => {
      const req: Partial<CustomRequest> = {
        params: { id: "1" },
      };

      const res = {};

      const next = jest.fn();

      const error = new CustomError(404, "Sneaker not found");

      Sneaker.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteSneakers(
        req as CustomRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

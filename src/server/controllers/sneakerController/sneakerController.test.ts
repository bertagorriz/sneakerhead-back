import { type NextFunction, type Request, type Response } from "express";
import Sneaker from "../../../database/models/Sneaker.js";
import { mockSneakers } from "../../../mocks/sneakerMocks.js";
import { getSneakers } from "./sneakerController.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";

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

      expect(next).toHaveBeenLastCalledWith(error);
    });
  });
});

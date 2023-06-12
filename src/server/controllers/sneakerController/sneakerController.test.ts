import { type NextFunction, type Request, type Response } from "express";
import Sneaker from "../../../database/models/Sneaker.js";
import { mockSneakers } from "../../../mocks/sneakerMocks.js";
import {
  addSneakers,
  deleteSneakers,
  getSneakers,
} from "./sneakerController.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";
import {
  type LoadSneakersCustomRequest,
  type CustomRequest,
} from "../../../types.js";
import CustomError from "../../../CustomError/CustomError.js";
import { getSneakersDataMock } from "../../../mocks/factories/sneakersFactory.js";
import { Types } from "mongoose";

beforeEach(() => {
  jest.clearAllMocks();
});

const errorStatus = 401;
const errorMessage = "Sneaker not found";

const sneakerToAdd = getSneakersDataMock(1);

const limit = "5";

describe("Given a getSenakers controller", () => {
  const req: Partial<LoadSneakersCustomRequest> = {
    query: {
      limit,
    },
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a response", () => {
    Sneaker.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSneakers),
      }),
    });

    Sneaker.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue(mockSneakers.length),
    });

    test("Then it should call the response's method with status 200", async () => {
      const expectedStatusCode = 200;

      await getSneakers(
        req as LoadSneakersCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a list of two sneakers", async () => {
      const expectedSneakers = mockSneakers;

      await getSneakers(
        req as LoadSneakersCustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({
        sneakers: expectedSneakers,
        totalSneakers: expectedSneakers.length,
      });
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

      const error = new CustomError(errorStatus, errorMessage);

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

describe("Given an addSneakers controller", () => {
  const id = new Types.ObjectId().toString();

  const req: Partial<CustomRequest> = {
    body: sneakerToAdd,
    userId: id,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with a new sneaker data to add", () => {
    Sneaker.create = jest.fn().mockResolvedValue(sneakerToAdd);

    test("Then it should call the response's method status with status 201", async () => {
      const expectedStatusCode = 201;

      await addSneakers(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the new sneaker", async () => {
      await addSneakers(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ newSneaker: sneakerToAdd });
    });
  });

  describe("When it receives a request with an invalid new sneaker to add and a next function", () => {
    test("Then it should call the next function with the message 'Sneaker not found'", async () => {
      const error = new CustomError(errorStatus, errorMessage);

      Sneaker.create = jest.fn().mockResolvedValue(null);

      await addSneakers(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

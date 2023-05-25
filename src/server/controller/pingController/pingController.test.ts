import { type Request, type Response } from "express";
import { pingController } from "./pingController";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req = {};

describe("Given a pingController controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response's method with status 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method with message 'Pong🏓'", () => {
      const expectedMessage = "Pong🏓";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});

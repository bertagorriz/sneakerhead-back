import CustomError from "../../CustomError/CustomError.js";
import { type ErrorStructure } from "../types.js";

export const responseErrorData: ErrorStructure = {
  wrongCredentials: new CustomError(401, "Wrong credentials"),
  endpointNotFound: new CustomError(404, "Endpoint not found"),
  serverError: new Error("Server error"),
  tokenNotFound: new CustomError(401, "Missing token"),
  invalidToken: new CustomError(401, "Invalid token"),
  idNotFound: new CustomError(404, "Sneaker not found"),
  sneakerNotFound: new CustomError(404, "Sneaker not found"),
};

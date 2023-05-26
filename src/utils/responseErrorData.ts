import CustomError from "../CustomError/CustomError.js";
import { type ErrorStructure } from "./types.js";

export const responseErrorData: ErrorStructure = {
  wrongCredentials: new CustomError(401, "Wrong credentials"),
  endpointNotFound: new CustomError(404, "Endpoint not found"),
};

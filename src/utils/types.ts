import type CustomError from "../CustomError/CustomError.js";

export interface ErrorStructure {
  wrongCredentials: CustomError;
  endpointNotFound: CustomError;
  serverError: Error;
  tokenNotFound: CustomError;
  invalidToken: CustomError;
  idNotFound: CustomError;
  sneakerNotFound: CustomError;
}

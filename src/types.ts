import type * as core from "express-serve-static-core";
import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserUniqueCredentials extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface SneakersStructure {
  name: string;
  brand: string;
  image: string;
  price: number;
  colors: string[];
  features: FeaturesSneakersStructure;
  user: string;
}

export interface FeaturesSneakersStructure {
  description: string;
  description2?: string;
  isAvailable: boolean;
}

export interface SneakerUniqueStructure extends SneakersStructure {
  id: string;
}

export interface SneakerDatabaseStructure extends SneakersStructure {
  _id: Types.ObjectId;
}

export interface CustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

export interface AddSneakersCustomRequest extends Request {
  body: SneakersStructure;
  userId: string;
}

export interface LoadSneakersCustomRequest extends Request {
  body: SneakersStructure;
  query: {
    limit?: string;
  };
}

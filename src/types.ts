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
  description: string[];
  isAvailable: boolean;
}

export interface SneakerUniqueStructure extends SneakersStructure {
  id: string;
}

export interface SneakerDatabaseStructure extends SneakersStructure {
  _id: Types.ObjectId;
}

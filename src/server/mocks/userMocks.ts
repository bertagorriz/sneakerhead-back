import { type UserCredentials, type UserUniqueCredentials } from "../types";

export const userData: UserCredentials = {
  username: "Berta",
  password: "Berta",
};

export const userDataCredentials: UserUniqueCredentials = {
  ...userData,
  _id: "1",
};

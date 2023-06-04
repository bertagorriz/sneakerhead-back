import { type UserCredentials, type UserUniqueCredentials } from "../types";

export const userData: UserCredentials = {
  username: "Berta",
  password: "Berta",
};

export const userDataCredentials: UserUniqueCredentials = {
  ...userData,
  _id: "1",
};

export const userDataHashed: UserCredentials = {
  username: "Berta",
  password: "$2y$10$bPKRqf9S4HmS4RhYfqU90.AeMMxrw52nCQ1riE5m09CO9Gox599D.",
};

export const userDataInvalidPassword: UserCredentials = {
  username: "Berta",
  password: "HolaBerta",
};

export const userDataNoPassword: UserCredentials = {
  username: "Berta",
  password: "",
};

export const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYjI4YTYxYjI2ZWU0MmFhNTM5NzYiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODU5MDcxMTYsImV4cCI6MTY5MjIxNDMxNn0.0VtC5Ga-ybsWD2FD3n_6Isr1cCikEapfIep0UGxgdyU";

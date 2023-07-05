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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYjI4YTYxYjI2ZWU0MmFhNTM5NzYiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODg0ODkxODUsImV4cCI6MTY5NDc5NjM4NX0.6v3PqPlKmIF_-f5LsPHElGxjKXh6zbOreXyO4CxLulM";

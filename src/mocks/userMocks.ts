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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcxMDRhODYxYjI2ZWU0MmFhNTM5OGIiLCJuYW1lIjoiaWduYXNpIiwiaWF0IjoxNjg1NTU3NDQ3LCJleHAiOjE2ODU4MTY2NDd9.8VhFgOwEoUSw_mLMx3RErMa9efBpTnLm41jNQ7tW-Gg";

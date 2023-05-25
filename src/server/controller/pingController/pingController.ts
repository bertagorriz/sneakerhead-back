import { type Request, type Response } from "express";

export const pingController = (req: Request, res: Response) => {
  const message = "Pong🏓";
  res.status(200).json({ message });
};

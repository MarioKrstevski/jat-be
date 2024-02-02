import { Request, Response } from "express";

export const getUser = (req: Request, res: Response): void => {
  const userId = req.params.userId;
  res.send(`Fetching details for user: ${userId}`);
};

export const createUser = (req: Request, res: Response): void => {
  // Logic to create a user
  res.send("User created");
};

import { Request, Response, NextFunction } from "express";

export const nextCallback = (req: Request, res: Response, next: NextFunction) => {
  //Call the next middleware or controller
  next();
};

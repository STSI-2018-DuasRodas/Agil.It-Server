import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {

  //Get the jwt token from the head
  const token = <string>request.headers["token"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
    response.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    response.status(200).send({
      "success":false,
      "error": error.message
    });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, email, name, employeeBadge } = jwtPayload;
  const newToken = jwt.sign({ userId, email, name, employeeBadge }, JWT.jwtSecret, {
    expiresIn: "5h"
  });
  //response.setHeader("token", newToken);
  response.append('token', newToken);

  //Call the next middleware or controller
  next();
};

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";
import { UserController } from "../controllers/User";
import { User } from "../models/User";

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {

  const authorization = <string>request.headers["authorization"];

  if (authorization) {    // The Authorization was passed in so now we validate it
    this.checkIntegration(authorization)
    .then(valid => {
      if (valid === true) {
        next();
        return;
      } else {
        response.status(401).send();
        return;  
      }
    }).catch(err => {
      response.status(500).send({
        "success": false,
        "error": err.message
      });
    })
  } else {
    //Get the jwt token from the request's header
    const token = <string>request.headers["token"];
    let jwtPayload;

    //Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
      response.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with error
      response.status(200).send({
        "success": false,
        "error": error.message
      });
      return;
    }

    //The token is valid for 5 hours
    //We want to send a new token on every request
    const { userId, email, name, employeeBadge, role } = jwtPayload;
    const newToken = jwt.sign({ userId, email, name, employeeBadge, role }, JWT.jwtSecret, {
      expiresIn: "5h"
    });
    //set to response's header the new token
    response.append('token', newToken);

    //Call the next middleware or controller
    next();
  }
};

export const checkIntegration = (async authorization => {
  try {
    const user = await getIntegrionUser(authorization);
    if (user instanceof User) return true;

    return false;
  } catch(err) {
    return false;
  }
});

export const getIntegrionUser = (async authorization => {
  try {
    let tmp = authorization.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

    let buf = Buffer.from(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    let plain_auth = buf.toString();        // read it back out as a string

    // At this point plain_auth = "username:password"

    let creds = plain_auth.split(':');      // split on a ':'
    let username = creds[0];
    let password = creds[1];

    const userController = new UserController()

    return await userController.getRepositoryEntity().findOneOrFail({
      where: {
        "name": username,
        "password": password,
        "role": "integration",
        "deleted": false
      }
    })
  } catch (err) {
    console.log("err", err)
    return undefined
  }
});

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  return next();
  // const token =
  //   req.body.token || req.query.token || req.headers["x-access-token"];

  // if (!token) {
  //   return res.status(403).send("A token is required for authentication");
  // }
  
  // try {
  //   const payload = jwt.verify(token, process.env.SECRET_TOKEN || "");
  //   if (instanceof payload === JwtPayload && payload.iss === 'son_of_mike') {
  //     return next();
  //   } else {
  //     throw new Error
  //   }

  //   if (payload.iss === 'son_of_mike')  

  //   return res.status(401).send("Token expired or invalid");
  // } catch (err) {
  //   return res.status(401).send("Token expired or invalid");
  // }
};

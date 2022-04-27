/* eslint-disable consistent-return */
import { env } from "process";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginAdminValidation, } from "../../middlewares/validation/admin";
import {  LoginAdminData } from "../../middlewares/validation/admin/types";

export const admin_login = async (req: Request, res: Response) => {
  const body: LoginAdminData = req.body;

  //validate user input
  loginAdminValidation(body).catch(err => {
    if (err) {
      return res.status(400).send(err.errors[0]);
    }
  });
  const { email, password } = body;
  
  //super-admin login
  if (
    email === env.ADMIN_EMAIL &&
    password === env.ADMIN_PASSWORD
  ) {
    jwt.sign(
      { iss: 'son_of_mike' },
      env.SECRET_TOKEN || "",
      { expiresIn: '3600s' },
      (err, token) => {
        if (err) {
          return res.status(400).send("An unexpected error occured");
        }
        res.header('x-access-token', token).send({
          name: 'super-admin',
          token: token,
          loginAt: Date.now(),
          expireTime: Date.now() + 3600000,
        });
      },
    );
  } else {
    return res.status(400).send("Email or password is wrong");
  }
};

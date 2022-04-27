import * as yup from 'yup';
import { LoginAdminData } from "./types"; 

export const loginAdminValidation = (data: LoginAdminData) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  });
  return schema.validate(data);
};
import * as Yup from "yup";


import {
  FirstNameValidation,
  emailValidation,
  lastNameValidation,
  passwordValidation,
  repeatPasswordValidation,
  usernameValidation,
} from ".";

const registerValidationSchema = Yup.object({
  firstName: FirstNameValidation,
  lastName: lastNameValidation,
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  repeatedPassword: repeatPasswordValidation,
});

export default registerValidationSchema;

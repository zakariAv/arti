import * as Yup from "yup";

import { passwordValidation, repeatPasswordValidation } from ".";
// extend yup

const changePasswordSchema = Yup.object({
  password: passwordValidation,
  newPassword: passwordValidation,
  repeatPassword: repeatPasswordValidation,
});

export default changePasswordSchema;

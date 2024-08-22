import * as Yup from "yup";
import { passwordValidation, usernameValidation } from ".";


const loginValidationSchema = Yup.object({
  username: usernameValidation,
  password: passwordValidation,
});

export default loginValidationSchema;

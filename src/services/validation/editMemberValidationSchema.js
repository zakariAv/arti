import * as Yup from "yup";
import { FirstNameValidation, emailValidation, lastNameValidation, usernameValidation } from ".";

const editMemberValidationSchema = Yup.object({
   firstName:FirstNameValidation,
   lastName:lastNameValidation,
   username:usernameValidation,
   email:emailValidation,
})

export default editMemberValidationSchema
import * as Yup from "yup";
import {
  FirstNameValidation,
  bioValidation,
  emailValidation,
  jobValidation,
  lastNameValidation,
  locationValidation,
  mobileValidation,
  usernameValidation,
} from ".";

const editAuthInfoSchema = Yup.object({
  firstName: FirstNameValidation,
  lastName: lastNameValidation,
  username: usernameValidation,
  email: emailValidation,
  mobile: mobileValidation,
  job: jobValidation,
  bio: bioValidation,
  address: Yup.object({
    city: locationValidation,
    country: locationValidation,
  }),
});

export default editAuthInfoSchema;

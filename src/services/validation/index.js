import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

export const mongoIdValidation = Yup.string()
  .required("category is required")
  .matches(/^[0-9a-fA-F]{24}$/);

export const FirstNameValidation = Yup.string()
  .required("First name is required!")
  .min(2, "First name should be at least 2 characters")
  .max(20, "First name should be less than  20 characters")
  .matches(/^[A-Za-z ]*$/, "Only characters");

export const lastNameValidation = Yup.string()
  .required("Last name is required!")
  .min(2, "Last name should be at least 2 characters")
  .max(20, "First name should be less than  20 characters")
  .matches(/^[A-Za-z ]*$/, "Only characters");

export const usernameValidation = Yup.string()
  .required("Username is required")
  .min(6, "Username must be [6,15] charachers")
  .max(15, "Username must be [6,15] charachers");

export const emailValidation = Yup.string()
  .email("Enter valid email")
  .required("Email is required")
  .max(52, "Email should be less than 52 characters");

export const passwordValidation = Yup.string()
  .required("Passwrod is required")
  .password(
    "password must include capitals,numbers and at least one symbol [!,@,#,$,%]",
  )
  .min(8, "Password should be [8-32] characters ")
  .max(32, "Password should be [8-32] characters");

export const repeatPasswordValidation = passwordValidation.oneOf(
  [Yup.ref("password"), null],
  "Password must match",
);

export const mobileValidation = Yup.string().matches(
  /^(\+\d{1,4}[ -]?)?(\(\d{2,3}\)[ -]?)?\d{3,4}[ -]?\d{3,4}$/,
  "Invalid phone, enter phone like +00000....",
);

export const bioValidation = Yup.string()
  .min(3, "should be at least 3 characters")
  .matches(/^[A-Za-z ]*$/, "Only characters");

export const jobValidation = Yup.string()
  .min(5, "Job title should be at least 2 characters")
  .max(30, "Job title should be less than 30 characters")
  .matches(/^[A-Za-z ]*$/, "Only characters");

export const locationValidation = Yup.string()
  .matches(/^[A-Za-z ]*$/, "Only characters")
  .min(2, "should be at least 2 characters");

export const categoryNameValidation = Yup.string()
  .required("Category name is required!")
  .matches(/^[A-Za-z ]*$/, "Only characters")
  .min(5, "Category name length must be [5-15] characters")
  .max(15, "Category name length must be [5-15] characters");

export const titleValidation = Yup.string()
  .required("title is required")
  .min(10, "your title must be at least 10 characters")
  .max(50, "your title must be less than 50 characters");

export const contentValidation = Yup.string()
  .required("content is required!")
  .min(30, "article content must be at least 30 characters");

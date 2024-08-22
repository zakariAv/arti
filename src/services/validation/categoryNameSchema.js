import * as Yup from "yup";
import { categoryNameValidation } from ".";
const categoryNameSchema = Yup.object({
  name: categoryNameValidation,
});

export default categoryNameSchema;


import * as Yup from "yup";
import { contentValidation, mongoIdValidation, titleValidation } from ".";

const addArticleValidationSchema =  Yup.object({
    title:titleValidation,
    category:mongoIdValidation,
    body:contentValidation
})

export default addArticleValidationSchema
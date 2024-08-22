import * as Yup from "yup";

const commentSchema = Yup.object({
  text: Yup.string()
    .required("Type a comment")
    .max(300, "Only 300 characters is allowed"),
});

export default commentSchema;

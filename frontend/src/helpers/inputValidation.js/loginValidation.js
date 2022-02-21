import * as yup from "yup";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide correct a email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default schema;

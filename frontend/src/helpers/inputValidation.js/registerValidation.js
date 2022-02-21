import * as yup from "yup";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Please provide correct a email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minumum 6 character"),
  name: yup.string().required("Name is required"),
  lastname: yup.string().required("Lastname is required"),
  role: yup
    .mixed(["student", "teacher"])
    .required("Are you student or teacher ?"),
});

export default schema;

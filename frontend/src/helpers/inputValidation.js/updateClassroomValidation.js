import * as yup from "yup";

let schema = yup.object().shape({
  title: yup.string().min(3).required("Email is required"),
  subtitle: yup.string(),
});

export default schema;

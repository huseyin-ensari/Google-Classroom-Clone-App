import * as yup from "yup";

let schema = yup.object().shape({
  title: yup.string().min(3),
  subtitle: yup.string().min(3),
});

export default schema;

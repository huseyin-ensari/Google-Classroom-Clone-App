import * as yup from "yup";

let schema = yup.object().shape({
  score: yup.number().min(0).max(100).required(),
});

export default schema;

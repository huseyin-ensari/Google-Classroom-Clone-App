import * as yup from "yup";

let schema = yup.object().shape({
  title: yup.string().required("Title is require").min(3),
});

export default schema;

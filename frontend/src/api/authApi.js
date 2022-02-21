import axios from "axios";

export const register = async (inputs) => {
  const result = axios.post(
    process.env.REACT_APP_BASE_URL + "/api/users/register",
    inputs
  );

  return result;
};

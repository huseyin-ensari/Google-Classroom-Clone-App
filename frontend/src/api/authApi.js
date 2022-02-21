import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchRegister = async (inputs) => {
  const result = await axios.post(`${BASE_URL}/api/users/register`, inputs);
  return result;
};

export const fetchLogin = async (inputs) => {
  const result = await axios.post(`${BASE_URL}/api/users/login`, inputs);
  return result;
};

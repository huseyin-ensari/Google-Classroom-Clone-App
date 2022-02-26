import { api } from "./authApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCreateClassroom = async (inputs) => {
  const result = await api.post(`${BASE_URL}/api/classroom/create`, inputs);
  return result;
};

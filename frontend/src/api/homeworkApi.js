import { api } from "./authApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCreateHomework = async (classroomID, inputs) => {
  const result = await api.post(
    `${BASE_URL}/api/homeworks/${classroomID}`,
    inputs
  );

  return result;
};

export const fetchSubmitHomework = async (homeworkID, inputs) => {
  const result = await api.post(
    `${BASE_URL}/api/homeworks/submit/${homeworkID}`,
    inputs
  );
  return result;
};

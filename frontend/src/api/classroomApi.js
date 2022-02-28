import { api } from "./authApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCreateClassroom = async (inputs) => {
  const result = await api.post(`${BASE_URL}/api/classroom/create`, inputs);
  return result;
};

export const fetchJoinClassroom = async (classroomCode) => {
  const result = await api.post(
    `${BASE_URL}/api/classroom/join/${classroomCode}`
  );
  return result;
};

export const fetchClassroomDetail = async (classroomID) => {
  const result = await api.get(`${BASE_URL}/api/classroom/${classroomID}`);
  return result;
};

export const fetchUpdateClassroomInformation = async (classroomID, inputs) => {
  const result = await api.patch(
    `${BASE_URL}/api/classroom/${classroomID}`,
    inputs
  );
  return result;
};

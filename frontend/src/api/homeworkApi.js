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

export const fetchHomeworkDetail = async (homeworkID) => {
  const result = await api.get(`${BASE_URL}/api/homeworks/${homeworkID}`);
  return result;
};

export const fetchDownloadHomeworkFile = (filename) => {
  const filePath = `${BASE_URL}/api/homeworks/download/${filename}`;
  return filePath;
};

export const fetchRateIt = async (projectID, input) => {
  const result = await api.patch(
    `${BASE_URL}/api/homeworks/project/${projectID}`,
    input
  );
  return result;
};

export const fetchDeleteHomework = async (classroomID, homeworkID) => {
  const result = await api.delete(
    `${BASE_URL}/api/homeworks/${classroomID}/${homeworkID}`
  );
  return result;
};

export const fetchDownloadExcelFile = (classroomID, homeworkID) => {
  const excelUrl = `${BASE_URL}/api/homeworks/score/${classroomID}/${homeworkID}`;
  return excelUrl;
};

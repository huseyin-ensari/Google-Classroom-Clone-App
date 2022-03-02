import { api } from "./authApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCreatePost = async (classroomID, inputs) => {
  const result = await api.post(`${BASE_URL}/api/posts/${classroomID}`, inputs);
  return result;
};

export const fetchPostsByClassroom = async (classroomID) => {
  const result = await api.get(`${BASE_URL}/api/posts/${classroomID}`);
  return result;
};

export const fetchDownloadPostFile = (filename) => {
  const filePath = `${BASE_URL}/api/posts/download/${filename}`;
  return filePath;
};

export const fetchDeletePost = async (classroomID, postID) => {
  await api.delete(`${BASE_URL}/api/posts/${classroomID}/${postID}`);
};

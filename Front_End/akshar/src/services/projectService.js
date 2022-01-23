import http from "./httpService";
import authService from "./authService";
import { apiUrl } from "./../config.json";

const createProjectUrl = apiUrl + "project";
const uploadImageUrl = apiUrl + "upload";

export function createProject(data) {
  return http.post(createProjectUrl, data);
}

export function uploadImage(data) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(uploadImageUrl, data, config);
}

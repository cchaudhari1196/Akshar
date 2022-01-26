import http from "./httpService";
import authService from "./authService";
import { apiUrl } from "./../config.json";

const createProjectUrl = apiUrl + "project";
const getProjectUrl = apiUrl + "project/";
const uploadImageUrl = apiUrl + "upload";

export function createProject(data) {
  return http.post(createProjectUrl, data);
}

export function updateProject(data) {
  return http.patch(createProjectUrl, data);
}

export function getProject(id) {
  var url = getProjectUrl + id;
  return http.get(url);
}

export function getAllProject() {
  var url = createProjectUrl;
  return http.get(url);
}

export function uploadImage(data) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(uploadImageUrl, data, config);
}

export function deleteImage(imageUrl) {
  return http.delete(imageUrl);
}

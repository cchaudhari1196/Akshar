import http from "./httpService";
import { apiUrl } from "./../config.json";

const projectUrl = apiUrl + "project";
const projectUrlWithSlash = apiUrl + "project/";
const uploadImageUrl = apiUrl + "upload";

export function createProject(data) {
  return http.post(projectUrl, data);
}

export function updateProject(data) {
  return http.patch(projectUrl, data);
}

export function getProject(id) {
  var url = projectUrlWithSlash + id;
  return http.get(url);
}

export function getAllProject() {
  var url = projectUrl;
  return http.get(url);
}

export function deleteProject(id) {
  return http.delete(projectUrlWithSlash + id);
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

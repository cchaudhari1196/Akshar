import http from "./httpService";
import authService from "./authService";
import { apiUrl } from "./../config.json";

const currentUserProfileUrl = apiUrl + "user/profile";

export function getCurrentUserProfile() {
  const user = authService.getCurrentUser();
  return http.get(currentUserProfileUrl);
}

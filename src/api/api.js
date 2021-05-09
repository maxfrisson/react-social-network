import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "f9be70d7-d36d-49b5-9cfd-7753c9e1ab15",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
      return response.data;
    });
  },
  userFollow(userId) {
    return instance.post(`follow/${userId}`);
  },
  userUnfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
  checkMeAuth () {
    return instance.get(`auth/me`)
  },
  userProfile (userId) {
    return instance.get(`profile/${userId}`)
  }
};
export const authAPI = {
  checkMeAuth () {
    return instance.get(`auth/me`)
  },
};

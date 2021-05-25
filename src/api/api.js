import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "f9be70d7-d36d-49b5-9cfd-7753c9e1ab15",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 16) {
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
};
export const profileAPI = {
  userProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
  saveAvatar(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile)

    return instance.put(`profile/photo`, formData);
  }
};
export const authAPI = {
  checkMeAuth() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post("auth/login", { email, password, rememberMe });
  },
  logout() {
    return instance.delete("auth/login");
  },
};
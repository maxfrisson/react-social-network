import axios from "axios";
import { ProfileType } from "../types/types";

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
  userFollow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  userUnfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
};
export const profileAPI = {
  userProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  saveAvatar(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put(`profile/photo`, formData);
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

type CheckMeAuthResponseType = {
  data: {
    id: number,
    email: string,
    login: string
  },
  resultCode: ResultCodesEnum,
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number,
  },
  resultCode: ResultCodesEnum,
  messages: Array<string>
}

export const authAPI = {
  checkMeAuth() {
    return instance.get<CheckMeAuthResponseType>(`auth/me`).then(response => response.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<LoginResponseType>("auth/login", { email, password, rememberMe, captcha }).then(response => response.data);
  },
  logout() {
    return instance.delete("auth/login");
  },
};

instance.get<string>(`auth/me`).then((response) => response.data)

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};

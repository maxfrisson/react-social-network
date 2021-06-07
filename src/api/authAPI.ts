import { instance, ResponseType, ResultCodesEnum, ResultCodesForCaptchaEnum } from "./api";

type CheckMeAuthResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    userId: number,
}

export const authAPI = {
  checkMeAuth() {
    return instance.get<ResponseType<CheckMeAuthResponseDataType>>(`auth/me`).then(response => response.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesForCaptchaEnum>>("auth/login", { email, password, rememberMe, captcha }).then(response => response.data);
  },
  logout() {
    return instance.delete("auth/login");
  },
};
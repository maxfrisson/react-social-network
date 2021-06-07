import { stopSubmit } from "redux-form";
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../api/api";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";

const SET_AUTH_USER_DATA = "auth/SET_AUTH_USER_DATA";

const GET_CAPTCHA_URL_SUCCESS = "security/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type SetAuthUserDataActionPayloadType = {
  id: number| null,
  email: string| null,
  login: string| null, 
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA,
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string| null, login: string| null, isAuth: boolean):SetAuthUserDataActionType => ({
  type: SET_AUTH_USER_DATA,
  payload: { id, email, login, isAuth },
});

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl:string },
}

export const getCaptchaUrlSuccess = (captchaUrl:string):getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch:any) => {
  let checkMeAuthData = await authAPI.checkMeAuth();
  if (checkMeAuthData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = checkMeAuthData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch:any) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (loginData.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};



export const getCaptchaUrl = () => async (dispatch: any) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

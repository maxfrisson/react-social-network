import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../api/api";
import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { BasicThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
  switch (action.type) {
    case "RSN/auth/SET_AUTH_USER_DATA":
    case "RSN/security/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};


export const actions = {
  setAuthUserData: (id: number | null, email: string| null, login: string| null, isAuth: boolean) => ({
    type: "RSN/auth/SET_AUTH_USER_DATA", payload: { id, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl:string) => ({
    type: "RSN/security/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl },
  } as const)
}

// type SetAuthUserDataActionPayloadType = {
//   id: number| null,
//   email: string| null,
//   login: string| null, 
//   isAuth: boolean
// }

// type SetAuthUserDataActionType = {
//   type: typeof SET_AUTH_USER_DATA,
//   payload: SetAuthUserDataActionPayloadType
// }

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let checkMeAuthData = await authAPI.checkMeAuth();
  if (checkMeAuthData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = checkMeAuthData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
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



export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BasicThunkType<ActionsTypes | FormAction>

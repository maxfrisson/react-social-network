import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "f9be70d7-d36d-49b5-9cfd-7753c9e1ab15",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}
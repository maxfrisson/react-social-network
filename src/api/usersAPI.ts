import { GetItemsType, instance, ResponseType } from "./api";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 16, term: string = "", friend: null | boolean = null) {
    return instance
    .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? "" : `&friend=${friend}`))
    .then(response => response.data);
  },
  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>;
  },
};
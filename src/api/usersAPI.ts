import { GetItemsType, instance, ResponseType } from "./api";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 16) {
    return instance
    .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
  },
  userFollow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data);
  },
  userUnfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>;
  },
};
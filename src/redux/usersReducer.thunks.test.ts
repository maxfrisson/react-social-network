import { actions, follow } from "./usersReducer";
import { usersAPI } from "../api/usersAPI";
import { ResponseType, ResultCodesEnum } from "../api/api";
jest.mock("../api/usersAPI");

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: ResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {
  const thunk = follow(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

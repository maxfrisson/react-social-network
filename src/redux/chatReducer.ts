import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chatAPI";
import { BasicThunkType, InferActionsTypes } from "./redux-store";
import { v1 } from "uuid";

type ChatMessageType = ChatMessageAPIType & { id: string };

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "RSN/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...action.payload.messages.map((m) => ({ ...m, id: v1() }))].filter(
          (m, index, array) => index >= array.length - 100
        ),
      };
    case "RSN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: "RSN/chat/MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "RSN/chat/STATUS_CHANGED",
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangingHandler: ((status: StatusType) => void) | null = null;

const statusChangingHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangingHandler === null) {
    _statusChangingHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangingHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangingHandlerCreator(dispatch));
};

export const stoptMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe("status-changed", statusChangingHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BasicThunkType<ActionsTypes | FormAction>;

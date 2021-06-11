import { DialogType, MessageType } from "../types/types";
import { InferActionsTypes } from "./redux-store";

let initialState = {
  dialogs: [
    { id: 1, name: "Max" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Andrey" },
    { id: 4, name: "Anvar" },
    { id: 5, name: "Tom" },
    { id: 6, name: "Jerry" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "What's your name?" },
    { id: 5, message: "Where do you live" },
    { id: 6, message: "Good bye!" },
  ] as Array<MessageType>,
};



const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
  switch (action.type) {
    case "RSN/DIALOGS/ADD_MESSAGE":
      let message = action.newMessageBody;
      let idMessageGenerate = state.messages.length + 1;
      return{
        ...state,
        messages: [
          ...state.messages,
          {
            id: idMessageGenerate,
            message: message,
          },
        ],
      };

    default:
      return state;
  }
};

export const actions = {
  addMessage: (newMessageBody: string) => ({ type: "RSN/DIALOGS/ADD_MESSAGE", newMessageBody } as const)
};

export default dialogsReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
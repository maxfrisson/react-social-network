const ADD_MESSAGE = "ADD_MESSAGE";
// const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

let initialState = {
  dialogs: [
    { id: 1, name: "Max" },
    { id: 2, name: "Sveta" },
    { id: 3, name: "Andrey" },
    { id: 4, name: "Anvar" },
    { id: 5, name: "Tom" },
    { id: 6, name: "Jerry" },
  ],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "What's your name?" },
    { id: 5, message: "Where do you live" },
    { id: 6, message: "Good bye!" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
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

    // case UPDATE_NEW_MESSAGE_TEXT: {
    //   return{
    //     ...state,
    //     newMessageBody: action.newMessage,
    //   };
    // }

    default:
      return state;
  }
};
export const AddMessageActionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody });

// export const UpdateNewMessageTextActionCreator = (text) => ({
//   type: UPDATE_NEW_MESSAGE_TEXT,
//   newMessage: text,
// });

export default dialogsReducer;

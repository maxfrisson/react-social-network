import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi. It's my first post!", likesCount: 13 },
        { id: 2, message: "How are you, man?", likesCount: 42 },
        { id: 3, message: "Yo Yo YO", likesCount: 17 },
        { id: 4, message: "What's your name?", likesCount: 76 },
        { id: 5, message: "Where do you live", likesCount: 64 },
        { id: 6, message: "Good bye!", likesCount: 53 },
      ],
      newPostText: "",
    },
    dialogsPage: {
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
      newMessageText: "",
    },
    sidebar: {},
  },
  _callSubscriber() {
    console.log("State changed!!!");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.usersPage = usersReducer(this._state.usersPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;

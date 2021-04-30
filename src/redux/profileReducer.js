const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

let initialState = {
  posts: [
    { id: 1, message: "Hi. It's my first post!", likesCount: 13 },
    { id: 2, message: "How are you, man?", likesCount: 42 },
    { id: 3, message: "Yo Yo YO", likesCount: 17 },
    { id: 4, message: "What's your name?", likesCount: 76 },
    { id: 5, message: "Where do you live", likesCount: 64 },
    { id: 6, message: "Good bye!", likesCount: 53 },
  ],
  newPostText: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let post = state.newPostText;
      let idPostGenerate = state.posts.length + 1;
      return {
        ...state,
        newPostText: "",
        posts: [
          ...state.posts,
          {
            id: idPostGenerate,
            message: post,
            likesCount: 0,
          },
        ],
      };

    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newPost,
      };

    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newPost: text,
});

export default profileReducer;

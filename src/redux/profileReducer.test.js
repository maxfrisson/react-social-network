import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
  posts: [
    { id: 1, message: "Hi. It's my first post!", likesCount: 13 },
    { id: 2, message: "How are you, man?", likesCount: 42 },
    { id: 3, message: "Yo Yo YO", likesCount: 17 },
    { id: 4, message: "What's your name?", likesCount: 76 },
    { id: 5, message: "Where do you live", likesCount: 64 },
    { id: 6, message: "Good bye!", likesCount: 53 },
  ],
};

test("length of posts should be incremented", () => {
  // 1. test data
  let action = addPostActionCreator("hello world!!!");

  // 2. test action
  let newState = profileReducer(state, action);

  // 3. expection.
  expect(newState.posts.length).toBe(7);
});

test("message of newPost should be correct", () => {
  // 1. test data
  let action = addPostActionCreator("hello world!!!");

  // 2. test action
  let newState = profileReducer(state, action);

  // 3. expection.
  expect(newState.posts[6].message).toBe("hello world!!!");
});

test("after delete length of messages should be decrement", () => {
  // 1. test data
  let action = deletePost(1);

  // 2. test action
  let newState = profileReducer(state, action);

  // 3. expection.
  expect(newState.posts.length).toBe(5);
});

test("after delete length of messages shouldn't be decrement if id is incorrect", () => {
  // 1. test data
  let action = deletePost(1000);

  // 2. test action
  let newState = profileReducer(state, action);

  // 3. expection.
  expect(newState.posts.length).toBe(6);
});

import { createStore } from "redux";
import {
  createAction,
  createReducer,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";

const ADD = "ADD";
const DELETE = "DELETE";

// const addToDo = (text) => {
//   return {
//     type: ADD,
//     text,
//   };
// }; // action creator

// const deleteToDo = (id) => {
//   return {
//     type: DELETE,
//     id,
//   };
// }; // action creator

// const addToDo = createAction("ADD"); // action creator(addToDo,deleteToDo)의 toolkit 대체
// const deleteToDo = createAction("DELETE");

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     // case ADD:
//     //   return [{ text: action.text, id: Date.now() }, ...state];
//     // case DELETE:
//     //   return state.filter((toDo) => toDo !== action.id);
//     case addToDo.type:
//       return [{ text: action.payload, id: Date.now() }, ...state]; // text: action.text -> 가 일괄로 action.payload로 바뀜
//     case deleteToDo.type:
//       return state.filter((toDo) => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// const reducer = createReducer([], {
//   // [] -> initial array
//   [addToDo]: (state, action) => {
//     state.push({ text: action.payload, id: Date.now() }); //createReducer는 state의  mutatate 가 가능하다. 물론 new array의 return도 가능
//   },
//   [deleteToDo]: (state, action) =>
//     state.filter((toDo) => toDo.id !== action.payload),
// }); -> 더 간략화

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

// const store = createStore(reducer);
// const store = configureStore({ reducer }); // redux development tool 사용에 도움. configureStore 안써도 쓸수는 있음.(좀 모호)

// export const actionCreators = {
//   addToDo,
//   deleteToDo,
// };

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });

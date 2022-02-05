import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }]; // 이런식으로 새 [] 를 리턴해야지 state 값을 mutate 시키면 안된다(ex) state.push 등은 금지)
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id); // splice(i,1)이 아니라 filter를 쓴 이유 : splice를 사용하면 state가 바뀐다. mutate는 금지니까 부적합
    // filter는 new array를 돌려주기에 적합
    default:
      return state;
  }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);

// countStore.dispatch({ type: "ADD" }); // dispatch가 불리면 countModifier가 실행되면서 action에  type: "ADD" 가 주입되서 실행됨
// countStore.getState() -> 결과 return 됨
// countStore.subscribe() -> change 감지

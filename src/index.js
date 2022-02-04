import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  console.log(count, action);
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange); // 변화 감지. countModifier 안의 return 값을 number.innerText = count로 바꿔놔도 작동은 하나... 그리 추천하지는 않는다

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
// countStore.dispatch({ type: "ADD" }); // dispatch가 불리면 countModifier가 실행되면서 action에  type: "ADD" 가 주입되서 실행됨
// countStore.getState() -> 결과 return 됨
// countStore.subscribe() -> change 감지

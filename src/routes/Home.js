import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos ,addTodo}) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    setText("");
    addTodo(text) // mapDispatchToProps의 return addTodo 함수 전달 및 실행
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state }; // return 값은 connect에 의해 store로 연결. Home의 props로 넘어온다! mapStateToProps 라고 불리는 기능
}

function mapDispatchToProps(dispatch) {
  return {
    // addToDo: text => dispatch(actionCreators.addToDo(text)) // ==   store.dispatch(addToDo(text)); 랑 동일. reducer 실행. dispatch를 만들수도 있긴함.
    addToDo: text => dispatch(add(text)) // createSlice 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps,mapDispatchToProps)(Home); // connect - redux store와 컴포넌트의 연결. mapStateToProps기능과 mapDispatchToProps의 기능 존재  - mobx의 inject store 비슷

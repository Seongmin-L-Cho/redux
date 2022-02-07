import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { remove } from "../store";
import { Link } from "react-router-dom";

function ToDo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  // ownProps => 안에 위에서 넘겨준 text랑 id 넘어옴
  return {
    // onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
    onBtnClick: () => dispatch(remove(ownProps.id)),
  };
} // delete용

export default connect(null, mapDispatchToProps)(ToDo);

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/counterSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Counter() {
  const navigate = useNavigate();

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/counterSlice";
import { useNavigate } from "react-router-dom";

export function Counter() {
  const navigate = useNavigate();

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "auto auto",
          padding: "20px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span style={{ margin: "10px 20px" }}>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
      <div style={{ width: "50%", margin: "auto auto", textAlign: "center" }}>
        <Button onClick={() => navigate(-1)} variant="outline-primary">
          Back
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import type { RootState } from "../../store";

export default function CounterRedux() {
  const count = useSelector((state: RootState) => state.counterReducer.count);

  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button
        id="wd-counter-redux-increment-click"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        id="wd-counter-redux-decrement-click"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}

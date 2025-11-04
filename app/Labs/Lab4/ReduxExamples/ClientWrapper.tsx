"use client";

import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import HelloRedux from "./HelloRedux";

export default function ClientWrapper() {
  return (
    <div>
      <CounterRedux />
      <AddRedux/>
      <HelloRedux/>
    </div>
  );
}
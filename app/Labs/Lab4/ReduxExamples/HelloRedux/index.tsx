'use client';

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function HelloRedux() {
  //const message = useSelector((state: RootState) => state.helloReducer);

  return (
    <div id="wd-hello-redux">
      <h2>Redux Message:</h2>
      <p>{"Hello Redux!"}</p>
    </div>
  );
}
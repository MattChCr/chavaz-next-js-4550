'use client';

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function HelloRedux() {
  const message = useSelector((state: RootState) => state.helloReducer);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}
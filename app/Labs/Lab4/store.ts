import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./ReduxExamples/HelloRedux";
import counterReducer from "./ReduxExamples/CounterRedux";
import addReducer from "./ReduxExamples/AddRedux";
import todosReducer from "./ReduxExamples/todos/todosReducer";

export const store = configureStore({
  reducer: { helloReducer,
            counterReducer,
            addReducer,
            todosReducer
   }});
export type RootState = ReturnType<typeof store.getState>;;
export type AppDispatch = typeof store.dispatch;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Module } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    addModule: (state, action: PayloadAction<Omit<Module, "_id" | "lessons">>) => {
      const newModule: Module = {
          _id: uuidv4(),
          lessons: [],
          name: action.payload.name,
          course: action.payload.course,
          editing: false,
          description: ""
      };
      state.modules.push(newModule);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(m => m._id !== action.payload);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map(m =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map(m =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules  } =
  modulesSlice.actions;

export default modulesSlice.reducer;
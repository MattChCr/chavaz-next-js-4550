import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Omit<Assignment, "_id">>) => {
      const newAssignment: Assignment = { ...action.payload, _id: uuidv4() };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(a => a._id !== action.payload);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map(a =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
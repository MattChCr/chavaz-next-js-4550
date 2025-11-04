import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: dbAssignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = { ...assignment, id: uuidv4() };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a.id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a.id === assignment.id ? assignment : a
      ) as any;
    },
    setAssignments: (state, { payload: assignments }) => {
      state.assignments = assignments;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
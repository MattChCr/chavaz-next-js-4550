import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: initialEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action) => {
      const user = action.payload.user;
      const course = action.payload.course;
      const exists = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (!exists) {
        state.enrollments = [...state.enrollments, { user, course }];
      }
    },
    unenroll: (state, action) => {
      const user = action.payload.user;
      const course = action.payload.course;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as dbCourses, type Course } from "../Database";
import { v4 as uuidv4 } from "uuid";

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: dbCourses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, action: PayloadAction<Omit<Course, "_id">>) => {
      const newCourse: Course = { ...action.payload, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(c => c._id !== action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map(c =>
        c._id === action.payload._id ? action.payload : c
      );
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
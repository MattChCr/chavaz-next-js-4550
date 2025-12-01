import axios from "axios";
import type { Course, Module, Assignment } from "../Database";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

const axiosWithCredentials = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};
export const createModuleForCourse = async (
  courseId: string, 
  module: Pick<Module, "name" | "course">
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const updateModule = async (module: Module) => {
  const { course, _id } = module;
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course}/modules/${_id}`,
    module
  );
  return data;
};

// Assignments
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Omit<Assignment, "id">
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { course, id } = assignment;
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course}/assignments/${id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return data;
};

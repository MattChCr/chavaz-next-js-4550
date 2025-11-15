import axios from "axios";
import type { Course, Module } from "../Database";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const createCourse = async (course: Omit<Course, "_id">) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
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
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const updateModule = async (module: Module) => {
  const { course, _id } = module;
  const { data } = await axios.put(
    `${COURSES_API}/${course}/modules/${_id}`,
    module
  );
  return data;
};




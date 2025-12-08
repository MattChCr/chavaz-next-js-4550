import axios from "axios";
import type { Course, Module, Assignment, User, Quiz, QuizAttempt } from "../Database";

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

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
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

export const updateModule = async (courseId: string, module: Module) => {
  const { data } = await axios.put(
   `${COURSES_API}/${courseId}/modules/${module._id}`,
   module
 );
 return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Omit<Assignment, "_id">
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { course, _id } = assignment;
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course}/assignments/${_id}`,
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

export const enrollIntoCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};


export const createUser = async (user: Partial<User>) => {
  const { data } = await axiosWithCredentials.post(USERS_API, user);
  return data;
};

export const updateUser = async (userId: string, user: Partial<User>) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${userId}`, user);
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (
  courseId: string,
  quiz: Partial<Quiz>
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (courseId: string, quiz: Quiz) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return data;
};

export const publishQuiz = async (courseId: string, quizId: string, published: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/publish`,
    { published }
  );
  return data;
};

export const findAttemptsForQuiz = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`
  );
  return response.data;
};

export const findMyAttemptForQuiz = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/me`
  );
  return response.data;
};

export const submitQuizAttempt = async (
  courseId: string,
  quizId: string,
  attempt: Partial<QuizAttempt>
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
    attempt
  );
  return response.data;
};

import coursesJson from "./courses.json";
import modulesJson from "./modules.json";
import assignmentsJson from "./assignments.json";
import usersJson from "./users.json";
import enrollmentsJson from "./enrollments.json";

export type Course = {
  image: string;
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
};

export type Lesson = {
  id: string;
  name: string;
  description: string;
  module: string;
};

export type Module = {
  editing: boolean;
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
};

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description: string;
  availableFrom: string;
  availableUntil: string;
  assignTo: string;
  dueDate: string;
  points: number;
};

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
};

const courses = coursesJson as Course[];
const modules = modulesJson as Module[];
const assignments = assignmentsJson as Assignment[];
const users = usersJson as User[];
const enrollments = enrollmentsJson as Enrollment[];

export { courses, modules, assignments, users, enrollments };
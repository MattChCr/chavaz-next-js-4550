import axios from "axios";
import { Assignment } from "@/app/(Kambaz)/Database";

const API_BASE = "/api/assignments";

export const getAllAssignments = async (): Promise<Assignment[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const getAssignment = async (aid: string): Promise<Assignment> => {
  const response = await axios.get(`${API_BASE}/${aid}`);
  return response.data;
};

export const createAssignment = async (
  assignment: Omit<Assignment, "id">
): Promise<Assignment> => {
  const response = await axios.post(API_BASE, assignment);
  return response.data;
};

export const updateAssignment = async (
  aid: string,
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const response = await axios.put(`${API_BASE}/${aid}`, assignment);
  return response.data;
};

export const deleteAssignment = async (aid: string): Promise<void> => {
  await axios.delete(`${API_BASE}/${aid}`);
};


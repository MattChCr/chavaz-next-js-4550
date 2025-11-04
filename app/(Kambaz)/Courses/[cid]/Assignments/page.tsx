"use client";

import { useParams } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { addAssignment, updateAssignment } from "./reducer";
import type { Assignment } from "../../../Database";

export default function AssignmentPage() {
  const { aid } = useParams();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: RootState) => state.assignmentReducer.assignments
  );

  const assignment = assignments.find(a => a.id === aid);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
    }
  }, [assignment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (assignment) {
      dispatch(updateAssignment({ ...assignment, title, description }));
    } else {
      dispatch(addAssignment({
        title, description,
        course: "",
        availableFrom: "",
        availableUntil: "",
        assignTo: "",
        dueDate: "",
        points: 0
      }));
    }
  };

  if (!assignment && !aid) return <div>Loading...</div>;

  return (
    <div className="p-3">
      <h3>{assignment ? "Edit Assignment" : "New Assignment"}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="assignmentTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">{assignment ? "Update" : "Add"} Assignment</Button>
      </Form>
    </div>
  );
}
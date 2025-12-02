'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../../client";
import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment, setAssignments } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);

  const isNewAssignment = aid === "new";
  const existingAssignment = assignments.find(a => a._id === aid);

  const [title, setTitle] = useState(existingAssignment?.title ?? "");
  const [description, setDescription] = useState(existingAssignment?.description ?? "");
  const [points, setPoints] = useState(existingAssignment?.points ?? 100);
  const [assignTo, setAssignTo] = useState(existingAssignment?.assignTo ?? "Everyone");
  const [dueDate, setDueDate] = useState(existingAssignment?.dueDate ?? "");
  const [availableFrom, setAvailableFrom] = useState(existingAssignment?.availableFrom ?? "");
  const [availableUntil, setAvailableUntil] = useState(existingAssignment?.availableUntil ?? "");

  // Fetch assignments if not loaded yet (for direct navigation to edit page)
  const fetchAssignments = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    if (assignments.length === 0) {
      const fetchedAssignments = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(fetchedAssignments));
    }
  }, [cid, dispatch, assignments.length]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Update form when assignment is loaded
  useEffect(() => {
    if (existingAssignment && !isNewAssignment) {
      setTitle(existingAssignment.title ?? "");
      setDescription(existingAssignment.description ?? "");
      setPoints(existingAssignment.points ?? 100);
      setAssignTo(existingAssignment.assignTo ?? "Everyone");
      setDueDate(existingAssignment.dueDate ?? "");
      setAvailableFrom(existingAssignment.availableFrom ?? "");
      setAvailableUntil(existingAssignment.availableUntil ?? "");
    }
  }, [existingAssignment, isNewAssignment]);

  const saveAssignment = async () => {
    if (!cid || Array.isArray(cid)) return;

    const assignmentData = {
      title,
      description,
      points,
      assignTo,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    if (isNewAssignment) {
      const createdAssignment = await client.createAssignmentForCourse(cid, assignmentData);
      dispatch(setAssignments([...assignments, createdAssignment]));
    } else {
      const updatedAssignment = await client.updateAssignment({
        ...assignmentData,
        _id: aid as string,
      });
      dispatch(updateAssignment(updatedAssignment));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form style={{ maxWidth: 600 }} className="p-3 border rounded">
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={points} onChange={e => setPoints(Number(e.target.value))} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign to</Form.Label>
          <Form.Control type="text" value={assignTo} onChange={e => setAssignTo(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control type="datetime-local" value={availableFrom} onChange={e => setAvailableFrom(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control type="datetime-local" value={availableUntil} onChange={e => setAvailableUntil(e.target.value)} />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={saveAssignment}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

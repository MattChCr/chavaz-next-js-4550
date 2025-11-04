import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { v4 as uuidv4 } from "uuid";
import { Assignment } from "@/app/(Kambaz)/Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);

  const existingAssignment = assignments.find(a => a.id === aid);

  const [title, setTitle] = useState(existingAssignment?.title ?? "");
  const [description, setDescription] = useState(existingAssignment?.description ?? "");
  const [points, setPoints] = useState(existingAssignment?.points ?? 0);
  const [assignTo, setAssignTo] = useState(existingAssignment?.assignTo ?? "Everyone");
  const [dueDate, setDueDate] = useState(existingAssignment?.dueDate ?? "");
  const [availableFrom, setAvailableFrom] = useState(existingAssignment?.availableFrom ?? "");
  const [availableUntil, setAvailableUntil] = useState(existingAssignment?.availableUntil ?? "");

  const saveAssignment = () => {
    const assignment: Assignment = {
      id: existingAssignment?.id ?? uuidv4(),
      title,
      description,
      points,
      assignTo,
      dueDate,
      availableFrom,
      availableUntil,
      course: ""
    };

    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
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
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveAssignment}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
"use client";

import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { assignments } from "../../../../Database";
import Link from "next/link";
import { useState } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();

  const assignment = assignments.find((a) => a.id === aid);

  const [title, setTitle] = useState(assignment?.title ?? "");
  const [description, setDescription] = useState(assignment?.description ?? "");
  const [points, setPoints] = useState(assignment?.points ?? 0);
  const [assignTo, setAssignTo] = useState(assignment?.assignTo ?? "Everyone");
  const [dueDate, setDueDate] = useState(assignment?.dueDate ?? "");
  const [availableFrom, setAvailableFrom] = useState(assignment?.availableFrom ?? "");
  const [availableUntil, setAvailableUntil] = useState(assignment?.availableUntil ?? "");

  if (!assignment) return <div>Assignment not found.</div>;


  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form style={{ maxWidth: 600 }} className="p-3 border rounded">

        <Form.Group className="mb-3" id="wd-assignments-editor-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

     
        <Form.Group className="mb-3" id="wd-assignments-editor-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={13}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: "none" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" id="wd-assignments-points">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" id="wd-assignments-group">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>PROJECTS</option>
            <option>EXAMS</option>
          </Form.Select>
        </Form.Group>

    
        <Form.Group className="mb-3" id="wd-assignments-grade-display">
          <Form.Label>Display Grade as</Form.Label>
          <Form.Select defaultValue="Percentage">
            <option>Percentage</option>
            <option>Points</option>
            <option>Letter Grade</option>
          </Form.Select>
        </Form.Group>

      
        <Form.Group className="mb-3" id="wd-assignments-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select defaultValue="Online">
            <option>Online</option>
            <option>In-Person</option>
            <option>None</option>
          </Form.Select>
        </Form.Group>

    
        <Form.Group className="mb-3" id="wd-assignments-online-entry">
  <Form.Label>Online Entry Options</Form.Label>
  <Form.Check
    type="checkbox"
    id="textEntry"
    label="Text Entry"
    defaultChecked={false}
  />
  <Form.Check
    type="checkbox"
    id="websiteUrl"
    label="Website URL"
    defaultChecked={true}
  />
  <Form.Check
    type="checkbox"
    id="mediaRecordings"
    label="Media Recordings"
    defaultChecked={false}
  />
  <Form.Check
    type="checkbox"
    id="studentAnnotation"
    label="Student Annotation"
    defaultChecked={false}
  />
  <Form.Check
    type="checkbox"
    id="fileUploads"
    label="File Uploads"
    defaultChecked={false}
  />
</Form.Group>

      
        <Form.Group className="mb-3" id="wd-assignments-assign-to">
          <Form.Label>Assign to</Form.Label>
          <Form.Control
            type="text"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
          />
        </Form.Group>

       
        <Form.Group className="mb-3" id="wd-assignments-dates">
          <Form.Label>Due</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <Form.Label className="mt-3">Available from</Form.Label>
          <Form.Control
            type="datetime-local"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />

        <Form.Label className="mt-3">Until</Form.Label>
          <Form.Control
            type="datetime-local"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </Form.Group>


    
        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}

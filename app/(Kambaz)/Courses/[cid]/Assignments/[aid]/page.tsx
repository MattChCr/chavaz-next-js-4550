'use client';

import { Form } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form style={{ maxWidth: 600 }} className="p-3 border rounded">

      <Form.Group className="mb-3" id="wd-assignments-editor-name">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue="A1" />
      </Form.Group>

      <Form.Group className="mb-3" id="wd-assignments-editor-description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={13}
          defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          style={{ resize: "none" }}
        />
      </Form.Group>

      <Form.Group className="mb-3" id="wd-assignments-points">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          defaultValue={100}
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

      <fieldset className="mb-3">
        <legend>Online Entry Options</legend>
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
      </fieldset>

      <Form.Group id="wd-assignments-assign-to" className="mb-3">
        <Form.Label>Assign to</Form.Label>
        <Form.Control type="text" defaultValue="Everyone" />
      </Form.Group>
    </Form>

      </div>
);}

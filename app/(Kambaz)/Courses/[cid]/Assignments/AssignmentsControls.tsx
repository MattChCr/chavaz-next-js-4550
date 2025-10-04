import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";


export default function AssignmentsControls() {
  return (
    <div
      id="wd-assignment-controls"
      className="d-flex justify-content-end align-items-center gap-2 flex-wrap"
    >
      <Form className="d-flex" role="search">
        <Form.Control
          type="search"
          placeholder="Search.."
          className="me-2"
          aria-label="Search"
        />
      </Form>

      <Button variant="secondary" size="lg" className="me-1" id="wd-view-progress">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      
      <Link href="/Courses/1234/Assignments/1">
      <Button variant="danger" size="lg" className="me-1" id="wd-add-assignment-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      </Link>
    </div>
  );
}
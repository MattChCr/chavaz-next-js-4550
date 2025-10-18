'use client';
import Link from "next/link";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentsButtons from "./AssignmentsButtons";
import { assignments } from "../../../Database";
import { formatDateTime } from "./FormatDate";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="d-flex flex-column gap-3 p-5">
      <AssignmentsControls />

      <ListGroup className="rounded-0" id="wd-assignments-group">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <MdArrowDropDown />
              <span>ASSIGNMENTS</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button variant="light" size="lg" className="me-1" id="wd-total">
                40% of Total
              </Button>
              <AssignmentsButtons />
            </div>
          </div>

          <ListGroup className="wd-assignments-sub rounded-0">
            {assignments.map(({ title, availableFrom, dueDate, points }) => (
  <ListGroupItem key={title} className="wd-assignment p-3 ps-1">
    <BsGripVertical className="me-2 fs-3" /> <MdOutlineAssignment /> {title}
    <LessonControlButtons />
    <div className="wd-assignment-subtext">
      <div className="wd-assignment-subtext-line">
        <span className="text-danger">Multiple Modules</span> |{" "}
        <span className="fw-bold">Not Available until</span> {formatDateTime(availableFrom)}
      </div>
      <div className="wd-assignment-subtext-line">
        <span className="fw-bold">Due</span> {formatDateTime(dueDate)} | {points} pts
      </div>
    </div>
  </ListGroupItem>
))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
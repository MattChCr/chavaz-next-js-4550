'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAssignments, deleteAssignment } from "./reducer";
import AssignmentsControls from "./AssignmentsControls";
import { formatDateTime } from "./FormatDate";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );

  const fetchAssignments = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    const assignments = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(assignments));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleDelete = async (id: string) => {
    if (!cid || Array.isArray(cid)) return;
    await client.deleteAssignment(cid, id);
    dispatch(deleteAssignment(id));
  };

  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentsControls />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-header p-3 ps-2 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <span className="fw-bold">ASSIGNMENTS</span>
        </ListGroupItem>

        {assignments.length === 0 ? (
          <ListGroupItem className="p-3 text-muted">
            No assignments found for this course.
          </ListGroupItem>
        ) : (
          assignments.map((assignment) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-assignment-list-item p-3 ps-1 d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3 text-muted" />
                <MdEditDocument className="me-3 fs-3 text-success" />
                <div>
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link fw-bold text-decoration-none"
                  >
                    {assignment.title}
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span>
                    {assignment.availableFrom && (
                      <> | <strong>Available:</strong> {formatDateTime(assignment.availableFrom)}</>
                    )}
                    {assignment.dueDate && (
                      <> | <strong>Due:</strong> {formatDateTime(assignment.dueDate)}</>
                    )}
                    {assignment.points !== undefined && (
                      <> | {assignment.points} pts</>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaTrash
                  className="text-danger cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(assignment._id)}
                  title="Delete assignment"
                />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}

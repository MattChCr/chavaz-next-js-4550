"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

import { useParams } from "next/navigation";
import { modules } from "../../../Database";
import type { Module, Lesson } from "../../../Database";

export default function Modules() {
  const { cid } = useParams();

  // Filter modules by course id and explicitly type variables
  const filteredModules: Module[] = modules.filter(
    (module) => module.course === cid
  );

  return (
    <ListGroup id="wd-modules" className="rounded-0">
      {filteredModules.map((module) => (
        <ListGroupItem
          key={module.name} 
          className="wd-module p-0 mb-5 fs-5 border-gray"
        >
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
            <ModuleControlButtons />
          </div>
          {module.lessons && (
            <ListGroup className="wd-lessons rounded-0">
              {module.lessons.map((lesson: Lesson) => (
                <ListGroupItem
                  key={lesson.id}
                  className="wd-lesson p-3 ps-1"
                >
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                  <LessonControlButtons />
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { modules as initialModules } from "../../../Database";
import type { Module, Lesson } from "../../../Database";

export default function Modules() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid ?? "";
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [moduleName, setModuleName] = useState("");

  const addModule = () => {
    if (!moduleName.trim()) return;
    const newModule: Module = {
      _id: uuidv4(),
      name: moduleName,
      course: cid,
      lessons: [],
      editing: false,
      description: "",
    };
    setModules([...modules, newModule]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(
      modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m))
    );
  };

  const updateModule = (updatedModule: Module) => {
    setModules(
      modules.map((m) => (m._id === updatedModule._id ? updatedModule : m))
    );
  };

  const filteredModules = modules.filter((m) => m.course === cid);

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {filteredModules.map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-4 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      updateModule({ ...module, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={deleteModule}
                editModule={editModule}
              />
            </div>
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson, idx) => (
                  <ListGroupItem
                    key={lesson.id ?? `${module._id}-lesson-${idx}`}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
'use client';
export const dynamic = 'force-dynamic';
import * as client from "../../client";

import { useState, useEffect, useCallback  } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { setModules, editModule, updateModule, deleteModule } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import type { Module, Lesson } from "../../../Database";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  
   const onCreateModuleForCourse = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const fetchModules = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    const modules = await client.findModulesForCourse(cid);
    dispatch(setModules(modules));
  }, [cid, dispatch]);
  
  useEffect(() => {
    fetchModules();
  }, [fetchModules]);


  const handleDeleteModule = async (moduleId: string) => {
    if (!cid || Array.isArray(cid)) return;
    try {
      await client.deleteModule(cid, moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  const handleUpdateModule = async (updatedModule: Module) => {
    dispatch(updateModule(updatedModule));
    // Only save to backend when done editing (pressing Enter)
    if (!updatedModule.editing) {
      try {
        await client.updateModule(updatedModule);
      } catch (error) {
        console.error("Error updating module:", error);
      }
    }
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: Module) => (
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
                      handleUpdateModule({ ...module, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={handleDeleteModule}
                editModule={handleEditModule}
              />
            </div>
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson, idx: number) => (
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
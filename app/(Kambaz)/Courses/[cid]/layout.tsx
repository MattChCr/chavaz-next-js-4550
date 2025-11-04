"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import type { Course } from "../../Database";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course: Course | undefined = courses.find((course: Course) => course._id === cid);

  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        />
        {course?.name}
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className={sidebarVisible ? "d-block" : "d-none"}>
          <CourseNavigation />
        </div>
        <br />
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
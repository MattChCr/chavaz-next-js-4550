'use client';
export const dynamic = 'force-dynamic';


import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const links = [
  { label: "Home" },
  { label: "Modules" },
  { label: "Piazza" },
  { label: "Zoom" },
  { label: "Assignments" },
  { label: "Quizzes" },
  { label: "Grades" },
  { label: "People", pathOverride: "People/Table" }, // Optional override for nested route
];

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams(); // dynamic course ID

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map(({ label, pathOverride }) => {
        const routePath = pathOverride || label;
        const href = `/Courses/${cid}/${routePath}`;
        const isActive = pathname === href;

        return (
          <ListGroupItem
            key={label}
            as={Link}
            href={href}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
'use client';
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A2 - STARTING CSS
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A3 - FORMATTING PAGES
          </Link>
        </li>
      </ul>

      <h3 id="wd-assignments-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            Q1 - LECTURES 1-2
          </Link>
        </li>
      </ul>

      <h3 id="wd-assignments-title">
        EXAM 20% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            E1 - MIDTERM
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            E2 - FINAL
          </Link>
        </li>
      </ul>

      <h3 id="wd-assignments-title">
        PROJECTS 30% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            P1- FINAL PROJECT
          </Link>
        </li>
      </ul>
    </div>
  ); }
"use client";

import { useState } from "react";
import Link from "next/link";
import { Course, courses as initialCourses } from "../Database";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const courses = useSelector<RootState, Course[]>(
    (state) => state.coursesReducer.courses
  );

  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: "",
    name: "",
    number: "",
    department: "",
    credits: 0,
    startDate: "",
    endDate: "",
    image: "/images/reactjs.jpg",
    description: "",
  });

  const resetForm = () => {
    setCourse({
      _id: "",
      name: "",
      number: "",
      department: "",
      credits: 0,
      startDate: "",
      endDate: "",
      image: "/images/reactjs.jpg",
      description: "",
    });
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        {course._id ? "Edit Course" : "New Course"}
        <button
          className="btn btn-primary float-end me-2"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        {course._id && (
          <button
            className="btn btn-warning float-end"
            id="wd-update-course-click"
            onClick={() => dispatch(updateCourse(course))}
          >
            Update
          </button>
        )}
      </h5>
      <hr />
      <FormControl
        value={course.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        placeholder="Course Description"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={c.image || "/images/reactjs.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(c);
                      }}
                      className="btn btn-warning me-2 float-end"
                      id="wd-edit-course-click"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(c._id));
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
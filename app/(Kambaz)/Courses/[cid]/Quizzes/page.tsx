'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ListGroup, ListGroupItem, Dropdown, Button } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { formatDateTime } from "./FormatDate";
import type { Quiz, QuizAttempt } from "../../../Database";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt | null>>({});

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    const data = await client.findQuizzesForCourse(cid);
    dispatch(setQuizzes(data));
  }, [cid, dispatch]);

  const fetchMyAttempts = useCallback(async () => {
    if (!cid || Array.isArray(cid) || isFaculty) return;
    const attemptMap: Record<string, QuizAttempt | null> = {};
    for (const quiz of quizzes) {
      try {
        const attempt = await client.findMyAttemptForQuiz(cid, quiz._id);
        attemptMap[quiz._id] = attempt;
      } catch {
        attemptMap[quiz._id] = null;
      }
    }
    setAttempts(attemptMap);
  }, [cid, quizzes, isFaculty]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    if (!isFaculty && quizzes.length > 0) {
      fetchMyAttempts();
    }
  }, [quizzes, isFaculty, fetchMyAttempts]);

  const handleAddQuiz = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newQuiz = await client.createQuizForCourse(cid, {
      title: "New Quiz",
      course: cid,
      description: "",
      quizType: "GRADED_QUIZ",
      points: 100,
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      published: false,
      questions: [],
    });
    dispatch(setQuizzes([...quizzes, newQuiz]));
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };

  const handleDelete = async (quizId: string) => {
    if (!cid || Array.isArray(cid)) return;
    await client.deleteQuiz(cid, quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    if (!cid || Array.isArray(cid)) return;
    const updated = await client.publishQuiz(cid, quiz._id, !quiz.published);
    dispatch(updateQuiz(updated));
  };

  const displayedQuizzes = isFaculty 
    ? quizzes 
    : quizzes.filter((q) => q.published);

  const getAvailability = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (untilDate && now > untilDate) {
      return <span className="text-danger">Closed</span>;
    }
    if (availableDate && now < availableDate) {
      return <span className="text-muted">Not available until {formatDateTime(quiz.availableDate)}</span>;
    }
    return <span className="text-success">Available</span>;
  };

  return (
    <div id="wd-quizzes" className="p-3">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <Button variant="danger" onClick={handleAddQuiz}>
            + Quiz
          </Button>
        </div>
      )}

      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroupItem className="wd-quiz-list-header p-3 ps-2 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <span className="fw-bold">QUIZZES</span>
        </ListGroupItem>

        {displayedQuizzes.length === 0 ? (
          <ListGroupItem className="p-4 text-center text-muted">
            {isFaculty 
              ? "No quizzes yet. Click the + Quiz button to create one."
              : "No quizzes available for this course."}
          </ListGroupItem>
        ) : (
          displayedQuizzes.map((quiz) => (
            <ListGroupItem
              key={quiz._id}
              className="wd-quiz-list-item p-3 ps-1 d-flex align-items-start justify-content-between"
            >
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 text-muted mt-1" />
                <IoRocketOutline className="me-3 fs-3 text-success mt-1" />
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="wd-quiz-link fw-bold text-decoration-none"
                    >
                      {quiz.title}
                    </Link>
                    {isFaculty && (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          handleTogglePublish(quiz);
                        }}
                        style={{ cursor: "pointer" }}
                        title={quiz.published ? "Click to unpublish" : "Click to publish"}
                      >
                        {quiz.published ? "✅" : "🚫"}
                      </span>
                    )}
                  </div>
                  <div className="text-muted small">
                    {getAvailability(quiz)}
                    {quiz.dueDate && (
                      <> | <strong>Due:</strong> {formatDateTime(quiz.dueDate)}</>
                    )}
                    <> | {quiz.points} pts</>
                    <> | {quiz.questions?.length || 0} Questions</>
                    {!isFaculty && attempts[quiz._id] && (
                      <> | <strong>Score:</strong> {attempts[quiz._id]?.score}%</>
                    )}
                  </div>
                </div>
              </div>

              {isFaculty && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="text-dark p-0 border-0"
                    id={`quiz-dropdown-${quiz._id}`}
                  >
                    <BsThreeDotsVertical className="fs-5" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}

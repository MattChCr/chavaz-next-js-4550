'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../../client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setQuizzes } from "../reducer";
import type { Quiz } from "../../../../Database";

function formatDate(dateString: string): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatQuizType(type: string): string {
  const types: Record<string, string> = {
    GRADED_QUIZ: "Graded Quiz",
    PRACTICE_QUIZ: "Practice Quiz",
    GRADED_SURVEY: "Graded Survey",
    UNGRADED_SURVEY: "Ungraded Survey",
  };
  return types[type] || type;
}

function formatAssignmentGroup(group: string): string {
  const groups: Record<string, string> = {
    QUIZZES: "Quizzes",
    EXAMS: "Exams",
    ASSIGNMENTS: "Assignments",
    PROJECT: "Project",
  };
  return groups[group] || group;
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    if (quizzes.length === 0) {
      const data = await client.findQuizzesForCourse(cid);
      dispatch(setQuizzes(data));
    }
  }, [cid, dispatch, quizzes.length]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    const found = quizzes.find((q) => q._id === qid);
    if (found) {
      setQuiz(found);
    }
  }, [quizzes, qid]);

  if (!quiz) {
    return <div className="p-4">Loading quiz...</div>;
  }

  // Calculate total points from questions
  const totalPoints = quiz.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || quiz.points || 0;

  return (
    <div id="wd-quiz-details" className="p-4">
      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        {isFaculty ? (
          <>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)}
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
            >
              Edit
            </Button>
          </>
        ) : (
          <Button
            variant="danger"
            size="lg"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/take`)}
          >
            Start Quiz
          </Button>
        )}
      </div>

      <hr />

      {/* Quiz Title */}
      <h2 className="mb-4">{quiz.title}</h2>

      {/* Quiz Properties Table */}
      <Table borderless className="w-auto">
        <tbody>
          <tr>
            <td className="text-end pe-3 fw-bold">Quiz Type</td>
            <td>{formatQuizType(quiz.quizType)}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Points</td>
            <td>{totalPoints}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Assignment Group</td>
            <td>{formatAssignmentGroup(quiz.assignmentGroup)}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end pe-3 fw-bold">How Many Attempts</td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className="text-end pe-3 fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Access Code</td>
            <td>{quiz.accessCode || "—"}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Due Date</td>
            <td>{formatDate(quiz.dueDate)}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Available Date</td>
            <td>{formatDate(quiz.availableDate)}</td>
          </tr>
          <tr>
            <td className="text-end pe-3 fw-bold">Until Date</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </Table>

      {/* Back button */}
      <div className="mt-4">
        <Button
          variant="outline-secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          ← Back to Quizzes
        </Button>
      </div>
    </div>
  );
}


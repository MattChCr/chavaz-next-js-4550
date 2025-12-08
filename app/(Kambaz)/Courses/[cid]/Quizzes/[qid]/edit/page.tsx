'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../../../client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button, Form, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes, updateQuiz } from "../../reducer";
import type { Quiz } from "../../../../../Database";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const existingQuiz = quizzes.find((q) => q._id === qid);

  const [title, setTitle] = useState(existingQuiz?.title ?? "");
  const [description, setDescription] = useState(existingQuiz?.description ?? "");
  const [quizType, setQuizType] = useState<Quiz["quizType"]>(existingQuiz?.quizType ?? "GRADED_QUIZ");
  const [assignmentGroup, setAssignmentGroup] = useState<Quiz["assignmentGroup"]>(existingQuiz?.assignmentGroup ?? "QUIZZES");
  const [shuffleAnswers, setShuffleAnswers] = useState(existingQuiz?.shuffleAnswers ?? true);
  const [timeLimit, setTimeLimit] = useState(existingQuiz?.timeLimit ?? 20);
  const [multipleAttempts, setMultipleAttempts] = useState(existingQuiz?.multipleAttempts ?? false);
  const [howManyAttempts, setHowManyAttempts] = useState(existingQuiz?.howManyAttempts ?? 1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(existingQuiz?.showCorrectAnswers ?? false);
  const [accessCode, setAccessCode] = useState(existingQuiz?.accessCode ?? "");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(existingQuiz?.oneQuestionAtATime ?? true);
  const [webcamRequired, setWebcamRequired] = useState(existingQuiz?.webcamRequired ?? false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(existingQuiz?.lockQuestionsAfterAnswering ?? false);
  const [dueDate, setDueDate] = useState(existingQuiz?.dueDate ?? "");
  const [availableDate, setAvailableDate] = useState(existingQuiz?.availableDate ?? "");
  const [untilDate, setUntilDate] = useState(existingQuiz?.untilDate ?? "");

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
    if (existingQuiz) {
      setTitle(existingQuiz.title ?? "");
      setDescription(existingQuiz.description ?? "");
      setQuizType(existingQuiz.quizType ?? "GRADED_QUIZ");
      setAssignmentGroup(existingQuiz.assignmentGroup ?? "QUIZZES");
      setShuffleAnswers(existingQuiz.shuffleAnswers ?? true);
      setTimeLimit(existingQuiz.timeLimit ?? 20);
      setMultipleAttempts(existingQuiz.multipleAttempts ?? false);
      setHowManyAttempts(existingQuiz.howManyAttempts ?? 1);
      setShowCorrectAnswers(existingQuiz.showCorrectAnswers ?? false);
      setAccessCode(existingQuiz.accessCode ?? "");
      setOneQuestionAtATime(existingQuiz.oneQuestionAtATime ?? true);
      setWebcamRequired(existingQuiz.webcamRequired ?? false);
      setLockQuestionsAfterAnswering(existingQuiz.lockQuestionsAfterAnswering ?? false);
      setDueDate(existingQuiz.dueDate ?? "");
      setAvailableDate(existingQuiz.availableDate ?? "");
      setUntilDate(existingQuiz.untilDate ?? "");
    }
  }, [existingQuiz]);

  const totalPoints = existingQuiz?.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0;

  const handleSave = async () => {
    if (!cid || Array.isArray(cid) || !existingQuiz) return;

    const quizData: Quiz = {
      ...existingQuiz,
      title,
      description,
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      howManyAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      dueDate,
      availableDate,
      untilDate,
    };

    const updated = await client.updateQuiz(cid, quizData);
    dispatch(updateQuiz(updated));
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    if (!cid || Array.isArray(cid) || !existingQuiz) return;

    const quizData: Quiz = {
      ...existingQuiz,
      title,
      description,
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      howManyAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      dueDate,
      availableDate,
      untilDate,
      published: true,
    };

    const updated = await client.updateQuiz(cid, quizData);
    dispatch(updateQuiz(updated));
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (!existingQuiz) {
    return <div className="p-4">Loading quiz editor...</div>;
  }

  return (
    <div id="wd-quiz-editor" className="p-4">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link active style={{ cursor: "pointer" }}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit/questions`)}
            style={{ cursor: "pointer" }}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form className="p-3 border rounded">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select value={quizType} onChange={e => setQuizType(e.target.value as Quiz["quizType"])}>
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select value={assignmentGroup} onChange={e => setAssignmentGroup(e.target.value as Quiz["assignmentGroup"])}>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={totalPoints} disabled className="bg-light" />
          <Form.Text className="text-muted">Calculated from question points</Form.Text>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Time Limit (Minutes)</Form.Label>
              <Form.Control type="number" min={0} value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Access Code</Form.Label>
              <Form.Control type="text" value={accessCode} onChange={e => setAccessCode(e.target.value)} placeholder="Leave blank for no code" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Shuffle Answers" checked={shuffleAnswers} onChange={e => setShuffleAnswers(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="One Question at a Time" checked={oneQuestionAtATime} onChange={e => setOneQuestionAtATime(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Webcam Required" checked={webcamRequired} onChange={e => setWebcamRequired(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Lock Questions After Answering" checked={lockQuestionsAfterAnswering} onChange={e => setLockQuestionsAfterAnswering(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Show Correct Answers" checked={showCorrectAnswers} onChange={e => setShowCorrectAnswers(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Multiple Attempts" checked={multipleAttempts} onChange={e => setMultipleAttempts(e.target.checked)} />
        </Form.Group>

        {multipleAttempts && (
          <Form.Group className="mb-3">
            <Form.Label>How Many Attempts</Form.Label>
            <Form.Control type="number" min={1} value={howManyAttempts} onChange={e => setHowManyAttempts(Number(e.target.value))} style={{ maxWidth: "150px" }} />
          </Form.Group>
        )}

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Available Date</Form.Label>
              <Form.Control type="datetime-local" value={availableDate} onChange={e => setAvailableDate(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Until Date</Form.Label>
              <Form.Control type="datetime-local" value={untilDate} onChange={e => setUntilDate(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button type="button" variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
            Cancel
          </Button>
          <Button type="button" variant="success" onClick={handleSaveAndPublish}>
            Save & Publish
          </Button>
          <Button type="button" variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

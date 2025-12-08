'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../../../../client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button, Form, Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../store";
import { setQuizzes, updateQuiz } from "../../../reducer";
import type { Quiz, QuizQuestion } from "../../../../../../Database";
import { v4 as uuidv4 } from "uuid";
import { Nav } from "react-bootstrap";

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const existingQuiz = quizzes.find((q) => q._id === qid);

  const [questions, setQuestions] = useState<QuizQuestion[]>(existingQuiz?.questions || []);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState<QuizQuestion["type"]>("MULTIPLE_CHOICE");
  const [editPoints, setEditPoints] = useState(10);
  const [editQuestion, setEditQuestion] = useState("");
  const [editChoices, setEditChoices] = useState<string[]>(["", "", "", ""]);
  const [editCorrectAnswer, setEditCorrectAnswer] = useState<string>("");
  const [editBlankAnswers, setEditBlankAnswers] = useState<string[]>([""]);

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
    if (existingQuiz?.questions) {
      setQuestions(existingQuiz.questions);
    }
  }, [existingQuiz]);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      _id: uuidv4(),
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 10,
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
    // Reset form state for new question
    setEditingId(newQuestion._id);
    setEditTitle(newQuestion.title);
    setEditType(newQuestion.type);
    setEditPoints(newQuestion.points);
    setEditQuestion(newQuestion.question);
    setEditChoices(newQuestion.choices || ["", "", "", ""]);
    setEditCorrectAnswer("");
    setEditBlankAnswers([""]);
  };

  const startEditing = (question: QuizQuestion) => {
    setEditingId(question._id);
    setEditTitle(question.title);
    setEditType(question.type);
    setEditPoints(question.points);
    setEditQuestion(question.question);
    setEditChoices(question.choices || ["", "", "", ""]);
    if (question.type === "FILL_IN_BLANK") {
      const answers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : question.correctAnswer ? [question.correctAnswer] : [""];
      setEditBlankAnswers(answers);
      setEditCorrectAnswer("");
    } else {
      setEditCorrectAnswer(
        Array.isArray(question.correctAnswer) 
          ? question.correctAnswer[0] || "" 
          : question.correctAnswer || ""
      );
      setEditBlankAnswers([""]);
    }
  };

  const handleCancelEdit = () => {
    // If it's a new unsaved question, remove it
    const original = existingQuiz?.questions?.find(q => q._id === editingId);
    if (!original) {
      setQuestions(questions.filter(q => q._id !== editingId));
    }
    setEditingId(null);
  };

  const handleSaveQuestion = () => {
    let correctAnswer: string | string[];
    if (editType === "FILL_IN_BLANK") {
      correctAnswer = editBlankAnswers.filter(a => a.trim() !== "");
    } else {
      correctAnswer = editCorrectAnswer;
    }

    const updatedQuestion: QuizQuestion = {
      _id: editingId!,
      title: editTitle,
      type: editType,
      points: editPoints,
      question: editQuestion,
      choices: editType === "MULTIPLE_CHOICE" ? editChoices.filter(c => c.trim() !== "") : undefined,
      correctAnswer,
    };

    setQuestions(questions.map(q => q._id === editingId ? updatedQuestion : q));
    setEditingId(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q._id !== questionId));
    if (editingId === questionId) {
      setEditingId(null);
    }
  };

  const handleUpdateChoice = (index: number, value: string) => {
    const newChoices = [...editChoices];
    newChoices[index] = value;
    setEditChoices(newChoices);
  };

  const handleAddChoice = () => {
    setEditChoices([...editChoices, ""]);
  };

  const handleRemoveChoice = (index: number) => {
    setEditChoices(editChoices.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    if (!cid || Array.isArray(cid) || !existingQuiz) return;

    const updatedQuiz: Quiz = {
      ...existingQuiz,
      questions,
      points: totalPoints,
    };

    const updated = await client.updateQuiz(cid, updatedQuiz);
    dispatch(updateQuiz(updated));
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  if (!existingQuiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div id="wd-quiz-questions-editor" className="p-4">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
            style={{ cursor: "pointer" }}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active style={{ cursor: "pointer" }}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Questions</h5>
        <div>
          <span className="me-3 fw-bold">Total Points: {totalPoints}</span>
          <Button variant="danger" onClick={handleAddQuestion}>
            + New Question
          </Button>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center text-muted p-5 border rounded">
          No questions yet. Click "+ New Question" to add one.
        </div>
      ) : (
        <ListGroup className="mb-4">
          {questions.map((question, index) => (
            <ListGroupItem key={question._id} className="p-3">
              {editingId === question._id ? (
                // Edit Mode
                <Card className="border-primary">
                  <Card.Body>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Question Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            placeholder="Question title"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Question Type</Form.Label>
                          <Form.Select
                            value={editType}
                            onChange={e => setEditType(e.target.value as QuizQuestion["type"])}
                          >
                            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                            <option value="TRUE_FALSE">True/False</option>
                            <option value="FILL_IN_BLANK">Fill in the Blank</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Points</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            value={editPoints}
                            onChange={e => setEditPoints(Number(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Question</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={editQuestion}
                        onChange={e => setEditQuestion(e.target.value)}
                        placeholder="Enter the question text..."
                      />
                    </Form.Group>

                    {/* Multiple Choice Options */}
                    {editType === "MULTIPLE_CHOICE" && (
                      <Form.Group className="mb-3">
                        <Form.Label>Answers</Form.Label>
                        <Form.Text className="d-block text-muted mb-2">
                          Enter possible answers and select the correct one.
                        </Form.Text>
                        {editChoices.map((choice, i) => (
                          <div key={i} className="d-flex align-items-center mb-2 gap-2">
                            <Form.Check
                              type="radio"
                              name="correctAnswer"
                              checked={editCorrectAnswer === choice && choice !== ""}
                              onChange={() => setEditCorrectAnswer(choice)}
                              title="Mark as correct answer"
                              className="me-2"
                            />
                            <span className={`me-2 ${editCorrectAnswer === choice && choice !== "" ? "text-success fw-bold" : "text-muted"}`}>
                              {editCorrectAnswer === choice && choice !== "" ? "Correct" : "Possible"} Answer:
                            </span>
                            <Form.Control
                              type="text"
                              value={choice}
                              onChange={e => handleUpdateChoice(i, e.target.value)}
                              placeholder={`Answer ${i + 1}`}
                              className={editCorrectAnswer === choice && choice !== "" ? "border-success" : ""}
                            />
                            {editChoices.length > 2 && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleRemoveChoice(i)}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button variant="outline-secondary" size="sm" onClick={handleAddChoice}>
                          + Add Another Answer
                        </Button>
                      </Form.Group>
                    )}

                    {/* True/False Options */}
                    {editType === "TRUE_FALSE" && (
                      <Form.Group className="mb-3">
                        <Form.Label>Correct Answer</Form.Label>
                        <div>
                          <Form.Check
                            type="radio"
                            name="trueFalse"
                            label="True"
                            checked={editCorrectAnswer === "True"}
                            onChange={() => setEditCorrectAnswer("True")}
                            inline
                          />
                          <Form.Check
                            type="radio"
                            name="trueFalse"
                            label="False"
                            checked={editCorrectAnswer === "False"}
                            onChange={() => setEditCorrectAnswer("False")}
                            inline
                          />
                        </div>
                      </Form.Group>
                    )}

                    {/* Fill in the Blank */}
                    {editType === "FILL_IN_BLANK" && (
                      <Form.Group className="mb-3">
                        <Form.Label>Possible Correct Answers</Form.Label>
                        <Form.Text className="d-block text-muted mb-2">
                          Add all acceptable answers. Answers are case-insensitive when grading.
                        </Form.Text>
                        {editBlankAnswers.map((answer, i) => (
                          <div key={i} className="d-flex align-items-center mb-2 gap-2">
                            <Form.Control
                              type="text"
                              value={answer}
                              onChange={e => {
                                const newAnswers = [...editBlankAnswers];
                                newAnswers[i] = e.target.value;
                                setEditBlankAnswers(newAnswers);
                              }}
                              placeholder={`Possible answer ${i + 1}`}
                            />
                            {editBlankAnswers.length > 1 && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setEditBlankAnswers(editBlankAnswers.filter((_, idx) => idx !== i))}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setEditBlankAnswers([...editBlankAnswers, ""])}
                        >
                          + Add Another Answer
                        </Button>
                      </Form.Group>
                    )}

                    <div className="d-flex justify-content-end gap-2">
                      <Button variant="secondary" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleSaveQuestion}>
                        Update Question
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                // Preview Mode
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <strong>Q{index + 1}:</strong>
                      <span className="fw-bold">{question.title}</span>
                      <span className="badge bg-secondary">
                        {question.type === "MULTIPLE_CHOICE" && "Multiple Choice"}
                        {question.type === "TRUE_FALSE" && "True/False"}
                        {question.type === "FILL_IN_BLANK" && "Fill in Blank"}
                      </span>
                      <span className="badge bg-primary">{question.points} pts</span>
                    </div>
                    <p className="mb-1 text-muted">{question.question || "(No question text)"}</p>
                    {question.type === "MULTIPLE_CHOICE" && question.choices && (
                      <ul className="mb-0 small">
                        {question.choices.map((choice, i) => (
                          <li key={i} className={choice === question.correctAnswer ? "text-success fw-bold" : ""}>
                            {choice || `(Choice ${i + 1})`}
                            {choice === question.correctAnswer && " ✓"}
                          </li>
                        ))}
                      </ul>
                    )}
                    {question.type === "TRUE_FALSE" && (
                      <p className="mb-0 small">
                        Correct answer: <strong className="text-success">{question.correctAnswer}</strong>
                      </p>
                    )}
                    {question.type === "FILL_IN_BLANK" && (
                      <p className="mb-0 small">
                        Accepted answers: <strong className="text-success">
                          {Array.isArray(question.correctAnswer) 
                            ? question.correctAnswer.join(", ") 
                            : question.correctAnswer}
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => startEditing(question)}
                    >
                      <FaPencilAlt /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSaveAll}>
          Save
        </Button>
      </div>
    </div>
  );
}


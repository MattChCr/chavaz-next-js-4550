'use client';
export const dynamic = 'force-dynamic';

import * as client from "../../../../client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { setQuizzes } from "../../reducer";
import type { Quiz, QuizQuestion } from "../../../../../Database";

export default function PreviewQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const existingQuiz = quizzes.find((q) => q._id === qid);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

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
      setQuiz(existingQuiz);
    }
  }, [existingQuiz]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = (): number => {
    if (!quiz?.questions) return 0;
    
    let correctPoints = 0;
    let totalPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question._id];
      
      if (question.type === "FILL_IN_BLANK") {
        const correctAnswers = Array.isArray(question.correctAnswer) 
          ? question.correctAnswer 
          : [question.correctAnswer];
        const isCorrect = correctAnswers.some(
          (correct) => correct.toLowerCase().trim() === (userAnswer || "").toLowerCase().trim()
        );
        if (isCorrect) correctPoints += question.points;
      } else {
        if (userAnswer === question.correctAnswer) {
          correctPoints += question.points;
        }
      }
    });

    return totalPoints > 0 ? Math.round((correctPoints / totalPoints) * 100) : 0;
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setAnswers({});
    setScore(null);
  };

  const isAnswerCorrect = (question: QuizQuestion): boolean => {
    const userAnswer = answers[question._id];
    if (!userAnswer) return false;

    if (question.type === "FILL_IN_BLANK") {
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      return correctAnswers.some(
        (correct) => correct.toLowerCase().trim() === userAnswer.toLowerCase().trim()
      );
    }
    return userAnswer === question.correctAnswer;
  };

  if (!quiz) {
    return <div className="p-4">Loading quiz preview...</div>;
  }

  return (
    <div id="wd-preview-quiz" className="p-4">
      <Alert variant="info" className="mb-4">
        <strong>⚠️ Preview Mode</strong> - This is a preview of how students will see the quiz. 
        Your answers will not be saved.
      </Alert>

      <h2>{quiz.title}</h2>
      
      {/* Quiz Info */}
      <div className="mb-4 text-muted">
        {quiz.timeLimit > 0 && <span>Time Limit: {quiz.timeLimit} minutes | </span>}
        <span>Points: {quiz.questions?.reduce((sum, q) => sum + q.points, 0) || 0} | </span>
        <span>Questions: {quiz.questions?.length || 0}</span>
      </div>

      {/* Score after submit */}
      {isSubmitted && (
        <Alert variant={score !== null && score >= 70 ? "success" : "warning"}>
          <div className="d-flex justify-content-between align-items-center">
            <strong>Preview Score: {score}%</strong>
            <Button variant="outline-primary" size="sm" onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        </Alert>
      )}

      {/* Questions */}
      {quiz.questions && quiz.questions.length > 0 ? (
        <div className="mb-4">
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question._id];
            const isCorrect = isSubmitted ? isAnswerCorrect(question) : null;

            return (
              <Card 
                key={question._id} 
                className={`mb-3 ${isSubmitted ? (isCorrect ? "border-success" : "border-danger") : ""}`}
              >
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>Question {index + 1}</strong>
                    {question.title && <span className="text-muted"> - {question.title}</span>}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <span className="badge bg-secondary">{question.points} pts</span>
                    {isSubmitted && (
                      isCorrect 
                        ? <FaCheck className="text-success fs-5" title="Correct" />
                        : <FaTimes className="text-danger fs-5" title="Incorrect" />
                    )}
                  </span>
                </Card.Header>
                <Card.Body>
                  <p className="mb-3">{question.question}</p>

                  {/* Multiple Choice */}
                  {question.type === "MULTIPLE_CHOICE" && question.choices && (
                    <div>
                      {question.choices.map((choice, i) => {
                        const isThisCorrect = choice === question.correctAnswer;
                        const isSelected = userAnswer === choice;
                        
                        return (
                          <Form.Check
                            key={i}
                            type="radio"
                            name={`question-${question._id}`}
                            label={
                              <span className={
                                isSubmitted 
                                  ? (isThisCorrect ? "text-success fw-bold" : (isSelected ? "text-danger" : ""))
                                  : ""
                              }>
                                {choice}
                                {isSubmitted && isThisCorrect && " ✓"}
                              </span>
                            }
                            checked={isSelected}
                            onChange={() => !isSubmitted && handleAnswerChange(question._id, choice)}
                            disabled={isSubmitted}
                            className="mb-2"
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* True/False */}
                  {question.type === "TRUE_FALSE" && (
                    <div>
                      {["True", "False"].map((option) => {
                        const isThisCorrect = option === question.correctAnswer;
                        const isSelected = userAnswer === option;
                        
                        return (
                          <Form.Check
                            key={option}
                            type="radio"
                            name={`question-${question._id}`}
                            label={
                              <span className={
                                isSubmitted 
                                  ? (isThisCorrect ? "text-success fw-bold" : (isSelected ? "text-danger" : ""))
                                  : ""
                              }>
                                {option}
                                {isSubmitted && isThisCorrect && " ✓"}
                              </span>
                            }
                            checked={isSelected}
                            onChange={() => !isSubmitted && handleAnswerChange(question._id, option)}
                            disabled={isSubmitted}
                            className="mb-2"
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Fill in the Blank */}
                  {question.type === "FILL_IN_BLANK" && (
                    <div>
                      <Form.Control
                        type="text"
                        value={userAnswer || ""}
                        onChange={(e) => !isSubmitted && handleAnswerChange(question._id, e.target.value)}
                        disabled={isSubmitted}
                        placeholder="Type your answer..."
                        className={isSubmitted ? (isCorrect ? "border-success" : "border-danger") : ""}
                      />
                      {isSubmitted && !isCorrect && (
                        <Form.Text className="text-success">
                          Correct answer(s): {
                            Array.isArray(question.correctAnswer) 
                              ? question.correctAnswer.join(", ") 
                              : question.correctAnswer
                          }
                        </Form.Text>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <Alert variant="warning">This quiz has no questions.</Alert>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-between">
        <Button 
          variant="outline-secondary" 
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          ← Back to Quiz Details
        </Button>
        
        {!isSubmitted && quiz.questions && quiz.questions.length > 0 && (
          <Button variant="danger" onClick={handleSubmit}>
            Submit Preview
          </Button>
        )}
      </div>
    </div>
  );
}


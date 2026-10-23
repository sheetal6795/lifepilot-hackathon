import React, { useState } from 'react';
import {
  X,
  Award,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockQuestions } from '../data/mockQuestions';

export default function MockInterviewModal({ isOpen, onClose, onCompleteInterview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = mockQuestions[currentIndex];
  const totalQuestions = mockQuestions.length;

  // Sample quick answers for fast demo testing
  const sampleAnswers = [
    "ArrayList is backed by a contiguous resizable dynamic array with O(1) random access by index, but adding or removing elements requires O(n) element shifting. LinkedList uses doubly-linked node pointers where insertion and deletion at ends is O(1), but random access requires O(n) traversal. LinkedList also has memory overhead for prev/next object references.",
    "Polymorphism allows objects to be treated as instances of their parent class while executing specific behaviors. Method overloading is compile-time (static) polymorphism in the same class with different parameter lists. Method overriding is runtime (dynamic) polymorphism where a subclass provides a specific implementation of a superclass method, resolved using dynamic method dispatch.",
    "We use Floyd's Cycle Detection Algorithm (Tortoise and Hare) with two pointers. The slow pointer moves one node at a time, while the fast pointer moves two nodes. If there is a cycle, the fast pointer will eventually catch up and meet the slow pointer. If the fast pointer reaches null, there is no cycle. Time complexity is O(N) linear time and space complexity is O(1) constant auxiliary space.",
    "WHERE filters individual rows before aggregation occurs and cannot use aggregate functions like COUNT or SUM. HAVING filters grouped rows after GROUP BY has aggregated them. INNER JOIN returns rows with matching keys in both tables, whereas LEFT JOIN returns all rows from the left table and matching rows from the right table, filling nulls where there is no match.",
    "A scalable URL shortener generates a unique 64-bit integer ID using a distributed counter or Snowflake ID, then encodes it into a 7-character Base62 string (allowing 3.5 trillion unique URLs). Because read requests dominate write requests by 100:1, we place a Redis caching layer in front of the database to serve 301/302 redirects with low latency."
  ];

  const handleUseSample = () => {
    setUserAnswer(sampleAnswers[currentIndex] || "My technical answer...");
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    const evaluated = currentQ.evaluateAnswer(userAnswer);
    setFeedback(evaluated);

    setSessionResults(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        category: currentQ.category,
        question: currentQ.question,
        userAnswer,
        score: evaluated.score,
        feedback: evaluated
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleFinishAndReturn = () => {
    if (onCompleteInterview) {
      onCompleteInterview();
    }
    onClose();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setSessionResults([]);
    setIsFinished(false);
  };

  // Average score
  const avgScore = sessionResults.length > 0
    ? Math.round(sessionResults.reduce((acc, r) => acc + r.score, 0) / sessionResults.length)
    : 0;

  return (
    <div className="modal-overlay">
      <div className="modal-container mock-modal">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Sparkles size={20} className="text-cyan" />
            <h3>Technical Mock Interview</h3>
            <span className="modal-subtitle">5-Question Verification Drill</span>
          </div>

          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {!isFinished ? (
          <div className="mock-body">
            {/* Question Progress and Category Bar */}
            <div className="mock-progress-bar-row">
              <span className="question-count-badge">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="category-pill">{currentQ.category}</span>
              <span className="topic-pill">{currentQ.topic}</span>
            </div>

            {/* Question Card */}
            <div className="question-display-card">
              <h4 className="question-prompt-text">{currentQ.question}</h4>
            </div>

            {/* Answer Input Area */}
            {!feedback ? (
              <div className="answer-section">
                <div className="answer-header">
                  <label htmlFor="interview-answer-input" className="answer-label">
                    Your Technical Answer:
                  </label>
                  <button
                    type="button"
                    className="sample-answer-btn"
                    onClick={handleUseSample}
                    title="Insert pre-drafted comprehensive answer for quick evaluation"
                  >
                    <BookOpen size={13} />
                    <span>Insert Demo Answer</span>
                  </button>
                </div>

                <textarea
                  id="interview-answer-input"
                  className="answer-textarea"
                  rows={5}
                  placeholder="Type your explanation here. Mention key trade-offs, complexity, and concrete examples..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />

                <div className="answer-footer">
                  <span className="char-count">{userAnswer.length} characters</span>
                  <button
                    type="button"
                    className="submit-answer-btn"
                    disabled={!userAnswer.trim()}
                    onClick={handleSubmitAnswer}
                  >
                    <span>Submit for Feedback</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ) : (
              /* Feedback Display Area */
              <div className="feedback-display-card animate-fade-in">
                <div className="feedback-score-header">
                  <div className="score-badge-wrap">
                    <span className="score-label">Evaluation Score:</span>
                    <span className={`score-value ${feedback.score >= 80 ? 'score-good' : 'score-mid'}`}>
                      {feedback.score} / 100
                    </span>
                  </div>
                </div>

                {/* Strengths */}
                {feedback.strengths.length > 0 && (
                  <div className="feedback-section strengths-section">
                    <div className="feedback-section-title text-emerald">
                      <CheckCircle size={15} />
                      <span>Strengths & Strong Insights:</span>
                    </div>
                    <ul className="feedback-list">
                      {feedback.strengths.map((str, sIdx) => (
                        <li key={sIdx}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing Points / Recommendations */}
                {feedback.missingPoints.length > 0 && (
                  <div className="feedback-section missing-section">
                    <div className="feedback-section-title text-amber">
                      <AlertTriangle size={15} />
                      <span>Areas for Improvement & Key Nuances:</span>
                    </div>
                    <ul className="feedback-list">
                      {feedback.missingPoints.map((mis, mIdx) => (
                        <li key={mIdx}>{mis}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Model Answer / Takeaway */}
                <div className="feedback-section takeaway-section">
                  <div className="feedback-section-title text-cyan">
                    <Lightbulb size={15} />
                    <span>Optimal Model Answer:</span>
                  </div>
                  <p className="takeaway-text">{feedback.keyTakeaway}</p>
                </div>

                <div className="feedback-footer">
                  <button
                    type="button"
                    className="next-question-btn"
                    onClick={handleNextQuestion}
                  >
                    <span>{currentIndex + 1 < totalQuestions ? "Next Question" : "View Final Results"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="mock-finished-card animate-fade-in">
            <div className="finished-halo">
              <Award size={48} className="text-cyan" />
            </div>
            <h3>Mock Interview Completed!</h3>
            <p className="finished-sub">
              You reviewed all 5 core technical topics across Java, OOP, DSA, SQL, and Architecture.
            </p>

            <div className="finished-score-box">
              <span className="avg-score-title">Average Readiness Score</span>
              <span className="avg-score-num">{avgScore}%</span>
              <span className="avg-score-rank">
                {avgScore >= 80 ? "🌟 Ready for Onsite / Technical Rounds" : "👍 Good Foundation — Review feedback notes"}
              </span>
            </div>

            <div className="finished-actions">
              <button
                type="button"
                className="finish-apply-btn"
                onClick={handleFinishAndReturn}
              >
                <CheckCircle size={16} />
                <span>Mark Task Complete & Return to Plan</span>
              </button>

              <button
                type="button"
                className="restart-drill-btn"
                onClick={handleRestart}
              >
                <RotateCcw size={15} />
                <span>Retake Drill</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

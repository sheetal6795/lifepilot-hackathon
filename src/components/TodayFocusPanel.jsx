import React, { useState, useEffect } from 'react';
import {
  Flame,
  Target,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Plus,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function TodayFocusPanel({
  plan,
  onToggleComplete,
  onAddTask,
  onTriggerAction,
  onOpenMockModal
}) {
  const tasks = plan?.tasks || [];
  const completedTasks = tasks.filter(t => t.completed).length;
  const currentFocusTask = tasks.find(t => !t.completed) || tasks[0];

  // Pomodoro timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');

  useEffect(() => {
    let interval = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    onAddTask(newTaskInput.trim());
    setNewTaskInput('');
  };

  // Calculate readiness score
  const readinessScore = tasks.length > 0
    ? Math.min(100, Math.round((completedTasks / tasks.length) * 100))
    : 0;

  return (
    <div className="today-focus-panel">
      {/* Panel Header */}
      <div className="panel-header">
        <div className="panel-header-title">
          <Compass size={18} className="text-cyan" />
          <h3>Focus & Readiness</h3>
        </div>
      </div>

      {/* Today's Focus Card */}
      <div className="focus-spotlight-card">
        <div className="spotlight-badge">
          <Flame size={14} className="flame-icon" />
          <span>CURRENT FOCUS</span>
        </div>

        {currentFocusTask ? (
          <div className="focus-details">
            <h4 className="focus-task-title">{currentFocusTask.title}</h4>
            <div className="focus-meta-tags">
              <span className="tag-category">{currentFocusTask.category}</span>
              <span className="tag-time">{currentFocusTask.estimatedTime}</span>
              <span className="tag-priority">{currentFocusTask.priority}</span>
            </div>

            {currentFocusTask.subtasks && currentFocusTask.subtasks.length > 0 && (
              <p className="focus-subtask-highlight">
                👉 {currentFocusTask.subtasks[0]}
              </p>
            )}

            {/* Focus Timer */}
            <div className="focus-timer-box">
              <div className="timer-display">{formatTimer(timerSeconds)}</div>
              <div className="timer-controls">
                <button
                  type="button"
                  className={`timer-control-btn ${isRunning ? 'running' : 'idle'}`}
                  onClick={toggleTimer}
                >
                  {isRunning ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                  <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
                </button>
                <button
                  type="button"
                  className="timer-reset-btn"
                  onClick={resetTimer}
                  title="Reset Timer to 25m"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            <div className="focus-action-row">
              <button
                type="button"
                className="complete-focus-btn"
                onClick={() => onToggleComplete(currentFocusTask.id)}
              >
                <CheckCircle size={15} />
                <span>{currentFocusTask.completed ? 'Mark Incomplete' : 'Complete This Task'}</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="no-focus-text">All tasks completed or no plan active.</p>
        )}
      </div>

      {/* Next Action Recommendation */}
      <div className="next-action-card">
        <div className="next-action-header">
          <Target size={15} className="text-indigo" />
          <h4>Next Action</h4>
        </div>
        <p className="next-action-desc">
          {currentFocusTask
            ? `Target ${currentFocusTask.title} next to maintain prep velocity.`
            : "You're all caught up! Run a Mock Interview to validate your readiness."}
        </p>
        {currentFocusTask && currentFocusTask.actionType === 'START_MOCK' ? (
          <button
            type="button"
            className="next-action-jump-btn"
            onClick={onOpenMockModal}
          >
            <span>Launch Mock Interview</span>
            <ArrowRight size={14} />
          </button>
        ) : null}
      </div>

      {/* Readiness Gauge */}
      <div className="readiness-gauge-card">
        <div className="gauge-header">
          <span>Interview Readiness</span>
          <span className="gauge-percent">{readinessScore}%</span>
        </div>
        <div className="gauge-bar-track">
          <div
            className="gauge-bar-fill"
            style={{ width: `${readinessScore}%` }}
          />
        </div>
        <span className="gauge-sub">
          {readinessScore === 100
            ? "🚀 100% Ready — Confident execution!"
            : readinessScore >= 60
            ? "🔥 Great momentum — Keep pushing!"
            : "🌱 Early stage — Follow the high-priority sequence."}
        </span>
      </div>

      {/* Quick Task Adder Form */}
      <form className="quick-task-form" onSubmit={handleAddNewTask}>
        <div className="quick-task-input-wrap">
          <input
            type="text"
            placeholder="+ Add quick priority task..."
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
          />
          <button type="submit" className="add-task-submit" title="Add Task">
            <Plus size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

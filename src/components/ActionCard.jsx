import React from 'react';
import { Check, Clock, ArrowRight, Play, AlertCircle } from 'lucide-react';

export default function ActionCard({
  task,
  index,
  onToggleComplete,
  onTriggerAction,
  isHighlighted = false
}) {
  const isCompleted = !!task.completed;

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <div className={`action-card ${isCompleted ? 'completed' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="card-top-row">
        <div className="card-left-header">
          <button
            type="button"
            className={`card-checkbox ${isCompleted ? 'checked' : ''}`}
            onClick={() => onToggleComplete(task.id)}
            aria-label={`Mark ${task.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
          >
            {isCompleted && <Check size={14} strokeWidth={3} />}
          </button>

          <span className="card-index">#{index + 1}</span>

          <div className="card-title-group">
            <h4 className={`card-title ${isCompleted ? 'line-through' : ''}`}>
              {task.title}
            </h4>
            {task.category && (
              <span className="card-category">{task.category}</span>
            )}
          </div>
        </div>

        <div className="card-meta">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority || "Medium"}
          </span>
          <span className="time-badge">
            <Clock size={13} />
            <span>{task.estimatedTime}</span>
          </span>
        </div>
      </div>

      {task.subtasks && task.subtasks.length > 0 && (
        <ul className="subtask-list">
          {task.subtasks.map((sub, sIdx) => (
            <li key={sIdx} className="subtask-item">
              <span className="subtask-bullet">•</span>
              <span className={isCompleted ? 'line-through-sub' : ''}>{sub}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="card-footer">
        <button
          type="button"
          className={`card-action-btn ${task.actionType === 'START_MOCK' ? 'primary-action' : ''}`}
          onClick={() => onTriggerAction(task)}
        >
          {task.actionType === 'START_MOCK' ? (
            <>
              <Play size={14} fill="currentColor" />
              <span>Start Mock Interview</span>
            </>
          ) : (
            <>
              <span>{task.actionLabel || "Execute Task"}</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import {
  CheckCircle2,
  ListTodo,
  Zap,
  Play,
  RotateCcw,
  Clock,
  Flame,
  Award
} from 'lucide-react';

export default function Sidebar({
  plan,
  onToggleComplete,
  onTriggerAction,
  onSwitchToEmergencyPlan,
  onOpenMockModal,
  onResetPlan
}) {
  const tasks = plan?.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const totalMinutesRemaining = tasks
    .filter(t => !t.completed)
    .reduce((acc, t) => acc + (t.estimatedMinutes || 30), 0);

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section plan-overview-section">
        <div className="section-header">
          <ListTodo size={17} className="header-icon text-cyan" />
          <h3 className="section-title">Today's Plan</h3>
        </div>

        {plan ? (
          <div className="active-plan-meta">
            <h4 className="plan-title">{plan.title}</h4>
            <p className="plan-goal">{plan.goal}</p>
          </div>
        ) : (
          <div className="empty-plan-notice">
            <p>No active plan loaded.</p>
            <span className="notice-sub">Ask LifePilot or pick an example prompt to generate your workflow.</span>
          </div>
        )}
      </div>

      {/* Today's Progress Widget */}
      <div className="sidebar-section progress-section">
        <div className="progress-header-row">
          <span className="progress-label">Today's Progress</span>
          <span className="progress-fraction">
            <strong>{completedTasks}</strong> / {totalTasks} completed
          </span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="progress-footer-stats">
          <span className="percentage-text">{percentage}% Ready</span>
          <span className="remaining-text">
            <Clock size={12} />
            <span>{totalMinutesRemaining} min left</span>
          </span>
        </div>
      </div>

      {/* Task Checklist inside sidebar */}
      <div className="sidebar-section tasks-checklist-section">
        <div className="section-header-compact">
          <span className="compact-title">ACTION ITEMS ({tasks.length})</span>
          {tasks.length > 0 && percentage === 100 && (
            <span className="badge-complete">
              <Award size={12} /> All Done!
            </span>
          )}
        </div>

        <div className="sidebar-tasks-list">
          {tasks.length === 0 ? (
            <div className="no-tasks-hint">
              Tasks will appear here once you generate a plan.
            </div>
          ) : (
            tasks.map((task, idx) => {
              const isDone = !!task.completed;
              return (
                <div
                  key={task.id || idx}
                  className={`sidebar-task-row ${isDone ? 'is-done' : ''}`}
                >
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => onToggleComplete(task.id)}
                    />
                    <span className="custom-checkmark" />
                  </label>

                  <div className="sidebar-task-info" onClick={() => onToggleComplete(task.id)}>
                    <span className={`sidebar-task-title ${isDone ? 'done-text' : ''}`}>
                      {task.title}
                    </span>
                    <div className="sidebar-task-submeta">
                      <span className="submeta-time">{task.estimatedTime}</span>
                      <span className={`submeta-priority priority-${task.priority?.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {task.actionType === 'START_MOCK' && (
                    <button
                      type="button"
                      className="sidebar-quick-btn"
                      onClick={() => onOpenMockModal()}
                      title="Launch Mock Interview"
                    >
                      <Play size={11} fill="currentColor" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="sidebar-section quick-actions-section">
        <span className="compact-title">QUICK ACTIONS</span>
        <div className="sidebar-actions-grid">
          <button
            type="button"
            className="action-pill-btn emergency-btn"
            onClick={onSwitchToEmergencyPlan}
          >
            <Zap size={14} />
            <span>2-Hr Emergency Plan</span>
          </button>

          <button
            type="button"
            className="action-pill-btn mock-btn"
            onClick={onOpenMockModal}
          >
            <Play size={14} fill="currentColor" />
            <span>Start Mock Interview</span>
          </button>

          <button
            type="button"
            className="action-pill-btn reset-btn"
            onClick={onResetPlan}
          >
            <RotateCcw size={14} />
            <span>Reset Active Plan</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

import React from 'react';
import { Sparkles, Clock, BookOpen, Target, Play, Calendar } from 'lucide-react';

export const PROMPT_PRESETS = [
  {
    label: "Prepare me for an interview",
    query: "I have a software engineering interview tomorrow. Help me prepare.",
    icon: Sparkles
  },
  {
    label: "I only have 2 hours",
    query: "I only have two hours today.",
    icon: Clock
  },
  {
    label: "What should I focus on next?",
    query: "What should I focus on next?",
    icon: Target
  },
  {
    label: "Start mock interview",
    query: "Start my mock interview",
    icon: Play
  },
  {
    label: "Plan for learning Java",
    query: "Create a plan for learning Java.",
    icon: BookOpen
  },
  {
    label: "Plan my day",
    query: "What should I do today?",
    icon: Calendar
  }
];

export default function QuickChips({ onSelectPrompt }) {
  return (
    <div className="quick-chips-container">
      <div className="chips-label">
        <Sparkles size={14} className="sparkle-hint" />
        <span>Try asking:</span>
      </div>
      <div className="chips-scroll">
        {PROMPT_PRESETS.map((preset, idx) => {
          const Icon = preset.icon;
          return (
            <button
              key={idx}
              type="button"
              className="chip-btn"
              onClick={() => onSelectPrompt(preset.query)}
            >
              <Icon size={13} className="chip-icon" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

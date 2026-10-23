import React from 'react';
import { Sparkles, Mic, BrainCircuit, RotateCcw, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';

export default function Header({
  activeView,
  setActiveView,
  onOpenAlexaModal,
  onOpenMockModal,
  onResetAll,
  voiceEnabled,
  setVoiceEnabled,
  completedCount,
  totalTasks
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-logo" onClick={() => setActiveView('chat')}>
          <div className="logo-icon-wrap">
            <Sparkles className="logo-icon" size={22} />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <span className="brand-title">LifePilot</span>
              <span className="brand-badge">Alexa+ Ready</span>
            </div>
            <span className="brand-tagline">From conversation to action.</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="view-switcher">
          <button
            className={`view-btn ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveView('chat')}
            title="Conversational Planning Studio"
          >
            <BrainCircuit size={16} />
            <span>Plan Studio</span>
          </button>

          <button
            className="view-btn alexa-btn"
            onClick={onOpenAlexaModal}
            title="Simulated Alexa+ Voice Experience"
          >
            <span className="alexa-glow-dot"></span>
            <Mic size={16} />
            <span>Alexa+ Simulation</span>
          </button>

          <button
            className="view-btn mock-btn"
            onClick={onOpenMockModal}
            title="Launch Technical Mock Interview"
          >
            <Sparkles size={16} />
            <span>Mock Interview</span>
          </button>
        </div>
      </div>

      <div className="header-right">
        {totalTasks > 0 && (
          <div className="header-progress-chip" title="Today's Task Completion">
            <CheckCircle2 size={15} className="progress-chip-icon" />
            <span>{completedCount}/{totalTasks} Done</span>
          </div>
        )}

        <button
          className={`icon-btn ${voiceEnabled ? 'active' : 'muted'}`}
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          title={voiceEnabled ? "Mute Assistant Audio Voice" : "Enable Assistant Audio Voice"}
          aria-label="Toggle voice readout"
        >
          {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button
          className="icon-btn reset-btn"
          onClick={onResetAll}
          title="Reset Demo State"
          aria-label="Reset demo state"
        >
          <RotateCcw size={17} />
        </button>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Bot,
  User,
  CheckCircle,
  Radio
} from 'lucide-react';
import { processMessage } from '../services/intentEngine';
import { speechService } from '../services/speechService';

export default function AlexaSimulationModal({
  isOpen,
  onClose,
  onApplyPlanToApp,
  currentPlan
}) {
  const [selectedUtterance, setSelectedUtterance] = useState(
    "I have an interview tomorrow. Help me prepare."
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceAudioActive, setVoiceAudioActive] = useState(true);
  const [lastExchange, setLastExchange] = useState({
    userUtterance: "I have an interview tomorrow. Help me prepare.",
    assistantReply: "Got it. I'll prioritize the most important topics for tomorrow.",
    generatedPlan: null
  });

  if (!isOpen) return null;

  const sampleUtterances = [
    {
      label: "Interview Prep",
      spoken: "Alexa, ask LifePilot to prepare me for my interview tomorrow.",
      intentQuery: "I have a software engineering interview tomorrow. Help me prepare."
    },
    {
      label: "2-Hour Constraint",
      spoken: "Alexa, tell LifePilot I only have 2 hours today.",
      intentQuery: "I only have two hours today."
    },
    {
      label: "Next Focus",
      spoken: "Alexa, ask LifePilot what I should focus on next.",
      intentQuery: "What should I focus on next?"
    },
    {
      label: "Start Mock Interview",
      spoken: "Alexa, ask LifePilot to start my technical mock interview.",
      intentQuery: "Start my mock interview"
    }
  ];

  const handleSimulateUtterance = (item) => {
    setSelectedUtterance(item.spoken);

    // Process through LifePilot intent engine
    const result = processMessage(item.intentQuery, currentPlan);

    const exchange = {
      userUtterance: item.spoken,
      assistantReply: result.speechText || result.content,
      generatedPlan: result.plan
    };

    setLastExchange(exchange);

    if (voiceAudioActive) {
      setIsSpeaking(true);
      speechService.speak(exchange.assistantReply, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleApplyToWorkspace = () => {
    if (lastExchange.generatedPlan && onApplyPlanToApp) {
      onApplyPlanToApp(lastExchange.generatedPlan, lastExchange.assistantReply);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container alexa-modal animate-fade-in">
        <div className="modal-header">
          <div className="alexa-brand-heading">
            <div className="alexa-badge-pill">
              <Radio size={13} className="text-cyan animate-pulse" />
              <span>Simulated Alexa+ Experience</span>
            </div>
            <span className="alexa-hackathon-track">Amazon Developer Hackathon Showcase</span>
          </div>

          <div className="header-controls">
            <button
              type="button"
              className={`voice-toggle-btn ${voiceAudioActive ? 'active' : ''}`}
              onClick={() => {
                if (voiceAudioActive) speechService.stopSpeaking();
                setVoiceAudioActive(!voiceAudioActive);
              }}
              title={voiceAudioActive ? "Mute Speech Synthesis" : "Unmute Speech Synthesis"}
            >
              {voiceAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="alexa-disclaimer-banner">
          <Sparkles size={14} className="text-cyan" />
          <span>
            <strong>Simulated Voice Interface:</strong> Demonstrates conversational ambient integration using standard browser Speech APIs. Not an official Alexa+ integration.
          </span>
        </div>

        <div className="alexa-simulation-body">
          {/* Glowing Alexa Orb / Waveform Visualizer */}
          <div className="alexa-orb-stage">
            <div className={`alexa-glowing-orb ${isSpeaking ? 'speaking' : ''}`}>
              <div className="orb-ring ring-1"></div>
              <div className="orb-ring ring-2"></div>
              <div className="orb-core">
                <Mic size={28} className={isSpeaking ? 'mic-active' : 'mic-idle'} />
              </div>
            </div>

            <div className="waveform-container">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className={`wave-bar ${isSpeaking ? 'animating' : ''}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>

            <p className="voice-status-text">
              {isSpeaking ? "LifePilot is speaking..." : "Ready for voice interaction"}
            </p>
          </div>

          {/* Quick Voice Utterance Triggers */}
          <div className="utterance-selection-box">
            <span className="utterance-label">Simulate a Voice Request:</span>
            <div className="utterance-buttons-grid">
              {sampleUtterances.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`utterance-pill-btn ${selectedUtterance === item.spoken ? 'selected' : ''}`}
                  onClick={() => handleSimulateUtterance(item)}
                >
                  <span className="quote-mark">“</span>
                  <span>{item.spoken}</span>
                  <span className="quote-mark">”</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversational Transcript Display */}
          <div className="voice-dialogue-transcript">
            <div className="transcript-row user-transcript">
              <div className="transcript-avatar">
                <User size={15} />
              </div>
              <div className="transcript-content">
                <strong className="speaker-label">You</strong>
                <p className="speaker-text">“{lastExchange.userUtterance}”</p>
              </div>
            </div>

            <div className="transcript-row assistant-transcript">
              <div className="transcript-avatar">
                <Bot size={15} className="text-cyan" />
              </div>
              <div className="transcript-content">
                <strong className="speaker-label">LifePilot (Alexa+)</strong>
                <p className="speaker-text">“{lastExchange.assistantReply}”</p>
              </div>
            </div>
          </div>

          {/* Plan Summary Preview if generated */}
          {lastExchange.generatedPlan && (
            <div className="voice-plan-preview">
              <div className="preview-header">
                <span className="preview-title">Generated Voice Action Plan:</span>
                <span className="preview-items-count">
                  {lastExchange.generatedPlan.tasks?.length} Action Items
                </span>
              </div>
              <div className="preview-task-chips">
                {lastExchange.generatedPlan.tasks?.map((t, idx) => (
                  <span key={idx} className="preview-task-chip">
                    {idx + 1}. {t.title} ({t.estimatedTime})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="apply-workspace-btn"
            onClick={handleApplyToWorkspace}
          >
            <CheckCircle size={16} />
            <span>Apply Voice Plan to LifePilot Workspace</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

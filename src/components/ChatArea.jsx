import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  Bot,
  User,
  Clock,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import ActionCard from './ActionCard';
import QuickChips from './QuickChips';
import { speechService } from '../services/speechService';

export default function ChatArea({
  messages,
  onSendMessage,
  onToggleComplete,
  onTriggerAction,
  onOpenAlexaModal,
  highlightTaskId
}) {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Voice recognition handler
  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!speechService.isRecognitionSupported()) {
      // Graceful fallback: populate input with voice prompt example
      setInputText("I have a software engineering interview tomorrow. Help me prepare.");
      return;
    }

    try {
      const recognizer = speechService.createRecognizer(
        (transcript) => {
          setInputText(transcript);
          setIsListening(false);
        },
        (error) => {
          console.warn("Speech error:", error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );

      if (recognizer) {
        recognitionRef.current = recognizer;
        recognizer.start();
        setIsListening(true);
      }
    } catch (err) {
      console.warn("Could not start voice recognition", err);
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputText('');
  };

  const handleSelectPrompt = (promptText) => {
    onSendMessage(promptText);
  };

  return (
    <div className="chat-area-container">
      {/* Messages Scroll Area */}
      <div className="messages-stream">
        {messages.length === 0 ? (
          <div className="welcome-hero-card">
            <div className="welcome-sparkle-halo">
              <Sparkles size={36} className="text-cyan animate-pulse" />
            </div>
            <h1 className="welcome-title">LifePilot</h1>
            <p className="welcome-tagline">“From conversation to action.”</p>
            <p className="welcome-subtitle">Tell me what you want to accomplish.</p>

            <div className="welcome-prompts-card">
              <span className="card-sub-header">Select a goal to get started:</span>
              <div className="welcome-prompts-grid">
                <button
                  type="button"
                  className="welcome-prompt-item"
                  onClick={() => handleSelectPrompt("I have a software engineering interview tomorrow. Help me prepare.")}
                >
                  <span className="prompt-bullet">⚡</span>
                  <span className="prompt-text">“I have an interview tomorrow. Help me prepare.”</span>
                </button>

                <button
                  type="button"
                  className="welcome-prompt-item"
                  onClick={() => handleSelectPrompt("I only have two hours today.")}
                >
                  <span className="prompt-bullet">⏱️</span>
                  <span className="prompt-text">“I only have two hours today.”</span>
                </button>

                <button
                  type="button"
                  className="welcome-prompt-item"
                  onClick={() => handleSelectPrompt("Create a plan for learning Java.")}
                >
                  <span className="prompt-bullet">☕</span>
                  <span className="prompt-text">“Create a plan for learning Java.”</span>
                </button>

                <button
                  type="button"
                  className="welcome-prompt-item"
                  onClick={() => handleSelectPrompt("What should I focus on next?")}
                >
                  <span className="prompt-bullet">🎯</span>
                  <span className="prompt-text">“What should I focus on next?”</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id || idx}
                className={`message-row ${isUser ? 'user-row' : 'assistant-row'} animate-fade-in`}
              >
                <div className="message-avatar">
                  {isUser ? <User size={18} /> : <Bot size={18} className="text-cyan" />}
                </div>

                <div className="message-content-wrapper">
                  <div className="message-sender-name">
                    {isUser ? "You" : "LifePilot"}
                  </div>

                  {/* Message Text */}
                  <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
                    <p className="bubble-text">{msg.text}</p>
                  </div>

                  {/* If message embeds a generated structured plan */}
                  {msg.plan && (
                    <div className="embedded-plan-container">
                      <div className="plan-header-banner">
                        <div className="plan-header-left">
                          <ListTodo size={18} className="text-cyan" />
                          <div>
                            <h3 className="plan-title">{msg.plan.title || "Action Plan"}</h3>
                            <p className="plan-goal-text"><strong>Goal:</strong> {msg.plan.goal}</p>
                          </div>
                        </div>

                        {msg.plan.totalTimeMinutes && (
                          <div className="total-time-pill">
                            <Clock size={13} />
                            <span>Total: ~{msg.plan.totalTimeMinutes} min</span>
                          </div>
                        )}
                      </div>

                      <div className="action-cards-grid">
                        {msg.plan.tasks?.map((task, tIdx) => (
                          <ActionCard
                            key={task.id || tIdx}
                            task={task}
                            index={tIdx}
                            onToggleComplete={onToggleComplete}
                            onTriggerAction={onTriggerAction}
                            isHighlighted={highlightTaskId === task.id}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Prompt Chips */}
      <QuickChips onSelectPrompt={handleSelectPrompt} />

      {/* Bottom Input Form */}
      <form className="chat-input-bar" onSubmit={handleSubmit}>
        <div className="input-inner-wrapper">
          <button
            type="button"
            className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
            onClick={handleToggleVoiceInput}
            title={isListening ? "Listening... Click to stop" : "Speak to LifePilot"}
            aria-label="Voice input"
          >
            {isListening ? <MicOff size={19} /> : <Mic size={19} />}
          </button>

          <input
            type="text"
            className="chat-text-input"
            placeholder="Tell me what you want to accomplish... (e.g. 'I have an interview tomorrow')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="button"
            className="sim-alexa-trigger-btn"
            onClick={onOpenAlexaModal}
            title="Launch Alexa+ Simulation Modal"
          >
            <Sparkles size={14} />
            <span>Simulate Alexa+</span>
          </button>

          <button
            type="submit"
            className="send-message-btn"
            disabled={!inputText.trim()}
            title="Send Message"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import TodayFocusPanel from './components/TodayFocusPanel';
import MockInterviewModal from './components/MockInterviewModal';
import AlexaSimulationModal from './components/AlexaSimulationModal';

import { INTERVIEW_STANDARD_PLAN, INTERVIEW_2HR_EMERGENCY_PLAN } from './data/initialPlans';
import { processMessage, INTENTS } from './services/intentEngine';
import { storageService } from './services/storageService';
import { speechService } from './services/speechService';

import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('chat');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Modals state
  const [isMockModalOpen, setIsMockModalOpen] = useState(false);
  const [isAlexaModalOpen, setIsAlexaModalOpen] = useState(false);
  const [highlightTaskId, setHighlightTaskId] = useState(null);

  // Initialize plan from localStorage or start null so welcome screen shows
  const [plan, setPlan] = useState(() => {
    return storageService.getPlan() || null;
  });

  // Initialize messages from localStorage or empty array
  const [messages, setMessages] = useState(() => {
    return storageService.getMessages() || [];
  });

  const [stats, setStats] = useState(() => {
    return storageService.getStats();
  });

  // Persist plan changes
  useEffect(() => {
    storageService.savePlan(plan);
  }, [plan]);

  // Persist messages changes
  useEffect(() => {
    storageService.saveMessages(messages);
  }, [messages]);

  // Persist stats changes
  useEffect(() => {
    storageService.saveStats(stats);
  }, [stats]);

  // Core message handling
  const handleSendMessage = (userText) => {
    const userMsgId = `user-${Date.now()}`;
    const newUserMsg = {
      id: userMsgId,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString()
    };

    // Calculate response
    const result = processMessage(userText, plan);

    const assistantMsgId = `asst-${Date.now() + 1}`;
    const newAssistantMsg = {
      id: assistantMsgId,
      sender: 'assistant',
      text: result.content,
      plan: result.plan,
      intent: result.intent,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg, newAssistantMsg]);

    if (result.plan) {
      setPlan(result.plan);
    }

    if (result.highlightTaskId) {
      setHighlightTaskId(result.highlightTaskId);
      setTimeout(() => setHighlightTaskId(null), 3000);
    }

    // Voice readout if enabled
    if (voiceEnabled && result.speechText) {
      speechService.speak(result.speechText);
    }

    // Trigger action check
    if (result.triggerAction === 'OPEN_MOCK_INTERVIEW') {
      setIsMockModalOpen(true);
    }
  };

  // Toggle task completed status
  const handleToggleComplete = (taskId) => {
    if (!plan || !plan.tasks) return;

    let justCompletedAll = false;

    const updatedTasks = plan.tasks.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        return { ...t, completed: nextState };
      }
      return t;
    });

    const completedCount = updatedTasks.filter(t => t.completed).length;
    if (completedCount === updatedTasks.length && updatedTasks.length > 0) {
      justCompletedAll = true;
    }

    const updatedPlan = {
      ...plan,
      tasks: updatedTasks
    };

    setPlan(updatedPlan);

    // Update in the last assistant message if it displayed this plan
    setMessages(prev =>
      prev.map(msg => {
        if (msg.plan && msg.plan.id === updatedPlan.id) {
          return { ...msg, plan: updatedPlan };
        }
        return msg;
      })
    );

    // Update stats
    setStats(prev => ({
      ...prev,
      totalTasksCompleted: prev.totalTasksCompleted + 1
    }));

    if (justCompletedAll) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Handle action buttons inside action cards
  const handleTriggerAction = (task) => {
    if (task.actionType === 'START_MOCK') {
      setIsMockModalOpen(true);
    } else {
      // Focus on task in TodayFocusPanel
      setHighlightTaskId(task.id);
      setTimeout(() => setHighlightTaskId(null), 3000);
    }
  };

  // Switch to 2-hour emergency plan
  const handleSwitchToEmergencyPlan = () => {
    handleSendMessage("I only have two hours today.");
  };

  // Reset demo state
  const handleResetAll = () => {
    speechService.stopSpeaking();
    storageService.clearAll();
    setPlan(null);
    setMessages([]);
    setStats({ totalTasksCompleted: 0, mockScore: 0, streakDays: 1 });
  };

  // Quick add task from Focus panel
  const handleAddTask = (title) => {
    handleSendMessage(`Add task ${title}`);
  };

  // Mark mock interview completed
  const handleCompleteInterview = () => {
    if (plan && plan.tasks) {
      const mockTask = plan.tasks.find(t => t.actionType === 'START_MOCK' || t.category === 'Mock Interview');
      if (mockTask && !mockTask.completed) {
        handleToggleComplete(mockTask.id);
      }
    }
  };

  // Apply plan from Alexa+ simulation modal
  const handleApplyVoicePlan = (voicePlan, replyText) => {
    setPlan(voicePlan);
    const newAssistantMsg = {
      id: `asst-${Date.now()}`,
      sender: 'assistant',
      text: replyText || "Plan synchronized from Alexa+ voice session.",
      plan: voicePlan,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newAssistantMsg]);
  };

  const completedCount = plan?.tasks ? plan.tasks.filter(t => t.completed).length : 0;
  const totalTasks = plan?.tasks ? plan.tasks.length : 0;

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAlexaModal={() => setIsAlexaModalOpen(true)}
        onOpenMockModal={() => setIsMockModalOpen(true)}
        onResetAll={handleResetAll}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        completedCount={completedCount}
        totalTasks={totalTasks}
      />

      {/* Main 3-Column Layout */}
      <div className="app-main-layout">
        {/* Left Sidebar */}
        <Sidebar
          plan={plan}
          onToggleComplete={handleToggleComplete}
          onTriggerAction={handleTriggerAction}
          onSwitchToEmergencyPlan={handleSwitchToEmergencyPlan}
          onOpenMockModal={() => setIsMockModalOpen(true)}
          onResetPlan={() => setPlan(null)}
        />

        {/* Central Chat Studio */}
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          onToggleComplete={handleToggleComplete}
          onTriggerAction={handleTriggerAction}
          onOpenAlexaModal={() => setIsAlexaModalOpen(true)}
          highlightTaskId={highlightTaskId}
        />

        {/* Right Sidebar: Focus & Readiness Panel */}
        <TodayFocusPanel
          plan={plan}
          onToggleComplete={handleToggleComplete}
          onAddTask={handleAddTask}
          onTriggerAction={handleTriggerAction}
          onOpenMockModal={() => setIsMockModalOpen(true)}
        />
      </div>

      {/* Mock Interview Modal */}
      <MockInterviewModal
        isOpen={isMockModalOpen}
        onClose={() => setIsMockModalOpen(false)}
        onCompleteInterview={handleCompleteInterview}
      />

      {/* Simulated Alexa+ Experience Modal */}
      <AlexaSimulationModal
        isOpen={isAlexaModalOpen}
        onClose={() => setIsAlexaModalOpen(false)}
        onApplyPlanToApp={handleApplyVoicePlan}
        currentPlan={plan}
      />
    </div>
  );
}

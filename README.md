# LifePilot — From Conversation to Action

> **Amazon Developer "Build, Ship, Shape" Hackathon Submission**  
> *Track: Alexa+ Simulated Experience Track*  
> *Tagline: "From conversation to action."*

---

## 1. Project Overview

**LifePilot** is an autonomous conversational AI productivity assistant that bridges the gap between passive chat responses and real-world task execution. Instead of answering a user's question with lengthy walls of text, LifePilot understands the user's underlying goal, constructs an actionable workflow, dynamically adapts to real-world time constraints, and enables immediate in-app execution.

LifePilot features a **Simulated Alexa+ Voice Experience**, allowing users to interact through ambient conversational voice prompts and seamlessly synchronize generated voice workflows directly into their active workspace.

---

## 2. The Problem

Most modern conversational AI assistants suffer from the **"passive advice trap"**:
- **Information Overload**: When a user asks *"I have an interview tomorrow. Help me prepare,"* standard chatbots return generic essays that cause decision paralysis.
- **Lack of Actionability**: Chatbots do not track task completion, set concrete priorities, or estimate realistic execution times.
- **Rigidity under Constraints**: When life happens and time shrinks (e.g., *"I only have two hours"*), traditional LLM outputs do not dynamically restructure an existing plan or maintain progress states.
- **Disconnection from Execution**: Users have to copy-paste suggestions into separate todo apps, timer tools, and interview prep websites.

---

## 3. The Solution

LifePilot transforms high-level user utterances directly into execution-ready workflows:
1. **Goal-Oriented Intent Detection**: Classifies user intentions (Interview Preparation, Emergency Time Constraints, Daily Productivity Sprints, Topic Roadmaps, Next Action queries).
2. **Structured Action Workflows**: Generates structured cards with concrete subtasks, estimated completion minutes, and priority rankings.
3. **Dynamic Constraint Adaptation**: Intelligently scales and recalibrates time allocations when user time constraints shift (e.g., standard 3.25h prep condensing into a high-yield 2h emergency plan).
4. **Built-in Execution Modules**: Includes an integrated **Technical Mock Interview Drill** with automated answer analysis and scoring, plus a **Pomodoro Focus Spotlight**.
5. **Simulated Alexa+ Integration**: Visual and auditory demonstration of ambient voice interactions for smart home and desktop devices.

---

## 4. Key Features

- **⚡ Interview Preparation Workflow**:
  - Automatically structures high-yield preparation across Core Java, DSA, SQL, Project Review, and Mock Interviews.
  - Interactive checkboxes with instant completion state updates.
- **⏱️ Adaptive 2-Hour Emergency Planning**:
  - Automatically detects time constraints (*"I only have two hours today"*).
  - Recalibrates durations to 120 minutes while preserving already-completed tasks.
- **📊 Real-time Progress & Readiness Gauge**:
  - Live progress track showing `X / Y completed` and calculated percentage.
  - Interview readiness score reflecting completed preparation milestones.
  - Full persistence across browser refreshes via `localStorage`.
- **🎯 Interactive Technical Mock Interview**:
  - 5-question technical drill across Core Java, OOP, DSA, SQL, and System Design.
  - Concept-aware feedback evaluating key technical terminology, trade-offs, and complexities.
  - Strengths breakdown, missed points alerts, and model answers.
  - Confetti celebration upon completion and automatic synchronization back to the active plan.
- **🎙️ Simulated Alexa+ Voice Experience**:
  - Dedicated simulation modal with pulsing voice orb and audio waveforms.
  - Browser Speech Synthesis (`window.speechSynthesis`) audio voice readouts.
  - Voice recognition input (`webkitSpeechRecognition` with keyboard fallback).
  - One-click plan synchronization from voice session to workspace.
- **🔥 Today's Focus Spotlight**:
  - Auto-selects the highest-priority uncompleted task.
  - Built-in 25-minute Pomodoro focus timer with start/pause/reset.
  - Quick-task addition form.

---

## 5. Tech Stack

- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS (Tailored Design System, Dark Mode, Glassmorphism, Responsive Grid)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Voice Intelligence (Simulated)**: Web Speech API (SpeechSynthesis & SpeechRecognition)
- **State Management & Persistence**: React Hooks + Browser `localStorage`
- **Testing**: Automated Integration Suite (Node.js ESM)

---

## 6. Architecture

```
lifepilot-hackathon/
├── index.html                    # Entry HTML with Google Fonts & Meta tags
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite configuration
├── test-lifepilot.js             # Automated integration tests
├── src/
│   ├── main.jsx                  # React application root mount
│   ├── App.jsx                   # Master state orchestrator & layout
│   ├── App.css                   # Cohesive design system & responsive styling
│   ├── index.css                 # CSS variables, typography & base resets
│   ├── data/
│   │   ├── initialPlans.js       # Actionable plan schemas (Standard, 2-Hr, Java, Daily)
│   │   └── mockQuestions.js      # 5 Technical interview questions & evaluation heuristics
│   ├── services/
│   │   ├── intentEngine.js       # Client-side intent detection & workflow generator
│   │   ├── speechService.js      # Speech synthesis & recognition abstraction
│   │   └── storageService.js     # Robust localStorage persistence
│   └── components/
│       ├── Header.jsx            # Brand navigation, mode switcher, voice mute & reset
│       ├── Sidebar.jsx           # Today's Plan, progress bar & checklist
│       ├── ChatArea.jsx          # Message thread, action cards & input controls
│       ├── ActionCard.jsx        # Interactive task card with subtasks & buttons
│       ├── TodayFocusPanel.jsx   # Focus spotlight, Pomodoro timer & readiness gauge
│       ├── QuickChips.jsx        # Clickable prompt presets for fast demo
│       ├── MockInterviewModal.jsx# 5-question mock interview drill & feedback
│       └── AlexaSimulationModal.jsx # Simulated Alexa+ voice experience modal
```

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18+ recommended, verified on v24.12.0)
- npm (v9+ recommended, verified on v11.6.2)

### Installation & Execution
```bash
# 1. Clone or navigate to the directory
cd lifepilot-hackathon

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://127.0.0.1:5173/
```

### Production Build & Verification
```bash
# Build production bundle
npm run build

# Run automated integration tests
node test-lifepilot.js
```

---

## 8. Example Interactions

| User Prompt | Detected Intent | Assistant Action |
|---|---|---|
| *"I have a software engineering interview tomorrow. Help me prepare."* | `INTERVIEW_PREP` | Generates 5-part preparation plan (Java, DSA, SQL, Projects, Mock Interview). |
| *"I only have two hours today."* | `TIME_OPTIMIZATION` | Condenses plan to 120 minutes with high-yield allocations. |
| *"What should I focus on next?"* | `NEXT_ACTION` | Highlights the top uncompleted task and its primary subtask. |
| *"Start my mock interview"* | `MOCK_INTERVIEW` | Launches the interactive 5-question mock interview drill. |
| *"Create a plan for learning Java."* | `LEARN_JAVA` | Generates comprehensive Java mastery roadmap. |
| *"What should I do today?"* | `DAILY_PLAN` | Generates high-impact engineering sprint plan. |
| *"Remind me to practice System Design"* | `CREATE_TASK` | Dynamically appends a new priority card to the active workflow. |

---

## 9. Alexa+ Simulated Experience Explanation

The **Alexa+ Experience Simulation** feature showcases how ambient voice assistants can evolve from simple Q&A bots into proactive workflow copilots:
- **Orb & Waveform**: Visual acoustic feedback simulates Alexa's ambient listening and speaking states.
- **Voice Synthesis**: Live verbal readout using browser `SpeechSynthesisUtterance`.
- **Bidirectional Sync**: Voice requests simulate Alexa+ intents and allow immediate application back to the visual LifePilot desktop workspace.
- **Transparency**: Clearly marked as a visual prototype demonstration for the hackathon, using standard browser web speech APIs without pretending to make unauthorized AWS backend calls.

---

## 10. Limitations

- **Simulated Voice Backend**: Voice recognition and synthesis rely on standard browser Web Speech APIs; native Alexa Skill SDK deployment is simulated rather than connected to live Amazon Developer Console endpoints.
- **Deterministic Evaluation**: Mock interview question evaluation uses keyword and conceptual rule heuristics rather than a live remote LLM endpoint to ensure 100% offline reliability without paid API keys.
- **Client-Side Storage**: Data persists in browser `localStorage`, scoped to the user's browser profile.

---

## 11. Future Improvements

1. **Native Alexa Skill Deployment**: Connect to AWS Lambda and the Alexa Skills Kit (ASK) SDK for official Alexa+ enabled Echo devices.
2. **Cloud Synchronization**: Integrate AWS DynamoDB or Amazon Cognito for cross-device plan syncing between smart speaker and web dashboard.
3. **Custom LLM Fine-Tuning**: Hook up Amazon Bedrock (Claude / Titan) for open-ended technical mock interview evaluation and resume parsing.
4. **Calendar Integration**: Export generated time blocks directly to Google Calendar or Microsoft Outlook.

---

## License
MIT License. Created for the **Amazon Developer "Build, Ship, Shape" Hackathon**.

# LifePilot — Devpost Submission Draft

> **Project Name**: LifePilot  
> **Tagline**: From conversation to action.  
> **Hackathon**: Amazon Developer "Build, Ship, Shape" Hackathon  
> **Category / Track**: Alexa+ Simulated Experience Track  

---

## Elevator Pitch
LifePilot is an autonomous conversational productivity assistant that eliminates the "passive advice trap." Instead of replying to goals with static essays, LifePilot turns natural language requests into structured, interactive workflows, dynamically adapts to real-world time constraints, and enables immediate in-app execution through technical mock interviews and ambient Alexa+ voice simulation.

---

## Inspiration & Problem
Every engineer and student has faced this dilemma: you have an important milestone—such as a software engineering interview tomorrow or an urgent sprint goal—so you open a conversational AI assistant and type: *"I have an interview tomorrow. Help me prepare."*

The result is almost always a 1,000-word generic markdown essay. You are left with the burden of parsing the advice, deciding what matters most, manually setting time limits, and copying items into separate todo apps and timers. Worse yet, when your available time changes (e.g., *"I only have two hours"*), traditional chatbots start from scratch, losing your progress and context.

We asked: **What if an AI assistant didn't just give advice, but actively guided execution from conversation to completed action?**

That vision is **LifePilot**.

---

## What It Does

1. **Natural Language to Actionable Workflows**: LifePilot parses user goals (e.g., interview preparation, learning roadmaps, daily engineering sprints) and generates structured action cards with concrete subtasks, priorities, and realistic time estimates.
2. **Adaptive Time Optimization**: If a user's schedule gets compressed (e.g., *"I only have 2 hours"*), LifePilot dynamically recalculates task durations and condenses the plan into a high-yield emergency workflow while retaining completed milestones.
3. **Reactive Progress & State Persistence**: An interactive checklist automatically updates progress counters (`X / Y completed`), readiness percentages, and persists all state in `localStorage`.
4. **Embedded Execution — Technical Mock Interview**: Instead of sending users elsewhere, LifePilot includes a built-in 5-question technical mock interview drill (covering Java, OOP, DSA, SQL, and Architecture) with instant concept-aware evaluation, scoring, and model answers.
5. **Simulated Alexa+ Voice Experience**: An ambient voice assistant simulator showcasing how smart devices can interact using voice requests, speech synthesis, and seamless synchronization back to the visual desktop workspace.
6. **Today's Focus Spotlight**: Features a dedicated 25-minute Pomodoro focus timer linked to the highest-priority uncompleted task.

---

## How We Built It

- **Frontend & UI**: Built with React 19 and Vite for instant load times, utilizing a custom-designed dark-mode glassmorphic interface with Plus Jakarta Sans typography, Lucide React icons, and Canvas Confetti.
- **Intent Detection Engine**: Implemented a resilient client-side regex and keyword intent parsing engine supporting `INTERVIEW_PREP`, `TIME_OPTIMIZATION`, `DAILY_PLAN`, `NEXT_ACTION`, `MOCK_INTERVIEW`, `LEARN_JAVA`, and `CREATE_TASK`.
- **Knowledge & Heuristics Engine**: Created a structured evaluation engine for technical questions that parses key concepts (e.g., asymptotic complexity, memory layout, pointer operations) and returns actionable feedback.
- **Voice Intelligence Layer**: Leveraged the browser Web Speech API (`SpeechSynthesis` and `SpeechRecognition`) to deliver an authentic, hands-free Alexa+ simulation without external paid API dependencies.
- **Testing & Quality Assurance**: Built an automated Node.js test suite with 22 integration tests verifying 100% pass rates across intent routing, plan adaptation, and evaluation accuracy.

---

## Challenges We Overcame

1. **Balancing Assistant Conciseness vs. Actionability**: Finding the exact right personality—avoiding verbose boilerplate while ensuring every task card had clear, actionable sub-bullets.
2. **Preserving State During Plan Adaptation**: When adapting a 3.25-hour plan into a 2-hour emergency plan, we engineered the state machine to preserve completed tasks across category matches so users never lose credit for work done.
3. **Realistic Mock Interview Feedback Without Paid Remote LLMs**: Building an offline-first evaluation engine capable of reliably assessing technical answers on data structures and algorithms without external network latency or paid API credentials.

---

## Accomplishments That We're Proud Of

- Delivering a zero-dependency, fully functional local MVP that runs in seconds with `npm run dev`.
- Achieving a seamless user journey from conversation -> structured plan -> time constraint adaptation -> mock interview -> completion celebration.
- Creating an engaging, visually polished UI that looks and feels like a production-ready developer tool.
- Passing all 22 automated integration tests with zero lint and build errors.

---

## What We Learned

- Workflow design requires AI to be concise and opinionated. The best AI assistants act as decisive project managers rather than open-ended encyclopedia search engines.
- Ambient voice interfaces (like Alexa+) become significantly more powerful when they have a visual counterpart that persists and visualizes generated workflows.

---

## What's Next for LifePilot

- **Native Alexa Skill SDK Integration**: Packaging the intent engine as an official Alexa Skill with AWS Lambda backend.
- **Cloud Sync with AWS DynamoDB**: Allowing users to initiate a plan via Alexa in the morning and review progress on their desktop dashboard throughout the day.
- **Amazon Bedrock AI Integration**: Connecting Claude or Amazon Titan for dynamic mock interview question generation and personalized resume analysis.
- **Calendar Export**: One-click export of generated preparation blocks into Google Calendar or Microsoft Outlook.

---

## Built With
- `react`
- `vite`
- `javascript`
- `css3`
- `lucide-react`
- `canvas-confetti`
- `web-speech-api`

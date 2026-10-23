# LifePilot — 3-Minute Video Demo Script

> **Target Duration**: ~2:45 (under 3 minutes)  
> **Hackathon Track**: Alexa+ Simulated Experience Track | Amazon Developer "Build, Ship, Shape" Hackathon  
> **Key Message**: *LifePilot turns conversation into structured, adaptive action.*

---

## Screen & Audio Setup Before Recording
- Open browser at `http://127.0.0.1:5173/`
- Clear previous state by clicking the reset icon in the top right (ensures welcome screen is fresh)
- Ensure microphone is clear and computer audio output is captured (for assistant voice synthesis)

---

## Timeline Breakdown

### [0:00 - 0:25] The Problem & Introduction
- **Visual**: Start on the clean LifePilot home screen. Point mouse at the title: **LifePilot — "From conversation to action."**
- **Speaker**:  
  *"Hi everyone! Today's AI assistants can answer almost any question, but they suffer from the 'passive advice trap'—when you ask for interview prep or daily planning, they give you massive essays that leave you with decision paralysis. You still have to organize, prioritize, and track your tasks manually.*  
  *Meet **LifePilot**—an autonomous AI productivity assistant that turns your conversation directly into actionable, adaptive workflows."*

---

### [0:25 - 1:05] Core Feature 1: Interview Preparation Workflow
- **Visual**: Click the first preset prompt: *"I have an interview tomorrow. Help me prepare."*
- **Speaker**:  
  *"Let's say I have a software engineering interview tomorrow. Instead of generic text, watch what LifePilot does."*
- **Visual**: Assistant responds concisely: *"Got it. You have one day, so I'm prioritizing the highest-impact topics first."*  
  Highlight the 5 generated Action Cards:
  1. Core Java (45 min, High priority)
  2. DSA (60 min, High priority)
  3. SQL (30 min, Medium priority)
  4. Projects (30 min, Medium priority)
  5. Mock Interview (30 min, High priority)
- **Visual**: Check the checkbox on **Task 1: Core Java**. Show the sidebar **Today's Progress** bar update immediately from `0/5` to `1/5 (20% Ready)`.
- **Speaker**:  
  *"LifePilot instantly generated a sequenced 5-part plan with estimated durations and priorities. I can check off tasks right here, and the reactive progress tracker updates immediately. Everything is saved to localStorage so I never lose progress."*

---

### [1:05 - 1:40] Core Feature 2: Adaptive 2-Hour Emergency Plan
- **Visual**: Click the prompt chip: *"I only have 2 hours"* (or type in the input bar: *"I only have two hours today."*).
- **Speaker**:  
  *"Now, imagine life happens and your afternoon gets cut short. Traditional chatbots make you start over. With LifePilot, I simply say: 'I only have two hours.' Watch how it adapts."*
- **Visual**: Assistant responds: *"Understood. Two hours is tight, so I've condensed your plan to focus only on high-yield topics."*  
  Show the restructured **2-Hour Emergency Interview Plan**:
  - Java: 30 min
  - DSA: 40 min
  - SQL: 20 min
  - Projects: 20 min
  - Mock Interview: 10 min
  - Total: 120 min. Notice that the Core Java completion status was preserved!
- **Speaker**:  
  *"LifePilot dynamically recalculated the total time to exactly 120 minutes, prioritizing high-yield topics while preserving my completed progress."*

---

### [1:40 - 2:15] Core Feature 3 & 4: Interactive Mock Interview Simulation
- **Visual**: Click **"Start Mock Interview"** button on Task 5 or in the sidebar.
- **Visual**: The **Technical Mock Interview** modal opens showing Question 1: *"Explain the difference between ArrayList and LinkedList in Java."*
- **Speaker**:  
  *"LifePilot doesn't just give you a checklist—it provides the tools to execute immediately. Here's our built-in 5-question technical mock interview drill."*
- **Visual**: Click **"Insert Demo Answer"** to load a comprehensive technical answer. Click **"Submit for Feedback"**.
- **Visual**: Show evaluation score (`100/100`), green checkmarks under **Strengths**, missed nuance recommendations, and the **Optimal Model Answer**.
- **Visual**: Click **"Next Question"** to show Question 2 (*Polymorphism in OOP*).
- **Speaker**:  
  *"The evaluation engine parses key computer science concepts—like random access complexity, memory layout, and node pointers—giving immediate, actionable feedback. Once completed, it syncs back to your plan."*
- **Visual**: Close the modal.

---

### [2:15 - 2:40] Simulated Alexa+ Voice Experience
- **Visual**: Click **"Alexa+ Simulation"** in the top header.
- **Visual**: Show the pulsing glowing voice orb, acoustic waveforms, and disclaimer.
- **Visual**: Click the sample utterance: *"Alexa, ask LifePilot to prepare me for my interview tomorrow."*
- **Visual**: Assistant orb pulses, waveform animates, and audio voice reads: *"Got it. I'll prioritize the most important topics for tomorrow."*
- **Visual**: Click **"Apply Voice Plan to LifePilot Workspace"**. The modal closes and the voice plan is populated in the main workspace!
- **Speaker**:  
  *"Finally, for the Amazon Developer Alexa+ Track, we built the Simulated Alexa+ Voice Experience. It models how ambient smart speakers can interact conversationally with LifePilot and synchronize plans straight to your desktop workspace."*

---

### [2:40 - 2:50] Conclusion & Wrap-up
- **Visual**: Return to the 3-column view showing Today's Focus timer and readiness score.
- **Speaker**:  
  *"LifePilot takes you from conversation to action in seconds. Thank you for watching!"*

---

## Demo Tips for Success
1. Speak at a steady, confident pace.
2. Let the assistant voice readout finish before speaking to avoid audio overlap.
3. Keep mouse movements smooth and deliberate.

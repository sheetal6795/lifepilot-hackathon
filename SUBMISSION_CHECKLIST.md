# Devpost Submission Checklist for LifePilot

> **Amazon Developer "Build, Ship, Shape" Hackathon**  
> *Track: Alexa+ Simulated Experience Track*  
> *Follow this checklist step-by-step prior to submitting your project.*

---

## 1. Project Information & Metadata
- [ ] **Project Title**: `LifePilot`
- [ ] **Tagline**: `From conversation to action.`
- [ ] **Category / Track**: Select **Alexa+ Simulated Experience Track** (or relevant track).
- [ ] **Project Description**: Copy content from [DEVPOST_DRAFT.md](file:///c:/Users/pc/Downloads/lifepilot-hackathon/DEVPOST_DRAFT.md).
- [ ] **Built With Tags**: `react`, `vite`, `javascript`, `css3`, `lucide-react`, `canvas-confetti`, `web-speech-api`.

---

## 2. Code Repository & Integrity
- [ ] **Public Git Repository**: Push codebase to GitHub / GitLab (ensure repo visibility is Public).
- [ ] **README.md Verified**: Ensure [README.md](file:///c:/Users/pc/Downloads/lifepilot-hackathon/README.md) is visible at repository root with problem, solution, features, architecture, and run instructions.
- [ ] **No Secret Leaks**: Verified that NO API keys, private tokens, or hardcoded credentials exist in source code.
- [ ] **Clean Build**: Run `npm run build` locally to verify production bundle builds cleanly in < 3 seconds.
- [ ] **Automated Tests**: Run `node test-lifepilot.js` to ensure all 22 integration tests pass (`22 PASSED, 0 FAILED`).

---

## 3. Demo Video (Under 3 Minutes)
- [ ] **Script Prepared**: Review [DEMO_SCRIPT.md](file:///c:/Users/pc/Downloads/lifepilot-hackathon/DEMO_SCRIPT.md) (targets ~2:45).
- [ ] **Audio Check**: Test microphone clarity and ensure system audio captures the assistant voice readout.
- [ ] **Key Flows Demonstrated**:
  - [ ] Opening screen with branding & tagline
  - [ ] Click *"I have an interview tomorrow"* -> generates 5 structured action cards
  - [ ] Check off Task 1 -> sidebar progress updates to `1/5 (20%)`
  - [ ] Type/click *"I only have 2 hours"* -> plan adapts to 120-minute emergency plan
  - [ ] Open **Technical Mock Interview** -> answer Question 1 -> receive evaluation feedback -> next question
  - [ ] Open **Simulated Alexa+ Experience** -> show voice orb & audio dialogue
  - [ ] Conclude with value proposition: *"From conversation to action"*
- [ ] **Video Host**: Upload video to YouTube (set to Public or Unlisted) or Vimeo.
- [ ] **Video Link**: Add link into the Devpost "Video Demo" field.

---

## 4. Screenshots & Visual Assets
- [ ] Capture 3-5 high-resolution screenshots:
  1. `1_dashboard_plan.png`: Full 3-column view showing generated Interview Plan, sidebar checklist, and Focus timer.
  2. `2_adaptive_2hr.png`: 2-Hour Emergency Plan showing condensed time allocations.
  3. `3_mock_interview.png`: Mock Interview modal showing Question 1, evaluation score, and model answer.
  4. `4_alexa_simulation.png`: Simulated Alexa+ modal with glowing orb and speech transcript.
- [ ] Upload screenshots to the Devpost image gallery.

---

## 5. Hackathon Compliance & Truthfulness
- [ ] **Track Alignment**: Clearly explain the simulated nature of the Alexa+ experience as instructed (no false claims of AWS/Alexa certification).
- [ ] **AWS Policy Check**: Verified no fake AWS services are claimed.
- [ ] **Logo & Brand Compliance**: Confirmed no unauthorized copyrighted Amazon or Alexa logos are used; clean custom SVG branding is utilized throughout.
- [ ] **Local Execution Verification**: Verified that judges or reviewers can clone the repo and run `npm install && npm run dev` to see the exact same working app instantly.

---

## 6. Final Submission
- [ ] Double-check all required Devpost fields are filled.
- [ ] Click **Submit Project**.
- [ ] Confirm submission status indicates "Submitted" prior to deadline.

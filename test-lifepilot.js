// Automated Node.js verification test for LifePilot core intelligence and flows
import { detectIntent, processMessage, INTENTS } from './src/services/intentEngine.js';
import { mockQuestions } from './src/data/mockQuestions.js';
import { INTERVIEW_STANDARD_PLAN, INTERVIEW_2HR_EMERGENCY_PLAN } from './src/data/initialPlans.js';

console.log("=========================================");
console.log("   LIFEPILOT AUTOMATED INTEGRATION TESTS ");
console.log("=========================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Test Intent Detection
console.log("--- TEST SUITE 1: INTENT ENGINE ---");
assert(
  detectIntent("I have a software engineering interview tomorrow. Help me prepare.") === INTENTS.INTERVIEW_PREP,
  "Intent: INTERVIEW_PREP detected accurately"
);
assert(
  detectIntent("I only have two hours today.") === INTENTS.TIME_OPTIMIZATION,
  "Intent: TIME_OPTIMIZATION detected for 'I only have two hours today'"
);
assert(
  detectIntent("I only have 2 hours") === INTENTS.TIME_OPTIMIZATION,
  "Intent: TIME_OPTIMIZATION detected for 'I only have 2 hours'"
);
assert(
  detectIntent("What should I focus on next?") === INTENTS.NEXT_ACTION,
  "Intent: NEXT_ACTION detected accurately"
);
assert(
  detectIntent("Start my mock interview") === INTENTS.MOCK_INTERVIEW,
  "Intent: MOCK_INTERVIEW detected accurately"
);
assert(
  detectIntent("Create a plan for learning Java.") === INTENTS.LEARN_JAVA,
  "Intent: LEARN_JAVA detected accurately"
);
assert(
  detectIntent("What should I do today?") === INTENTS.DAILY_PLAN,
  "Intent: DAILY_PLAN detected accurately"
);

// 2. Test Plan Generation & Flow
console.log("\n--- TEST SUITE 2: PLAN GENERATION & ADAPTATION ---");
const interviewResult = processMessage("I have an interview tomorrow. Help me prepare.", null);
assert(interviewResult.plan !== null, "Generated plan is non-null");
assert(interviewResult.plan.tasks.length === 5, "Generated plan contains exactly 5 core tasks");
assert(interviewResult.plan.tasks[0].category === "Core Java", "Task 1 is Core Java");
assert(interviewResult.plan.tasks[4].actionType === "START_MOCK", "Task 5 is Mock Interview trigger");

// Test 2-Hour Plan Adaptation
console.log("\n--- TEST SUITE 3: 2-HOUR ADAPTATION ---");
const adaptedResult = processMessage("I only have 2 hours", interviewResult.plan);
assert(adaptedResult.plan.title === "2-Hour Emergency Interview Plan", "Plan adapted to 2-Hour Emergency Plan");
assert(adaptedResult.plan.totalTimeMinutes === 120, "Total time is exactly 120 minutes (2 hours)");
assert(adaptedResult.plan.tasks[0].estimatedTime === "30 min", "Core Java adapted to 30 min");
assert(adaptedResult.plan.tasks[1].estimatedTime === "40 min", "DSA adapted to 40 min");
assert(adaptedResult.plan.tasks[2].estimatedTime === "20 min", "SQL adapted to 20 min");
assert(adaptedResult.plan.tasks[3].estimatedTime === "20 min", "Projects adapted to 20 min");
assert(adaptedResult.plan.tasks[4].estimatedTime === "10 min", "Mock Interview adapted to 10 min");

// 3. Test Mock Interview Evaluation
console.log("\n--- TEST SUITE 4: MOCK INTERVIEW EVALUATION ---");
assert(mockQuestions.length === 5, "Exactly 5 interview questions defined");

const q1 = mockQuestions[0]; // ArrayList vs LinkedList
const sampleAnswerQ1 = "ArrayList is backed by dynamic array with O(1) random access indexing. LinkedList uses doubly-linked nodes with insertion/deletion O(1) at ends but O(n) traversal. LinkedList has memory overhead for pointers.";
const evalQ1 = q1.evaluateAnswer(sampleAnswerQ1);

assert(evalQ1.score >= 80, `Evaluation scored high quality answer properly (Score: ${evalQ1.score}/100)`);
assert(evalQ1.strengths.length > 0, `Strengths correctly highlighted: ${evalQ1.strengths.length} items`);
assert(evalQ1.keyTakeaway.length > 20, "Model answer takeaway present");

console.log("\n=========================================");
console.log(`TOTAL RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("=========================================\n");

if (failed > 0) process.exit(1);

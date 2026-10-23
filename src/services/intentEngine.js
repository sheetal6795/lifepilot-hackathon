import {
  INTERVIEW_STANDARD_PLAN,
  INTERVIEW_2HR_EMERGENCY_PLAN,
  JAVA_LEARNING_PLAN,
  DAILY_ENGINEERING_PLAN
} from '../data/initialPlans.js';

export const INTENTS = {
  INTERVIEW_PREP: "INTERVIEW_PREP",
  TIME_OPTIMIZATION: "TIME_OPTIMIZATION",
  DAILY_PLAN: "DAILY_PLAN",
  CREATE_TASK: "CREATE_TASK",
  NEXT_ACTION: "NEXT_ACTION",
  MOCK_INTERVIEW: "MOCK_INTERVIEW",
  LEARN_JAVA: "LEARN_JAVA",
  UNKNOWN: "UNKNOWN"
};

/**
 * Detect user intent using robust pattern and keyword matching
 * @param {string} input - raw user utterance
 * @returns {string} detected intent
 */
export function detectIntent(input) {
  if (!input || typeof input !== "string") return INTENTS.UNKNOWN;
  const text = input.trim().toLowerCase();

  // 1. Time Optimization / Constraints
  // e.g. "I only have 2 hours", "I only have two hours", "short on time", "condense my plan", "cut down time"
  if (
    /only have\s+(two|2)\s*hours?/i.test(text) ||
    /2\s*hours?/i.test(text) && (text.includes("only") || text.includes("just") || text.includes("limit") || text.includes("short")) ||
    /short on time|tight schedule|crunch time|condense plan|emergency plan/i.test(text)
  ) {
    return INTENTS.TIME_OPTIMIZATION;
  }

  // 2. Mock Interview
  // e.g. "Start my mock interview", "start mock", "practice technical questions", "take interview"
  if (
    /start\s+(my\s+)?mock(\s+interview)?/i.test(text) ||
    /mock\s*interview/i.test(text) ||
    /practice\s+questions/i.test(text) ||
    /test\s+my\s+knowledge/i.test(text)
  ) {
    return INTENTS.MOCK_INTERVIEW;
  }

  // 3. Learning Java
  // e.g. "Create a plan for learning Java", "how to learn java", "learn java"
  if (
    /learn(ing)?\s+java/i.test(text) ||
    /java\s+(roadmap|guide|curriculum|plan)/i.test(text)
  ) {
    return INTENTS.LEARN_JAVA;
  }

  // 4. Interview Preparation
  // e.g. "I have a software engineering interview tomorrow. Help me prepare.", "interview tomorrow", "prepare for interview"
  if (
    /interview\s+tomorrow/i.test(text) ||
    /help\s+me\s+prepare/i.test(text) ||
    /software\s+engineering\s+interview/i.test(text) ||
    /tech(nical)?\s+interview/i.test(text) ||
    /prepare.*interview/i.test(text) ||
    /interview.*prep/i.test(text)
  ) {
    return INTENTS.INTERVIEW_PREP;
  }

  // 5. Next Action
  // e.g. "What should I focus on next?", "what next", "what to do next"
  if (
    /what\s+should\s+i\s+focus\s+on\s+next/i.test(text) ||
    /what(\s+is|\s+'s)?\s+next/i.test(text) ||
    /next\s+(action|task|step)/i.test(text) ||
    /where\s+should\s+i\s+start/i.test(text)
  ) {
    return INTENTS.NEXT_ACTION;
  }

  // 6. Create Task / Reminder
  // e.g. "Remind me to practice Java", "Add task review system design", "create task..."
  if (
    /^remind\s+me\s+to/i.test(text) ||
    /^add\s+task/i.test(text) ||
    /^create\s+task/i.test(text) ||
    /^new\s+task/i.test(text)
  ) {
    return INTENTS.CREATE_TASK;
  }

  // 7. Daily Plan
  // e.g. "What should I do today?", "plan my day", "daily plan", "organize my day"
  if (
    /what\s+should\s+i\s+do\s+today/i.test(text) ||
    /plan\s+my\s+day/i.test(text) ||
    /daily\s+plan/i.test(text) ||
    /today('s|\s+)schedule/i.test(text) ||
    /organize\s+today/i.test(text)
  ) {
    return INTENTS.DAILY_PLAN;
  }

  return INTENTS.UNKNOWN;
}

/**
 * Process a user message and generate the structured assistant response and state mutations
 * @param {string} userMessage - User's input text
 * @param {object} currentPlan - Currently active plan object
 * @returns {object} response payload with message, updated plan, intent, and optional action trigger
 */
export function processMessage(userMessage, currentPlan) {
  const intent = detectIntent(userMessage);

  switch (intent) {
    case INTENTS.INTERVIEW_PREP: {
      const plan = JSON.parse(JSON.stringify(INTERVIEW_STANDARD_PLAN));
      return {
        intent,
        speechText: "Got it. You have one day, so I'm prioritizing the highest-impact topics first. Here is your structured preparation workflow.",
        content: "Got it. You have one day, so I'm prioritizing the highest-impact topics first.",
        plan,
        triggerAction: null,
        planTitle: plan.title,
        goal: plan.goal
      };
    }

    case INTENTS.TIME_OPTIMIZATION: {
      // Emergency 2-hour plan adaptation
      const adaptedPlan = JSON.parse(JSON.stringify(INTERVIEW_2HR_EMERGENCY_PLAN));
      
      // Preserve completed status if tasks with matching categories were completed
      if (currentPlan && currentPlan.tasks) {
        currentPlan.tasks.forEach(oldTask => {
          if (oldTask.completed) {
            const match = adaptedPlan.tasks.find(t => t.category === oldTask.category);
            if (match) match.completed = true;
          }
        });
      }

      return {
        intent,
        speechText: "Understood. Two hours is tight, so I've condensed your plan to focus only on high-yield topics.",
        content: "Understood. Two hours is tight, so I've condensed your plan to focus only on high-yield topics. Here is your adjusted emergency roadmap.",
        plan: adaptedPlan,
        triggerAction: null,
        planTitle: adaptedPlan.title,
        goal: adaptedPlan.goal
      };
    }

    case INTENTS.DAILY_PLAN: {
      const plan = JSON.parse(JSON.stringify(DAILY_ENGINEERING_PLAN));
      return {
        intent,
        speechText: "Here is your high-impact daily engineering plan. Let's tackle the deep work block first.",
        content: "Here is your high-impact daily engineering sprint. I've sequenced it to protect your deep focus first.",
        plan,
        triggerAction: null,
        planTitle: plan.title,
        goal: plan.goal
      };
    }

    case INTENTS.LEARN_JAVA: {
      const plan = JSON.parse(JSON.stringify(JAVA_LEARNING_PLAN));
      return {
        intent,
        speechText: "Here is your step-by-step Java mastery roadmap, starting with memory and OOP fundamentals.",
        content: "Here is your step-by-step Java mastery roadmap, starting with memory and OOP fundamentals through modern streams.",
        plan,
        triggerAction: null,
        planTitle: plan.title,
        goal: plan.goal
      };
    }

    case INTENTS.MOCK_INTERVIEW: {
      return {
        intent,
        speechText: "Launching mock interview simulation now. Good luck!",
        content: "Opening your technical mock interview session. You will be evaluated across Core Java, OOP, DSA, SQL, and Architecture.",
        plan: currentPlan,
        triggerAction: "OPEN_MOCK_INTERVIEW",
        planTitle: currentPlan ? currentPlan.title : null,
        goal: currentPlan ? currentPlan.goal : null
      };
    }

    case INTENTS.NEXT_ACTION: {
      if (!currentPlan || !currentPlan.tasks || currentPlan.tasks.length === 0) {
        return {
          intent,
          speechText: "You don't have an active plan yet. Tell me what you want to accomplish or click 'Prepare me for an interview'.",
          content: "You don't have an active plan yet. Tell me what you want to accomplish (e.g., 'I have an interview tomorrow') to generate an action workflow.",
          plan: currentPlan,
          triggerAction: null
        };
      }

      const nextTask = currentPlan.tasks.find(t => !t.completed);
      if (!nextTask) {
        return {
          intent,
          speechText: "Outstanding work! You have completed all tasks in your current plan. Ready for a mock interview?",
          content: "🎉 Outstanding! You have completed all scheduled tasks in this plan. You are in great shape—ready to test your skills in the Mock Interview?",
          plan: currentPlan,
          triggerAction: null
        };
      }

      return {
        intent,
        speechText: `Your top priority right now is ${nextTask.title}, estimated at ${nextTask.estimatedTime}. Let's dive in.`,
        content: `Your top priority right now is **${nextTask.title}** (${nextTask.estimatedTime}, ${nextTask.priority} priority). Focus on: ${nextTask.subtasks[0] || 'the core objective'}.`,
        plan: currentPlan,
        triggerAction: null,
        highlightTaskId: nextTask.id
      };
    }

    case INTENTS.CREATE_TASK: {
      let taskName = userMessage
        .replace(/^remind\s+me\s+to\s+/i, "")
        .replace(/^add\s+task\s+/i, "")
        .replace(/^create\s+task\s+/i, "")
        .replace(/^new\s+task\s+/i, "")
        .trim();

      if (!taskName) taskName = "New Priority Task";

      // Capitalize first letter
      taskName = taskName.charAt(0).toUpperCase() + taskName.slice(1);

      const newTask = {
        id: `custom-task-${Date.now()}`,
        title: taskName,
        category: "Custom",
        subtasks: ["Execute focused task", "Mark as completed upon finishing"],
        estimatedTime: "25 min",
        estimatedMinutes: 25,
        priority: "High",
        completed: false,
        actionLabel: "Start Focus",
        actionType: "TIMER"
      };

      const updatedPlan = currentPlan
        ? {
            ...currentPlan,
            totalTimeMinutes: (currentPlan.totalTimeMinutes || 0) + 25,
            tasks: [...currentPlan.tasks, newTask]
          }
        : {
            id: `plan-custom-${Date.now()}`,
            title: "Custom Action Plan",
            goal: "Custom tasks and goals created through conversation.",
            type: "CUSTOM",
            totalTimeMinutes: 25,
            tasks: [newTask]
          };

      return {
        intent,
        speechText: `Added "${taskName}" to your active workflow.`,
        content: `Added **${taskName}** to your active workflow (25 min, High priority).`,
        plan: updatedPlan,
        triggerAction: null,
        highlightTaskId: newTask.id
      };
    }

    default: {
      return {
        intent: INTENTS.UNKNOWN,
        speechText: "I can help you build an action plan. Try saying 'I have an interview tomorrow' or 'I only have 2 hours'.",
        content: "I'm ready to turn your goal into an actionable roadmap. Try one of the quick actions below, or ask:\n\n• *\"I have a software engineering interview tomorrow. Help me prepare.\"*\n• *\"I only have two hours.\"*\n• *\"What should I focus on next?\"*\n• *\"Create a plan for learning Java.\"*",
        plan: currentPlan,
        triggerAction: null
      };
    }
  }
}

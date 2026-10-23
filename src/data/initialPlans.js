// Predefined Actionable Plans and Templates

export const INTERVIEW_STANDARD_PLAN = {
  id: "plan-interview-standard",
  title: "Interview Preparation Plan",
  goal: "Prepare for a software engineering interview tomorrow.",
  type: "INTERVIEW_PREP",
  totalTimeMinutes: 195,
  tasks: [
    {
      id: "task-1",
      title: "Core Java Revision",
      category: "Core Java",
      subtasks: [
        "Review OOP Pillars (Inheritance, Polymorphism, Abstraction, Encapsulation)",
        "Collections Framework (ArrayList vs LinkedList, HashMap internals)",
        "Exception handling, try-with-resources & Generics"
      ],
      estimatedTime: "45 min",
      estimatedMinutes: 45,
      priority: "High",
      completed: false,
      actionLabel: "Launch Java Checklist",
      actionType: "CHECKLIST"
    },
    {
      id: "task-2",
      title: "Data Structures & Algorithms",
      category: "DSA",
      subtasks: [
        "Solve 3 top interview problems",
        "Arrays & Two Pointers (e.g., Two Sum, 3Sum)",
        "Strings & Palindromes / Anagrams",
        "HashMap frequency counters & sliding window"
      ],
      estimatedTime: "60 min",
      estimatedMinutes: 60,
      priority: "High",
      completed: false,
      actionLabel: "View Problems",
      actionType: "PROBLEMS"
    },
    {
      id: "task-3",
      title: "SQL & Relational Databases",
      category: "SQL",
      subtasks: [
        "Review INNER, LEFT, RIGHT and FULL OUTER Joins",
        "GROUP BY with aggregates (COUNT, AVG, SUM) and HAVING",
        "Subqueries, Window functions & indexing basics"
      ],
      estimatedTime: "30 min",
      estimatedMinutes: 30,
      priority: "Medium",
      completed: false,
      actionLabel: "Review Cheatsheet",
      actionType: "CHEATSHEET"
    },
    {
      id: "task-4",
      title: "Projects & Architecture Review",
      category: "Projects",
      subtasks: [
        "Prepare 2-minute elevator pitch for your primary project",
        "Explain high-level architecture & tech stack decisions",
        "Describe biggest technical challenge & how you solved it"
      ],
      estimatedTime: "30 min",
      estimatedMinutes: 30,
      priority: "Medium",
      completed: false,
      actionLabel: "Review Architecture",
      actionType: "PROJECTS"
    },
    {
      id: "task-5",
      title: "Mock Interview Simulation",
      category: "Mock Interview",
      subtasks: [
        "Practice 5 technical interview questions under realistic time limits",
        "Articulate trade-offs out loud",
        "Receive automated feedback & model answers"
      ],
      estimatedTime: "30 min",
      estimatedMinutes: 30,
      priority: "High",
      completed: false,
      actionLabel: "Start Mock Interview",
      actionType: "START_MOCK"
    }
  ]
};

export const INTERVIEW_2HR_EMERGENCY_PLAN = {
  id: "plan-interview-emergency-2hr",
  title: "2-Hour Emergency Interview Plan",
  goal: "Fast-track high-yield preparation for tomorrow's interview (120 min max).",
  type: "TIME_OPTIMIZATION",
  totalTimeMinutes: 120,
  tasks: [
    {
      id: "task-1",
      title: "Core Java High-Yield",
      category: "Core Java",
      subtasks: [
        "Quick review of OOP, HashMap internals & String pool",
        "ArrayList vs LinkedList key trade-offs"
      ],
      estimatedTime: "30 min",
      estimatedMinutes: 30,
      priority: "High",
      completed: false,
      actionLabel: "Launch Quick Java",
      actionType: "CHECKLIST"
    },
    {
      id: "task-2",
      title: "DSA Rapid Drills",
      category: "DSA",
      subtasks: [
        "Two Sum / HashMap pattern",
        "Reverse Linked List / Cycle detection (Floyd's algorithm)"
      ],
      estimatedTime: "40 min",
      estimatedMinutes: 40,
      priority: "High",
      completed: false,
      actionLabel: "Rapid Drills",
      actionType: "PROBLEMS"
    },
    {
      id: "task-3",
      title: "SQL Core Essentials",
      category: "SQL",
      subtasks: [
        "WHERE vs HAVING distinction",
        "INNER vs LEFT JOIN patterns"
      ],
      estimatedTime: "20 min",
      estimatedMinutes: 20,
      priority: "Medium",
      completed: false,
      actionLabel: "Quick Cheatsheet",
      actionType: "CHEATSHEET"
    },
    {
      id: "task-4",
      title: "Project Pitch & STAR Stories",
      category: "Projects",
      subtasks: [
        "Refine project pitch using STAR method",
        "Key bottleneck & latency resolution story"
      ],
      estimatedTime: "20 min",
      estimatedMinutes: 20,
      priority: "Medium",
      completed: false,
      actionLabel: "Pitch Outline",
      actionType: "PROJECTS"
    },
    {
      id: "task-5",
      title: "Speed Mock Interview",
      category: "Mock Interview",
      subtasks: [
        "Rapid fire 5 questions with instant feedback"
      ],
      estimatedTime: "10 min",
      estimatedMinutes: 10,
      priority: "High",
      completed: false,
      actionLabel: "Start Mock Interview",
      actionType: "START_MOCK"
    }
  ]
};

export const JAVA_LEARNING_PLAN = {
  id: "plan-learn-java",
  title: "Comprehensive Java Mastery Plan",
  goal: "Structured roadmap to master Java fundamentals, OOP, and collections.",
  type: "LEARN_JAVA",
  totalTimeMinutes: 210,
  tasks: [
    {
      id: "task-j1",
      title: "Syntax, Data Types & Memory Basics",
      category: "Java Basics",
      subtasks: [
        "Primitive types vs Reference types",
        "Stack vs Heap memory in JVM",
        "Immutability of Strings & StringBuilder"
      ],
      estimatedTime: "30 min",
      estimatedMinutes: 30,
      priority: "High",
      completed: false,
      actionLabel: "Review Syntax",
      actionType: "CHECKLIST"
    },
    {
      id: "task-j2",
      title: "Object-Oriented Design in Java",
      category: "OOP",
      subtasks: [
        "Abstract classes vs Interfaces (Default & static methods)",
        "Overloading vs Overriding & Polymorphic calls",
        "Composition vs Inheritance guidelines"
      ],
      estimatedTime: "45 min",
      estimatedMinutes: 45,
      priority: "High",
      completed: false,
      actionLabel: "OOP Notes",
      actionType: "CHECKLIST"
    },
    {
      id: "task-j3",
      title: "Java Collections Deep Dive",
      category: "Collections",
      subtasks: [
        "List implementations (ArrayList, LinkedList, Vector)",
        "Map implementations (HashMap, LinkedHashMap, TreeMap)",
        "Set implementations & equals()/hashCode() contract"
      ],
      estimatedTime: "45 min",
      estimatedMinutes: 45,
      priority: "High",
      completed: false,
      actionLabel: "Collections Cheatsheet",
      actionType: "CHEATSHEET"
    },
    {
      id: "task-j4",
      title: "Modern Java: Lambdas & Streams",
      category: "Modern Java",
      subtasks: [
        "Functional interfaces (Predicate, Consumer, Function)",
        "Stream operations: filter, map, flatMap, collect",
        "Optional API to avoid NullPointerException"
      ],
      estimatedTime: "30 min",
      estimatedMinutes: 30,
      priority: "Medium",
      completed: false,
      actionLabel: "Stream Drills",
      actionType: "PROBLEMS"
    },
    {
      id: "task-j5",
      title: "Hands-on CLI Task Manager Project",
      category: "Projects",
      subtasks: [
        "Build a CLI tool that parses user arguments",
        "Store data in a HashMap with file serialization",
        "Handle custom exceptions gracefully"
      ],
      estimatedTime: "60 min",
      estimatedMinutes: 60,
      priority: "Medium",
      completed: false,
      actionLabel: "Project Starter",
      actionType: "PROJECTS"
    }
  ]
};

export const DAILY_ENGINEERING_PLAN = {
  id: "plan-daily-productivity",
  title: "Today's Engineering Sprint Plan",
  goal: "Maximize focus, eliminate context switching, and achieve shipping velocity.",
  type: "DAILY_PLAN",
  totalTimeMinutes: 225,
  tasks: [
    {
      id: "task-d1",
      title: "Deep Work: Core Feature Implementation",
      category: "Focus Sprint",
      subtasks: [
        "Isolate distraction-free 90-minute block",
        "Implement core API / state machine logic",
        "Commit clean modular code"
      ],
      estimatedTime: "90 min",
      estimatedMinutes: 90,
      priority: "High",
      completed: false,
      actionLabel: "Start Timer",
      actionType: "TIMER"
    },
    {
      id: "task-d2",
      title: "Technical Code Reviews & PR Sync",
      category: "Collaboration",
      subtasks: [
        "Review open team pull requests",
        "Validate test coverage and edge cases",
        "Unblock downstream dependencies"
      ],
      estimatedTime: "45 min",
      estimatedMinutes: 45,
      priority: "Medium",
      completed: false,
      actionLabel: "Review PRs",
      actionType: "CHECKLIST"
    },
    {
      id: "task-d3",
      title: "Daily Algorithmic & Problem Solving",
      category: "Continuous Learning",
      subtasks: [
        "Solve 1 Medium difficulty LeetCode / HackerRank problem",
        "Analyze time and space complexity",
        "Note key pattern (sliding window, binary search, graph)"
      ],
      estimatedTime: "40 min",
      estimatedMinutes: 40,
      priority: "Medium",
      completed: false,
      actionLabel: "Open Problem",
      actionType: "PROBLEMS"
    },
    {
      id: "task-d4",
      title: "Documentation & Unit Testing",
      category: "Quality",
      subtasks: [
        "Update API endpoints in README / Swagger",
        "Write unit tests for edge cases and errors"
      ],
      estimatedTime: "35 min",
      estimatedMinutes: 35,
      priority: "Low",
      completed: false,
      actionLabel: "Write Tests",
      actionType: "CHECKLIST"
    },
    {
      id: "task-d5",
      title: "Daily Wrap-up & Tomorrow's Goal Setting",
      category: "Reflection",
      subtasks: [
        "Audit completed items in LifePilot",
        "Draft top 3 priorities for tomorrow",
        "Shut down work environment"
      ],
      estimatedTime: "15 min",
      estimatedMinutes: 15,
      priority: "Low",
      completed: false,
      actionLabel: "Wrap-up",
      actionType: "CHECKLIST"
    }
  ]
};

// Mock Interview Questions and Evaluation Engine
export const mockQuestions = [
  {
    id: 1,
    category: "Core Java",
    topic: "Collections & Data Structures",
    question: "Explain the difference between ArrayList and LinkedList in Java. When would you prefer one over the other?",
    expectedKeypoints: [
      "dynamic array vs doubly-linked list",
      "random access O(1) vs O(n)",
      "insertion / deletion performance",
      "contiguous memory vs node pointer overhead"
    ],
    evaluateAnswer: (answer) => {
      const lower = answer.toLowerCase();
      const feedback = {
        score: 0,
        strengths: [],
        missingPoints: [],
        keyTakeaway: "ArrayList is backed by a contiguous resizable array offering O(1) random access via index, making it ideal for read-heavy operations. LinkedList uses doubly-linked nodes requiring O(n) traversal for arbitrary index access, but offers O(1) insertions/deletions at the ends without array resizing overhead."
      };

      const hasArray = lower.includes("array") || lower.includes("contiguous");
      const hasLinkedList = lower.includes("node") || lower.includes("pointer") || lower.includes("linked");
      const hasRandomAccess = lower.includes("random access") || lower.includes("index") || lower.includes("get(") || lower.includes("o(1)");
      const hasInsertDelete = lower.includes("insert") || lower.includes("delete") || lower.includes("shift");
      const hasMemory = lower.includes("memory") || lower.includes("overhead") || lower.includes("pointer");

      if (hasArray && hasLinkedList) {
        feedback.strengths.push("Good foundational distinction between array-backed structure and linked node elements.");
        feedback.score += 30;
      } else {
        feedback.missingPoints.push("Clarify underlying storage: ArrayList uses dynamic array, LinkedList uses doubly-linked nodes.");
      }

      if (hasRandomAccess) {
        feedback.strengths.push("Correctly highlighted random access and fast indexing performance.");
        feedback.score += 25;
      } else {
        feedback.missingPoints.push("Mention random access: ArrayList provides O(1) lookup by index, whereas LinkedList requires O(n) traversal.");
      }

      if (hasInsertDelete) {
        feedback.strengths.push("Addressed insertion/deletion trade-offs and shifting operations.");
        feedback.score += 25;
      } else {
        feedback.missingPoints.push("Discuss insertion/deletion trade-offs: LinkedList is fast for front/back adds (O(1)), whereas ArrayList requires shifting elements (O(n)).");
      }

      if (hasMemory) {
        feedback.strengths.push("Thoughtful mention of memory layout and node pointer overhead.");
        feedback.score += 20;
      } else {
        feedback.missingPoints.push("Mention memory overhead: LinkedList stores extra prev/next object references per element.");
      }

      feedback.score = Math.max(35, Math.min(100, feedback.score));
      return feedback;
    }
  },
  {
    id: 2,
    category: "Object-Oriented Programming",
    topic: "Polymorphism & Design",
    question: "What is Polymorphism in OOP? Explain the difference between method overloading (compile-time) and method overriding (runtime).",
    expectedKeypoints: [
      "compile-time vs runtime polymorphism",
      "method overloading: same method name, different parameter signature",
      "method overriding: child class provides specific implementation",
      "dynamic method dispatch / vtable"
    ],
    evaluateAnswer: (answer) => {
      const lower = answer.toLowerCase();
      const feedback = {
        score: 0,
        strengths: [],
        missingPoints: [],
        keyTakeaway: "Polymorphism ('many forms') enables objects of different types to respond to the same message. Overloading (static/compile-time) happens within the same class with different signatures. Overriding (dynamic/runtime) happens across inheritance hierarchies with exact same signature resolved via dynamic dispatch."
      };

      const hasOverload = lower.includes("overload") && (lower.includes("parameter") || lower.includes("signature") || lower.includes("compile"));
      const hasOverride = lower.includes("override") && (lower.includes("inheritance") || lower.includes("child") || lower.includes("runtime") || lower.includes("subclass"));
      const hasDispatch = lower.includes("dispatch") || lower.includes("late binding") || lower.includes("dynamic") || lower.includes("vtable");

      if (hasOverload) {
        feedback.strengths.push("Clear explanation of method overloading based on parameter signatures at compile-time.");
        feedback.score += 35;
      } else {
        feedback.missingPoints.push("Explain method overloading: same method name but different parameter types/count in the same class.");
      }

      if (hasOverride) {
        feedback.strengths.push("Accurate identification of overriding in subclass hierarchies resolved at runtime.");
        feedback.score += 35;
      } else {
        feedback.missingPoints.push("Clarify method overriding: subclass provides custom implementation of a superclass method with the same signature.");
      }

      if (lower.includes("many form") || lower.includes("interface") || hasDispatch) {
        feedback.strengths.push("Good grasp of object abstraction and runtime flexibility.");
        feedback.score += 30;
      } else {
        feedback.missingPoints.push("Mention dynamic method dispatch: Java JVM uses runtime type information (invokevirtual) to resolve overriding.");
      }

      feedback.score = Math.max(35, Math.min(100, feedback.score));
      return feedback;
    }
  },
  {
    id: 3,
    category: "Data Structures & Algorithms",
    topic: "Linked Lists & Pointers",
    question: "How do you detect a cycle in a singly linked list? Describe the algorithm and state its time and space complexity.",
    expectedKeypoints: [
      "Floyd's Tortoise and Hare algorithm",
      "Fast and slow pointers (1 step vs 2 steps)",
      "Time complexity O(N)",
      "Space complexity O(1)"
    ],
    evaluateAnswer: (answer) => {
      const lower = answer.toLowerCase();
      const feedback = {
        score: 0,
        strengths: [],
        missingPoints: [],
        keyTakeaway: "Use Floyd's Cycle Detection Algorithm (Tortoise and Hare). Maintain two pointers: slow moves 1 node, fast moves 2 nodes. If they meet, a cycle exists. If fast reaches null, no cycle exists. Time complexity: O(N), Space complexity: O(1)."
      };

      const hasPointers = (lower.includes("fast") && lower.includes("slow")) || lower.includes("two pointer") || lower.includes("tortoise");
      const hasTime = lower.includes("o(n)") || lower.includes("linear");
      const hasSpace = lower.includes("o(1)") || lower.includes("constant");
      const hasHash = lower.includes("hashset") || lower.includes("hash");

      if (hasPointers) {
        feedback.strengths.push("Identified the optimal two-pointer Floyd's Tortoise & Hare approach.");
        feedback.score += 40;
      } else if (hasHash) {
        feedback.strengths.push("Mentioned hash set approach, but remember to prioritize O(1) space pointer solution.");
        feedback.score += 20;
      } else {
        feedback.missingPoints.push("Describe the two-pointer technique: slow pointer advances 1 step, fast pointer advances 2 steps.");
      }

      if (hasTime) {
        feedback.strengths.push("Accurately stated O(N) linear time complexity.");
        feedback.score += 30;
      } else {
        feedback.missingPoints.push("Explicitly state Time Complexity: O(N) where N is the number of nodes.");
      }

      if (hasSpace) {
        feedback.strengths.push("Correctly highlighted optimal O(1) auxiliary space.");
        feedback.score += 30;
      } else {
        feedback.missingPoints.push("Explicitly state Space Complexity: O(1) constant auxiliary memory without allocating hash sets.");
      }

      feedback.score = Math.max(35, Math.min(100, feedback.score));
      return feedback;
    }
  },
  {
    id: 4,
    category: "Databases & SQL",
    topic: "Queries & Filtering",
    question: "What is the difference between WHERE and HAVING in SQL? Also briefly distinguish INNER JOIN from LEFT JOIN.",
    expectedKeypoints: [
      "WHERE filters rows before aggregation",
      "HAVING filters groups after GROUP BY",
      "INNER JOIN returns matching rows from both tables",
      "LEFT JOIN returns all rows from left table and matched rows from right"
    ],
    evaluateAnswer: (answer) => {
      const lower = answer.toLowerCase();
      const feedback = {
        score: 0,
        strengths: [],
        missingPoints: [],
        keyTakeaway: "WHERE filters individual table rows prior to any grouping or aggregate functions (SUM, AVG, COUNT). HAVING filters the grouped results after GROUP BY is applied. INNER JOIN returns rows with matches in both tables; LEFT JOIN returns all left table rows plus matched right rows (NULL for unmatched)."
      };

      const hasWhereHaving = lower.includes("where") && lower.includes("having") && (lower.includes("group by") || lower.includes("aggregate") || lower.includes("before") || lower.includes("after"));
      const hasJoins = lower.includes("inner") && lower.includes("left") && (lower.includes("match") || lower.includes("null") || lower.includes("all"));

      if (hasWhereHaving) {
        feedback.strengths.push("Solid distinction between row-level filtering (WHERE) and post-aggregation grouping (HAVING).");
        feedback.score += 50;
      } else {
        feedback.missingPoints.push("Highlight WHERE vs HAVING timing: WHERE filters rows before aggregation, HAVING filters after GROUP BY.");
      }

      if (hasJoins) {
        feedback.strengths.push("Precise explanation of INNER JOIN vs LEFT JOIN inclusion behavior.");
        feedback.score += 50;
      } else {
        feedback.missingPoints.push("Clarify JOIN types: INNER JOIN only returns matching records, whereas LEFT JOIN preserves all rows from the left table with NULL fills.");
      }

      feedback.score = Math.max(35, Math.min(100, feedback.score));
      return feedback;
    }
  },
  {
    id: 5,
    category: "System Design & Projects",
    topic: "Scalability & Architecture",
    question: "How would you design a scalable URL shortener service (like TinyURL)? Mention encoding, collision handling, and caching.",
    expectedKeypoints: [
      "Base62 encoding (a-z, A-Z, 0-9) or auto-increment ID generator",
      "Handling collisions or distributed unique ID generator (Snowflake/UUID)",
      "Caching layer (Redis/Memcached) for hot read redirects (301 vs 302)",
      "Database schema (shortKey, originalUrl, createdAt, expiry)"
    ],
    evaluateAnswer: (answer) => {
      const lower = answer.toLowerCase();
      const feedback = {
        score: 0,
        strengths: [],
        missingPoints: [],
        keyTakeaway: "A production URL shortener uses an auto-increment or distributed counter (e.g. Snowflake) mapped to Base62 (62^7 ~ 3.5 trillion URLs). High read-to-write ratios (~100:1) necessitate a Redis/Memcached cache for hot URLs and 301/302 redirects, backed by partitioned SQL or NoSQL storage."
      };

      const hasEncoding = lower.includes("base62") || lower.includes("hash") || lower.includes("encode") || lower.includes("md5") || lower.includes("sha");
      const hasCache = lower.includes("cache") || lower.includes("redis") || lower.includes("memcache");
      const hasRedirect = lower.includes("301") || lower.includes("302") || lower.includes("redirect") || lower.includes("read");
      const hasDB = lower.includes("db") || lower.includes("database") || lower.includes("sql") || lower.includes("nosql");

      if (hasEncoding) {
        feedback.strengths.push("Discussed key generation / encoding strategy (Base62 / hashing).");
        feedback.score += 30;
      } else {
        feedback.missingPoints.push("Mention Base62 encoding: converting a 64-bit integer ID into 7 alphanumeric characters.");
      }

      if (hasCache) {
        feedback.strengths.push("Included caching layer (Redis / Memcached) for high-throughput read redirects.");
        feedback.score += 30;
      } else {
        feedback.missingPoints.push("Add a caching layer: URL shorteners are read-heavy (100:1 ratio); caching active URLs in Redis reduces DB load.");
      }

      if (hasRedirect || hasDB) {
        feedback.strengths.push("Addressed request redirection flow and persistent storage design.");
        feedback.score += 40;
      } else {
        feedback.missingPoints.push("Mention HTTP redirect status: 301 (Permanent, browser caches) vs 302 (Temporary, tracks analytics).");
      }

      feedback.score = Math.max(35, Math.min(100, feedback.score));
      return feedback;
    }
  }
];

// LocalStorage Persistence Service

const STORAGE_KEYS = {
  PLAN: "lifepilot_active_plan",
  MESSAGES: "lifepilot_chat_messages",
  STATS: "lifepilot_user_stats",
  MOCK_RESULTS: "lifepilot_mock_results"
};

export const storageService = {
  getPlan: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAN);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("Error reading plan from localStorage", e);
      return null;
    }
  },

  savePlan: (plan) => {
    try {
      if (plan) {
        localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
      } else {
        localStorage.removeItem(STORAGE_KEYS.PLAN);
      }
    } catch (e) {
      console.warn("Error saving plan to localStorage", e);
    }
  },

  getMessages: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("Error reading messages from localStorage", e);
      return null;
    }
  },

  saveMessages: (messages) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn("Error saving messages to localStorage", e);
    }
  },

  getStats: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      return data ? JSON.parse(data) : { totalTasksCompleted: 0, mockScore: 0, streakDays: 1 };
    } catch (e) {
      return { totalTasksCompleted: 0, mockScore: 0, streakDays: 1 };
    }
  },

  saveStats: (stats) => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.warn("Error saving stats to localStorage", e);
    }
  },

  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PLAN);
      localStorage.removeItem(STORAGE_KEYS.MESSAGES);
      localStorage.removeItem(STORAGE_KEYS.STATS);
      localStorage.removeItem(STORAGE_KEYS.MOCK_RESULTS);
    } catch (e) {
      console.warn("Error clearing localStorage", e);
    }
  }
};

/**
 * ExamPro State Management & LocalStorage Persistence Engine
 */

const STORAGE_KEY = "exampro_app_state_v1";

const DEFAULT_STATE = {
  profile: {
    name: "Future Officer",
    avatar: "🎯",
    targetExam: "SSC CGL",
    level: 1,
    xp: 0,
    streak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    bestScorePercent: 0,
    totalQuestionsAttempted: 0,
    totalQuestionsCorrect: 0
  },
  theme: "dark", // 'dark' or 'light'
  quizHistory: [],
  bookmarks: [], // array of question IDs
  mistakesNotebook: {}, // questionId -> { id, wrongCount, masteredCount, lastAttempted, questionData }
  unlockedBadges: ["badge_welcome"],
  subjectStats: {}, // subjectName -> { attempted: 0, correct: 0 }
  pyqStats: {
    attempted: 0,
    correct: 0,
    bestScore: 0,
    examBreakdown: {} // examName -> { attempted: 0, correct: 0 }
  },
  dailyChallengeCompletedDate: null
};

class StateManager {
  constructor() {
    this.state = this.loadState();
    this.checkDailyStreak();
  }

  loadState() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return JSON.parse(JSON.stringify(DEFAULT_STATE));
      const parsed = JSON.parse(serialized);
      // Deep merge with DEFAULT_STATE to handle schema additions
      return {
        ...DEFAULT_STATE,
        ...parsed,
        profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
        pyqStats: { ...DEFAULT_STATE.pyqStats, ...(parsed.pyqStats || {}) }
      };
    } catch (e) {
      console.error("Failed to load ExamPro state from localStorage:", e);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save ExamPro state:", e);
    }
  }

  getProfile() {
    return this.state.profile;
  }

  updateProfile(updates) {
    this.state.profile = { ...this.state.profile, ...updates };
    this.saveState();
  }

  getTheme() {
    return this.state.theme || "dark";
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.saveState();
  }

  checkDailyStreak() {
    const today = new Date().toISOString().split("T")[0];
    const lastActive = this.state.profile.lastActiveDate;

    if (!lastActive) {
      this.state.profile.lastActiveDate = today;
      this.state.profile.streak = 1;
      this.saveState();
      return;
    }

    if (lastActive === today) {
      // Already active today
      return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (lastActive === yesterday) {
      // Streak continued
      this.state.profile.streak += 1;
      this.state.profile.lastActiveDate = today;
      this.addXP(25); // Streak continuation bonus
    } else {
      // Missed a day or first day back
      this.state.profile.streak = 1;
      this.state.profile.lastActiveDate = today;
    }
    this.saveState();
  }

  addXP(points) {
    this.state.profile.xp += points;
    // Calculate level: Level = floor(sqrt(XP / 100)) + 1
    const newLevel = Math.floor(Math.sqrt(this.state.profile.xp / 100)) + 1;
    const leveledUp = newLevel > this.state.profile.level;
    this.state.profile.level = newLevel;
    this.saveState();
    return { currentXP: this.state.profile.xp, currentLevel: newLevel, leveledUp };
  }

  toggleBookmark(question) {
    const id = typeof question === "string" ? question : question.id;
    const idx = this.state.bookmarks.indexOf(id);
    let bookmarked = false;
    if (idx >= 0) {
      this.state.bookmarks.splice(idx, 1);
      bookmarked = false;
    } else {
      this.state.bookmarks.push(id);
      bookmarked = true;
    }
    this.saveState();
    return bookmarked;
  }

  isBookmarked(questionId) {
    return this.state.bookmarks.includes(questionId);
  }

  getBookmarks() {
    return [...this.state.bookmarks];
  }

  recordMistake(question) {
    if (!question || !question.id) return;
    const qId = question.id;
    if (!this.state.mistakesNotebook[qId]) {
      this.state.mistakesNotebook[qId] = {
        id: qId,
        wrongCount: 1,
        masteredCount: 0,
        lastAttempted: new Date().toISOString(),
        question: question
      };
    } else {
      this.state.mistakesNotebook[qId].wrongCount += 1;
      this.state.mistakesNotebook[qId].lastAttempted = new Date().toISOString();
    }
    this.saveState();
  }

  resolveMistake(questionId) {
    if (this.state.mistakesNotebook[questionId]) {
      this.state.mistakesNotebook[questionId].masteredCount += 1;
      // If answered correctly twice in a row, consider mastered
      if (this.state.mistakesNotebook[questionId].masteredCount >= 2) {
        delete this.state.mistakesNotebook[questionId];
      }
      this.saveState();
    }
  }

  getMistakesList() {
    return Object.values(this.state.mistakesNotebook);
  }

  recordQuizResult(result) {
    // result: { id, title, type, date, total, correct, wrong, score, accuracy, timeTakenSeconds, xpEarned, performanceTier, wrongQuestions, questions }
    this.state.quizHistory.unshift(result);
    // Keep max 50 recent records
    if (this.state.quizHistory.length > 50) {
      this.state.quizHistory.pop();
    }

    // Update global user counts
    this.state.profile.totalQuestionsAttempted += result.total;
    this.state.profile.totalQuestionsCorrect += result.correct;
    if (result.accuracy > this.state.profile.bestScorePercent) {
      this.state.profile.bestScorePercent = result.accuracy;
    }

    // Update Subject Stats & Record Mistakes
    if (Array.isArray(result.questions)) {
      result.questions.forEach((q, idx) => {
        const isCorrect = result.answers && result.answers[idx] === q.correctIndex;
        const subj = q.subject || "General Knowledge";
        if (!this.state.subjectStats[subj]) {
          this.state.subjectStats[subj] = { attempted: 0, correct: 0 };
        }
        this.state.subjectStats[subj].attempted += 1;
        if (isCorrect) {
          this.state.subjectStats[subj].correct += 1;
          this.resolveMistake(q.id);
        } else {
          this.recordMistake(q);
        }

        // Track PYQ Specific Stats
        if (q.isPYQ) {
          this.state.pyqStats.attempted += 1;
          if (isCorrect) this.state.pyqStats.correct += 1;
          const exam = q.examName || "Other Exams";
          if (!this.state.pyqStats.examBreakdown[exam]) {
            this.state.pyqStats.examBreakdown[exam] = { attempted: 0, correct: 0 };
          }
          this.state.pyqStats.examBreakdown[exam].attempted += 1;
          if (isCorrect) {
            this.state.pyqStats.examBreakdown[exam].correct += 1;
          }
        }
      });
    }

    // Award XP
    this.addXP(result.xpEarned || 50);

    this.saveState();
  }

  getRecentResults(limit = 5) {
    return this.state.quizHistory.slice(0, limit);
  }

  getSubjectStats() {
    return this.state.subjectStats;
  }

  getPYQStats() {
    const { attempted, correct, examBreakdown } = this.state.pyqStats;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return {
      attempted,
      correct,
      accuracy,
      examBreakdown
    };
  }

  isDailyChallengeDoneToday() {
    const today = new Date().toISOString().split("T")[0];
    return this.state.dailyChallengeCompletedDate === today;
  }

  markDailyChallengeDone() {
    const today = new Date().toISOString().split("T")[0];
    this.state.dailyChallengeCompletedDate = today;
    this.addXP(100); // 100 bonus XP for daily challenge
    this.saveState();
  }

  unlockBadge(badgeId) {
    if (!this.state.unlockedBadges.includes(badgeId)) {
      this.state.unlockedBadges.push(badgeId);
      this.saveState();
      return true; // Newly unlocked
    }
    return false;
  }

  getUnlockedBadges() {
    return this.state.unlockedBadges;
  }

  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
  }
}

export const appState = new StateManager();

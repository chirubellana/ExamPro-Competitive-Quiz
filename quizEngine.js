/**
 * ExamPro Interactive Quiz Engine
 * Powers MCQ practice, instant answer validation, step-by-step solutions,
 * dynamic motivational coaching, timers, and comprehensive result calculations.
 */

import { appState } from "./state.js";
import { evaluateBadges } from "./gamification.js";

export const MOTIVATIONAL_QUOTES = {
  excellent: [
    "🔥 Outstanding! You're on fire!",
    "⚡ Flawless precision! Keep this high momentum!",
    "🎯 Bulls-eye! That's topper-level clarity!",
    "🏆 Brilliant execution! You are mastering this topic!"
  ],
  good: [
    "🎯 Great job! Keep going!",
    "✨ Spot on! Consistent practice brings ranks!",
    "👏 Well reasoned! Solid concept grasp!",
    "🌟 Excellent! One step closer to your dream rank!"
  ],
  wrong: [
    "📚 Not this time. Learn from it and try again!",
    "💡 Mistakes are proof you're learning. Review the solution below!",
    "🚀 Don't worry! Every stumble is a lesson for the final exam.",
    "🔍 Analyze where the logic slipped and conquer it next time!"
  ]
};

export class QuizEngine {
  constructor(callbacks = {}) {
    this.callbacks = callbacks; // onQuestionChange, onAnswerEvaluated, onTimerTick, onQuizCompleted
    this.reset();
  }

  reset() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.quizTitle = "Practice Quiz";
    this.quizType = "practice";
    this.difficulty = "Medium";
    this.questions = [];
    this.currentIndex = 0;
    this.userAnswers = []; // array of selected option indices (null if unanswered)
    this.questionTimes = []; // seconds spent per question
    this.consecutiveCorrect = 0;
    this.timeRemaining = 45; // default 45s countdown per question
    this.timerEnabled = true;
    this.startTime = null;
    this.totalTimeTaken = 0;
    this.isAnswerSubmitted = false;
    this.isCompleted = false;
  }

  startQuiz(config) {
    this.reset();
    this.quizTitle = config.title || "Competitive Exam Quiz";
    this.quizType = config.type || "practice";
    this.difficulty = config.difficulty || "Medium";
    this.questions = [...config.questions];
    this.timerEnabled = config.timerEnabled !== false;
    this.timeLimitPerQ = config.timeLimitPerQuestion || 45;
    this.startTime = Date.now();

    this.userAnswers = new Array(this.questions.length).fill(null);
    this.questionTimes = new Array(this.questions.length).fill(0);
    this.currentIndex = 0;
    this.isCompleted = false;

    this.loadQuestion(0);
  }

  loadQuestion(index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;
    this.isAnswerSubmitted = this.userAnswers[index] !== null;

    if (this.timerInterval) clearInterval(this.timerInterval);

    if (this.timerEnabled && !this.isAnswerSubmitted) {
      this.timeRemaining = this.timeLimitPerQ;
      this.timerInterval = setInterval(() => {
        this.timeRemaining -= 1;
        if (this.callbacks.onTimerTick) {
          this.callbacks.onTimerTick(this.timeRemaining, this.timeLimitPerQ);
        }
        if (this.timeRemaining <= 0) {
          clearInterval(this.timerInterval);
          this.handleTimeout();
        }
      }, 1000);
    }

    if (this.callbacks.onQuestionChange) {
      this.callbacks.onQuestionChange(this.getCurrentQuestionState());
    }
  }

  handleTimeout() {
    if (this.isAnswerSubmitted) return;
    // Mark as timeout (unanswered) and show answer
    this.submitAnswer(-1, true);
  }

  submitAnswer(selectedOptionIndex, isTimeout = false) {
    if (this.isAnswerSubmitted) return; // prevent re-answering
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.isAnswerSubmitted = true;
    this.userAnswers[this.currentIndex] = selectedOptionIndex;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;

    let motivation = "";
    let xpAwarded = 0;

    if (isCorrect) {
      this.consecutiveCorrect += 1;
      const quoteList = this.consecutiveCorrect >= 3 ? MOTIVATIONAL_QUOTES.excellent : MOTIVATIONAL_QUOTES.good;
      motivation = quoteList[Math.floor(Math.random() * quoteList.length)];
      xpAwarded = 10 + Math.min(15, this.consecutiveCorrect * 2); // Base 10 XP + streak bonus
    } else {
      this.consecutiveCorrect = 0;
      motivation = isTimeout
        ? "⏰ Time's up! Speed matters in competitive exams. Review the solution below!"
        : MOTIVATIONAL_QUOTES.wrong[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.wrong.length)];
      xpAwarded = 2; // Encouragement XP for attempting
    }

    const evaluationResult = {
      currentIndex: this.currentIndex,
      selectedOptionIndex,
      correctIndex: currentQ.correctIndex,
      isCorrect,
      isTimeout,
      motivation,
      consecutiveStreak: this.consecutiveCorrect,
      xpAwarded,
      explanation: currentQ.explanation,
      isBookmarked: appState.isBookmarked(currentQ.id)
    };

    if (this.callbacks.onAnswerEvaluated) {
      this.callbacks.onAnswerEvaluated(evaluationResult);
    }

    return evaluationResult;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.loadQuestion(this.currentIndex + 1);
    } else {
      this.completeQuiz();
    }
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.loadQuestion(this.currentIndex - 1);
    }
  }

  toggleCurrentBookmark() {
    const currentQ = this.questions[this.currentIndex];
    return appState.toggleBookmark(currentQ.id);
  }

  completeQuiz() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isCompleted = true;
    this.totalTimeTaken = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    const wrongQuestions = [];

    this.questions.forEach((q, idx) => {
      const ans = this.userAnswers[idx];
      if (ans === null || ans === -1) {
        unansweredCount += 1;
        wrongQuestions.push(q);
      } else if (ans === q.correctIndex) {
        correctCount += 1;
      } else {
        wrongCount += 1;
        wrongQuestions.push(q);
      }
    });

    const total = this.questions.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const score = correctCount;

    // XP calculation: 10 per correct + bonus for accuracy
    let xpEarned = correctCount * 10;
    if (accuracy >= 90) xpEarned += 50;
    else if (accuracy >= 75) xpEarned += 30;

    // Performance rating tier
    let performanceTier = "";
    let motivationalSummary = "";
    if (accuracy >= 95) {
      performanceTier = "🏆 Exam-Ready!";
      motivationalSummary = "Outstanding performance! You are demonstrating top-tier exam readiness!";
    } else if (accuracy >= 80) {
      performanceTier = "🔥 Excellent!";
      motivationalSummary = "Terrific grasp of the material! Maintain this momentum and aim for 100%!";
    } else if (accuracy >= 60) {
      performanceTier = "💪 Good Effort!";
      motivationalSummary = "Solid attempt! A little more targeted practice on weak areas will push you into the top percentiles.";
    } else if (accuracy >= 40) {
      performanceTier = "📚 Keep Learning!";
      motivationalSummary = "Good effort! Focus on conceptual review and solve the mistakes from this session.";
    } else {
      performanceTier = "🚀 Don't Give Up!";
      motivationalSummary = "Every attempt builds strength. Review the solutions below and re-test tomorrow!";
    }

    const result = {
      id: `quiz_${Date.now()}`,
      title: this.quizTitle,
      type: this.quizType,
      difficulty: this.difficulty,
      date: new Date().toISOString(),
      total,
      correct: correctCount,
      wrong: wrongCount,
      unanswered: unansweredCount,
      accuracy,
      score,
      timeTakenSeconds: this.totalTimeTaken,
      xpEarned,
      performanceTier,
      motivationalSummary,
      wrongQuestions,
      questions: this.questions,
      answers: this.userAnswers
    };

    // Save to local storage
    appState.recordQuizResult(result);

    // Check newly unlocked badges
    const newBadges = evaluateBadges(appState);

    if (this.callbacks.onQuizCompleted) {
      this.callbacks.onQuizCompleted(result, newBadges);
    }

    return { result, newBadges };
  }

  getCurrentQuestionState() {
    const q = this.questions[this.currentIndex];
    return {
      index: this.currentIndex,
      total: this.questions.length,
      question: q,
      selectedAnswer: this.userAnswers[this.currentIndex],
      isAnswerSubmitted: this.isAnswerSubmitted,
      isBookmarked: appState.isBookmarked(q.id),
      timeRemaining: this.timeRemaining,
      scoreSoFar: this.userAnswers.filter((ans, i) => ans === this.questions[i].correctIndex).length
    };
  }
}

export const activeQuizEngine = new QuizEngine();

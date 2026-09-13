/**
 * ExamPro Mock Test Simulation Engine
 * Full-scale timed mock test with multi-section switching, question palette,
 * negative marking, and real-time status tracking.
 */

import { appState } from "./state.js";
import { evaluateBadges } from "./gamification.js";

export const QUESTION_STATUS = {
  NOT_VISITED: "not_visited",
  NOT_ANSWERED: "not_answered",
  ANSWERED: "answered",
  MARKED_FOR_REVIEW: "marked_for_review",
  ANSWERED_AND_MARKED: "answered_and_marked"
};

export class MockTestEngine {
  constructor(callbacks = {}) {
    this.callbacks = callbacks; // onQuestionChange, onTimerTick, onSectionChange, onPaletteUpdate, onTestSubmitted
    this.reset();
  }

  reset() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.testConfig = null;
    this.sections = [];
    this.allQuestions = []; // flat array of questions
    this.currentSectionIndex = 0;
    this.currentGlobalIndex = 0;
    this.userResponses = []; // array of selected option indices (null if none)
    this.questionStatuses = []; // array of QUESTION_STATUS strings
    this.timeRemainingSeconds = 0;
    this.totalDurationSeconds = 0;
    this.startTime = null;
    this.isSubmitted = false;
  }

  startTest(mockBlueprint, poolQuestions) {
    this.reset();
    this.testConfig = mockBlueprint;
    this.totalDurationSeconds = (mockBlueprint.durationMinutes || 30) * 60;
    this.timeRemainingSeconds = this.totalDurationSeconds;
    this.startTime = Date.now();

    // Assemble questions by sections
    this.sections = [];
    this.allQuestions = [];
    let globalCounter = 0;

    mockBlueprint.sections.forEach((sec, sIdx) => {
      // Find matching questions for this section
      let candidates = poolQuestions.filter(q => sec.subjects.includes(q.subject));
      if (candidates.length < sec.count) {
        // Fallback: add other questions if subject pool is small
        const leftovers = poolQuestions.filter(q => !candidates.includes(q));
        candidates = [...candidates, ...leftovers];
      }
      // Shuffle candidates
      const shuffled = this.shuffle(candidates).slice(0, sec.count);

      const sectionQuestions = [];
      shuffled.forEach((q, qInSecIdx) => {
        const questionWithMeta = {
          ...q,
          sectionId: sec.id,
          sectionName: sec.name,
          sectionIndex: sIdx,
          globalIndex: globalCounter
        };
        sectionQuestions.push(questionWithMeta);
        this.allQuestions.push(questionWithMeta);
        globalCounter++;
      });

      this.sections.push({
        ...sec,
        sectionIndex: sIdx,
        startIndex: globalCounter - sectionQuestions.length,
        endIndex: globalCounter - 1,
        questions: sectionQuestions
      });
    });

    // Initialize statuses
    this.userResponses = new Array(this.allQuestions.length).fill(null);
    this.questionStatuses = new Array(this.allQuestions.length).fill(QUESTION_STATUS.NOT_VISITED);

    // Mark first question as Not Answered (visited)
    this.questionStatuses[0] = QUESTION_STATUS.NOT_ANSWERED;
    this.currentGlobalIndex = 0;
    this.currentSectionIndex = 0;

    // Start Timer
    this.timerInterval = setInterval(() => {
      this.timeRemainingSeconds -= 1;
      if (this.callbacks.onTimerTick) {
        this.callbacks.onTimerTick(this.timeRemainingSeconds, this.totalDurationSeconds);
      }
      if (this.timeRemainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.submitTest(true); // auto-submit on timeout
      }
    }, 1000);

    if (this.callbacks.onQuestionChange) {
      this.callbacks.onQuestionChange(this.getCurrentState());
    }
  }

  goToQuestion(globalIndex) {
    if (globalIndex < 0 || globalIndex >= this.allQuestions.length) return;

    // If leaving a question that was not answered and not marked, keep as NOT_ANSWERED
    this.currentGlobalIndex = globalIndex;
    const targetQ = this.allQuestions[globalIndex];
    this.currentSectionIndex = targetQ.sectionIndex;

    // If currently NOT_VISITED, change to NOT_ANSWERED
    if (this.questionStatuses[globalIndex] === QUESTION_STATUS.NOT_VISITED) {
      this.questionStatuses[globalIndex] = QUESTION_STATUS.NOT_ANSWERED;
    }

    if (this.callbacks.onQuestionChange) {
      this.callbacks.onQuestionChange(this.getCurrentState());
    }
  }

  switchSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= this.sections.length) return;
    const targetSection = this.sections[sectionIndex];
    this.goToQuestion(targetSection.startIndex);
  }

  selectOption(optionIndex) {
    this.userResponses[this.currentGlobalIndex] = optionIndex;
    // Update status to answered or answered_and_marked
    if (this.questionStatuses[this.currentGlobalIndex] === QUESTION_STATUS.MARKED_FOR_REVIEW) {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.ANSWERED_AND_MARKED;
    } else {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.ANSWERED;
    }

    if (this.callbacks.onPaletteUpdate) {
      this.callbacks.onPaletteUpdate(this.getPaletteSummary());
    }
  }

  clearResponse() {
    this.userResponses[this.currentGlobalIndex] = null;
    if (this.questionStatuses[this.currentGlobalIndex] === QUESTION_STATUS.ANSWERED_AND_MARKED) {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.MARKED_FOR_REVIEW;
    } else {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.NOT_ANSWERED;
    }

    if (this.callbacks.onPaletteUpdate) {
      this.callbacks.onPaletteUpdate(this.getPaletteSummary());
    }
  }

  saveAndNext() {
    if (this.userResponses[this.currentGlobalIndex] !== null) {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.ANSWERED;
    } else {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.NOT_ANSWERED;
    }

    if (this.currentGlobalIndex < this.allQuestions.length - 1) {
      this.goToQuestion(this.currentGlobalIndex + 1);
    } else {
      if (this.callbacks.onPaletteUpdate) {
        this.callbacks.onPaletteUpdate(this.getPaletteSummary());
      }
    }
  }

  markForReviewAndNext() {
    if (this.userResponses[this.currentGlobalIndex] !== null) {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.ANSWERED_AND_MARKED;
    } else {
      this.questionStatuses[this.currentGlobalIndex] = QUESTION_STATUS.MARKED_FOR_REVIEW;
    }

    if (this.currentGlobalIndex < this.allQuestions.length - 1) {
      this.goToQuestion(this.currentGlobalIndex + 1);
    } else {
      if (this.callbacks.onPaletteUpdate) {
        this.callbacks.onPaletteUpdate(this.getPaletteSummary());
      }
    }
  }

  getPaletteSummary() {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;

    this.questionStatuses.forEach(status => {
      if (status === QUESTION_STATUS.ANSWERED) answered++;
      else if (status === QUESTION_STATUS.NOT_ANSWERED) notAnswered++;
      else if (status === QUESTION_STATUS.MARKED_FOR_REVIEW) marked++;
      else if (status === QUESTION_STATUS.ANSWERED_AND_MARKED) answeredAndMarked++;
      else notVisited++;
    });

    return {
      answered,
      notAnswered,
      marked,
      answeredAndMarked,
      notVisited,
      total: this.allQuestions.length
    };
  }

  submitTest(isTimeout = false) {
    if (this.isSubmitted) return;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isSubmitted = true;

    const timeTakenSeconds = this.totalDurationSeconds - Math.max(0, this.timeRemainingSeconds);
    const marksPerQ = this.testConfig.marksPerQuestion || 2.0;
    const negMarks = this.testConfig.negativeMarking || 0.5;

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnanswered = 0;
    let rawScore = 0.0;

    const sectionResults = this.sections.map(sec => ({
      name: sec.name,
      total: sec.questions.length,
      attempted: 0,
      correct: 0,
      wrong: 0,
      marks: 0
    }));

    const wrongQuestions = [];

    this.allQuestions.forEach((q, idx) => {
      const response = this.userResponses[idx];
      const secIdx = q.sectionIndex;

      if (response !== null) {
        sectionResults[secIdx].attempted++;
        if (response === q.correctIndex) {
          totalCorrect++;
          rawScore += marksPerQ;
          sectionResults[secIdx].correct++;
          sectionResults[secIdx].marks += marksPerQ;
        } else {
          totalWrong++;
          rawScore -= negMarks;
          sectionResults[secIdx].wrong++;
          sectionResults[secIdx].marks -= negMarks;
          wrongQuestions.push(q);
        }
      } else {
        totalUnanswered++;
      }
    });

    const maxMarks = this.allQuestions.length * marksPerQ;
    const accuracy = (totalCorrect + totalWrong) > 0 ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0;
    const finalScore = Math.max(0, Math.round(rawScore * 100) / 100);
    const percentage = maxMarks > 0 ? Math.max(0, Math.round((finalScore / maxMarks) * 100)) : 0;

    let xpEarned = Math.round(totalCorrect * 15);
    if (percentage >= 80) xpEarned += 100;

    let performanceTier = "";
    if (percentage >= 85) performanceTier = "🏆 Topper Category";
    else if (percentage >= 70) performanceTier = "🔥 Strong Contender";
    else if (percentage >= 50) performanceTier = "💪 Clearing Cutoff";
    else performanceTier = "📚 Needs Improvement";

    const result = {
      id: `mock_${Date.now()}`,
      title: this.testConfig.title,
      type: "mock",
      examName: this.testConfig.examName,
      date: new Date().toISOString(),
      total: this.allQuestions.length,
      correct: totalCorrect,
      wrong: totalWrong,
      unanswered: totalUnanswered,
      score: finalScore,
      maxMarks,
      accuracy,
      percentage,
      timeTakenSeconds,
      xpEarned,
      performanceTier,
      sectionResults,
      wrongQuestions,
      questions: this.allQuestions,
      answers: this.userResponses,
      isTimeout
    };

    appState.recordQuizResult(result);
    const newBadges = evaluateBadges(appState);

    if (this.callbacks.onTestSubmitted) {
      this.callbacks.onTestSubmitted(result, newBadges);
    }

    return { result, newBadges };
  }

  getCurrentState() {
    const q = this.allQuestions[this.currentGlobalIndex];
    return {
      currentGlobalIndex: this.currentGlobalIndex,
      totalQuestions: this.allQuestions.length,
      currentQuestion: q,
      currentSection: this.sections[this.currentSectionIndex],
      sections: this.sections,
      selectedOption: this.userResponses[this.currentGlobalIndex],
      currentStatus: this.questionStatuses[this.currentGlobalIndex],
      statuses: this.questionStatuses,
      paletteSummary: this.getPaletteSummary(),
      timeRemaining: this.timeRemainingSeconds
    };
  }

  shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

export const activeMockEngine = new MockTestEngine();

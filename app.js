/**
 * ExamPro Main Application Bootstrap & Controller
 * Glues together UI, Quiz Engine, Mock Test Simulator, PYQ Hub, Analytics, and State.
 */

import { QUESTION_BANK, EXAM_CATEGORIES, SUBJECTS_LIST, DIFFICULTY_LEVELS } from "./data/questions.js";
import { MOCK_TESTS } from "./data/mockTests.js";
import { appState } from "./state.js";
import { activeQuizEngine } from "./quizEngine.js";
import { activeMockEngine, QUESTION_STATUS } from "./mockEngine.js";
import { pyqManager } from "./pyqHub.js";
import { calculateSubjectMastery, getWeakTopicsList, generateRemedialQuiz } from "./analytics.js";
import { getUserLevelInfo, evaluateBadges, getLeaderboard, BADGES_CATALOG } from "./gamification.js";
import { ui } from "./ui.js";

class ExamProApp {
  constructor() {
    this.lastCompletedQuizResult = null;
    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindHeaderAndModals();
    this.bindQuizEngine();
    this.bindMockEngine();
    this.bindPYQHub();
    this.bindVault();
    this.bindAnalytics();
    this.bindResultActions();
    this.bindKeyboardShortcuts();
    this.initPWA();

    // Initial render of Dashboard
    this.renderDashboard();
    ui.updateHeaderStats();

    // Listen to view changes
    window.addEventListener("viewChanged", (e) => {
      this.handleViewChanged(e.detail.view);
    });

    // Check initial URL hash if present for deep linking
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash === "quiz") {
      this.startQuickQuiz();
    } else if (initialHash && ["pyq", "mock", "vault", "analytics", "leaderboard"].includes(initialHash)) {
      ui.switchView(initialHash);
    }

    // Check URL parameters for theme and automated verification
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("theme") === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      appState.setTheme("light");
      ui.updateThemeButton("light");
    }
    if (urlParams.get("test") === "answered") {
      this.startQuickQuiz("Medium", false);
      activeQuizEngine.submitAnswer(1);
    } else if (urlParams.get("test") === "result") {
      this.startQuickQuiz("Medium", false);
      activeQuizEngine.userAnswers = activeQuizEngine.questions.map((q, idx) => idx % 4 === 0 ? (q.correctIndex + 1) % 4 : q.correctIndex);
      activeQuizEngine.completeQuiz();
      const bModal = document.getElementById("badge-unlocked-modal");
      if (bModal) bModal.classList.remove("active");
    }
  }

  // =========================================================================
  // VIEW NAVIGATION WIRING
  // =========================================================================
  bindNavigation() {
    document.querySelectorAll("[data-nav-view]").forEach(elem => {
      elem.addEventListener("click", () => {
        const targetView = elem.getAttribute("data-nav-view");
        ui.switchView(targetView);
      });
    });
  }

  handleViewChanged(viewId) {
    if (viewId === "dashboard") {
      this.renderDashboard();
    } else if (viewId === "pyq") {
      this.renderPYQHub();
    } else if (viewId === "mock") {
      this.renderMockHub();
    } else if (viewId === "vault") {
      this.renderVault();
    } else if (viewId === "analytics") {
      this.renderAnalytics();
    } else if (viewId === "leaderboard") {
      this.renderLeaderboardAndBadges();
    }
    ui.updateHeaderStats();
  }

  // =========================================================================
  // DASHBOARD RENDERING & LAUNCHERS
  // =========================================================================
  renderDashboard() {
    const profile = appState.getProfile();
    const levelInfo = getUserLevelInfo(profile.xp);

    // Motivational Greeting based on time of day
    const hour = new Date().getHours();
    let timeGreeting = "Good morning";
    if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon";
    else if (hour >= 17) timeGreeting = "Good evening";

    const greetingEl = document.getElementById("dashboard-greeting-text");
    if (greetingEl) {
      greetingEl.textContent = `${timeGreeting}, ${profile.name || "Aspirant"}!`;
    }

    // KPI Stats
    const totalAttempted = profile.totalQuestionsAttempted || 0;
    const totalCorrect = profile.totalQuestionsCorrect || 0;
    const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    const attemptedEl = document.getElementById("kpi-attempted");
    if (attemptedEl) attemptedEl.textContent = totalAttempted.toLocaleString();

    const accuracyEl = document.getElementById("kpi-accuracy");
    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;

    const streakEl = document.getElementById("kpi-streak");
    if (streakEl) streakEl.textContent = `${profile.streak || 1} ${profile.streak === 1 ? "Day" : "Days"}`;

    const bestScoreEl = document.getElementById("kpi-best-score");
    if (bestScoreEl) bestScoreEl.textContent = `${profile.bestScorePercent || 0}%`;

    const levelEl = document.getElementById("kpi-user-level");
    if (levelEl) levelEl.textContent = `Lvl ${levelInfo.level}`;

    const titleEl = document.getElementById("kpi-user-title");
    if (titleEl) titleEl.textContent = levelInfo.title;

    // Daily Challenge Status
    const isDailyDone = appState.isDailyChallengeDoneToday();
    const dailyBadge = document.getElementById("badge-daily-status");
    if (dailyBadge) {
      if (isDailyDone) {
        dailyBadge.textContent = "Completed ✓";
        dailyBadge.style.background = "var(--success-bg)";
        dailyBadge.style.color = "var(--success)";
      } else {
        dailyBadge.textContent = "Active Today 🔥";
      }
    }

    // Mistakes Count in Dashboard
    const mistakes = appState.getMistakesList();
    const mistakesCountEl = document.getElementById("dashboard-mistakes-count");
    if (mistakesCountEl) {
      mistakesCountEl.textContent = `${mistakes.length} Mistakes to clear`;
    }

    const vaultBadge = document.getElementById("sidebar-vault-badge");
    if (vaultBadge) {
      if (mistakes.length > 0) {
        vaultBadge.textContent = mistakes.length;
        vaultBadge.style.display = "inline-block";
      } else {
        vaultBadge.style.display = "none";
      }
    }

    // Render Exam Category Cards
    this.renderExamCategories();

    // Render Subject Category Cards
    this.renderSubjectCategories();

    // Render Recent Quizzes List
    this.renderRecentQuizzes();

    // Wire up Hero Buttons
    this.bindHeroButtons();
  }

  bindHeroButtons() {
    // Hero Start Quick Quiz
    const heroStartBtn = document.getElementById("btn-hero-start-quiz");
    if (heroStartBtn) {
      heroStartBtn.onclick = () => this.startQuickQuiz();
    }

    // Hero Daily Challenge
    const heroDailyBtn = document.getElementById("btn-hero-daily-challenge");
    if (heroDailyBtn) {
      heroDailyBtn.onclick = () => this.startDailyChallenge();
    }

    // Hero PYQ Hub
    const heroPYQBtn = document.getElementById("btn-hero-pyq-hub");
    if (heroPYQBtn) {
      heroPYQBtn.onclick = () => ui.switchView("pyq");
    }

    // Hero Mock Test
    const heroMockBtn = document.getElementById("btn-hero-mock-test");
    if (heroMockBtn) {
      heroMockBtn.onclick = () => ui.switchView("mock");
    }

    // Mode Cards
    const cardDaily = document.getElementById("card-mode-daily");
    if (cardDaily) cardDaily.onclick = () => this.startDailyChallenge();

    const cardMock = document.getElementById("card-mode-mock");
    if (cardMock) cardMock.onclick = () => ui.switchView("mock");

    const cardPYQ = document.getElementById("card-mode-pyq");
    if (cardPYQ) cardPYQ.onclick = () => ui.switchView("pyq");

    const cardVault = document.getElementById("card-mode-vault");
    if (cardVault) cardVault.onclick = () => ui.switchView("vault");
  }

  renderExamCategories() {
    const container = document.getElementById("exam-categories-grid");
    if (!container) return;
    container.innerHTML = "";

    EXAM_CATEGORIES.forEach(cat => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML = `
        <span class="category-icon">${cat.icon}</span>
        <div class="category-info">
          <h4>${cat.name}</h4>
          <p>${cat.description}</p>
        </div>
      `;
      card.onclick = () => {
        this.startCategoryQuiz(cat.id, cat.name, "exam");
      };
      container.appendChild(card);
    });
  }

  renderSubjectCategories() {
    const container = document.getElementById("subject-categories-grid");
    if (!container) return;
    container.innerHTML = "";

    SUBJECTS_LIST.forEach(subj => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML = `
        <span class="category-icon">${subj.icon}</span>
        <div class="category-info">
          <h4>${subj.name}</h4>
          <p>Practice MCQs</p>
        </div>
      `;
      card.onclick = () => {
        this.startCategoryQuiz(subj.id, subj.name, "subject");
      };
      container.appendChild(card);
    });
  }

  renderRecentQuizzes() {
    const container = document.getElementById("recent-quizzes-list");
    if (!container) return;

    const recent = appState.getRecentResults(4);
    if (recent.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🎯</span>
          <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">No Quiz Attempts Yet</p>
          <p style="font-size: 0.9rem;">Take your first quiz above to start tracking your performance and accuracy!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        ${recent.map(r => `
          <div class="card card-interactive" data-recent-id="${r.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.65rem;">
              <span class="badge ${r.accuracy >= 75 ? 'badge-pyq' : 'badge-difficulty'}">${r.performanceTier || 'Attempted'}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(r.date).toLocaleDateString()}</span>
            </div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text-primary);">${r.title}</h4>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
              <span>Score: <strong>${r.score}/${r.total}</strong></span>
              <span style="color: ${r.accuracy >= 75 ? 'var(--success)' : 'var(--warning)'}; font-weight: 700;">${r.accuracy}% Accuracy</span>
              <span style="color: var(--primary); font-weight: 700;">+${r.xpEarned} XP</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    // Click to view past result
    container.querySelectorAll("[data-recent-id]").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-recent-id");
        const found = recent.find(r => r.id === id);
        if (found) {
          this.displayQuizResult(found);
        }
      });
    });
  }

  // =========================================================================
  // QUIZ ENGINE EVENT BINDING & FLOWS
  // =========================================================================
  bindQuizEngine() {
    activeQuizEngine.callbacks = {
      onQuestionChange: (state) => this.renderActiveQuestion(state),
      onAnswerEvaluated: (res) => this.renderAnswerEvaluation(res),
      onTimerTick: (remaining, total) => this.renderQuizTimer(remaining, total),
      onQuizCompleted: (result, newBadges) => {
        this.displayQuizResult(result);
        if (newBadges && newBadges.length > 0) {
          ui.showBadgeUnlockedModal(newBadges);
        }
      }
    };

    // Skip Button
    const skipBtn = document.getElementById("btn-quiz-skip");
    if (skipBtn) {
      skipBtn.onclick = () => {
        activeQuizEngine.submitAnswer(-1, false);
      };
    }

    // Next Button
    const nextBtn = document.getElementById("btn-quiz-next");
    if (nextBtn) {
      nextBtn.onclick = () => {
        activeQuizEngine.nextQuestion();
      };
    }

    // Exit Button
    const exitBtn = document.getElementById("btn-quiz-exit");
    if (exitBtn) {
      exitBtn.onclick = () => {
        if (confirm("Are you sure you want to exit this quiz session? Your current progress will not be saved.")) {
          ui.switchView("dashboard");
        }
      };
    }

    // Bookmark Toggle Button
    const bmBtn = document.getElementById("btn-q-bookmark");
    if (bmBtn) {
      bmBtn.onclick = () => {
        const isNowBookmarked = activeQuizEngine.toggleCurrentBookmark();
        bmBtn.classList.toggle("bookmarked", isNowBookmarked);
        ui.showToast(isNowBookmarked ? "Question Saved to Bookmarks ⭐" : "Question Removed from Bookmarks");
      };
    }
  }

  startQuickQuiz(difficulty = "Medium", timerEnabled = true) {
    // Select 10 random questions across all subjects
    const shuffled = this.shuffleArray(QUESTION_BANK).slice(0, 10);
    activeQuizEngine.startQuiz({
      title: "Quick Competitive Practice Quiz",
      type: "quick",
      difficulty: difficulty,
      questions: shuffled,
      timerEnabled: timerEnabled,
      timeLimitPerQuestion: 45
    });
    ui.switchView("quiz");
  }

  startDailyChallenge() {
    // 10 Curated questions
    const dailyQuestions = this.shuffleArray(QUESTION_BANK).slice(0, 10);
    activeQuizEngine.startQuiz({
      title: `Daily Rapid Challenge – ${new Date().toLocaleDateString()}`,
      type: "daily",
      difficulty: "Medium",
      questions: dailyQuestions,
      timeLimitPerQuestion: 30
    });
    ui.switchView("quiz");
    ui.showToast("Daily Challenge Started! Beat the 30s timer for bonus XP! ⚡");
  }

  startCategoryQuiz(categoryId, categoryName, categoryType = "subject") {
    let matched = [];
    if (categoryType === "exam") {
      matched = QUESTION_BANK.filter(q => q.examCategory === categoryId || (q.examName && q.examName.includes(categoryId)));
    } else {
      matched = QUESTION_BANK.filter(q => q.subject === categoryId);
    }

    if (matched.length === 0) {
      matched = QUESTION_BANK.slice(0, 10);
    } else if (matched.length < 10) {
      // supplement if needed
      const others = QUESTION_BANK.filter(q => !matched.includes(q));
      matched = [...matched, ...others].slice(0, 10);
    }

    activeQuizEngine.startQuiz({
      title: `${categoryName} Practice Quiz`,
      type: "category",
      difficulty: "Medium",
      questions: this.shuffleArray(matched).slice(0, 10),
      timeLimitPerQuestion: 45
    });
    ui.switchView("quiz");
  }

  renderActiveQuestion(state) {
    const { index, total, question, isBookmarked } = state;

    // Header & Meta tags
    const titleEl = document.getElementById("quiz-screen-title");
    if (titleEl) titleEl.textContent = activeQuizEngine.quizTitle;

    const examBadge = document.getElementById("quiz-meta-exam");
    if (examBadge) {
      if (question.isPYQ) {
        examBadge.style.display = "inline-flex";
        examBadge.textContent = question.pyqLabel || "PYQ Verified";
      } else {
        examBadge.style.display = "none";
      }
    }

    const diffBadge = document.getElementById("quiz-meta-difficulty");
    if (diffBadge) diffBadge.textContent = question.difficulty || "Medium";

    const subjBadge = document.getElementById("quiz-meta-subject");
    if (subjBadge) subjBadge.textContent = question.subject || "General";

    // Progress Bar & Counter
    const counterEl = document.getElementById("quiz-q-counter");
    if (counterEl) counterEl.textContent = `Question ${index + 1} of ${total}`;

    const progressFill = document.getElementById("quiz-progress-fill");
    if (progressFill) {
      const pct = Math.round(((index) / total) * 100);
      progressFill.style.width = `${pct}%`;
    }

    // Bookmark icon
    const bmBtn = document.getElementById("btn-q-bookmark");
    if (bmBtn) {
      bmBtn.classList.toggle("bookmarked", isBookmarked);
    }

    // Question Text
    const qTextEl = document.getElementById("quiz-q-text");
    if (qTextEl) qTextEl.textContent = question.question;

    // Reset Motivation & Solution boxes
    const motivationBanner = document.getElementById("quiz-motivation-banner");
    if (motivationBanner) {
      motivationBanner.className = "motivation-banner";
      motivationBanner.style.display = "none";
    }

    const solutionBox = document.getElementById("quiz-solution-box");
    if (solutionBox) {
      solutionBox.classList.remove("visible");
    }

    // Next button label
    const nextBtn = document.getElementById("btn-quiz-next");
    if (nextBtn) {
      nextBtn.textContent = (index === total - 1) ? "Finish Quiz 🏁" : "Next Question →";
      nextBtn.disabled = true; // Disabled until answered
      nextBtn.style.opacity = "0.5";
    }

    // Options Container
    const optionsContainer = document.getElementById("quiz-options-container");
    if (!optionsContainer) return;
    optionsContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    question.options.forEach((optText, optIdx) => {
      const optItem = document.createElement("div");
      optItem.className = "option-item";
      optItem.setAttribute("data-opt-idx", optIdx);
      optItem.innerHTML = `
        <div class="option-letter">${letters[optIdx]}</div>
        <div class="option-text">${optText}</div>
      `;

      optItem.onclick = () => {
        if (!activeQuizEngine.isAnswerSubmitted) {
          activeQuizEngine.submitAnswer(optIdx);
        }
      };

      optionsContainer.appendChild(optItem);
    });
  }

  renderAnswerEvaluation(res) {
    const { selectedOptionIndex, correctIndex, isCorrect, isTimeout, motivation, xpAwarded, explanation } = res;
    const optionsContainer = document.getElementById("quiz-options-container");
    if (!optionsContainer) return;

    // Highlight options
    const optionEls = optionsContainer.querySelectorAll(".option-item");
    optionEls.forEach((opt, idx) => {
      opt.classList.add("disabled");
      if (idx === correctIndex) {
        opt.classList.add("correct");
        if (isCorrect) opt.classList.add("animate-correct");
      } else if (idx === selectedOptionIndex && !isCorrect) {
        opt.classList.add("wrong");
        opt.classList.add("animate-shake");
      }
    });

    // Show Motivation Banner
    const banner = document.getElementById("quiz-motivation-banner");
    const bannerText = document.getElementById("quiz-motivation-text");
    const bannerIcon = document.getElementById("quiz-motivation-icon");

    if (banner && bannerText) {
      banner.style.display = "flex";
      banner.className = `motivation-banner ${isCorrect ? 'success' : 'danger'}`;
      bannerText.textContent = motivation;
      if (bannerIcon) bannerIcon.textContent = isCorrect ? "🔥" : "📚";
    }

    // Floating XP
    if (isCorrect) {
      const card = document.getElementById("quiz-question-card");
      ui.showXPFloater(xpAwarded, card);
    }

    // Show Solution Box
    const solutionBox = document.getElementById("quiz-solution-box");
    const solutionContent = document.getElementById("quiz-solution-content");
    if (solutionBox && solutionContent) {
      solutionContent.innerHTML = explanation ? this.formatMarkdown(explanation) : "Explanation unavailable.";
      solutionBox.classList.add("visible");
    }

    // Enable Next button
    const nextBtn = document.getElementById("btn-quiz-next");
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
    }
  }

  renderQuizTimer(remaining, total) {
    const timerText = document.getElementById("quiz-timer-text");
    const timerBox = document.getElementById("quiz-timer-box");
    if (timerText) {
      timerText.textContent = ui.formatTime(remaining);
    }
    if (timerBox) {
      if (remaining <= 10) {
        timerBox.classList.add("warning");
      } else {
        timerBox.classList.remove("warning");
      }
    }
  }

  // =========================================================================
  // RESULT PAGE & REVIEW FLOW
  // =========================================================================
  displayQuizResult(result) {
    this.lastCompletedQuizResult = result;
    ui.switchView("result");

    // Confetti if high score
    if (result.accuracy >= 75) {
      ui.triggerConfetti(3500);
    }

    // If Daily Challenge, mark completed
    if (result.type === "daily") {
      appState.markDailyChallengeDone();
    }

    // Trophy and Tier Badge
    const trophyEl = document.getElementById("result-trophy-icon");
    if (trophyEl) {
      if (result.accuracy >= 90) trophyEl.textContent = "🏆";
      else if (result.accuracy >= 75) trophyEl.textContent = "🔥";
      else if (result.accuracy >= 50) trophyEl.textContent = "💪";
      else trophyEl.textContent = "📚";
    }

    const tierEl = document.getElementById("result-tier-badge");
    if (tierEl) tierEl.textContent = result.performanceTier || "Good Attempt!";

    const scoreDisplay = document.getElementById("result-score-display");
    if (scoreDisplay) {
      scoreDisplay.textContent = result.maxMarks ? `${result.score} / ${result.maxMarks} Marks` : `${result.correct} / ${result.total}`;
    }

    const summaryEl = document.getElementById("result-summary-text");
    if (summaryEl) summaryEl.textContent = result.motivationalSummary || "Keep up consistent practice!";

    // Result Stats
    const accEl = document.getElementById("res-stat-accuracy");
    if (accEl) accEl.textContent = `${result.accuracy}%`;

    const correctEl = document.getElementById("res-stat-correct");
    if (correctEl) correctEl.textContent = result.correct;

    const wrongEl = document.getElementById("res-stat-wrong");
    if (wrongEl) wrongEl.textContent = result.wrong;

    const timeEl = document.getElementById("res-stat-time");
    if (timeEl) timeEl.textContent = ui.formatTime(result.timeTakenSeconds || 0);

    const xpEl = document.getElementById("res-stat-xp");
    if (xpEl) xpEl.textContent = `+${result.xpEarned || 50}`;

    // Practice Weak Topics Button Visibility
    const weakBtn = document.getElementById("btn-res-practice-weak");
    if (weakBtn) {
      if (result.wrongQuestions && result.wrongQuestions.length > 0) {
        weakBtn.style.display = "inline-flex";
      } else {
        weakBtn.style.display = "none";
      }
    }
  }

  bindResultActions() {
    // Review Answers Button
    const revBtn = document.getElementById("btn-res-review");
    if (revBtn) {
      revBtn.onclick = () => {
        if (this.lastCompletedQuizResult) {
          this.renderReviewView(this.lastCompletedQuizResult);
        }
      };
    }

    // Practice Weak Topics from Result
    const weakBtn = document.getElementById("btn-res-practice-weak");
    if (weakBtn) {
      weakBtn.onclick = () => {
        if (this.lastCompletedQuizResult && this.lastCompletedQuizResult.wrongQuestions.length > 0) {
          activeQuizEngine.startQuiz({
            title: "Targeted Weak Topic Remedial Quiz",
            type: "remedial",
            difficulty: "Medium",
            questions: this.shuffleArray(this.lastCompletedQuizResult.wrongQuestions),
            timeLimitPerQuestion: 45
          });
          ui.switchView("quiz");
        }
      };
    }

    // Retry Quiz
    const retryBtn = document.getElementById("btn-res-retry");
    if (retryBtn) {
      retryBtn.onclick = () => {
        if (this.lastCompletedQuizResult && this.lastCompletedQuizResult.questions) {
          activeQuizEngine.startQuiz({
            title: this.lastCompletedQuizResult.title,
            type: this.lastCompletedQuizResult.type,
            difficulty: this.lastCompletedQuizResult.difficulty || "Medium",
            questions: this.shuffleArray(this.lastCompletedQuizResult.questions),
            timeLimitPerQuestion: 45
          });
          ui.switchView("quiz");
        }
      };
    }

    // Back to Dashboard
    const dashBtn = document.getElementById("btn-res-dashboard");
    if (dashBtn) {
      dashBtn.onclick = () => ui.switchView("dashboard");
    }

    // Back from Review to Result
    const backResultBtn = document.getElementById("btn-review-back-result");
    if (backResultBtn) {
      backResultBtn.onclick = () => ui.switchView("result");
    }
  }

  renderReviewView(result) {
    ui.switchView("review");
    const container = document.getElementById("review-questions-container");
    if (!container) return;
    container.innerHTML = "";

    result.questions.forEach((q, idx) => {
      const userAns = result.answers ? result.answers[idx] : null;
      const isCorrect = userAns === q.correctIndex;
      const isUnanswered = userAns === null || userAns === -1;

      const card = document.createElement("div");
      card.className = "card";
      card.style.borderLeft = `5px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`;

      const letters = ["A", "B", "C", "D"];
      const userAnsText = !isUnanswered ? `${letters[userAns]}) ${q.options[userAns]}` : "Not Attempted";
      const correctAnsText = `${letters[q.correctIndex]}) ${q.options[q.correctIndex]}`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge ${isCorrect ? 'badge-difficulty' : 'badge-pyq'}" style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
              ${isCorrect ? '✓ Correct' : isUnanswered ? '⚠️ Unattempted' : '✗ Incorrect'}
            </span>
            <span class="badge badge-difficulty">${q.subject} • ${q.topic}</span>
          </div>
          ${q.isPYQ ? `<span class="badge badge-pyq">${q.pyqLabel || 'PYQ'}</span>` : ''}
        </div>
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">${idx + 1}. ${q.question}</h4>

        <div style="background-color: var(--bg-secondary); padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1rem; font-size: 0.95rem;">
          <div style="margin-bottom: 0.4rem; color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
            <strong>Your Answer:</strong> ${userAnsText}
          </div>
          <div style="color: var(--success);">
            <strong>Correct Answer:</strong> ${correctAnsText}
          </div>
        </div>

        <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; padding: 1rem; background: rgba(99, 102, 241, 0.06); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
          <strong style="color: var(--primary);">📖 Solution & Concept:</strong><br>
          ${this.formatMarkdown(q.explanation || "No explanation provided.")}
        </div>

        ${!isCorrect ? `
          <div style="margin-top: 1rem; text-align: right;">
            <button class="btn btn-secondary btn-sm" data-practice-topic="${q.subject}">
              Practice more ${q.subject} questions →
            </button>
          </div>
        ` : ''}
      `;

      const practiceBtn = card.querySelector("[data-practice-topic]");
      if (practiceBtn) {
        practiceBtn.onclick = () => {
          this.startCategoryQuiz(q.subject, q.subject, "subject");
        };
      }

      container.appendChild(card);
    });
  }

  // =========================================================================
  // MOCK TEST SIMULATOR WIRING
  // =========================================================================
  bindMockEngine() {
    activeMockEngine.callbacks = {
      onQuestionChange: (state) => this.renderMockQuestion(state),
      onPaletteUpdate: (summary) => this.renderMockPaletteSummary(summary),
      onTimerTick: (remaining, total) => {
        const clock = document.getElementById("mock-timer-clock");
        if (clock) clock.textContent = ui.formatTime(remaining);
      },
      onTestSubmitted: (result, newBadges) => {
        const modal = document.getElementById("mock-submit-modal");
        if (modal) modal.classList.remove("active");
        this.displayQuizResult(result);
        if (newBadges && newBadges.length > 0) {
          ui.showBadgeUnlockedModal(newBadges);
        }
      }
    };

    // Save & Next
    const saveNextBtn = document.getElementById("btn-mock-save-next");
    if (saveNextBtn) {
      saveNextBtn.onclick = () => activeMockEngine.saveAndNext();
    }

    // Mark for Review & Next
    const markBtn = document.getElementById("btn-mock-mark-review");
    if (markBtn) {
      markBtn.onclick = () => activeMockEngine.markForReviewAndNext();
    }

    // Clear Response
    const clearBtn = document.getElementById("btn-mock-clear");
    if (clearBtn) {
      clearBtn.onclick = () => activeMockEngine.clearResponse();
    }

    // Submit Early Button
    const submitBtn = document.getElementById("btn-mock-submit-early");
    if (submitBtn) {
      submitBtn.onclick = () => {
        const summary = activeMockEngine.getPaletteSummary();
        document.getElementById("modal-sub-ans").textContent = summary.answered;
        document.getElementById("modal-sub-unans").textContent = summary.notAnswered + summary.notVisited;
        document.getElementById("modal-sub-marked").textContent = summary.marked + summary.answeredAndMarked;
        document.getElementById("mock-submit-modal").classList.add("active");
      };
    }

    // Modal Resume
    const resumeBtn = document.getElementById("btn-modal-resume-test");
    if (resumeBtn) {
      resumeBtn.onclick = () => {
        document.getElementById("mock-submit-modal").classList.remove("active");
      };
    }

    // Modal Confirm Submit
    const confirmSubmitBtn = document.getElementById("btn-modal-confirm-submit");
    if (confirmSubmitBtn) {
      confirmSubmitBtn.onclick = () => {
        activeMockEngine.submitTest(false);
      };
    }
  }

  renderMockHub() {
    const listContainer = document.getElementById("mock-tests-list");
    const hub = document.getElementById("mock-hub-container");
    const arena = document.getElementById("mock-active-arena");

    if (hub) hub.style.display = "block";
    if (arena) arena.style.display = "none";
    if (!listContainer) return;

    listContainer.innerHTML = MOCK_TESTS.map(mock => `
      <div class="mode-card" data-mock-id="${mock.id}">
        <div class="mode-card-header">
          <span class="mode-icon">📝</span>
          <span class="mode-badge mock">${mock.badge}</span>
        </div>
        <h3 class="mode-title">${mock.title}</h3>
        <p class="mode-desc">${mock.description}</p>
        <div class="mode-footer">
          <span>⏱️ ${mock.durationMinutes} Mins • ${mock.totalQuestions} Qs</span>
          <span class="mode-action-link">Start Mock →</span>
        </div>
      </div>
    `).join("");

    listContainer.querySelectorAll("[data-mock-id]").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-mock-id");
        const blueprint = MOCK_TESTS.find(m => m.id === id);
        if (blueprint) {
          this.startMockTest(blueprint);
        }
      });
    });
  }

  startMockTest(blueprint) {
    document.getElementById("mock-hub-container").style.display = "none";
    document.getElementById("mock-active-arena").style.display = "block";
    document.getElementById("mock-active-title").textContent = blueprint.title;

    activeMockEngine.startTest(blueprint, QUESTION_BANK);
    ui.showToast(`Test Started: ${blueprint.title} ⏱️`);
  }

  renderMockQuestion(state) {
    const { currentGlobalIndex, totalQuestions, currentQuestion, currentSection, sections, selectedOption, statuses } = state;

    // Counter & marks
    document.getElementById("mock-q-counter").textContent = `Question ${currentGlobalIndex + 1} of ${totalQuestions} (${currentSection.name})`;
    document.getElementById("mock-q-text").textContent = currentQuestion.question;

    // Section Tabs
    const tabsContainer = document.getElementById("mock-sections-tabs");
    if (tabsContainer) {
      tabsContainer.innerHTML = sections.map((sec, idx) => `
        <div class="mock-section-tab ${idx === currentSection.sectionIndex ? 'active' : ''}" data-sec-idx="${idx}">
          ${sec.name} (${sec.questions.length})
        </div>
      `).join("");

      tabsContainer.querySelectorAll("[data-sec-idx]").forEach(tab => {
        tab.addEventListener("click", () => {
          const idx = parseInt(tab.getAttribute("data-sec-idx"));
          activeMockEngine.switchSection(idx);
        });
      });
    }

    // Options
    const optionsContainer = document.getElementById("mock-options-container");
    if (optionsContainer) {
      optionsContainer.innerHTML = "";
      const letters = ["A", "B", "C", "D"];
      currentQuestion.options.forEach((optText, idx) => {
        const optItem = document.createElement("div");
        optItem.className = `option-item ${selectedOption === idx ? 'correct' : ''}`;
        optItem.innerHTML = `
          <div class="option-letter">${letters[idx]}</div>
          <div class="option-text">${optText}</div>
        `;
        optItem.onclick = () => {
          activeMockEngine.selectOption(idx);
          this.renderMockQuestion(activeMockEngine.getCurrentState());
        };
        optionsContainer.appendChild(optItem);
      });
    }

    // Render Palette Grid
    const paletteGrid = document.getElementById("mock-palette-grid");
    if (paletteGrid) {
      paletteGrid.innerHTML = statuses.map((status, qIdx) => `
        <button class="palette-btn ${status} ${qIdx === currentGlobalIndex ? 'current' : ''}" data-q-idx="${qIdx}">
          ${qIdx + 1}
        </button>
      `).join("");

      paletteGrid.querySelectorAll("[data-q-idx]").forEach(btn => {
        btn.addEventListener("click", () => {
          const targetQ = parseInt(btn.getAttribute("data-q-idx"));
          activeMockEngine.goToQuestion(targetQ);
        });
      });
    }

    this.renderMockPaletteSummary(state.paletteSummary);
  }

  renderMockPaletteSummary(summary) {
    const ans = document.getElementById("palette-count-ans");
    if (ans) ans.textContent = summary.answered;

    const unans = document.getElementById("palette-count-unans");
    if (unans) unans.textContent = summary.notAnswered;

    const marked = document.getElementById("palette-count-marked");
    if (marked) marked.textContent = summary.marked + summary.answeredAndMarked;

    const visited = document.getElementById("palette-count-visited");
    if (visited) visited.textContent = summary.notVisited;
  }

  // =========================================================================
  // PYQ HUB (PREVIOUS YEAR QUESTIONS) WIRING
  // =========================================================================
  bindPYQHub() {
    // 5 PYQ Modes
    const btnExam = document.getElementById("btn-pyq-mode-exam");
    if (btnExam) {
      btnExam.onclick = () => {
        const pyqs = pyqManager.getExamWisePYQs("SSC CGL", 15);
        activeQuizEngine.startQuiz({
          title: "SSC CGL Previous Year Exam Questions",
          type: "pyq",
          difficulty: "Medium",
          questions: pyqs,
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }

    const btnYear = document.getElementById("btn-pyq-mode-year");
    if (btnYear) {
      btnYear.onclick = () => {
        const pyqs = pyqManager.getYearWisePYQs("2024", 15);
        activeQuizEngine.startQuiz({
          title: "2024 Competitive Exam PYQ Mega Set",
          type: "pyq",
          difficulty: "Medium",
          questions: pyqs,
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }

    const btnSubject = document.getElementById("btn-pyq-mode-subject");
    if (btnSubject) {
      btnSubject.onclick = () => {
        const pyqs = pyqManager.getSubjectWisePYQs("Indian Polity", 15);
        activeQuizEngine.startQuiz({
          title: "Indian Polity & Constitution PYQ Mastery",
          type: "pyq",
          difficulty: "Medium",
          questions: pyqs,
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }

    const btnMixed = document.getElementById("btn-pyq-mode-mixed");
    if (btnMixed) {
      btnMixed.onclick = () => {
        const pyqs = pyqManager.getMixedPYQs(15);
        activeQuizEngine.startQuiz({
          title: "Mixed All-India Competitive PYQs",
          type: "pyq",
          difficulty: "Medium",
          questions: pyqs,
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }

    const btnMock = document.getElementById("btn-pyq-mode-mock");
    if (btnMock) {
      btnMock.onclick = () => {
        const pyqs = pyqManager.getFullPYQMockTest("SSC CGL", 20);
        activeQuizEngine.startQuiz({
          title: "Full Verified PYQ Mock Test",
          type: "pyq",
          difficulty: "Hard",
          questions: pyqs,
          timeLimitPerQuestion: 40
        });
        ui.switchView("quiz");
      };
    }

    // Filter Controls
    const searchInput = document.getElementById("pyq-search-input");
    if (searchInput) {
      searchInput.oninput = () => {
        pyqManager.currentFilters.searchQuery = searchInput.value;
        this.renderPYQFeed();
      };
    }

    ["exam", "year", "subject", "difficulty"].forEach(fKey => {
      const selectEl = document.getElementById(`pyq-filter-${fKey}`);
      if (selectEl) {
        selectEl.onchange = () => {
          pyqManager.currentFilters[fKey] = selectEl.value;
          this.renderPYQFeed();
        };
      }
    });

    // Practice Filtered Set Button
    const practiceFilteredBtn = document.getElementById("btn-pyq-practice-filtered");
    if (practiceFilteredBtn) {
      practiceFilteredBtn.onclick = () => {
        const filtered = pyqManager.getFilteredPYQs();
        if (filtered.length === 0) {
          ui.showToast("No questions match your filter criteria! ⚠️");
          return;
        }
        activeQuizEngine.startQuiz({
          title: "Filtered PYQ Custom Practice Set",
          type: "pyq",
          difficulty: pyqManager.currentFilters.difficulty !== "all" ? pyqManager.currentFilters.difficulty : "Medium",
          questions: pyqManager.shuffle(filtered).slice(0, 15),
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }
  }

  renderPYQHub() {
    const stats = appState.getPYQStats();
    document.getElementById("pyq-kpi-attempted").textContent = stats.attempted.toLocaleString();
    document.getElementById("pyq-kpi-accuracy").textContent = `${stats.accuracy}%`;

    // Find top practiced exam
    let topExam = "SSC CGL";
    let maxCount = 0;
    Object.keys(stats.examBreakdown).forEach(exam => {
      if (stats.examBreakdown[exam].attempted > maxCount) {
        maxCount = stats.examBreakdown[exam].attempted;
        topExam = exam;
      }
    });
    document.getElementById("pyq-kpi-top-exam").textContent = topExam;

    this.renderPYQFeed();
  }

  renderPYQFeed() {
    const container = document.getElementById("pyq-questions-feed");
    if (!container) return;

    const questions = pyqManager.getFilteredPYQs();
    if (questions.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🔍</span>
          <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">No PYQ Matches Found</p>
          <p style="font-size: 0.9rem;">Try adjusting your exam, year, or subject filter criteria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = questions.map((q, idx) => `
      <div class="card" style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-pyq">${q.pyqLabel || 'PREVIOUS YEAR QUESTION'}</span>
            <span class="badge badge-difficulty">${q.subject}</span>
            <span class="badge badge-difficulty">${q.topic}</span>
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">Ref: ${q.sourceRef || 'Official Paper'}</span>
        </div>

        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">${idx + 1}. ${q.question}</h4>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; margin-bottom: 1rem;">
          ${q.options.map((opt, oIdx) => `
            <div style="padding: 0.5rem 0.85rem; border-radius: var(--radius-sm); background: var(--bg-secondary); font-size: 0.9rem; border: 1px solid var(--border-color);">
              <strong>${['A', 'B', 'C', 'D'][oIdx]})</strong> ${opt}
            </div>
          `).join("")}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <button class="btn btn-secondary btn-sm" data-toggle-sol="${q.id}">
            💡 Reveal Solution & Logic
          </button>
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary);">Difficulty: ${q.difficulty}</span>
        </div>

        <div id="sol-panel-${q.id}" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(99, 102, 241, 0.07); border-radius: var(--radius-md); border-left: 3px solid var(--primary); font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
          <strong style="color: var(--success); display: block; margin-bottom: 0.35rem;">✓ Correct Answer: ${['A', 'B', 'C', 'D'][q.correctIndex]}) ${q.options[q.correctIndex]}</strong>
          ${this.formatMarkdown(q.explanation || "")}
        </div>
      </div>
    `).join("");

    // Toggle solutions click handler
    container.querySelectorAll("[data-toggle-sol]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-toggle-sol");
        const panel = document.getElementById(`sol-panel-${id}`);
        if (panel) {
          const isHidden = panel.style.display === "none";
          panel.style.display = isHidden ? "block" : "none";
          btn.textContent = isHidden ? "Hide Solution" : "💡 Reveal Solution & Logic";
        }
      });
    });
  }

  // =========================================================================
  // REVISION VAULT & MISTAKES NOTEBOOK
  // =========================================================================
  bindVault() {
    const tabMistakes = document.getElementById("tab-vault-mistakes");
    const tabBookmarks = document.getElementById("tab-vault-bookmarks");

    if (tabMistakes) {
      tabMistakes.onclick = () => {
        tabMistakes.style.background = "var(--primary-light)";
        tabMistakes.style.color = "var(--primary)";
        tabBookmarks.style.background = "var(--bg-secondary)";
        tabBookmarks.style.color = "var(--text-primary)";
        this.renderVaultContent("mistakes");
      };
    }

    if (tabBookmarks) {
      tabBookmarks.onclick = () => {
        tabBookmarks.style.background = "var(--primary-light)";
        tabBookmarks.style.color = "var(--primary)";
        tabMistakes.style.background = "var(--bg-secondary)";
        tabMistakes.style.color = "var(--text-primary)";
        this.renderVaultContent("bookmarks");
      };
    }

    // Practice Mistakes Now Button
    const practiceMistakesBtn = document.getElementById("btn-practice-mistakes-now");
    if (practiceMistakesBtn) {
      practiceMistakesBtn.onclick = () => {
        const mistakes = appState.getMistakesList();
        if (mistakes.length === 0) {
          ui.showToast("Your Mistakes Notebook is clean! Take more quizzes to challenge yourself! 🎉");
          return;
        }
        const questions = mistakes.map(m => m.question);
        activeQuizEngine.startQuiz({
          title: "Mistakes Notebook Practice Session",
          type: "remedial",
          difficulty: "Medium",
          questions: this.shuffleArray(questions),
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }
  }

  renderVault() {
    const mistakes = appState.getMistakesList();
    const bookmarks = appState.getBookmarks();

    document.getElementById("vault-mistakes-badge").textContent = mistakes.length;
    document.getElementById("vault-bookmarks-badge").textContent = bookmarks.length;

    this.renderVaultContent("mistakes");
  }

  renderVaultContent(mode = "mistakes") {
    const container = document.getElementById("vault-content-list");
    if (!container) return;

    if (mode === "mistakes") {
      const mistakes = appState.getMistakesList();
      if (mistakes.length === 0) {
        container.innerHTML = `
          <div class="card" style="text-align: center; padding: 3rem; color: var(--text-muted);">
            <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">🎉</span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">No Active Mistakes!</h3>
            <p style="font-size: 0.95rem;">You have resolved all previous errors. Take more quizzes to uncover any hidden weak spots!</p>
          </div>
        `;
        return;
      }

      container.innerHTML = mistakes.map((item, idx) => {
        const q = item.question;
        return `
          <div class="card" style="padding: 1.5rem; border-left: 4px solid var(--danger);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="badge badge-difficulty" style="color: var(--danger);">Missed ${item.wrongCount}x</span>
              <span class="badge badge-difficulty">${q.subject} • ${q.topic}</span>
            </div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;">${idx + 1}. ${q.question}</h4>
            <div style="font-size: 0.9rem; color: var(--text-secondary); background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
              <strong style="color: var(--success);">Correct Answer:</strong> ${['A', 'B', 'C', 'D'][q.correctIndex]}) ${q.options[q.correctIndex]}
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              ${this.formatMarkdown(q.explanation || "")}
            </div>
          </div>
        `;
      }).join("");
    } else {
      // Bookmarks mode
      const bIds = appState.getBookmarks();
      const bQuestions = QUESTION_BANK.filter(q => bIds.includes(q.id));

      if (bQuestions.length === 0) {
        container.innerHTML = `
          <div class="card" style="text-align: center; padding: 3rem; color: var(--text-muted);">
            <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">⭐</span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">No Bookmarked Questions</h3>
            <p style="font-size: 0.95rem;">Click the star icon ⭐ during any quiz to save questions for later revision.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = bQuestions.map((q, idx) => `
        <div class="card" style="padding: 1.5rem; border-left: 4px solid var(--accent-amber);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge badge-difficulty">${q.subject} • ${q.topic}</span>
            <button class="btn btn-secondary btn-sm" data-remove-bookmark="${q.id}">Remove ⭐</button>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;">${idx + 1}. ${q.question}</h4>
          <div style="font-size: 0.9rem; color: var(--text-secondary); background: var(--bg-secondary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem;">
            <strong style="color: var(--success);">Correct Answer:</strong> ${['A', 'B', 'C', 'D'][q.correctIndex]}) ${q.options[q.correctIndex]}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            ${this.formatMarkdown(q.explanation || "")}
          </div>
        </div>
      `).join("");

      container.querySelectorAll("[data-remove-bookmark]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-remove-bookmark");
          appState.toggleBookmark(id);
          this.renderVaultContent("bookmarks");
          ui.showToast("Bookmark removed");
        });
      });
    }
  }

  // =========================================================================
  // ANALYTICS & WEAK TOPIC DIAGNOSTICS
  // =========================================================================
  bindAnalytics() {
    const autoRemedialBtn = document.getElementById("btn-remedial-auto-start");
    if (autoRemedialBtn) {
      autoRemedialBtn.onclick = () => {
        const questions = generateRemedialQuiz(appState, null, 10);
        activeQuizEngine.startQuiz({
          title: "AI Weak Topic Remedial Session",
          type: "remedial",
          difficulty: "Medium",
          questions: questions,
          timeLimitPerQuestion: 45
        });
        ui.switchView("quiz");
      };
    }
  }

  renderAnalytics() {
    const masteryData = calculateSubjectMastery(appState);
    const weakTopics = getWeakTopicsList(appState);

    // Weak Topic Alert Box
    const alertBox = document.getElementById("analytics-weak-alert-box");
    const alertDesc = document.getElementById("analytics-weak-alert-desc");

    if (alertBox && alertDesc) {
      if (weakTopics.length > 0) {
        alertBox.style.display = "block";
        const topWeak = weakTopics.slice(0, 3).map(w => `${w.topic} (${w.wrongCount} mistakes)`).join(", ");
        alertDesc.textContent = `Diagnostic indicates critical concept gaps in: ${topWeak}. Recommended: Review foundational notes and take the remedial quiz.`;
      } else {
        alertBox.style.display = "none";
      }
    }

    // Render Subject Cards
    const container = document.getElementById("analytics-subject-grid");
    if (!container) return;

    container.innerHTML = masteryData.map(subj => `
      <div class="stat-card" style="flex-direction: column; align-items: stretch; gap: 0.75rem; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.65rem; min-width: 0;">
            <span style="font-size: 1.5rem; flex-shrink: 0;">${subj.icon}</span>
            <strong style="font-size: 0.95rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${subj.name}">${subj.id}</strong>
          </div>
          <span class="badge badge-difficulty" style="font-size: 0.75rem; flex-shrink: 0;">${subj.status}</span>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary);">
          <span>Attempted: <strong>${subj.attempted}</strong></span>
          <span>Accuracy: <strong style="color: ${subj.accuracy >= 75 ? 'var(--success)' : subj.accuracy >= 50 ? 'var(--warning)' : 'var(--danger)'};">${subj.accuracy}%</strong></span>
        </div>

        <div style="height: 6px; background-color: var(--border-color); border-radius: var(--radius-full); overflow: hidden;">
          <div style="height: 100%; width: ${subj.accuracy}%; background: linear-gradient(90deg, ${subj.color}, var(--primary)); border-radius: var(--radius-full);"></div>
        </div>

        <button class="btn btn-secondary btn-sm" style="margin-top: 0.25rem; width: 100%; justify-content: center;" data-practice-weak-subj="${subj.id}">
          Practice ${subj.id} →
        </button>
      </div>
    `).join("");

    container.querySelectorAll("[data-practice-weak-subj]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-practice-weak-subj");
        this.startCategoryQuiz(id, id, "subject");
      });
    });
  }

  // =========================================================================
  // LEADERBOARD & BADGES WIRING
  // =========================================================================
  renderLeaderboardAndBadges() {
    const profile = appState.getProfile();
    const unlockedBadges = appState.getUnlockedBadges();

    // Badges Showcase
    const badgesContainer = document.getElementById("badges-grid");
    if (badgesContainer) {
      badgesContainer.innerHTML = BADGES_CATALOG.map(b => {
        const isUnlocked = unlockedBadges.includes(b.id);
        return `
          <div class="card" style="padding: 1.25rem; opacity: ${isUnlocked ? '1' : '0.55'}; border-color: ${isUnlocked ? 'var(--primary)' : 'var(--border-color)'};">
            <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.5rem;">
              <span style="font-size: 2rem; filter: ${isUnlocked ? 'none' : 'grayscale(100%)'};">${b.icon}</span>
              <div>
                <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${b.name}</h4>
                <span class="badge ${isUnlocked ? 'badge-pyq' : 'badge-difficulty'}" style="font-size: 0.7rem;">
                  ${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                </span>
              </div>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${b.desc}</p>
          </div>
        `;
      }).join("");
    }

    // Leaderboard Table
    const tableBody = document.getElementById("leaderboard-table-body");
    if (tableBody) {
      const leaderboardData = getLeaderboard(profile);
      tableBody.innerHTML = leaderboardData.map(row => `
        <tr style="border-bottom: 1px solid var(--border-color); background-color: ${row.isUser ? 'rgba(99, 102, 241, 0.12)' : 'transparent'};">
          <td style="padding: 1rem 1.25rem; font-weight: 800; color: ${row.rank <= 3 ? 'var(--primary)' : 'var(--text-muted)'};">
            #${row.rank}
          </td>
          <td style="padding: 1rem 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.25rem;">${row.avatar}</span>
              <div>
                <span style="font-weight: 700; color: var(--text-primary);">${row.name} ${row.isUser ? '(You)' : ''}</span>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${row.badge}</div>
              </div>
            </div>
          </td>
          <td style="padding: 1rem 1.25rem; color: var(--text-secondary); font-size: 0.9rem;">${row.exam}</td>
          <td style="padding: 1rem 1.25rem; color: ${row.accuracy >= 85 ? 'var(--success)' : 'var(--text-secondary)'}; font-weight: 700;">${row.accuracy}%</td>
          <td style="padding: 1rem 1.25rem; color: #ea580c; font-weight: 700;">🔥 ${row.streak}d</td>
          <td style="padding: 1rem 1.25rem; text-align: right; font-weight: 800; color: var(--primary);">${row.xp.toLocaleString()} XP</td>
        </tr>
      `).join("");
    }
  }

  // =========================================================================
  // PROFILE MODAL & HEADER ACTIONS
  // =========================================================================
  bindHeaderAndModals() {
    // Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.onclick = () => ui.toggleTheme();
    }

    // Profile Click to open Edit Modal
    const openProfile = () => {
      const profile = appState.getProfile();
      document.getElementById("modal-input-name").value = profile.name || "Aspirant";
      document.getElementById("modal-select-target").value = profile.targetExam || "SSC CGL";
      document.getElementById("profile-modal").classList.add("active");
    };

    const sidebarCard = document.getElementById("sidebar-user-card");
    if (sidebarCard) sidebarCard.onclick = openProfile;

    const headerAvatar = document.getElementById("header-user-avatar");
    if (headerAvatar) headerAvatar.onclick = openProfile;

    // Close Modal
    const closeProfileModal = () => {
      document.getElementById("profile-modal").classList.remove("active");
    };

    const closeBtn = document.getElementById("btn-close-profile-modal");
    if (closeBtn) closeBtn.onclick = closeProfileModal;

    const cancelBtn = document.getElementById("btn-cancel-profile");
    if (cancelBtn) cancelBtn.onclick = closeProfileModal;

    // Avatar Picker options
    let selectedAvatar = appState.getProfile().avatar || "🎯";
    document.querySelectorAll(".avatar-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        document.querySelectorAll(".avatar-opt").forEach(o => o.style.outline = "none");
        opt.style.outline = "2px solid var(--primary)";
        selectedAvatar = opt.textContent.trim();
      });
    });

    // Save Profile
    const saveProfileBtn = document.getElementById("btn-save-profile");
    if (saveProfileBtn) {
      saveProfileBtn.onclick = () => {
        const name = document.getElementById("modal-input-name").value.trim() || "Aspirant";
        const target = document.getElementById("modal-select-target").value;
        appState.updateProfile({
          name: name,
          targetExam: target,
          avatar: selectedAvatar
        });
        ui.updateHeaderStats();
        this.renderDashboard();
        closeProfileModal();
        ui.showToast("Profile Updated! 🎯");
      };
    }

    // Badge modal close
    const closeBadgeBtn = document.getElementById("btn-close-badge-modal");
    if (closeBadgeBtn) {
      closeBadgeBtn.onclick = () => {
        document.getElementById("badge-unlocked-modal").classList.remove("active");
      };
    }
  }

  // =========================================================================
  // KEYBOARD ACCESSIBILITY
  // =========================================================================
  bindKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (ui.currentView !== "quiz" && ui.currentView !== "mock") return;

      // Disable when typing in input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      const key = e.key.toUpperCase();
      const optionMap = { "1": 0, "2": 1, "3": 2, "4": 3, "A": 0, "B": 1, "C": 2, "D": 3 };

      if (optionMap[key] !== undefined) {
        const optIndex = optionMap[key];
        if (ui.currentView === "quiz" && !activeQuizEngine.isAnswerSubmitted) {
          activeQuizEngine.submitAnswer(optIndex);
        } else if (ui.currentView === "mock") {
          activeMockEngine.selectOption(optIndex);
          this.renderMockQuestion(activeMockEngine.getCurrentState());
        }
      } else if (key === "ENTER") {
        if (ui.currentView === "quiz" && activeQuizEngine.isAnswerSubmitted) {
          activeQuizEngine.nextQuestion();
        }
      }
    });
  }

  // Helper: Markdown-to-HTML parser for solutions
  formatMarkdown(text) {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>");
  }

  shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // =========================================================================
  // PROGRESSIVE WEB APP (PWA) & OFFLINE ENGINE
  // =========================================================================
  initPWA() {
    // 1. Register Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./service-worker.js")
          .then((reg) => {
            console.log("[ExamPro PWA] Service Worker registered:", reg.scope);
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    ui.showToast("New ExamPro version available! Refresh to update 🔄");
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn("[ExamPro PWA] Service Worker registration failed:", err);
          });
      });
    }

    // 2. Network Connectivity Monitoring
    const networkPill = document.getElementById("header-network-pill");
    const networkText = document.getElementById("network-text");

    const updateNetworkStatus = (isInitial = false) => {
      const isOnline = navigator.onLine;
      if (networkPill && networkText) {
        if (isOnline) {
          networkPill.classList.remove("offline");
          networkPill.classList.add("online");
          networkText.textContent = "Online";
          if (!isInitial) {
            ui.showToast("Back online! Connected to server 🌐");
          }
        } else {
          networkPill.classList.remove("online");
          networkPill.classList.add("offline");
          networkText.textContent = "Offline";
          ui.showToast("Offline mode active. All quizzes & mock tests remain fully usable! 📴", 4000);
        }
      }
    };

    window.addEventListener("online", () => updateNetworkStatus(false));
    window.addEventListener("offline", () => updateNetworkStatus(false));
    updateNetworkStatus(true);

    // 3. Install to Home Screen Handling
    let deferredPrompt = null;
    const installBanner = document.getElementById("pwa-install-banner");
    const btnInstallAction = document.getElementById("btn-pwa-install-action");
    const btnDismissBanner = document.getElementById("btn-pwa-dismiss");
    const btnHeaderInstall = document.getElementById("btn-header-install");
    const sidebarInstallLink = document.getElementById("sidebar-install-link");

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

    if (!isStandalone) {
      if (sidebarInstallLink) {
        sidebarInstallLink.style.display = "flex";
      }
    }

    const triggerInstall = async () => {
      if (!deferredPrompt) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          ui.showToast("To install on iOS: Tap Share (📤) then 'Add to Home Screen' (+)", 5000);
        } else {
          ui.showToast("Install ExamPro from your browser menu: 'Install app' or 'Add to Home screen' 📲", 5000);
        }
        return;
      }
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === "accepted") {
          ui.showToast("Thank you for installing ExamPro! 🚀");
        }
      } catch (err) {
        console.warn("Install prompt error:", err);
      }
      deferredPrompt = null;
      if (installBanner) installBanner.style.display = "none";
      if (btnHeaderInstall) btnHeaderInstall.style.display = "none";
      if (sidebarInstallLink) sidebarInstallLink.style.display = "none";
    };

    if (btnInstallAction) btnInstallAction.addEventListener("click", triggerInstall);
    if (btnHeaderInstall) btnHeaderInstall.addEventListener("click", triggerInstall);
    if (sidebarInstallLink) sidebarInstallLink.addEventListener("click", triggerInstall);

    if (btnDismissBanner) {
      btnDismissBanner.addEventListener("click", () => {
        if (installBanner) installBanner.style.display = "none";
        sessionStorage.setItem("exampro_install_dismissed", "true");
      });
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      if (btnHeaderInstall) btnHeaderInstall.style.display = "inline-flex";
      if (sidebarInstallLink) sidebarInstallLink.style.display = "flex";

      const isDismissed = sessionStorage.getItem("exampro_install_dismissed");
      if (!isDismissed && installBanner && !isStandalone) {
        installBanner.style.display = "flex";
      }
    });

    window.addEventListener("appinstalled", () => {
      deferredPrompt = null;
      if (installBanner) installBanner.style.display = "none";
      if (btnHeaderInstall) btnHeaderInstall.style.display = "none";
      if (sidebarInstallLink) sidebarInstallLink.style.display = "none";
      ui.showToast("ExamPro is installed! Access anytime from your home screen 📱✨", 4000);
      ui.fireConfetti();
    });

    // Support query param ?showInstall=true for demo/screenshots
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("showInstall") === "true") {
      if (installBanner) installBanner.style.display = "flex";
      if (btnHeaderInstall) btnHeaderInstall.style.display = "inline-flex";
      if (sidebarInstallLink) sidebarInstallLink.style.display = "flex";
    }
    if (urlParams.get("offline") === "true") {
      if (networkPill && networkText) {
        networkPill.classList.remove("online");
        networkPill.classList.add("offline");
        networkText.textContent = "Offline";
      }
    }
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.examProApp = new ExamProApp();
});

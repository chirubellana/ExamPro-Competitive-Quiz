/**
 * ExamPro Gamification Engine
 * Levels, Badges, Streaks, XP calculations, and Dynamic Leaderboard
 */

export const LEVEL_TITLES = [
  { level: 1, title: "Cadet Aspirant", minXP: 0 },
  { level: 2, title: "Disciplined Learner", minXP: 100 },
  { level: 3, title: "Concept Builder", minXP: 400 },
  { level: 4, title: "Exam Strategist", minXP: 900 },
  { level: 5, title: "Mock Champion", minXP: 1600 },
  { level: 6, title: "Speed Specialist", minXP: 2500 },
  { level: 7, title: "Subject Virtuoso", minXP: 3600 },
  { level: 8, title: "Rank Contender", minXP: 4900 },
  { level: 9, title: "Exam Pro", minXP: 6400 },
  { level: 10, title: "Elite Topper", minXP: 8100 }
];

export const BADGES_CATALOG = [
  {
    id: "badge_welcome",
    name: "Aspirant Onboarded",
    icon: "🌟",
    desc: "Started your competitive exam preparation journey with ExamPro",
    category: "Milestone",
    unlockedByDefault: true
  },
  {
    id: "badge_first_quiz",
    name: "First Step Forward",
    icon: "🚀",
    desc: "Completed your very first interactive quiz",
    category: "Quizzes",
    check: (state) => state.profile.totalQuestionsAttempted >= 5
  },
  {
    id: "badge_quiz_master",
    name: "Quiz Master",
    icon: "🏆",
    desc: "Completed at least 10 quizzes with sheer determination",
    category: "Quizzes",
    check: (state) => state.quizHistory.length >= 10
  },
  {
    id: "badge_streak_7",
    name: "7-Day Streak",
    icon: "🔥",
    desc: "Maintained a continuous 7-day study streak",
    category: "Consistency",
    check: (state) => state.profile.streak >= 7
  },
  {
    id: "badge_accuracy_king",
    name: "Accuracy King",
    icon: "🎯",
    desc: "Scored 90% or higher in a quiz of at least 10 questions",
    category: "Skill",
    check: (state) => state.quizHistory.some(q => q.total >= 10 && q.accuracy >= 90)
  },
  {
    id: "badge_speed_solver",
    name: "Speed Solver",
    icon: "⚡",
    desc: "Averaged under 18 seconds per question in a quiz",
    category: "Skill",
    check: (state) => state.quizHistory.some(q => q.total >= 5 && (q.timeTakenSeconds / q.total) < 18)
  },
  {
    id: "badge_knowledge_seeker",
    name: "Knowledge Seeker",
    icon: "📚",
    desc: "Solved 50+ competitive exam questions",
    category: "Milestone",
    check: (state) => state.profile.totalQuestionsAttempted >= 50
  },
  {
    id: "badge_perfect_score",
    name: "Perfect Score",
    icon: "💯",
    desc: "Achieved a 100% flawless score in any quiz",
    category: "Skill",
    check: (state) => state.quizHistory.some(q => q.total >= 5 && q.accuracy === 100)
  },
  {
    id: "badge_pyq_veteran",
    name: "PYQ Veteran",
    icon: "🏛️",
    desc: "Practiced 20+ verified Previous Year Questions",
    category: "PYQ",
    check: (state) => (state.pyqStats.attempted || 0) >= 20
  },
  {
    id: "badge_mistake_slayer",
    name: "Mistake Slayer",
    icon: "🛡️",
    desc: "Revisited and mastered questions from your Mistakes Notebook",
    category: "Revision",
    check: (state) => state.profile.totalQuestionsCorrect >= 25
  },
  {
    id: "badge_level_5",
    name: "High Achiever",
    icon: "👑",
    desc: "Reached Level 5 in ExamPro",
    category: "Level",
    check: (state) => state.profile.level >= 5
  }
];

export function getUserLevelInfo(xp) {
  let currentLevelObj = LEVEL_TITLES[0];
  let nextLevelObj = LEVEL_TITLES[1];

  for (let i = 0; i < LEVEL_TITLES.length; i++) {
    if (xp >= LEVEL_TITLES[i].minXP) {
      currentLevelObj = LEVEL_TITLES[i];
      nextLevelObj = LEVEL_TITLES[i + 1] || { level: currentLevelObj.level + 1, title: "Legend", minXP: currentLevelObj.minXP + 2000 };
    } else {
      break;
    }
  }

  const xpInCurrentLevel = xp - currentLevelObj.minXP;
  const xpNeededForNext = nextLevelObj.minXP - currentLevelObj.minXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForNext) * 100)));

  return {
    level: currentLevelObj.level,
    title: currentLevelObj.title,
    currentXP: xp,
    nextLevelXP: nextLevelObj.minXP,
    xpRemaining: Math.max(0, nextLevelObj.minXP - xp),
    progressPercent
  };
}

export function evaluateBadges(appState) {
  const newUnlocked = [];
  const state = appState.state;

  BADGES_CATALOG.forEach(badge => {
    if (badge.check && !state.unlockedBadges.includes(badge.id)) {
      if (badge.check(state)) {
        appState.unlockBadge(badge.id);
        newUnlocked.push(badge);
      }
    }
  });

  return newUnlocked;
}

// Dynamic Mock Leaderboard with User integrated
export function getLeaderboard(currentUserProfile) {
  const mockAspirants = [
    { rank: 1, name: "Priya Sharma", avatar: "🥇", exam: "SSC CGL 2024", xp: 9450, accuracy: 94, streak: 28, badge: "Elite Topper" },
    { rank: 2, name: "Ankit Verma", avatar: "🥈", exam: "IBPS PO", xp: 8820, accuracy: 91, streak: 21, badge: "Exam Pro" },
    { rank: 3, name: "Sneha Reddy", avatar: "🥉", exam: "UPSC CSE", xp: 8210, accuracy: 89, streak: 19, badge: "Exam Pro" },
    { rank: 4, name: "Rahul Deshmukh", avatar: "⚡", exam: "RRB NTPC", xp: 6940, accuracy: 88, streak: 14, badge: "Rank Contender" },
    { rank: 5, name: "Kavita Nair", avatar: "🎯", exam: "APPSC Gr-1", xp: 5890, accuracy: 86, streak: 12, badge: "Subject Virtuoso" },
    { rank: 6, name: "Vikram Singh", avatar: "🛡️", exam: "Police SI", xp: 4750, accuracy: 83, streak: 9, badge: "Speed Specialist" },
    { rank: 7, name: "Divya Patel", avatar: "📚", exam: "SBI PO", xp: 3620, accuracy: 82, streak: 8, badge: "Mock Champion" },
    { rank: 8, name: "Manoj Kumar", avatar: "🔥", exam: "SSC CHSL", xp: 2840, accuracy: 79, streak: 6, badge: "Exam Strategist" }
  ];

  const userEntry = {
    isUser: true,
    name: currentUserProfile.name || "You",
    avatar: currentUserProfile.avatar || "🎯",
    exam: currentUserProfile.targetExam || "SSC CGL",
    xp: currentUserProfile.xp || 0,
    accuracy: currentUserProfile.totalQuestionsAttempted > 0
      ? Math.round((currentUserProfile.totalQuestionsCorrect / currentUserProfile.totalQuestionsAttempted) * 100)
      : 0,
    streak: currentUserProfile.streak || 1,
    badge: getUserLevelInfo(currentUserProfile.xp || 0).title
  };

  // Combine and sort by XP
  const combined = [...mockAspirants, userEntry].sort((a, b) => b.xp - a.xp);

  // Assign dynamic ranks
  return combined.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

/**
 * ExamPro Analytics & Weak Topic Diagnostic Engine
 * Analyzes accuracy per subject & sub-topic and generates tailored remedial practice sessions.
 */

import { QUESTION_BANK, SUBJECTS_LIST } from "./data/questions.js";

export function calculateSubjectMastery(appState) {
  const subjectStats = appState.getSubjectStats();
  const masteryData = [];

  SUBJECTS_LIST.forEach(subj => {
    const stat = subjectStats[subj.id] || { attempted: 0, correct: 0 };
    const accuracy = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : null;

    let status = "Not Attempted";
    let statusClass = "neutral";
    if (accuracy !== null) {
      if (accuracy >= 80) {
        status = "Mastered 🌟";
        statusClass = "success";
      } else if (accuracy >= 60) {
        status = "Proficient 👍";
        statusClass = "warning";
      } else {
        status = "Needs Focus ⚠️";
        statusClass = "danger";
      }
    }

    masteryData.push({
      id: subj.id,
      name: subj.name,
      icon: subj.icon,
      color: subj.color,
      attempted: stat.attempted,
      correct: stat.correct,
      accuracy: accuracy !== null ? accuracy : 0,
      hasData: accuracy !== null,
      status,
      statusClass
    });
  });

  return masteryData;
}

export function getWeakTopicsList(appState) {
  const mistakes = appState.getMistakesList();
  const topicCounts = {};

  mistakes.forEach(item => {
    const q = item.question;
    if (q) {
      const key = `${q.subject} • ${q.topic}`;
      if (!topicCounts[key]) {
        topicCounts[key] = {
          subject: q.subject,
          topic: q.topic,
          wrongCount: 0,
          sampleQuestions: []
        };
      }
      topicCounts[key].wrongCount += item.wrongCount;
      if (topicCounts[key].sampleQuestions.length < 3) {
        topicCounts[key].sampleQuestions.push(q);
      }
    }
  });

  // Sort by highest wrong counts
  return Object.values(topicCounts).sort((a, b) => b.wrongCount - a.wrongCount);
}

export function generateRemedialQuiz(appState, preferredSubject = null, count = 10) {
  // If a specific weak subject is requested
  if (preferredSubject) {
    const matchQuestions = QUESTION_BANK.filter(q => q.subject === preferredSubject);
    return shuffleArray(matchQuestions).slice(0, count);
  }

  // Otherwise, select questions from subjects where user has lowest accuracy or mistakes
  const weakTopics = getWeakTopicsList(appState);
  if (weakTopics.length > 0) {
    const weakSubjects = [...new Set(weakTopics.map(w => w.subject))];
    const candidateQuestions = QUESTION_BANK.filter(q => weakSubjects.includes(q.subject));
    if (candidateQuestions.length >= count) {
      return shuffleArray(candidateQuestions).slice(0, count);
    }
  }

  // Fallback: balanced mix across question bank
  return shuffleArray(QUESTION_BANK).slice(0, count);
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

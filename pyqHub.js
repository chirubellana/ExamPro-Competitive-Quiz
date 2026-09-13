/**
 * ExamPro Previous Year Questions (PYQ) Hub Engine
 * Dedicated module for filtering, search, 5 practice modes, and verified PYQ metadata.
 */

import { QUESTION_BANK } from "./data/questions.js";

export class PYQHubManager {
  constructor() {
    this.currentFilters = {
      exam: "all",
      year: "all",
      subject: "all",
      difficulty: "all",
      sort: "latest",
      searchQuery: ""
    };
  }

  getFilteredPYQs(customFilters = {}) {
    const filters = { ...this.currentFilters, ...customFilters };

    return QUESTION_BANK.filter(q => {
      // Must have PYQ metadata or be labeled as PYQ
      if (!q.isPYQ && !q.isVerifiedPYQ && !q.pyqLabel) return false;

      // Filter by Exam
      if (filters.exam && filters.exam !== "all") {
        const examMatch = (q.examName && q.examName.toLowerCase().includes(filters.exam.toLowerCase())) ||
                          (q.examCategory && q.examCategory.toLowerCase().includes(filters.exam.toLowerCase()));
        if (!examMatch) return false;
      }

      // Filter by Year
      if (filters.year && filters.year !== "all") {
        if (q.examYear !== filters.year) return false;
      }

      // Filter by Subject
      if (filters.subject && filters.subject !== "all") {
        if (q.subject !== filters.subject) return false;
      }

      // Filter by Difficulty
      if (filters.difficulty && filters.difficulty !== "all") {
        if (q.difficulty !== filters.difficulty) return false;
      }

      // Filter by Search Query
      if (filters.searchQuery && filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inTopic = q.topic && q.topic.toLowerCase().includes(query);
        const inExam = q.examName && q.examName.toLowerCase().includes(query);
        const inYear = q.examYear && q.examYear.includes(query);
        const inSubject = q.subject && q.subject.toLowerCase().includes(query);
        if (!inQuestion && !inTopic && !inExam && !inYear && !inSubject) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sort === "oldest") {
        return (parseInt(a.examYear) || 2020) - (parseInt(b.examYear) || 2020);
      }
      // default: latest first
      return (parseInt(b.examYear) || 2024) - (parseInt(a.examYear) || 2024);
    });
  }

  // 1. Exam-wise PYQ Mode
  getExamWisePYQs(examName, count = 15) {
    const filtered = this.getFilteredPYQs({ exam: examName });
    return this.shuffle(filtered).slice(0, count);
  }

  // 2. Year-wise PYQ Mode
  getYearWisePYQs(year, count = 15) {
    const filtered = this.getFilteredPYQs({ year: year });
    return this.shuffle(filtered).slice(0, count);
  }

  // 3. Subject-wise PYQ Mode
  getSubjectWisePYQs(subject, count = 15) {
    const filtered = this.getFilteredPYQs({ subject: subject });
    return this.shuffle(filtered).slice(0, count);
  }

  // 4. Mixed PYQ Mode
  getMixedPYQs(count = 15) {
    const allPYQs = this.getFilteredPYQs();
    return this.shuffle(allPYQs).slice(0, count);
  }

  // 5. Full PYQ Mock Test Mode
  getFullPYQMockTest(examName = "SSC CGL", count = 20) {
    let pool = this.getFilteredPYQs({ exam: examName });
    if (pool.length < count) {
      // supplement with other verified PYQs
      const others = this.getFilteredPYQs().filter(q => !pool.includes(q));
      pool = [...pool, ...others];
    }
    return this.shuffle(pool).slice(0, count);
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

export const pyqManager = new PYQHubManager();

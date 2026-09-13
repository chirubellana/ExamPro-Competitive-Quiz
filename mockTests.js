/**
 * ExamPro Mock Test Blueprints
 * Real-world competitive exam simulations with sections, scoring patterns, negative marking, and timer settings.
 */

export const MOCK_TESTS = [
  {
    id: "mock_ssc_cgl_01",
    title: "SSC CGL 2024 Tier-1 All India Live Mock Test",
    examCategory: "SSC",
    examName: "SSC CGL",
    badge: "🔥 High Competition",
    durationMinutes: 30, // 30 mins demo / accelerated mode
    totalQuestions: 20,
    marksPerQuestion: 2.0,
    negativeMarking: 0.50,
    description: "Exact exam pattern of SSC CGL Tier 1 featuring General Intelligence, Quantitative Aptitude, English Comprehension, and General Awareness.",
    sections: [
      { id: "sec_gi", name: "General Intelligence & Reasoning", count: 5, subjects: ["Reasoning"] },
      { id: "sec_ga", name: "General Awareness & Static GK", count: 5, subjects: ["Indian Polity", "Indian History", "General Science", "Geography", "Current Affairs"] },
      { id: "sec_qa", name: "Quantitative Aptitude", count: 5, subjects: ["Mathematics"] },
      { id: "sec_en", name: "English Comprehension", count: 5, subjects: ["English"] }
    ],
    instructions: [
      "The test consists of 4 sections with 5 questions each (Total 20 questions).",
      "Each correct response awards +2.0 marks.",
      "Each incorrect response incurs a penalty of -0.50 marks.",
      "You can switch between sections at any time using the section tabs.",
      "Use the Question Palette on the right to navigate between questions.",
      "Test will auto-submit when the countdown reaches 00:00."
    ]
  },
  {
    id: "mock_banking_po_01",
    title: "SBI / IBPS PO Prelims Speed Mock Test",
    examCategory: "Banking",
    examName: "IBPS PO / SBI PO",
    badge: "⚡ Speed & Accuracy",
    durationMinutes: 20,
    totalQuestions: 15,
    marksPerQuestion: 1.0,
    negativeMarking: 0.25,
    description: "Rigorous banking prelims standard test focusing on high-speed mental math, seating arrangements, syllogisms, and error spotting.",
    sections: [
      { id: "sec_bank_rs", name: "Reasoning Ability", count: 5, subjects: ["Reasoning"] },
      { id: "sec_bank_qa", name: "Quantitative Aptitude", count: 5, subjects: ["Mathematics"] },
      { id: "sec_bank_en", name: "English Language", count: 5, subjects: ["English"] }
    ],
    instructions: [
      "Total 15 Questions across 3 sections.",
      "+1.0 Mark for each correct answer; -0.25 negative marking for wrong answers.",
      "Mark questions for review if in doubt.",
      "Ensure fast calculation speed."
    ]
  },
  {
    id: "mock_rrb_ntpc_01",
    title: "RRB NTPC CBT-1 Mega Practice Mock",
    examCategory: "Railway",
    examName: "RRB NTPC",
    badge: "🚆 Railway Special",
    durationMinutes: 25,
    totalQuestions: 18,
    marksPerQuestion: 1.0,
    negativeMarking: 0.33,
    description: "Designed strictly as per Railway Recruitment Board standard with high weightage on General Science, Indian History, and Quantitative Aptitude.",
    sections: [
      { id: "sec_rrb_ga", name: "General Awareness & Science", count: 8, subjects: ["General Science", "Indian History", "Geography", "Computer Awareness", "Current Affairs"] },
      { id: "sec_rrb_math", name: "Mathematics", count: 5, subjects: ["Mathematics"] },
      { id: "sec_rrb_gi", name: "General Intelligence & Reasoning", count: 5, subjects: ["Reasoning"] }
    ],
    instructions: [
      "18 Questions covering General Science, Railway GK, Math, and Reasoning.",
      "+1.0 Mark for correct answer; -0.33 Marks for incorrect answer.",
      "No penalty for unattempted questions."
    ]
  },
  {
    id: "mock_upsc_csat_01",
    title: "UPSC CSE Prelims GS & CSAT Mini Mock",
    examCategory: "UPSC",
    examName: "UPSC CSE",
    badge: "🇮🇳 Conceptual & Analytical",
    durationMinutes: 30,
    totalQuestions: 15,
    marksPerQuestion: 2.0,
    negativeMarking: 0.66,
    description: "In-depth analytical test covering Indian Polity, Economics, Geography, Modern History, and CSAT Quantitative Reasoning.",
    sections: [
      { id: "sec_upsc_gs", name: "General Studies Paper-I", count: 10, subjects: ["Indian Polity", "Economics", "Geography", "Indian History", "General Science"] },
      { id: "sec_upsc_csat", name: "CSAT Aptitude & Logic", count: 5, subjects: ["Mathematics", "Reasoning"] }
    ],
    instructions: [
      "Questions require critical multi-statement reasoning and conceptual clarity.",
      "+2.0 Marks for correct; -0.66 Marks for incorrect.",
      "Eliminate extreme choices carefully."
    ]
  },
  {
    id: "mock_state_psc_01",
    title: "APPSC / TSPSC Group Services Screening Mock",
    examCategory: "APPSC",
    examName: "State PSC",
    badge: "📜 State Services",
    durationMinutes: 20,
    totalQuestions: 14,
    marksPerQuestion: 1.0,
    negativeMarking: 0.33,
    description: "Targeted practice for Andhra Pradesh and Telangana state PSC competitive examinations with high focus on Polity and Geography.",
    sections: [
      { id: "sec_psc_gs", name: "General Studies & Constitution", count: 10, subjects: ["Indian Polity", "Indian History", "Geography", "Economics"] },
      { id: "sec_psc_mental", name: "Mental Ability", count: 4, subjects: ["Mathematics", "Reasoning"] }
    ],
    instructions: [
      "14 Questions formatted for State PSC Screening.",
      "+1.0 Mark for correct; -0.33 Marks for incorrect."
    ]
  }
];

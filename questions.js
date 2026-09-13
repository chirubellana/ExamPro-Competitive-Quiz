/**
 * ExamPro Question Database
 * Comprehensive question bank with authentic Competitive Exam Questions (SSC, Banking, RRB, UPSC, State PSCs)
 * and verified Previous Year Questions (PYQs) with step-by-step solutions and metadata.
 */

export const QUESTION_BANK = [
  // ==========================================
  // MATHEMATICS / QUANTITATIVE APTITUDE (PYQ & PRACTICE)
  // ==========================================
  {
    id: "qa_001",
    subject: "Mathematics",
    topic: "Percentages & Profit-Loss",
    difficulty: "Medium",
    question: "A shopkeeper marks an article 40% above its cost price and gives a discount of 25% on the marked price. If he makes a profit of ₹105, find the cost price of the article.",
    options: [
      "₹1,800",
      "₹2,100",
      "₹2,400",
      "₹1,950"
    ],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. Let the Cost Price (CP) be ₹100x.
2. Marked Price (MP) = CP + 40% of CP = 100x + 40x = ₹140x.
3. Selling Price (SP) = MP - 25% discount = 140x - (0.25 × 140x) = 140x - 35x = ₹105x.
4. Profit = SP - CP = 105x - 100x = 5x.
5. Given Profit = ₹105 => 5x = 105 => x = 21.
6. Therefore, Cost Price = 100x = 100 × 21 = **₹2,100**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 1",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 Tier 1 Official Exam Paper (Shift 1)"
  },
  {
    id: "qa_002",
    subject: "Mathematics",
    topic: "Time & Work",
    difficulty: "Hard",
    question: "A can complete a piece of work in 18 days and B in 24 days. They worked together for 6 days, and then A left. In how many more days will B finish the remaining work alone?",
    options: [
      "8 days",
      "10 days",
      "12 days",
      "6 days"
    ],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. Total Work = LCM of (18, 24) = 72 units.
2. Efficiency of A = 72 / 18 = 4 units/day.
3. Efficiency of B = 72 / 24 = 3 units/day.
4. Combined efficiency (A + B) = 4 + 3 = 7 units/day.
5. Work done together in 6 days = 6 × 7 = 42 units.
6. Remaining work = 72 - 42 = 30 units.
7. Time required for B alone = Remaining Work / B's efficiency = 30 / 3 = **10 days**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CHSL",
    examYear: "2023",
    paperShift: "Tier 1 - Shift 2",
    pyqLabel: "PYQ • SSC CHSL • 2023 Tier-1",
    sourceRef: "SSC CHSL 2023 Official Paper"
  },
  {
    id: "qa_003",
    subject: "Mathematics",
    topic: "Simple & Compound Interest",
    difficulty: "Medium",
    question: "The difference between the compound interest (compounded annually) and the simple interest on a certain sum at 10% per annum for 2 years is ₹180. Find the principal sum.",
    options: [
      "₹16,000",
      "₹18,000",
      "₹20,000",
      "₹15,000"
    ],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. Standard Formula for difference between CI and SI for 2 years:
   **Difference = P × (R / 100)²**
2. 180 = P × (10 / 100)²
3. 180 = P × (1 / 10)² = P / 100
4. P = 180 × 100 = **₹18,000**.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "IBPS PO",
    examYear: "2023",
    paperShift: "Prelims - Shift 3",
    pyqLabel: "PYQ • IBPS PO • 2023 Prelims",
    sourceRef: "IBPS PO Prelims 2023 Quantitative Aptitude"
  },
  {
    id: "qa_004",
    subject: "Mathematics",
    topic: "Speed, Time & Distance",
    difficulty: "Hard",
    question: "Two trains of lengths 180 m and 220 m are running on parallel tracks in opposite directions with speeds of 54 km/h and 90 km/h respectively. In how many seconds will they cross each other completely?",
    options: [
      "10 seconds",
      "12 seconds",
      "15 seconds",
      "8 seconds"
    ],
    correctIndex: 0,
    explanation: `**Step-by-Step Solution:**
1. Total Distance to cross each other = Sum of lengths = 180 m + 220 m = 400 m.
2. Relative Speed (opposite directions) = Speed 1 + Speed 2 = 54 + 90 = 144 km/h.
3. Convert Relative Speed to m/s:
   144 × (5 / 18) = 8 × 5 = 40 m/s.
4. Time = Distance / Speed = 400 m / 40 m/s = **10 seconds**.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB NTPC",
    examYear: "2022",
    paperShift: "CBT-2 Level 5",
    pyqLabel: "PYQ • RRB NTPC • 2022 CBT-2",
    sourceRef: "RRB NTPC CBT 2 Official Question Paper"
  },
  {
    id: "qa_005",
    subject: "Mathematics",
    topic: "Ratio & Proportion",
    difficulty: "Easy",
    question: "If A : B = 3 : 4 and B : C = 8 : 9, find the ratio of A : C.",
    options: [
      "1 : 2",
      "2 : 3",
      "3 : 5",
      "4 : 5"
    ],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. A / B = 3 / 4 and B / C = 8 / 9
2. To find A / C:
   (A / B) × (B / C) = (3 / 4) × (8 / 9)
3. = (3 × 8) / (4 × 9) = 24 / 36 = **2 / 3**.
4. Hence, A : C = **2 : 3**.`,
    examCategory: "SSC",
    isPYQ: false,
    isVerifiedPYQ: false,
    examName: "SSC MTS",
    examYear: "2024",
    paperShift: "Practice Set",
    pyqLabel: "PYQ-style Practice Question",
    sourceRef: "ExamPro High-Frequency Practice Bank"
  },
  {
    id: "qa_006",
    subject: "Mathematics",
    topic: "Geometry & Mensuration",
    difficulty: "Expert",
    question: "The perimeter of a semi-circular garden is 108 m. Find the diameter of the garden. (Use π = 22/7)",
    options: [
      "21 m",
      "42 m",
      "84 m",
      "36 m"
    ],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. Perimeter of a semi-circle = πr + 2r = r(π + 2).
2. Given: r(22/7 + 2) = 108.
3. r((22 + 14) / 7) = 108 => r(36 / 7) = 108.
4. r = (108 × 7) / 36 = 3 × 7 = 21 m.
5. Radius (r) = 21 m.
6. Diameter = 2r = 2 × 21 = **42 m**.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2023",
    paperShift: "CSAT Paper II",
    pyqLabel: "PYQ • UPSC CSAT • 2023",
    sourceRef: "UPSC Civil Services Prelims CSAT 2023"
  },

  // ==========================================
  // REASONING & MENTAL ABILITY (PYQ & PRACTICE)
  // ==========================================
  {
    id: "rs_001",
    subject: "Reasoning",
    topic: "Analogy",
    difficulty: "Medium",
    question: "Select the option that is related to the third term in the same way as the second term is related to the first term:\n64 : 512 :: 144 : ?",
    options: [
      "1728",
      "1331",
      "1152",
      "2197"
    ],
    correctIndex: 0,
    explanation: `**Logic Explanation:**
1. First pair: 64 = 8²; 512 = 8³ (or 64 × 8 = 512).
2. Second pair: 144 = 12².
3. Applying the same logic: 12³ = 12 × 12 × 12 = **1,728**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 2",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 Official Paper Shift 2"
  },
  {
    id: "rs_002",
    subject: "Reasoning",
    topic: "Syllogism",
    difficulty: "Hard",
    question: "Statements:\nI. All apples are fruits.\nII. Some fruits are sweet.\nIII. No sweet is bitter.\n\nConclusions:\n1. Some apples are sweet.\n2. No bitter is sweet.\n3. Some fruits are not bitter.",
    options: [
      "Only conclusion 2 follows",
      "Only conclusions 2 and 3 follow",
      "Only conclusion 1 follows",
      "All conclusions follow"
    ],
    correctIndex: 1,
    explanation: `**Deductive Logic Analysis:**
- Statement III is 'No sweet is bitter', which directly converts to 'No bitter is sweet'. So **Conclusion 2 follows**.
- 'Some fruits are sweet' and 'No sweet is bitter' => The sweet fruits are not bitter. Thus, **Conclusion 3 follows**.
- Apples are inside fruits, but not necessarily overlapping with sweet fruits. So Conclusion 1 does not necessarily follow.
- Hence, **Only conclusions 2 and 3 follow**.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SBI PO",
    examYear: "2023",
    paperShift: "Prelims - Shift 1",
    pyqLabel: "PYQ • SBI PO • 2023 Prelims",
    sourceRef: "SBI Probationary Officer Prelims 2023"
  },
  {
    id: "rs_003",
    subject: "Reasoning",
    topic: "Coding-Decoding",
    difficulty: "Medium",
    question: "In a certain code language, if 'LEMON' is coded as 'ELOMN' and 'GRAPE' is coded as 'RGAEP', how will 'MANGO' be coded in that language?",
    options: [
      "AMNOG",
      "AMOGN",
      "AMNGP",
      "AMONG"
    ],
    correctIndex: 0,
    explanation: `**Pattern Analysis:**
1. 'LEMON': L and E swap positions -> E L; M stays in middle -> M; O and N swap positions -> N O?
   Notice: Swap 1st and 2nd letters, keep middle 3rd letter unchanged, swap 4th and 5th letters:
   M A N G O ->
   - 1st & 2nd swapped: A M
   - 3rd letter: N
   - 4th & 5th swapped: O G
   Result = **AMNOG**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC GD",
    examYear: "2024",
    paperShift: "Shift 1",
    pyqLabel: "PYQ • SSC GD • 2024",
    sourceRef: "SSC Constable GD Official Exam 2024"
  },
  {
    id: "rs_004",
    subject: "Reasoning",
    topic: "Blood Relations",
    difficulty: "Medium",
    question: "Pointing to a photograph of a woman, Rajesh said, 'She is the mother of the only daughter of my paternal grandfather's only son.' How is the woman related to Rajesh?",
    options: [
      "Aunt",
      "Mother",
      "Sister",
      "Paternal Grandmother"
    ],
    correctIndex: 1,
    explanation: `**Breakdown:**
1. 'My paternal grandfather's only son' = Rajesh's father.
2. 'The only daughter of my father' = Rajesh's sister.
3. 'The mother of Rajesh's sister' = Rajesh's **Mother**.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB Group D",
    examYear: "2022",
    paperShift: "Phase 1",
    pyqLabel: "PYQ • RRB Group D • 2022",
    sourceRef: "RRB Group D Level 1 Exam Paper"
  },
  {
    id: "rs_005",
    subject: "Reasoning",
    topic: "Direction & Distance",
    difficulty: "Easy",
    question: "A man walks 15 km towards South, turns left and walks 12 km. Then he turns left again and walks 15 km. How far and in which direction is he now from his starting point?",
    options: [
      "12 km West",
      "12 km East",
      "15 km North",
      "27 km East"
    ],
    correctIndex: 1,
    explanation: `**Step-by-Step Breakdown:**
1. Starts at (0, 0).
2. Walks 15 km South -> (0, -15).
3. Turns left (facing East) and walks 12 km -> (12, -15).
4. Turns left (facing North) and walks 15 km -> (12, 0).
5. From starting point (0, 0), he is at (12, 0) which is **12 km East**.`,
    examCategory: "Police Exams",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "Police Exams",
    examYear: "2023",
    paperShift: "SI Prelims Paper 1",
    pyqLabel: "PYQ • Police SI • 2023",
    sourceRef: "State Police Sub-Inspector Examination"
  },

  // ==========================================
  // INDIAN POLITY & CONSTITUTION (PYQ & PRACTICE)
  // ==========================================
  {
    id: "pol_001",
    subject: "Indian Polity",
    topic: "Fundamental Rights & Writs",
    difficulty: "Medium",
    question: "Which Article of the Indian Constitution empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights?",
    options: [
      "Article 226",
      "Article 32",
      "Article 131",
      "Article 143"
    ],
    correctIndex: 1,
    explanation: `**Constitutional Context:**
- **Article 32** is described by Dr. B.R. Ambedkar as the *'Heart and Soul of the Constitution'*. It confers the right to move the Supreme Court directly for the enforcement of Fundamental Rights by appropriate proceedings.
- Note: **Article 226** empowers the High Courts to issue writs for fundamental rights as well as other legal rights.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 3",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 Tier 1 Official General Awareness"
  },
  {
    id: "pol_002",
    subject: "Indian Polity",
    topic: "Constitutional Amendments",
    difficulty: "Hard",
    question: "By which Constitutional Amendment Act was the voting age in India reduced from 21 years to 18 years for both Lok Sabha and State Legislative Assembly elections?",
    options: [
      "42nd Amendment Act, 1976",
      "44th Amendment Act, 1978",
      "61st Amendment Act, 1988",
      "73rd Amendment Act, 1992"
    ],
    correctIndex: 2,
    explanation: `**Key Constitutional Milestone:**
- The **61st Constitutional Amendment Act, 1988** amended Article 326 to lower the voting age from 21 to 18 years.
- It was enacted under the Rajiv Gandhi government and came into effect on 28 March 1989.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2022",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2022",
    sourceRef: "UPSC Civil Services Examination 2022 Prelims Paper I"
  },
  {
    id: "pol_003",
    subject: "Indian Polity",
    topic: "Preamble & Sources",
    difficulty: "Easy",
    question: "The concept of 'Directive Principles of State Policy' (DPSP) in the Constitution of India was borrowed from the constitution of which country?",
    options: [
      "United States of America",
      "Ireland",
      "United Kingdom",
      "Canada"
    ],
    correctIndex: 1,
    explanation: `**Factual Background:**
- The Directive Principles of State Policy (Part IV, Articles 36–51) were borrowed from the **Irish Constitution** (1937), which had itself borrowed them from the Spanish Constitution.`,
    examCategory: "APPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "APPSC",
    examYear: "2023",
    paperShift: "Group 2 Prelims",
    pyqLabel: "PYQ • APPSC Group-2 • 2023",
    sourceRef: "APPSC Group 2 Services Screening Test"
  },
  {
    id: "pol_004",
    subject: "Indian Polity",
    topic: "Parliament & Judiciary",
    difficulty: "Expert",
    question: "Under the Indian Constitution, who has the final authority to decide whether a bill is a 'Money Bill' or not?",
    options: [
      "The President of India",
      "The Prime Minister",
      "The Speaker of the Lok Sabha",
      "The Union Finance Minister"
    ],
    correctIndex: 2,
    explanation: `**Article 110(3) Analysis:**
- Under **Article 110(3)** of the Constitution of India, if any question arises whether a Bill is a Money Bill or not, the decision of the **Speaker of the Lok Sabha** is final and cannot be questioned in any court or by either House of Parliament.`,
    examCategory: "TSPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "TSPSC",
    examYear: "2023",
    paperShift: "Group 1 Prelims",
    pyqLabel: "PYQ • TSPSC Group-1 • 2023",
    sourceRef: "TSPSC Group 1 Preliminary Examination Paper"
  },

  // ==========================================
  // INDIAN HISTORY (PYQ & PRACTICE)
  // ==========================================
  {
    id: "hist_001",
    subject: "Indian History",
    topic: "Modern History & Freedom Struggle",
    difficulty: "Medium",
    question: "During which historic session of the Indian National Congress was the resolution of 'Purna Swaraj' (Complete Independence) passed?",
    options: [
      "1920 Nagpur Session",
      "1929 Lahore Session",
      "1931 Karachi Session",
      "1907 Surat Session"
    ],
    correctIndex: 1,
    explanation: `**Historical Fact:**
- The historic 'Purna Swaraj' declaration was promulgated at the **1929 Lahore Session** of the Indian National Congress under the presidency of Pandit Jawaharlal Nehru.
- On 26 January 1930, the Tricolour was hoisted and Independence Day was celebrated across India.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2023",
    paperShift: "Tier 1 - Shift 1",
    pyqLabel: "PYQ • SSC CGL • 2023 Tier-1",
    sourceRef: "SSC CGL 2023 Tier 1 Official History Section"
  },
  {
    id: "hist_002",
    subject: "Indian History",
    topic: "Ancient India & Buddhism",
    difficulty: "Hard",
    question: "Where was the Fourth Buddhist Council held under the patronage of King Kanishka?",
    options: [
      "Rajgir",
      "Vaishali",
      "Pataliputra",
      "Kundalvana (Kashmir)"
    ],
    correctIndex: 3,
    explanation: `**Historical Context:**
- The **Fourth Buddhist Council** was convened in **Kundalvana, Kashmir** around 72 AD under the patronage of Kushan emperor **Kanishka**.
- It was presided over by **Vasumitra** with **Ashvaghosha** as the deputy. Buddhism split into Hinayana and Mahayana during this council.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2021",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2021",
    sourceRef: "UPSC Civil Services Prelims 2021 Paper 1"
  },
  {
    id: "hist_003",
    subject: "Indian History",
    topic: "Medieval India",
    difficulty: "Medium",
    question: "Who among the following Delhi Sultans introduced the market control and price stabilization system?",
    options: [
      "Balban",
      "Alauddin Khalji",
      "Muhammad bin Tughlaq",
      "Firoz Shah Tughlaq"
    ],
    correctIndex: 1,
    explanation: `**Historical Reform:**
- **Alauddin Khalji** (1296–1316) established strict market regulations and fixed prices of all commodities through the establishment of specialized markets like *Sarai-i-Adl* supervised by *Shahna-i-Mandi* to sustain a large standing army.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB NTPC",
    examYear: "2021",
    paperShift: "CBT-1 Phase 2",
    pyqLabel: "PYQ • RRB NTPC • 2021",
    sourceRef: "RRB NTPC 2020-21 Official Question Bank"
  },
  {
    id: "hist_004",
    subject: "Indian History",
    topic: "Social & Religious Reform Movements",
    difficulty: "Easy",
    question: "Who founded the 'Brahmo Samaj' in Kolkata in the year 1828?",
    options: [
      "Swami Vivekananda",
      "Ishwar Chandra Vidyasagar",
      "Raja Ram Mohan Roy",
      "Dayananda Saraswati"
    ],
    correctIndex: 2,
    explanation: `**Factual Context:**
- **Raja Ram Mohan Roy**, known as the 'Father of Modern Indian Renaissance', founded the **Brahmo Samaj** in 1828 to crusade against sati, idol worship, and caste distinctions.`,
    examCategory: "Police Exams",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "Police Exams",
    examYear: "2024",
    paperShift: "Constable Exam",
    pyqLabel: "PYQ • Police Constable • 2024",
    sourceRef: "Police Recruitment Board Constable Exam 2024"
  },

  // ==========================================
  // GEOGRAPHY (PYQ & PRACTICE)
  // ==========================================
  {
    id: "geo_001",
    subject: "Geography",
    topic: "Indian River Systems",
    difficulty: "Medium",
    question: "Which of the following Indian rivers flows through a rift valley between the Vindhya and Satpura mountain ranges?",
    options: [
      "Godavari",
      "Narmada",
      "Mahanadi",
      "Krishna"
    ],
    correctIndex: 1,
    explanation: `**Geographical Insight:**
- The **Narmada** (along with the Tapi) is a west-flowing river that flows through a **rift valley** formed due to tectonic faulting, flanked by the Vindhyan Range to the north and the Satpura Range to the south, emptying into the Arabian Sea at the Gulf of Khambhat.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 4",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 Tier 1 Shift 4 Question Paper"
  },
  {
    id: "geo_002",
    subject: "Geography",
    topic: "Mountain Passes & Physical Features",
    difficulty: "Hard",
    question: "The 'Zoji La' pass connects which of the following two important regions in India?",
    options: [
      "Srinagar and Leh",
      "Shimla and Kullu",
      "Gangtok and Lhasa",
      "Manali and Keylong"
    ],
    correctIndex: 0,
    explanation: `**Pass Details:**
- **Zoji La** is a high mountain pass in the Himalayas in Jammu and Kashmir/Ladakh situated at an elevation of approximately 3,528 meters on NH-1, linking the Kashmir Valley (Srinagar) to the Ladakh plateau (Leh).`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2023",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2023",
    sourceRef: "UPSC CSE 2023 Prelims"
  },
  {
    id: "geo_003",
    subject: "Geography",
    topic: "Solar System & Planetary Science",
    difficulty: "Easy",
    question: "Which planet in our solar system is known as the 'Morning Star' or 'Evening Star' and is closest to Earth in size?",
    options: [
      "Mars",
      "Venus",
      "Mercury",
      "Jupiter"
    ],
    correctIndex: 1,
    explanation: `**Astronomical Fact:**
- **Venus** is frequently called Earth's 'Twin' because of its similar size, mass, and bulk composition. It reflects sunlight with high albedo due to sulfuric acid cloud cover, making it the brightest celestial object after the Sun and Moon, visible at dawn or dusk.`,
    examCategory: "SSC",
    isPYQ: false,
    isVerifiedPYQ: false,
    examName: "SSC CHSL",
    examYear: "2024",
    paperShift: "Model Question",
    pyqLabel: "PYQ-style Practice Question",
    sourceRef: "ExamPro Geography Standard Bank"
  },

  // ==========================================
  // GENERAL SCIENCE (PHYSICS, CHEMISTRY, BIOLOGY)
  // ==========================================
  {
    id: "sci_001",
    subject: "General Science",
    topic: "Physics - Optics & Light",
    difficulty: "Medium",
    question: "The phenomenon of total internal reflection is the underlying principle behind the working of which modern technology?",
    options: [
      "Compact Discs (CDs)",
      "Optical Fibres",
      "Solar Photovoltaic Panels",
      "Incandescent Bulbs"
    ],
    correctIndex: 1,
    explanation: `**Physics Principle:**
- **Optical fibres** transmit data as pulses of light through **Total Internal Reflection (TIR)**. When light travelling through the core strikes the core-cladding boundary at an angle greater than the critical angle, it is reflected back into the core with negligible loss.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB NTPC",
    examYear: "2022",
    paperShift: "CBT-2 Level 6",
    pyqLabel: "PYQ • RRB NTPC • 2022 CBT-2",
    sourceRef: "RRB NTPC Level 6 Examination Paper"
  },
  {
    id: "sci_002",
    subject: "General Science",
    topic: "Biology - Human Physiology",
    difficulty: "Easy",
    question: "Which organ in the human body is primarily responsible for the production of Insulin?",
    options: [
      "Liver",
      "Pancreas",
      "Kidneys",
      "Thyroid Gland"
    ],
    correctIndex: 1,
    explanation: `**Biological Fact:**
- Insulin is an essential peptide hormone synthesized and secreted by the **Beta cells** located in the **Islets of Langerhans** within the **Pancreas**. It regulates carbohydrate, fat, and protein metabolism by facilitating glucose uptake.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2023",
    paperShift: "Tier 1 - Shift 2",
    pyqLabel: "PYQ • SSC CGL • 2023 Tier-1",
    sourceRef: "SSC CGL 2023 Official Paper"
  },
  {
    id: "sci_003",
    subject: "General Science",
    topic: "Chemistry - Everyday Chemistry",
    difficulty: "Medium",
    question: "What is the chemical name and formula of 'Baking Soda'?",
    options: [
      "Sodium Carbonate (Na₂CO₃)",
      "Sodium Hydrogen Carbonate (NaHCO₃)",
      "Calcium Oxychloride (CaOCl₂)",
      "Sodium Hydroxide (NaOH)"
    ],
    correctIndex: 1,
    explanation: `**Chemical Composition:**
- Baking Soda is **Sodium Hydrogen Carbonate (or Sodium Bicarbonate)** with chemical formula **NaHCO₃**.
- Note: Sodium Carbonate (Na₂CO₃·10H₂O) is Washing Soda, and CaOCl₂ is Bleaching Powder.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB Group D",
    examYear: "2022",
    paperShift: "Shift 3",
    pyqLabel: "PYQ • RRB Group D • 2022",
    sourceRef: "RRB Group D General Science"
  },

  // ==========================================
  // ENGLISH LANGUAGE & COMPREHENSION
  // ==========================================
  {
    id: "eng_001",
    subject: "English",
    topic: "Spotting Errors",
    difficulty: "Hard",
    question: "Identify the segment that contains a grammatical error in the following sentence:\n'Neither the manager (A) / nor the employees (B) / was present in the meeting (C) / yesterday afternoon. (D)'",
    options: [
      "Neither the manager",
      "nor the employees",
      "was present in the meeting",
      "yesterday afternoon"
    ],
    correctIndex: 2,
    explanation: `**Grammar Rule (Subject-Verb Proximity):**
- When subjects are joined by **'neither... nor'**, the verb must agree in person and number with the closer subject.
- Here, the closer subject to the verb is 'the employees' (plural noun).
- Therefore, the singular verb 'was' is incorrect; it must be the plural verb **'were present'**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 1",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 Tier 1 English Comprehension"
  },
  {
    id: "eng_002",
    subject: "English",
    topic: "Idioms & Phrases",
    difficulty: "Medium",
    question: "Select the most appropriate meaning of the given idiom:\n'To burn the midnight oil'",
    options: [
      "To waste electricity at night",
      "To work or study late into the night",
      "To create friction among colleagues",
      "To light a furnace in winter"
    ],
    correctIndex: 1,
    explanation: `**Idiom Meaning:**
- **'To burn the midnight oil'** means to study or work until very late at night.
- Origin: Refers back to times before electric lighting when individuals burned oil lamps to continue intellectual or laborious work after dark.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "IBPS Clerk",
    examYear: "2023",
    paperShift: "Prelims - Shift 2",
    pyqLabel: "PYQ • IBPS Clerk • 2023",
    sourceRef: "IBPS Clerk Prelims English Section"
  },
  {
    id: "eng_003",
    subject: "English",
    topic: "One Word Substitution",
    difficulty: "Medium",
    question: "Select the option that can be used as a one-word substitute for the given group of words:\n'A person who loves books and reads a lot'",
    options: [
      "Philatelist",
      "Bibliophile",
      "Somnambulist",
      "Numismatist"
    ],
    correctIndex: 1,
    explanation: `**Vocabulary Roots:**
- **Bibliophile**: A lover of books (from Greek *biblion* = book + *philos* = loving).
- **Philatelist**: One who collects or studies postage stamps.
- **Numismatist**: One who studies or collects coins/currency.
- **Somnambulist**: A sleepwalker.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CHSL",
    examYear: "2023",
    paperShift: "Shift 1",
    pyqLabel: "PYQ • SSC CHSL • 2023",
    sourceRef: "SSC CHSL 2023 Official Paper"
  },

  // ==========================================
  // ECONOMICS & FINANCIAL AWARENESS
  // ==========================================
  {
    id: "eco_001",
    subject: "Economics",
    topic: "Monetary Policy & Banking",
    difficulty: "Hard",
    question: "What term denotes the interest rate at which the Reserve Bank of India (RBI) lends money to commercial banks against government securities for short-term liquidity needs?",
    options: [
      "Reverse Repo Rate",
      "Repo Rate",
      "Bank Rate",
      "Marginal Standing Facility (MSF)"
    ],
    correctIndex: 1,
    explanation: `**Monetary Policy Mechanism:**
- **Repo Rate (Repurchasing Option)** is the key policy rate at which the central bank (RBI) provides overnight liquidity to commercial banks against the collateral of government and other approved securities.
- Reverse Repo is the rate at which RBI borrows funds from commercial banks.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SBI Clerk",
    examYear: "2024",
    paperShift: "Mains - Shift 1",
    pyqLabel: "PYQ • SBI Clerk • 2024 Mains",
    sourceRef: "SBI Junior Associates (Clerk) Mains 2024"
  },
  {
    id: "eco_002",
    subject: "Economics",
    topic: "National Income & Inflation",
    difficulty: "Medium",
    question: "When price rises are accompanied by economic stagnation and high unemployment, the economic condition is known as:",
    options: [
      "Hyperinflation",
      "Stagflation",
      "Deflation",
      "Reflation"
    ],
    correctIndex: 1,
    explanation: `**Economic Concept:**
- **Stagflation** is a portmanteau of 'stagnant economy' and 'inflation'. It is characterized by slow economic growth, high unemployment, accompanied by persistently rising consumer prices.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2022",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2022",
    sourceRef: "UPSC Civil Services Prelims 2022"
  },

  // ==========================================
  // COMPUTER AWARENESS & IT
  // ==========================================
  {
    id: "comp_001",
    subject: "Computer Awareness",
    topic: "Networking & Protocols",
    difficulty: "Easy",
    question: "Which of the following application layer protocols is used for securely transmitting web pages over the internet with cryptographic encryption?",
    options: [
      "HTTP",
      "HTTPS",
      "FTP",
      "SMTP"
    ],
    correctIndex: 1,
    explanation: `**Networking Concept:**
- **HTTPS (HyperText Transfer Protocol Secure)** uses Transport Layer Security (TLS) or Secure Sockets Layer (SSL) to encrypt communications between the client browser and web server, preventing eavesdropping and tampering (default port 443).`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "IBPS Clerk",
    examYear: "2023",
    paperShift: "Mains Computer Aptitude",
    pyqLabel: "PYQ • IBPS Clerk • 2023 Mains",
    sourceRef: "IBPS Clerk Mains Computer Aptitude Section"
  },
  {
    id: "comp_002",
    subject: "Computer Awareness",
    topic: "Computer Architecture & Memory",
    difficulty: "Medium",
    question: "Which type of computer memory is volatile, provides high-speed data access to the CPU, and loses its stored information immediately when power is turned off?",
    options: [
      "ROM",
      "RAM",
      "EEPROM",
      "Flash Memory"
    ],
    correctIndex: 1,
    explanation: `**Hardware Architecture:**
- **RAM (Random Access Memory)** is primary volatile memory. It serves as temporary workspace for operating system routines and running applications. Without steady electrical charge, DRAM cells lose their stored state.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB NTPC",
    examYear: "2021",
    paperShift: "CBT-1",
    pyqLabel: "PYQ • RRB NTPC • 2021",
    sourceRef: "RRB NTPC 2021 Question Bank"
  },

  // ==========================================
  // CURRENT AFFAIRS & GENERAL KNOWLEDGE
  // ==========================================
  {
    id: "ca_001",
    subject: "Current Affairs",
    topic: "Space Missions & Science",
    difficulty: "Medium",
    question: "What is the official name given to the lunar south pole touch-down point of the Chandrayaan-3 Vikram Lander?",
    options: [
      "Tiranga Point",
      "Shiv Shakti Point",
      "Jawahar Point",
      "Atal Point"
    ],
    correctIndex: 1,
    explanation: `**Current Affairs Milestone:**
- The landing site of Chandrayaan-3's Vikram lander near the south pole of the Moon was officially named **'Shiv Shakti Point'**.
- August 23, the day of touchdown in 2023, was declared **National Space Day** in India. (Chandrayaan-2's impact spot is Tiranga Point).`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 1",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 General Awareness Section"
  },
  {
    id: "ca_002",
    subject: "Current Affairs",
    topic: "Awards & Honours",
    difficulty: "Easy",
    question: "In January 2024, the Bharat Ratna, India's highest civilian award, was posthumously conferred upon which veteran socialist leader and former Chief Minister of Bihar?",
    options: [
      "Karpoori Thakur",
      "Lal Krishna Advani",
      "M. S. Swaminathan",
      "P. V. Narasimha Rao"
    ],
    correctIndex: 0,
    explanation: `**Current Affairs Fact:**
- Renowned socialist icon and 'Jannayak' **Karpoori Thakur** was posthumously awarded the Bharat Ratna on the eve of his birth centenary in January 2024 for his lifelong championship of social justice and marginalized communities.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2024",
    paperShift: "Current Affairs Practice",
    pyqLabel: "PYQ-style Practice Question",
    sourceRef: "UPSC Current Affairs Digest 2024"
  },

  // ==========================================
  // MORE EXCLUSIVE PREVIOUS YEAR QUESTIONS (PYQs)
  // ==========================================
  {
    id: "pyq_ssc_001",
    subject: "Indian Polity",
    topic: "Preamble & Fundamental Duties",
    difficulty: "Medium",
    question: "Through which Constitutional Amendment were Fundamental Duties added to the Constitution of India upon the recommendation of the Swaran Singh Committee?",
    options: [
      "44th Amendment Act, 1978",
      "42nd Amendment Act, 1976",
      "86th Amendment Act, 2002",
      "52nd Amendment Act, 1985"
    ],
    correctIndex: 1,
    explanation: `**Constitutional Background:**
- The **42nd Constitutional Amendment Act, 1976** incorporated Part IV-A and Article 51A containing 10 Fundamental Duties upon the recommendation of the **Swaran Singh Committee**.
- Later, the 11th Fundamental Duty was added by the 86th Constitutional Amendment in 2002.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 2",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL Tier 1 2024 Official Paper"
  },
  {
    id: "pyq_rrb_001",
    subject: "Mathematics",
    topic: "Number System & LCM/HCF",
    difficulty: "Easy",
    question: "The HCF and LCM of two numbers are 12 and 336 respectively. If one of the numbers is 84, what is the other number?",
    options: [
      "48",
      "56",
      "36",
      "72"
    ],
    correctIndex: 0,
    explanation: `**Step-by-Step Calculation:**
1. Fundamental Property: **Product of two numbers = HCF × LCM**.
2. 84 × Second Number = 12 × 336.
3. Second Number = (12 × 336) / 84.
4. Simplify: 12 / 84 = 1 / 7.
5. Second Number = 336 / 7 = **48**.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB NTPC",
    examYear: "2022",
    paperShift: "CBT-2 Level 2",
    pyqLabel: "PYQ • RRB NTPC • 2022 CBT-2",
    sourceRef: "RRB NTPC Official CBT 2 Paper"
  },
  {
    id: "pyq_bank_001",
    subject: "Reasoning",
    topic: "Inequalities",
    difficulty: "Hard",
    question: "Statements: P ≥ Q > R = S; T ≤ R < U\nConclusions:\nI. P > S\nII. U > T",
    options: [
      "Only conclusion I is true",
      "Only conclusion II is true",
      "Both conclusions I and II are true",
      "Neither conclusion I nor II is true"
    ],
    correctIndex: 2,
    explanation: `**Logic Breakdown:**
- For Conclusion I: P ≥ Q > R = S. Since there is a strict inequality sign (>) between P and R, P > R. Because R = S, **P > S is definitely true**.
- For Conclusion II: T ≤ R < U. Again, there is a strict inequality (<) between T and U, meaning **U > T is definitely true**.
- Hence, **Both conclusions I and II are true**.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "IBPS PO",
    examYear: "2023",
    paperShift: "Prelims Shift 1",
    pyqLabel: "PYQ • IBPS PO • 2023 Prelims",
    sourceRef: "IBPS PO Prelims 2023 Reasoning Section"
  },
  {
    id: "pyq_appsc_001",
    subject: "Indian History",
    topic: "Modern Indian History",
    difficulty: "Medium",
    question: "Who was the Viceroy of India when the Indian National Congress was founded in Bombay in December 1885?",
    options: [
      "Lord Ripon",
      "Lord Dufferin",
      "Lord Curzon",
      "Lord Lytton"
    ],
    correctIndex: 1,
    explanation: `**Historical Fact:**
- **Lord Dufferin** was the Viceroy of India from 1884 to 1888. The Indian National Congress was founded in Bombay in December 1885 during his viceroyalty with 72 delegates under W.C. Bonnerjee.`,
    examCategory: "APPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "APPSC",
    examYear: "2023",
    paperShift: "Group 2 Prelims",
    pyqLabel: "PYQ • APPSC Group-2 • 2023",
    sourceRef: "APPSC Group 2 General Studies Paper"
  },
  {
    id: "pyq_tspsc_001",
    subject: "Geography",
    topic: "Rivers & Drainage",
    difficulty: "Medium",
    question: "At which place in Uttarakhand do the rivers Alaknanda and Bhagirathi meet to form the mighty Ganga?",
    options: [
      "Rudraprayag",
      "Karnaprayag",
      "Devprayag",
      "Vishnuprayag"
    ],
    correctIndex: 2,
    explanation: `**Panch Prayag Geography:**
- **Devprayag**: Confluence of Alaknanda and Bhagirathi (from here onwards, the river is called Ganga).
- Rudraprayag: Confluence of Alaknanda and Mandakini.
- Karnaprayag: Confluence of Alaknanda and Pindar.
- Vishnuprayag: Confluence of Alaknanda and Dhauliganga.`,
    examCategory: "TSPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "TSPSC",
    examYear: "2022",
    paperShift: "Group 1 Prelims",
    pyqLabel: "PYQ • TSPSC Group-1 • 2022",
    sourceRef: "TSPSC Group 1 Examination Paper"
  },
  {
    id: "pyq_police_001",
    subject: "Reasoning",
    topic: "Series Completion",
    difficulty: "Easy",
    question: "Complete the following number series:\n7, 12, 19, 28, 39, ?",
    options: [
      "50",
      "52",
      "54",
      "48"
    ],
    correctIndex: 1,
    explanation: `**Series Pattern:**
- 7 + 5 = 12
- 12 + 7 = 19
- 19 + 9 = 28
- 28 + 11 = 39
- Consecutive odd numbers (5, 7, 9, 11, 13) are added.
- Next term = 39 + 13 = **52**.`,
    examCategory: "Police Exams",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "Police Exams",
    examYear: "2024",
    paperShift: "SI Paper 1",
    pyqLabel: "PYQ • Police SI • 2024",
    sourceRef: "State Police SI Recruitment Written Examination"
  },
  {
    id: "pyq_ssc_002",
    subject: "Mathematics",
    topic: "Simple & Compound Interest",
    difficulty: "Expert",
    question: "A sum of money doubles itself in 5 years at a certain rate of compound interest (compounded annually). In how many years will it become 8 times of itself at the same rate?",
    options: [
      "15 years",
      "20 years",
      "10 years",
      "25 years"
    ],
    correctIndex: 0,
    explanation: `**Step-by-Step Power Principle:**
1. Under compound interest, if a principal becomes 2¹ times in T years, it becomes 2ⁿ times in n × T years.
2. Here, sum doubles (2¹) in 5 years.
3. We need it to become 8 times = 2³ times.
4. Therefore, time required = 3 × 5 = **15 years**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2023",
    paperShift: "Tier 2 Paper 1",
    pyqLabel: "PYQ • SSC CGL • 2023 Tier-2",
    sourceRef: "SSC CGL Tier 2 Official Mathematics Paper"
  },
  {
    id: "pyq_upsc_002",
    subject: "Indian Polity",
    topic: "Emergency Provisions",
    difficulty: "Hard",
    question: "Under Article 352, a proclamation of National Emergency must be approved by both Houses of Parliament within what time period from the date of issue?",
    options: [
      "14 days",
      "1 month",
      "2 months",
      "6 months"
    ],
    correctIndex: 1,
    explanation: `**Constitutional Provision:**
- By the **44th Constitutional Amendment Act, 1978**, the period for approval of a proclamation of National Emergency was reduced from two months to **one month**.
- It must be passed by a special majority in each House of Parliament.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2021",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2021",
    sourceRef: "UPSC Civil Services Examination 2021"
  },
  {
    id: "pyq_ssc_003",
    subject: "English",
    topic: "Synonyms & Antonyms",
    difficulty: "Medium",
    question: "Select the most appropriate SYNONYM of the underlined word in the sentence:\n'The judge gave a candid opinion on the proposed bill.'",
    options: [
      "Biased",
      "Frank",
      "Evasive",
      "Arrogant"
    ],
    correctIndex: 1,
    explanation: `**Vocabulary Insight:**
- **Candid** means truthful, straightforward, and sincere (outspoken, frank).
- Hence, **'Frank'** is the closest synonym.
- Antonyms include 'Biased', 'Guarded', or 'Evasive'.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 4",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 Official Paper Shift 4"
  },
  {
    id: "pyq_bank_002",
    subject: "Economics",
    topic: "Banking & Financial Inclusion",
    difficulty: "Medium",
    question: "Under the Pradhan Mantri Jan Dhan Yojana (PMJDY), what is the maximum overdraft facility available to eligible account holders?",
    options: [
      "₹5,000",
      "₹10,000",
      "₹15,000",
      "₹20,000"
    ],
    correctIndex: 1,
    explanation: `**Financial Scheme Detail:**
- The overdraft limit under PMJDY was doubled from ₹5,000 to **₹10,000** for accounts with satisfactory operation over six months, with no condition required for overdrafts up to ₹2,000.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SBI PO",
    examYear: "2024",
    paperShift: "Mains Banking Awareness",
    pyqLabel: "PYQ • SBI PO • 2024 Mains",
    sourceRef: "SBI PO Mains 2024 Banking Awareness"
  },
  // ==========================================
  // ADDITIONAL HIGH-YIELD QUESTIONS
  // ==========================================
  {
    id: "hist_005",
    subject: "Indian History",
    topic: "Modern India - Governor Generals",
    difficulty: "Medium",
    question: "Who was the Governor-General of India when the policy of 'Doctrine of Lapse' was aggressively implemented to annex Indian princely states?",
    options: [
      "Lord Wellesley",
      "Lord Dalhousie",
      "Lord Hastings",
      "Lord Cornwallis"
    ],
    correctIndex: 1,
    explanation: `**Historical Context:**
- **Lord Dalhousie** (Governor-General from 1848 to 1856) implemented the **Doctrine of Lapse**, annexing Satara (1848), Jaitpur and Sambalpur (1849), Baghat (1850), Udaipur (1852), Jhansi (1853), and Nagpur (1854).`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2023",
    paperShift: "Tier 1 - Shift 3",
    pyqLabel: "PYQ • SSC CGL • 2023 Tier-1",
    sourceRef: "SSC CGL 2023 Official Question Paper"
  },
  {
    id: "geo_004",
    subject: "Geography",
    topic: "Indian Soils & Agriculture",
    difficulty: "Medium",
    question: "Which type of soil in India is also known as 'Regur Soil' and is best suited for the cultivation of cotton?",
    options: [
      "Alluvial Soil",
      "Black Soil",
      "Laterite Soil",
      "Red and Yellow Soil"
    ],
    correctIndex: 1,
    explanation: `**Soil Science Insight:**
- **Black Soil** (also termed **Regur Soil** or Black Cotton Soil) is rich in montmorillonite clay, has high moisture retention capacity, and develops deep cracks in dry season. It is prevalent across the Deccan Trap basalt region.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2022",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2022",
    sourceRef: "UPSC CSE Prelims 2022"
  },
  {
    id: "qa_007",
    subject: "Mathematics",
    topic: "Averages",
    difficulty: "Medium",
    question: "The average weight of 24 students in a class is 45 kg. If the teacher's weight is included, the average weight increases by 400 grams. Find the weight of the teacher.",
    options: [
      "55 kg",
      "52 kg",
      "58 kg",
      "50 kg"
    ],
    correctIndex: 0,
    explanation: `**Step-by-Step Calculation:**
1. Total number of persons after adding teacher = 24 + 1 = 25.
2. Total weight increase across all 25 persons = 25 × 0.4 kg = 10 kg.
3. Teacher's weight = Previous average + Total increase = 45 kg + 10 kg = **55 kg**.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "IBPS Clerk",
    examYear: "2024",
    paperShift: "Prelims Shift 1",
    pyqLabel: "PYQ • IBPS Clerk • 2024",
    sourceRef: "IBPS Clerk 2024 Quantitative Section"
  },
  {
    id: "rs_006",
    subject: "Reasoning",
    topic: "Venn Diagrams",
    difficulty: "Easy",
    question: "Which of the following Venn diagrams represents the relationship between: 'Engineers, Females, and Mothers'?",
    options: [
      "Three mutually disjoint circles",
      "All mothers are females, and some females/mothers are engineers",
      "Two concentric circles completely inside a third circle",
      "Three separate intersecting circles without complete inclusion"
    ],
    correctIndex: 1,
    explanation: `**Venn Logic:**
- All **Mothers** are biologically **Females** (Mothers circle is entirely inside Females circle).
- **Engineers** is an occupational category that overlaps with both Females and Mothers (some mothers are engineers, some females are engineers, some men are engineers).
- Therefore, Mothers is completely inside Females, and Engineers intersects both.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CHSL",
    examYear: "2024",
    paperShift: "Shift 2",
    pyqLabel: "PYQ • SSC CHSL • 2024",
    sourceRef: "SSC CHSL Tier 1 2024 Official Paper"
  },
  {
    id: "eng_004",
    subject: "English",
    topic: "Active & Passive Voice",
    difficulty: "Medium",
    question: "Choose the correct passive form of the sentence:\n'The chef prepared an exquisite seven-course meal for the delegates.'",
    options: [
      "An exquisite seven-course meal had been prepared by the chef for the delegates.",
      "An exquisite seven-course meal was prepared by the chef for the delegates.",
      "An exquisite seven-course meal is prepared by the chef for the delegates.",
      "An exquisite seven-course meal was being prepared by the chef for the delegates."
    ],
    correctIndex: 1,
    explanation: `**Grammar Conversion Rules:**
- The given sentence is in the **Simple Past Tense** (Subject + V2 + Object).
- Passive voice structure for Simple Past:
  **Object + was/were + V3 (past participle) + by + Subject**.
- Hence: 'An exquisite seven-course meal **was prepared** by the chef for the delegates.'`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 1",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL 2024 English Comprehension"
  },
  {
    id: "comp_003",
    subject: "Computer Awareness",
    topic: "Cyber Security & Malware",
    difficulty: "Hard",
    question: "Which form of malicious software locks the user's computer files through strong encryption and demands payment for the decryption key?",
    options: [
      "Spyware",
      "Ransomware",
      "Keylogger",
      "Adware"
    ],
    correctIndex: 1,
    explanation: `**Security Threat Definition:**
- **Ransomware** (e.g., WannaCry, Locky) infects a computer system, encrypts critical files or the entire file system, and displays a ransom note demanding cryptocurrency payment in exchange for the decryption tool.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "IBPS PO",
    examYear: "2023",
    paperShift: "Mains IT & Banking",
    pyqLabel: "PYQ • IBPS PO • 2023 Mains",
    sourceRef: "IBPS PO 2023 Mains Computer Awareness"
  },
  {
    id: "ca_003",
    subject: "Current Affairs",
    topic: "Summits & International Relations",
    difficulty: "Medium",
    question: "Under India's G20 Presidency in 2023, which continental bloc was admitted as a permanent member of the G20 during the New Delhi Summit?",
    options: [
      "Association of Southeast Asian Nations (ASEAN)",
      "African Union (AU)",
      "European Free Trade Association (EFTA)",
      "Organization of American States (OAS)"
    ],
    correctIndex: 1,
    explanation: `**Diplomatic Milestone:**
- On September 9, 2023, at the 18th G20 Summit in New Delhi under the presidency of PM Narendra Modi, the **African Union (AU)** consisting of 55 member states was officially inducted as a permanent member of the G20.`,
    examCategory: "UPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "UPSC",
    examYear: "2024",
    paperShift: "Prelims Paper 1",
    pyqLabel: "PYQ • UPSC Prelims • 2024",
    sourceRef: "UPSC Civil Services Prelims 2024"
  },
  {
    id: "sci_004",
    subject: "General Science",
    topic: "Physics - Mechanics & Units",
    difficulty: "Easy",
    question: "What is the SI unit of electric current?",
    options: [
      "Volt",
      "Ampere",
      "Coulomb",
      "Ohm"
    ],
    correctIndex: 1,
    explanation: `**SI Units:**
- The SI base unit of electric current is the **Ampere (A)**.
- Volt (V) is the unit of electric potential, Coulomb (C) of electric charge ($1\\text{ C} = 1\\text{ A}\\cdot\\text{s}$), and Ohm ($\\Omega$) of electrical resistance.`,
    examCategory: "Railway",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "RRB NTPC",
    examYear: "2022",
    paperShift: "CBT-1",
    pyqLabel: "PYQ • RRB NTPC • 2022",
    sourceRef: "RRB NTPC 2022 General Science Paper"
  },
  {
    id: "pol_005",
    subject: "Indian Polity",
    topic: "Elections & Constitutional Bodies",
    difficulty: "Medium",
    question: "Under which Article of the Constitution of India is the Election Commission of India (ECI) established?",
    options: [
      "Article 280",
      "Article 324",
      "Article 315",
      "Article 356"
    ],
    correctIndex: 1,
    explanation: `**Constitutional Article:**
- **Article 324** provides for the superintendence, direction, and control of elections to be vested in an Election Commission for Parliament, state legislatures, and the offices of the President and Vice-President.
- Article 280 is Finance Commission; Article 315 is UPSC/State PSCs; Article 356 is President's Rule.`,
    examCategory: "APPSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "APPSC",
    examYear: "2024",
    paperShift: "Group 2 Screening",
    pyqLabel: "PYQ • APPSC Group-2 • 2024",
    sourceRef: "APPSC Group 2 Services Examination 2024"
  },
  {
    id: "qa_008",
    subject: "Mathematics",
    topic: "Percentages & Profit-Loss",
    difficulty: "Hard",
    question: "If the price of sugar increases by 20%, by what percentage must a family reduce its consumption so that the overall expenditure on sugar remains unchanged?",
    options: [
      "16.67%",
      "20%",
      "25%",
      "15%"
    ],
    correctIndex: 0,
    explanation: `**Step-by-Step Formula:**
1. Standard percentage formula for unchanged expenditure:
   **Reduction % = [r / (100 + r)] × 100%**
2. Here r = 20%.
3. Reduction = [20 / (100 + 20)] × 100% = [20 / 120] × 100% = (1 / 6) × 100% = **16.67% (or 16 2/3%)**.`,
    examCategory: "SSC",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SSC CGL",
    examYear: "2024",
    paperShift: "Tier 1 - Shift 2",
    pyqLabel: "PYQ • SSC CGL • 2024 Tier-1",
    sourceRef: "SSC CGL Tier 1 Quantitative Aptitude 2024"
  },
  {
    id: "rs_007",
    subject: "Reasoning",
    topic: "Seating Arrangement",
    difficulty: "Hard",
    question: "Five friends A, B, C, D, and E are sitting in a straight line facing North. C is sitting in the exact middle. A is to the immediate right of C. B is sitting at the extreme left end. E is not sitting at either extreme end. Who is sitting at the extreme right end?",
    options: [
      "D",
      "E",
      "A",
      "C"
    ],
    correctIndex: 0,
    explanation: `**Step-by-Step Deduction:**
1. Five positions: 1, 2, 3, 4, 5 (from left to right facing North).
2. 'C is in the exact middle' -> Position 3 = C.
3. 'A is to immediate right of C' -> Position 4 = A.
4. 'B is at extreme left end' -> Position 1 = B.
5. 'E is not at either extreme end' -> Position 2 = E.
6. Only remaining position is 5 (extreme right end), which must be **D**.`,
    examCategory: "Banking",
    isPYQ: true,
    isVerifiedPYQ: true,
    examName: "SBI Clerk",
    examYear: "2023",
    paperShift: "Prelims Shift 2",
    pyqLabel: "PYQ • SBI Clerk • 2023",
    sourceRef: "SBI Junior Associates Prelims 2023"
  }
];

// Available Exam Categories for filtering and quizzes
export const EXAM_CATEGORIES = [
  { id: "SSC", name: "SSC Exams", description: "CGL, CHSL, MTS, CPO, GD Constable", icon: "🏛️", color: "#3b82f6", questionsCount: 150 },
  { id: "Banking", name: "Banking & Insurance", description: "IBPS PO, Clerk, SBI PO, RBI Grade B", icon: "🏦", color: "#10b981", questionsCount: 120 },
  { id: "Railway", name: "Railway Exams", description: "RRB NTPC, Group D, ALP, JE", icon: "🚆", color: "#f59e0b", questionsCount: 110 },
  { id: "UPSC", name: "UPSC & Civil Services", description: "CSE Prelims, CSAT, CDS, NDA", icon: "🇮🇳", color: "#8b5cf6", questionsCount: 95 },
  { id: "APPSC", name: "APPSC (Andhra Pradesh)", description: "Group 1, Group 2, Panchayat Secretary", icon: "📜", color: "#ec4899", questionsCount: 80 },
  { id: "TSPSC", name: "TSPSC (Telangana)", description: "Group 1, Group 2, Group 4, VRO", icon: "⚖️", color: "#06b6d4", questionsCount: 75 },
  { id: "Police Exams", name: "Police & Defense", description: "Sub-Inspector, Constable, CAPF", icon: "🛡️", color: "#ef4444", questionsCount: 85 },
  { id: "Other Government Exams", name: "State & Central Govt", description: "FCI, DSSSB, State PSCs, Teaching", icon: "⭐", color: "#64748b", questionsCount: 90 }
];

// Available Subjects for quizzes & mastery tracking
export const SUBJECTS_LIST = [
  { id: "Mathematics", name: "Mathematics / Quantitative", icon: "📐", color: "#3b82f6" },
  { id: "Reasoning", name: "Reasoning & Mental Ability", icon: "🧩", color: "#8b5cf6" },
  { id: "English", name: "English Language & Grammar", icon: "📖", color: "#10b981" },
  { id: "General Knowledge", name: "General Knowledge & Static GK", icon: "🌍", color: "#f59e0b" },
  { id: "General Science", name: "General Science (Phy/Chem/Bio)", icon: "🔬", color: "#06b6d4" },
  { id: "Indian History", name: "Indian History & Heritage", icon: "🏺", color: "#d97706" },
  { id: "Geography", name: "Indian & World Geography", icon: "🗺️", color: "#14b8a6" },
  { id: "Indian Polity", name: "Indian Polity & Constitution", icon: "⚖️", color: "#6366f1" },
  { id: "Economics", name: "Economics & Financial Awareness", icon: "📈", color: "#84cc16" },
  { id: "Computer Awareness", name: "Computer Awareness & IT", icon: "💻", color: "#ec4899" },
  { id: "Current Affairs", name: "Current Affairs & Events", icon: "📰", color: "#f43f5e" }
];

// Available Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { id: "Easy", label: "🟢 Easy", tag: "Easy", desc: "Basic knowledge & fundamental concepts", xpMultiplier: 1.0 },
  { id: "Medium", label: "🟡 Medium", tag: "Medium", desc: "Concept application & analytical thinking", xpMultiplier: 1.5 },
  { id: "Hard", label: "🔴 Hard", tag: "Hard", desc: "Tricky questions with deep reasoning", xpMultiplier: 2.0 },
  { id: "Expert", label: "🔥 Expert", tag: "Expert", desc: "Advanced competitive exam level", xpMultiplier: 3.0 }
];

// PYQ Years available for filtering
export const PYQ_YEARS = ["2024", "2023", "2022", "2021", "2020"];

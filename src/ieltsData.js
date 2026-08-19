// ── IELTS Battle Plan — static plan data ───────────────────────
// Ported from the standalone HTML tracker. Pure data + pure helper
// functions only (no DOM, no state) so it can be imported straight
// into the CRM's React component + Firestore-backed state.

export const DAILY_HABITS = {
  id: "habits",
  title: "Daily Habits (non-negotiable)",
  tag: "p",
  tasks: [
    { t: "Habit A — Article Drill: read 2 articles daily in English." },
    { t: "Habit A — Analyse understanding of both articles." },
    { t: "Habit A — Pick 5 vocabulary words per article (10 total)." },
    { t: "Habit B — BBC Podcast before sleep: listen to BBC 6-Minute English or BBC World Service." },
    { t: "Habit B — Practice visualising and trying to understand the WHOLE audio." },
    { t: "Habit C — Read 10 pages from an English book before bed." },
  ],
};

export const SKELETON = `04:30–06:30 Deep work · 06:30–07:30 Tram (read articles) · 07:30–12:30 University block ·
12:30–13:30 Pray+Lunch (podcast) · 13:30–16:30 Afternoon block · 16:30–17:00 Pray+Coffee (podcast) ·
17:00–20:00 Evening block · 20:00–20:30 Return home (articles/podcast) · 21:00–21:30 Before-bed habits · Bed by 22:00`;

export const DAYTYPES = [
  {
    name: "Text Understanding + Matching Headings",
    badges: ["r", "l", "w"],
    blocks: [
      {
        title: "Reading — Text Understanding Drill",
        tag: "r",
        tasks: [
          { t: "Take one Cambridge Test Passage 1. Read it ONCE (4 min max). Close it." },
          { t: "Without looking: write 3 sentences what was the text about?" },
          { t: "Open: check. How much did you understand? Write % in notebook." },
          { t: "Repeat with Passage 2 (Cambridge 18 Test 1). Same method." },
          { t: "Note: which paragraph types are hardest to understand? (science? history? environment?)" },
        ],
      },
      {
        title: "Matching Headings — Method Fix",
        tag: "r",
        tasks: [
          { t: "Read the 6 rules aloud before starting: (1) ALL headings first (2) first+last sentence ONLY per para (3) obvious 3 first (4) eliminate used headings (5) ask: what is the ONE main idea? (6) 90sec max per heading then guess" },
          { t: "Do 20 MH questions from Cambridge Test 1+2. Track time per heading." },
          { t: "For every wrong answer: find the paragraph, identify the main idea, understand why that heading fits" },
        ],
      },
      {
        title: "Text Understanding — Vocabulary",
        tag: "r",
        tasks: [
          { t: "From today's passages: find 10 words you didn't know. Write word - meaning - example sentence." },
          { t: "Find 10 paraphrase pairs from today's tests. Question word - passage word." },
          { t: "Add all to notebook. Total notebook goal: 100 pairs by exam day." },
        ],
      },
      {
        title: "Listening — Spelling Attack",
        tag: "l",
        tasks: [
          { t: "Cambridge Test: do ONLY Section 1+2 (easiest). Write answers." },
          { t: "Check. For every spelling mistake: find the correct spelling, write it 5 times." },
          { t: "Common spelling mistakes in IELTS: receive, accommodation, necessary, environment, government, available, beginning, believe, business, February" },
          { t: "Write each of those 10 words 3 times right now without looking." },
        ],
      },
      {
        title: "Writing — Task 1 Maps & Diagrams",
        tag: "w",
        tasks: [
          { t: "This is your biggest Task 1 gap. Find a Map Task 1 sample from Cambridge or online." },
          { t: "Study the structure: intro (paraphrase) — overview (main change) — body (specific changes with language: was replaced by / has been converted to / where X stood, there is now Y)" },
          { t: "Write one Map Task 1 in 20 minutes. Use the language above." },
          { t: "Find a Process Diagram sample. Read 1 sample answer. Note the vocabulary: is fed into / is then passed through / the resulting / is produced" },
        ],
      },
      {
        title: "Writing — Task 2 Idea Generation",
        tag: "w",
        tasks: [
          { t: "Your problem: generating ideas takes too long. Solution: use the 3-category method." },
          { t: "For ANY topic, immediately think: (1)INDIVIDUAL effect (2)SOCIETY effect (3) FUTURE/ENVIRONMENT effect. You always have 6 ideas." },
          { t: 'Practice: take topic "Technology makes people less social". Use 3-category method. Write 6 ideas in 3 minutes.' },
          { t: 'Take topic "Government should ban fast food". Use 3-category method. 6 ideas in 3 minutes.' },
          { t: 'Take topic "Young people care less about tradition". 6 ideas in 3 minutes.' },
        ],
      },
      {
        title: "Passive — Tramway + Return",
        tag: "p",
        tasks: [
          { t: "Morning tram: read 1 science/society article in English. Note 5 new words." },
          { t: "Evening return: listen to BBC 6-Minute English podcast (1 episode). Note 3 useful phrases." },
        ],
      },
      {
        title: "Night Session — Full Reading Passage",
        tag: "r",
        tasks: [
          { t: "Cambridge 19 Test 1 Passage 3 only. 22-min alarm. Answer all questions." },
          { t: "Check. For every mistake: find the exact sentence in passage. What paraphrase did you miss?" },
          { t: "Understanding test after analysis: write in your own words what this passage was ACTUALLY about (3 sentences). Was your understanding enough?" },
        ],
      },
    ],
    targets: ["MH: 17+/20", "Text understanding: 60%+ on first read", "Spelling drill: 10 words written 3x", "Map Task 1: done in 20 min", "Idea generation: 6 ideas in 3 min"],
  },
  {
    name: "Matching Info + Listening MCQ",
    badges: ["r", "l", "w"],
    blocks: [
      {
        title: "Matching Information — 30 Questions",
        tag: "r",
        tasks: [
          { t: "Matching Information method: read statement -> find 2 keywords -> scan paragraphs FOR PARAPHRASE of those keywords -> read only that sentence -> answer. 90 sec max" },
          { t: "20 Matching Information questions from Cambridge 16+17. Track time per question." },
          { t: "For every mistake: highlight the question keywords and the passage paraphrase. Write the paraphrase pair." },
          { t: "Key insight: answers are NOT in order in the passage for this question type. Scan everything." },
        ],
      },
      {
        title: "Reading — Full Test + Understanding Check",
        tag: "r",
        tasks: [
          { t: "Cambridge 19 Test 2 full — STRICT 60 min. Alarms: 18, 38, 58 min." },
          { t: "After: for each passage, write 2 sentences: what was this text ACTUALLY about?" },
          { t: "Check: passages you understood better — did you score better? Note the pattern." },
          { t: "Full error analysis: every mistake type -> paraphrase missed" },
        ],
      },
      {
        title: "Listening Multiple Choice Method",
        tag: "l",
        tasks: [
          { t: "MCQ in listening is different from reading MCQ. The distractors are mentioned OUT LOUD to confuse you." },
          { t: "Method: read ALL options before audio -> predict what correct answer sounds like -> when you hear distractor words, don't panic -> wait for the COMPLETE idea before answering" },
          { t: "Do Cambridge 18 Test 3 SECTIONS 3+4 ONLY (where MCQ appears most)" },
          { t: "Check: for every mistake, find the audio script. Where exactly was the distractor? Where was the answer?" },
        ],
      },
      {
        title: "Writing — Cause/Problem/Solution Structure",
        tag: "w",
        tasks: [
          { t: "This is 40% of IELTS Task 2 essay types. You need a locked structure." },
          { t: "THE STRUCTURE: Para 1 (intro: paraphrase + main causes overview) Para 2 (cause 1 + effect + example) Para 3 (cause 2 + effect + example) Para 4 (solutions: one for each cause) Para 5 (conclusion: summarize)" },
          { t: 'Write FULL essay in 40 min: "In many cities, traffic congestion is increasing. What are the causes? What solutions can you suggest?"' },
          { t: "Check: did you give specific examples? Did each cause have a matching solution?" },
        ],
      },
      {
        title: "Vocabulary — 10 New Words + Paraphrase",
        tag: "r",
        tasks: [
          { t: "From today's passages: 10 new vocabulary words. Write word - synonym - sentence." },
          { t: "10 new paraphrase pairs. Add to notebook." },
          { t: "Review yesterday's vocabulary. Can you remember the 10 words from Day 1?" },
        ],
      },
      {
        title: "Passive — Tramway + Return",
        tag: "p",
        tasks: [
          { t: "Morning tram: read academic article. Note 5 words." },
          { t: "Evening: TED Talk with English subtitles. Note 3 ideas for Speaking Part 3." },
        ],
      },
      {
        title: "Night — Matching Headings Speed Round",
        tag: "r",
        tasks: [
          { t: "10 Matching Headings questions. Timer: 8 minutes TOTAL for all 10." },
          { t: "Check. Any below 80% — review those paragraphs. Write main idea of each." },
        ],
      },
    ],
    targets: ["Matching Info: 16+/20", "Reading: 25+/40", "Listening MCQ: 12+/16", "Write Cause/Solution essay in 40 min", "Paraphrase notebook: 20 new pairs"],
  },
  {
    name: "Speed + Full Mock Reading",
    badges: ["mock", "r", "l", "w", "sp"],
    blocks: [
      {
        title: "Speed Drill (50 min, not 60) — Reading",
        tag: "r",
        tasks: [
          { t: "Cambridge 17 Test 2 full reading in 50 minutes (not 60). Force finish." },
          { t: "Alarm: 15 min (P1 done), 33 min (P2 done), 50 min (all done)" },
          { t: "Check. If 23+/40 in 50 min, timing is under control. Record the score." },
        ],
      },
      {
        title: "FULL READING MOCK — Cambridge 20 Test 1",
        tag: "mock",
        tasks: [
          { t: "Cambridge IELTS 20 Test 1: Reading ONLY. Exact exam conditions." },
          { t: "Sit at desk. No phone. Paper answer sheet. 60-minute alarm." },
          { t: "Alarm 1: 18 min P1 done (guess any left). Alarm 2: 38 min P2 done. Alarm 3: 58 min all answered." },
          { t: "Check immediately. Full error analysis. Calculate: P1 /13  P2 /13  P3 /14" },
          { t: "UNDERSTANDING CHECK: After analysis, write 2 sentences per passage what was it actually about? Could you understand 60%+?" },
          { t: "Write in notebook: what question type cost you the most marks today?" },
        ],
      },
      {
        title: "Weakness Attack (from mock results)",
        tag: "r",
        tasks: [
          { t: "Take your single worst question type from the mock." },
          { t: "Do 20 more questions of ONLY that type. Timed. 75 sec max per Q." },
          { t: "After: what pattern do you see? Same trap every time?" },
        ],
      },
      {
        title: "Listening — Full Test",
        tag: "l",
        tasks: [
          { t: "Cambridge 17 Test 3 full listening (30 min)." },
          { t: "Check. Every spelling mistake: write correct spelling 5 times." },
          { t: "Section 4: did you miss more? This is the academic monologue — practice this section alone next time." },
        ],
      },
      {
        title: "Writing — Task 1 Diagram + Task 2",
        tag: "w",
        tasks: [
          { t: "Task 1 (20 min): Process diagram. Use: is fed into / passes through / is then converted / the resulting product" },
          { t: 'Task 2 (40 min): "Some people think modern technology is making people less creative. To what extent do you agree?" Use 3-category method for ideas first (3 min), then write.' },
          { t: "Check both: word count hit? Question answered directly?" },
        ],
      },
      {
        title: "Speaking — Organize Thoughts Quickly",
        tag: "sp",
        tasks: [
          { t: "Your problem: organizing thoughts. Use POINT-REASON-EXAMPLE for every answer." },
          { t: "Part 2: 3 cue cards, 1 min prep = write 3 bullets (P-R-E). Speak 2 min from those 3 bullets." },
          { t: "Record all 3. Listen: did you follow P-R-E? Were you organized?" },
        ],
      },
      {
        title: "Passive — Tramway + Return",
        tag: "p",
        tasks: [
          { t: "Morning tram: review paraphrase notebook — all pairs so far." },
          { t: "Evening: Cambridge listening audio for ear training." },
        ],
      },
      {
        title: "Night — Vocabulary Review",
        tag: "r",
        tasks: [
          { t: "Cover right side of paraphrase notebook. Test yourself on all pairs collected Days 1–3." },
          { t: "Rewrite any you couldn't remember 3 times!" },
          { t: "Add 5 more pairs from today's tests." },
        ],
      },
    ],
    targets: ["Speed drill: 23+/40 in 50 min", "Mock: 25+/40 (benchmark)", "Writing: 2 tasks in time", "Speaking: P-R-E structure in 3 answers", "Paraphrase notebook: 30+ total pairs"],
  },
  {
    name: "Confidence Test + Sentence Matching",
    badges: ["r", "l", "w"],
    blocks: [
      {
        title: "Reading — Confidence Test (Cambridge 14)",
        tag: "r",
        tasks: [
          { t: "Cambridge IELTS 14 Test 1: full reading — strict 60 min." },
          { t: "This test is slightly easier. Prove to yourself Band 6 is achievable." },
          { t: "Check. Understanding check: 3 sentences per passage — what was it about?" },
          { t: "Write: which question types did you get right? Which still wrong?" },
        ],
      },
      {
        title: "Sentence Matching — 30 Questions",
        tag: "r",
        tasks: [
          { t: "Method: Read the incomplete sentence. Find 2 keywords. Scan ENTIRE passage for paraphrased version of those keywords. Read ONLY that sentence. Does it complete the statement? Yes -> answer. No -> keep scanning." },
          { t: "30 Sentence Matching questions from Cambridge 15+16." },
          { t: "For every mistake: highlight the question keywords. Find the passage sentence. Write the paraphrase pair." },
        ],
      },
      {
        title: "Reading — Full Test + Analysis",
        tag: "r",
        tasks: [
          { t: "Cambridge 14 Test 2 full reading — strict 60 min." },
          { t: "For every correct answer: also write the paraphrase pair (not just mistakes)." },
          { t: "Create master paraphrase list: organize by type (action verbs / adjectives / nouns)" },
        ],
      },
      {
        title: "Listening — Full Test",
        tag: "l",
        tasks: [
          { t: "Cambridge 14 Test 2 full listening (30 min)." },
          { t: "Check. Every mistake: find audio script. Was it a spelling mistake or mishearing?" },
          { t: "For spelling mistakes: write correct version 5 times. Build spelling list." },
        ],
      },
      {
        title: "Writing — Vocabulary Bank",
        tag: "w",
        tasks: [
          { t: "Build your personal writing vocabulary bank. This directly improves your Task 2 score." },
          { t: "30 phrases for argument essays: 'This has led to...', 'As a result of...', 'This is particularly evident in...', 'One significant consequence is...', 'This can be attributed to...' — find 25 more online and write them." },
          { t: "20 phrases for Task 1 data: 'witnessed a sharp increase', 'remained relatively stable', 'fluctuated considerably', 'reached a peak of', 'accounted for the majority of' — find 15 more." },
          { t: 'Task 2 (40 min): "Many young people today do not know how to cook. Why is this? What problems does it cause?" Use 3-category method + vocabulary bank phrases.' },
        ],
      },
      {
        title: "Passive — Tramway + Return",
        tag: "p",
        tasks: [
          { t: "Morning tram: review ALL paraphrase pairs Days 1–4." },
          { t: "Evening: TED Talk. Note 3 speaking phrases." },
        ],
      },
      {
        title: "Night — Passage 3 + Understanding",
        tag: "r",
        tasks: [
          { t: "Cambridge 16 Test 1 Passage 3 only — 22 min alarm." },
          { t: "Understanding check: write what this passage was about before checking answers." },
          { t: "Check. For every mistake: paraphrase pair." },
        ],
      },
    ],
    targets: ["Confidence test: 27+/40", "Sentence Matching: 23+/30", "Reading test 2: 25+/40", "Listening: 32+/40", "50 phrases in vocabulary bank"],
  },
  {
    name: "T/F/NG + Speaking Organize",
    badges: ["r", "l", "sp", "w"],
    blocks: [
      {
        title: "T/F/NG — 40 Questions Mastery",
        tag: "r",
        tasks: [
          { t: "The ONE rule that fixes everything: if you INFER it (think 'therefore it must be true') -> NOT GIVEN. Only TRUE if the text DIRECTLY says the same thing." },
          { t: "FALSE = passage DIRECTLY contradicts the statement. NOT GIVEN = passage doesn't mention it at all." },
          { t: "40 T/F/NG from Cambridge 14+15+16. Scan 20 sec per Q. Not found in 20 sec -> NOT GIVEN." },
          { t: "For every mistake: was it inference? exact word trap? partial match?" },
        ],
      },
      {
        title: "Reading — Full Test",
        tag: "r",
        tasks: [
          { t: "Cambridge 16 Test 2 full reading — strict 60 min." },
          { t: "Understanding check: can you explain what each passage was about?" },
          { t: "Full error analysis + paraphrase pairs." },
        ],
      },
      {
        title: "Listening — Section 4 Intensive",
        tag: "l",
        tasks: [
          { t: "This is the academic monologue section. Hardest. Do Section 4 ONLY from 4 different Cambridge tests (14, 15, 16, 17)." },
          { t: "Before each: read questions carefully (you have 45 sec). Predict topic and answer type." },
          { t: "Track: Section 4 score per test: C14: _/10  C15: _/10  C16: _/10  C17: _/10" },
          { t: "Every spelling mistake: write correct spelling 5 times." },
        ],
      },
      {
        title: "Speaking — Organize Thoughts Fast",
        tag: "sp",
        tasks: [
          { t: "The organizing problem: you have ideas but can't arrange them quickly. Use: POSITION + REASON + EXAMPLE for every Part 3 answer." },
          { t: "8 Part 3 questions (complex). For each: 3 seconds -> POSITION (yes/no/both) -> REASON (because...) -> EXAMPLE (for instance...). Speak 2 minutes." },
          { t: "Record all. Listen. Count: did you use connectors? (However / Furthermore / As a result / In contrast)" },
          { t: "Redo the 2 weakest answers with better structure." },
        ],
      },
      {
        title: "Writing — Task 1 Map Practice",
        tag: "w",
        tasks: [
          { t: "Find another Map Task 1 from Cambridge 11 or online. Write it in 20 min." },
          { t: "Key vocabulary: has been replaced by / was converted into / where X used to stand there is now Y / the area previously occupied by / was extended to include" },
          { t: "After writing: count how many of these phrases you used. Target: 4+ from the list." },
        ],
      },
      {
        title: "Passive — Tramway + Return",
        tag: "p",
        tasks: [
          { t: "Morning tram: review vocabulary bank — all 50+ phrases." },
          { t: "Evening: news podcast or BBC World Service." },
        ],
      },
      {
        title: "Night — Paraphrase Test",
        tag: "r",
        tasks: [
          { t: "Cover right column of ENTIRE paraphrase notebook. Test yourself." },
          { t: "Any you can't remember, rewrite 3 times." },
          { t: "Add 6 new pairs from today." },
        ],
      },
    ],
    targets: ["T/F/NG: 34+/40", "Reading: 26+/40", "Section 4 listening: 7+/10", "Speaking: 8 organized Part 3 answers", "Map Task 1 done in 20 min"],
  },
  {
    name: "Week Full Mock",
    badges: ["mock", "r", "l", "w", "sp"],
    blocks: [
      {
        title: "FULL READING MOCK — Cambridge 20 Test 2",
        tag: "mock",
        tasks: [
          { t: "Cambridge IELTS 20 Test 2: Reading ONLY. EXACT exam conditions." },
          { t: "Sit at desk. No phone in room. Paper answer sheet. 60 min strict." },
          { t: "Alarm 1: 18 min P1 done. Alarm 2: 38 min P2 done. Alarm 3: 58 min -> all answered." },
          { t: "DO NOT check yet." },
        ],
      },
      {
        title: "FULL LISTENING MOCK",
        tag: "mock",
        tasks: [
          { t: "Cambridge IELTS 20 Test 2: Listening — exam conditions — no pause." },
          { t: "Check immediately after." },
        ],
      },
      {
        title: "FULL WRITING MOCK",
        tag: "mock",
        tasks: [
          { t: "Task 1 (20 min): whatever type Cambridge 20 Test 2 has — do it." },
          { t: "Task 2 (40 min): whatever question Cambridge 20 Test 2 has — use 3-category method, then write." },
          { t: "Review both (15 min): word count? question answered directly?" },
        ],
      },
      {
        title: "FULL ERROR ANALYSIS",
        tag: "rev",
        tasks: [
          { t: "Now check reading answers. Full error table: question / type / your answer / correct / paraphrase missed / trap type" },
          { t: "Calculate: previous mock: _/40  Today: _/40. Improvement: _" },
          { t: "Calculate: P1: _  P2: _  P3: _  Which passage is still weakest?" },
          { t: "Understanding check: can you explain each passage in 2 sentences?" },
          { t: "Check listening. Every spelling mistake: write 5 times." },
          { t: "If improved 2+ points in reading: your strategy is working, continue. If not: identify the ONE type still failing — attack it in next 2 days only." },
        ],
      },
      {
        title: "Weakness Attack (from mock)",
        tag: "r",
        tasks: [
          { t: "Your single worst question type from today's mock: do 20 more questions of ONLY that type." },
          { t: "Timed. 75 sec per question max. Full analysis after." },
        ],
      },
      {
        title: "SPEAKING MOCK",
        tag: "sp",
        tasks: [
          { t: "Full speaking mock: Part 1 (8 min) + Part 2 (2 cue cards) + Part 3 (5 questions)" },
          { t: "Record everything. Listen back. Score yourself." },
          { t: "Note: biggest improvement from Day 1 speaking to today?" },
        ],
      },
      {
        title: "Passive — Tramway",
        tag: "p",
        tasks: [{ t: "Morning tram: review paraphrase notebook - all pairs." }],
      },
      {
        title: "Night — Vocabulary + Strategy",
        tag: "r",
        tasks: [
          { t: "Review vocabulary bank - all phrases." },
          { t: "Write your personal strategy card (you will read this tomorrow and on exam day)." },
          { t: "READING: Alarm 18/38/58. Stuck = 60 sec guess move. MH last 5 min. NEVER exact words, meaning." },
          { t: "LISTENING: Read Q before audio. Write while listening. Section 4 = max focus. Spelling counts." },
          { t: "WRITING: T1 = 20 min. T2 = 40 min. 3-category ideas first. Never unfinished." },
          { t: "SPEAKING: P-R-E structure. Position Reason Example. No silence >2 sec." },
        ],
      },
    ],
    targets: ["Reading: 27+/40", "Listening: 32+/40", "Writing: both tasks complete", "Speaking: full mock done", "Strategy card written"],
  },
  {
    name: "Wednesday — Mock + Maps/Diagrams + Ideas",
    badges: ["mock", "r", "w"],
    blocks: [
      {
        title: "Full Mock Test",
        tag: "mock",
        tasks: [
          { t: "Complete full IELTS mock test under strict conditions" },
          { t: "No pausing. No phone. Answer sheet. Timer on." },
        ],
      },
      {
        title: "Error Analysis — All Skills",
        tag: "rev",
        tasks: [
          { t: "Reading: full error table — every mistake, type, paraphrase missed (1h)" },
          { t: "Listening: every mistake — spelling? mishearing? section? (30min)" },
          { t: "Writing: Task 1 answered question? Task 2 structure? vocabulary range? (30min)" },
        ],
      },
      {
        title: "Reading — Time Management",
        tag: "r",
        tasks: [
          { t: "Passage 1 drill: 18 min alarm. Finish P1. Check." },
          { t: "Passage 1+2 drill: 38 min alarm. Finish P1+P2. Check." },
          { t: "Full test drill: 58 min alarm. Finish all. Never leave blank." },
        ],
      },
      {
        title: "Writing — Map + Diagram",
        tag: "w",
        tasks: [
          { t: "Map Task 1: study structure — intro, overview, body (changes). Language: was replaced by / has been converted to / where X stood there is now Y" },
          { t: "Process Diagram Task 1: language: is fed into / passes through / the resulting / is produced" },
          { t: "Self-review both: 150+ words? All stages described?" },
        ],
      },
      {
        title: "Writing — Generating Ideas",
        tag: "w",
        tasks: [
          { t: "3-category method: for ANY topic -> INDIVIDUAL effect -> SOCIETY effect -> FUTURE/ENVIRONMENT effect." },
          { t: "Practice: 'Technology reduces creativity' -> 6 ideas in 3 min" },
          { t: "Practice: 'Ban fast food' -> 6 ideas in 3 min" },
          { t: "Practice: 'Young people ignore traditions' -> 6 ideas in 3 min" },
        ],
      },
      {
        title: "Reading — Understanding Text",
        tag: "r",
        tasks: [
          { t: "Read passage ONCE (4 min). Close it. Write 3 sentences: what was it about?" },
          { t: "Check comprehension. Aim: 60%+ understanding on first read." },
          { t: "Note: which topics are hardest to understand? (science / history / environment?)" },
        ],
      },
    ],
    targets: ["Mock Test done (all 4 skills)", "Error analysis: every mistake categorized", "Map + Diagram Task 1 in 20 min", "6 ideas for any topic in 3 min", "Reading timing: P1<18 min, P1+2<38 min"],
  },
  {
    name: "Thursday — Mock + Ideas + Diagram + Map + MCQ",
    badges: ["mock", "r", "w", "l"],
    blocks: [
      {
        title: "Full Mock Test",
        tag: "mock",
        tasks: [
          { t: "Complete full IELTS mock test under strict conditions" },
          { t: "No pausing. No phone. Answer sheet. Timer on." },
        ],
      },
      {
        title: "Error Analysis — All Skills",
        tag: "rev",
        tasks: [
          { t: "Reading: full error table — every mistake, type, paraphrase missed (1h)" },
          { t: "Listening: every mistake — spelling? mishearing? section? (30min)" },
          { t: "Writing: Task 1 answered question? Task 2 structure? vocabulary range? (30min)" },
        ],
      },
      {
        title: "Reading — Time Management",
        tag: "r",
        tasks: [
          { t: "Passage 1 drill: 18 min alarm. Check." },
          { t: "Passage 1+2 drill: 38 min alarm. Check." },
          { t: "Full test drill: 58 min alarm. Finish all." },
        ],
      },
      {
        title: "Writing — Ideas + Diagram + Map",
        tag: "w",
        tasks: [
          { t: "Generating ideas: 3 topics, 6 ideas each in 3 min. Time yourself." },
          { t: "Write 1 process diagram Task 1 (20 min)" },
          { t: "Write 1 map Task 1 (20 min)" },
          { t: "Write 1 cause/problem/solution essay Task 2 (40 min)" },
          { t: "Analyse all 3: structure correct? timing correct?" },
        ],
      },
      {
        title: "Listening — Multiple Choice",
        tag: "l",
        tasks: [
          { t: "Method: distractors are spoken OUT LOUD on purpose. Read ALL options before audio. Predict the answer. Wait for COMPLETE idea before writing." },
          { t: "Do Cambridge test Sections 3+4 only (where MCQ is most common)" },
          { t: "Check: find audio script. Where was distractor ? Where was real answer?" },
        ],
      },
      {
        title: "Reading — Understanding Text",
        tag: "r",
        tasks: [
          { t: "Take 1 passage. Read once (4 min). Close. Write what it was about." },
          { t: "Open. Check. How much did you understand? Note the topic." },
        ],
      },
    ],
    targets: ["Mock test (all 4 skills done)", "Error analysis complete", "Writing essay + diagram + map done", "Listening MCQ: 12+/16", "Reading understanding: 60%+ on passage"],
  },
  {
    name: "Friday-cycle — Time Management + SM/MH + MCQ + Speaking",
    badges: ["r", "l", "w", "sp"],
    blocks: [
      {
        title: "Writing — Time Management",
        tag: "w",
        tasks: [
          { t: "Task 2 essay drill: 38 min alarm. Write full essay. Stop at alarm." },
          { t: "Task 1 drill: 18 min alarm. Write full task. Stop at alarm." },
          { t: "Full writing: 58 min total. Both tasks done. Check." },
        ],
      },
      {
        title: "Reading — Time Management",
        tag: "r",
        tasks: [
          { t: "Passage 1 drill: 18 min alarm. Check." },
          { t: "Passage 1+2: 38 min alarm. Check" },
          { t: "Full test: 58 min alarm. All answered. Never leave blank." },
        ],
      },
      {
        title: "Reading — Sentence Matching",
        tag: "r",
        tasks: [
          { t: "Sentence Matching method: find 2 keywords -> scan for PARAPHRASE -> read ONLY that sentence -> 75 sec max per Q" },
          { t: "30 Sentence Matching questions from Cambridge 15+16" },
          { t: "Matching Headings method: ALL headings first -> first+last sentence per paragraph -> 90 sec max" },
          { t: "20 Matching Headings questions from Cambridge 14+15" },
          { t: "For every mistake: write the paraphrase pair. Add to notebook." },
        ],
      },
      {
        title: "Listening — MCQ + Spelling",
        tag: "l",
        tasks: [
          { t: "MCQ (1h): Sections 3+4 from 2 Cambridge tests. Check. Audio script analysis." },
          { t: "Spelling mistakes (1h): take all spelling errors from this week's listening tests" },
          { t: "Write every misspelled word correctly 5 times" },
          { t: "Master list: receive, accommodation, necessary, environment, government, available, beginning, believe, business, February" },
          { t: "Write all 10 words 3 times from memory right now" },
        ],
      },
      {
        title: "Speaking — Organizing Ideas",
        tag: "sp",
        tasks: [
          { t: "Method: POSITION -> REASON -> EXAMPLE. Use this for every Part 3 answer." },
          { t: "Part 2: 3 cue cards. 1 min prep = 3 P-R-E bullets. Speak 2 min from bullets." },
          { t: "Part 3: 8 complex questions (technology / education / environment / work / society). 2 min answers." },
          { t: "Record all. Listen. Count: organized? connected? (However / In contrast / As a result)" },
        ],
      },
    ],
    targets: ["Writing: essay in 38 min, Task 1 in 18 min", "Reading timing: all 3 drills done", "Sentence Matching: 23+/30", "Matching Headings: 17+/20", "Listening MCQ: 12+/16", "Speaking: 8 organized Part 3 answers"],
  },
  {
    name: "Saturday-cycle — Mock + Cause/Problem/Solution",
    badges: ["mock", "r", "w", "l"],
    blocks: [
      {
        title: "Full Mock Test",
        tag: "mock",
        tasks: [
          { t: "Complete full IELTS mock test—exam conditions" },
          { t: "All 4 skills. No pausing. Answer sheet." },
        ],
      },
      {
        title: "Error Analysis — All Skills",
        tag: "rev",
        tasks: [
          { t: "Reading: full error table—mistake, type, paraphrase missed (1h)" },
          { t: "Listening: every mistake—spelling? section? (30min)" },
          { t: "Writing: structure correct? timing? vocabulary range? (30min)" },
        ],
      },
      {
        title: "Reading — Time Management",
        tag: "r",
        tasks: [
          { t: "Passage 1: 18 min alarm. Check." },
          { t: "Passage 1+2: 38 min alarm. Check." },
          { t: "Full test: 58 min alarm." },
        ],
      },
      {
        title: "Writing — Cause/Problem/Solution",
        tag: "w",
        tasks: [
          { t: "Structure: Intro (paraphrase + causes overview) Body 1 (cause 1 + effect example) Body 2 (cause 2 + effect example) Body 3 (solution for each cause) Conclusion" },
          { t: "Write full essay in 40 min: 'In many cities, traffic congestion is increasing. What are the causes? What solutions can you suggest?'" },
          { t: "Analyse (20 min): did each cause have a matching solution? specific examples? linking words?" },
          { t: "Write 10 useful phrases for cause/solution essays. Memorize them." },
        ],
      },
      {
        title: "Listening — Multiple Choice",
        tag: "l",
        tasks: [
          { t: "Cambridge test Sections 3+4 (MCQ focus). Pre-read all options before audio." },
          { t: "Check audio script analysis: where was distractor? where was real answer?" },
        ],
      },
      {
        title: "Reading — Sentence Matching + Information",
        tag: "r",
        tasks: [
          { t: "15 Sentence Matching questions—75 sec max per Q" },
          { t: "15 Matching Information questions—method: 2 keywords scan ALL paragraphs 90 sec max" },
          { t: "Every mistake: paraphrase pair in notebook" },
        ],
      },
    ],
    targets: ["Mock test: all 4 skills", "Error analysis complete", "Cause/Solution essay: 40 min, structure used", "Listening MCQ: 12+/16", "Sentence + Info Matching: 24+/30"],
  },
  {
    name: "Monday-cycle — Mock + Ideas + Spelling + SM/Heading",
    badges: ["mock", "r", "w", "l"],
    blocks: [
      {
        title: "Full Mock Test",
        tag: "mock",
        tasks: [
          { t: "Complete full IELTS mock test—exam conditions" },
          { t: "All 4 skills. No pausing. Answer sheet." },
        ],
      },
      {
        title: "Error Analysis — All Skills",
        tag: "rev",
        tasks: [
          { t: "Reading: full error table (1h)" },
          { t: "Listening: spelling + section analysis (30min)" },
          { t: "Writing: timing + ideas + vocabulary (30min)" },
        ],
      },
      {
        title: "Reading — Time Management",
        tag: "r",
        tasks: [
          { t: "Passage 1: 18 min alarm." },
          { t: "Passage 1+2: 38 min alarm." },
          { t: "Full test: 58 min alarm." },
        ],
      },
      {
        title: "Writing — Time Management + Ideas",
        tag: "w",
        tasks: [
          { t: "3-category ideas first: any topic -> 6 ideas in 3 min (INDIVIDUAL / SOCIETY / FUTURE)" },
          { t: "Essay: 38 min alarm. Write full Task 2. Stop at alarm." },
          { t: "Task 1: 18 min alarm. Write full task. Stop." },
          { t: "Check both: word count? answered question? timing hit?" },
        ],
      },
      {
        title: "Listening — MCQ + Spelling Mistakes",
        tag: "l",
        tasks: [
          { t: "MCQ (1h): Sections 3+4. Pre-read options. Audio script analysis." },
          { t: "Spelling (1h): collect ALL spelling errors from this week's listening tests" },
          { t: "Write every error correctly 5 times. Add to spelling master list." },
          { t: "Test yourself: cover list, write 20 words from memory" },
        ],
      },
      {
        title: "Reading — Sentence Matching + Heading",
        tag: "r",
        tasks: [
          { t: "15 Sentence Matching questions" },
          { t: "15 Matching Headings questions — first+last sentence only, 90 sec max" },
          { t: "Every mistake: write paraphrase pair. What was the paragraph's main idea?" },
        ],
      },
    ],
    targets: ["Mock: all 4 skills", "Error analysis: complete", "Writing: essay 38 min + T1 18 min", "Listening MCQ: 12+/16 + spelling list", "Matching: 24+/30"],
  },
  {
    name: "Tuesday-cycle — Mock + Speaking + Understanding",
    badges: ["mock", "r", "w", "sp"],
    blocks: [
      {
        title: "Full Mock Test",
        tag: "mock",
        tasks: [
          { t: "Complete full IELTS mock test — exam conditions" },
          { t: "All 4 skills. No pausing. Answer sheet." },
        ],
      },
      {
        title: "Error Analysis — All Skills",
        tag: "rev",
        tasks: [
          { t: "Reading: full error table (1h)" },
          { t: "Listening: spelling + section (30min)" },
          { t: "Writing: timing + structure + vocabulary (30min)" },
        ],
      },
      {
        title: "Reading — Time Management",
        tag: "r",
        tasks: [
          { t: "Passage 1: 18 min alarm." },
          { t: "Passage 1+2: 38 min alarm." },
          { t: "Full test: 58 min alarm." },
        ],
      },
      {
        title: "Writing — Time Management + Ideas",
        tag: "w",
        tasks: [
          { t: "3-category ideas: 3 topics, 6 ideas each in 3 min" },
          { t: "Essay: 38 min alarm. Task 2." },
          { t: "Task 1: 18 min alarm." },
        ],
      },
      {
        title: "Speaking — Organizing + Multiple Subjects",
        tag: "sp",
        tasks: [
          { t: "Part 1: 10 topics. 2–3 sentences. No pauses. Record." },
          { t: "Part 2: 4 cue cards. P-R-E bullets. 2 min each. Record." },
          { t: "Part 3: 8 complex questions on varied subjects. 2 min each." },
          { t: "Listen back: use of connectors? organized flow? vocabulary range?" },
        ],
      },
      {
        title: "Reading — Sentence Matching + Heading",
        tag: "r",
        tasks: [
          { t: "15 Sentence Matching + 15 Matching Headings" },
          { t: "Every mistake: paraphrase pair in notebook" },
        ],
      },
      {
        title: "Reading — Understanding Text",
        tag: "r",
        tasks: [
          { t: "1 passage. Read once (4 min). Close. Write 3 sentences about it." },
          { t: "Open. Check. Note: which topic areas are hardest to understand?" },
        ],
      },
    ],
    targets: ["Mock: all 4 skills", "Error analysis: complete", "Writing: essay 38 min + T1 18 min", "Speaking: 8 organized Part 3", "Matching: 24+/30", "Understanding: 80%+ on first read"],
  },
];

export const FRIDAY_CATCHUP = {
  name: "Friday — Catch-up / Rest",
  badges: ["p"],
  blocks: [
    {
      title: "Catch-up / Rest",
      tag: "p",
      tasks: [
        { t: "If tasks from Tue–Thu were missed, complete them now." },
        { t: "If fully caught up — Review paraphrase notebook — all pairs from the week." },
        { t: "If fully caught up — Review vocabulary bank — all phrases." },
        { t: "If fully caught up — Do 1 light reading passage (18 min) for maintenance." },
        { t: "If fully caught up — Listen to 1 Cambridge listening section for ear training." },
        { t: "If fully caught up — REST. Walk. Sleep. Recover." },
      ],
    },
  ],
  targets: ["Catch up on any missed Tue–Thu tasks, OR rest fully if already caught up"],
};

export const TAPER1 = {
  name: "Taper Day 1 (3 days before exam)",
  badges: ["p"],
  blocks: [
    {
      title: "Taper — Light Only",
      tag: "p",
      tasks: [
        { t: "Light reading passage only (no full mock)" },
        { t: "Light listening section only" },
        { t: "Review strategy card" },
        { t: "Pack exam bag" },
      ],
    },
  ],
  targets: ["Light reading + listening only", "Strategy card reviewed", "Exam bag packed"],
};

export const TAPER2 = {
  name: "Taper Day 2 (2 days before exam)",
  badges: ["p"],
  blocks: [
    {
      title: "Taper — Final Weakness Attack",
      tag: "p",
      tasks: [
        { t: "Final weakness attack: 15 questions of worst type only" },
        { t: "Final vocabulary review" },
        { t: "Final strategy card read-through" },
        { t: "NO heavy study after 15:00" },
      ],
    },
  ],
  targets: ["15 questions of worst type done", "Vocabulary reviewed", "No study after 15:00"],
};

export const EXAM_EVE = {
  name: "Exam Eve (1 day before exam)",
  badges: ["p"],
  blocks: [
    {
      title: "Exam Eve — Wind Down",
      tag: "p",
      tasks: [
        { t: "Light warm-up ONLY (1 passage + 1 listening section)" },
        { t: "Read strategy card 3 times — memorise it" },
        { t: "Pack: ID, 3 pencils + spare, eraser, sharpener, water, admission letter" },
        { t: "Set 2 alarms: 04:00 + 04:15 AM" },
        { t: "NO studying after 15:00" },
        { t: "Sleep by 20:30 (8 hours minimum)" },
      ],
    },
  ],
  targets: ["Light warm-up only", "Strategy card memorised", "Bag packed", "Asleep by 20:30"],
};

export const EXAM_DAY_TASKS = {
  blocks: [
    {
      title: "Morning",
      tag: "p",
      tasks: [
        { t: "Wake 04:00. Cold shower. Light breakfast." },
        { t: "Read strategy card ONE time." },
        { t: "Arrive 45–60 min early." },
        { t: "Execute the system. Trust the training." },
      ],
    },
  ],
  stratRules: {
    READING: [
      "Alarm 1: 18 min -> Passage 1 DONE (guess any left, move on)",
      "Alarm 2: 38 min -> Passage 2 DONE (move on)",
      "Alarm 3: 58 min -> ALL answered (never leave blank)",
      "Stuck? -> 60 sec max -> GUESS -> MOVE ON",
      "Matching Headings -> ALWAYS last 5 min",
      "NEVER search for exact words -> search for MEANING / PARAPHRASE",
      'Panic? -> stop 3 sec, one breath, "I trained for this", continue',
    ],
    LISTENING: [
      "Read ALL questions BEFORE audio starts",
      "Write while listening — don't wait until end",
      "Section 4 = maximum concentration, do not panic",
      "Spelling counts -> double-check numbers and dates",
    ],
    WRITING: [
      "Task 1: 20 min (150+ words, describe all data/stages/changes)",
      "Task 2: 40 min (250+ words, 4 paragraphs)",
      "Structure: Intro -> Body 1 -> Body 2 -> Conclusion",
      "Never leave either task unfinished",
    ],
    SPEAKING: [
      "Speak immediately — no silence >2 seconds",
      'If stuck: "That\'s an interesting question. I think..."',
      "Use connectors: However / Although / In contrast / Furthermore / As a result",
      "Extend EVERY answer — never give one sentence only",
      "P-R-E: Position -> Reason -> Example",
    ],
  },
  targets: ["Reading: Band 5.5+", "Listening: Band 6.0+", "Writing: Band 6.0+", "Speaking: Band 6.5+", "Overall: Band 6.0+ — break the 6.0 ceiling"],
};

export const WEAKNESSES = {
  listening: [
    '"Power of listening" — reach the level where you understand EVERY SINGLE CONTEXT WORD in the audio.',
    "Reading questions in the time given COMPLETELY with full understanding before the audio starts.",
  ],
  reading: [
    "Understanding complex science / scientific texts.",
    "Improving vocabulary IN texts (academic word recognition).",
    "Mastering Matching Sentence, Matching Heading, Feature Sentence — not getting them wrong.",
    "Fewer False vs Not Given mistakes.",
  ],
  writing: [
    "Practice Maps + Diagrams (biggest Task 1 gap).",
    "Practice Task 2 idea generation.",
    "Practice Cause, Problem, and Solution essays.",
    "Improve Writing from 5.5 to 6.0.",
  ],
  speaking: [
    "Watch out for grammar mistakes when talking.",
    "Follow the formula 100%: Section 1 brief answer + additions; Section 2 answer+explanation+example+conclusion; Section 3 deep explanation+example.",
    "Organise thoughts when speaking.",
    "Practice multiple areas / subjects.",
  ],
  meta: "Text understanding is THE most important task of all — this is priority #1 above everything else.",
};

// ── Calendar constants ──────────────────────────────────────────
export const IELTS_START = new Date(2026, 7, 8); // 08 Aug 2026
export const IELTS_EXAM1 = new Date(2026, 9, 6); // 06 Oct 2026
export const IELTS_EXAM2 = new Date(2026, 9, 27); // 27 Oct 2026
export const IELTS_TOTAL_DAYS = 59;
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function fmtDate(d) {
  return `${WD[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
export function dayDiff(a, b) {
  return Math.round((b - a) / 86400000);
}

// Builds the full 59-day schedule + exam day, deterministically, from
// the calendar constants above. Pure function — same output every call.
export function buildIeltsSchedule() {
  const schedule = [];
  let typeIdx = 0;
  for (let i = 0; i < IELTS_TOTAL_DAYS; i++) {
    const d = new Date(IELTS_START);
    d.setDate(IELTS_START.getDate() + i);
    const dayNum = i + 1;
    const toExam = dayDiff(d, IELTS_EXAM1);
    let tpl,
      kind = "study",
      includeHabits = true;
    if (toExam === 1) {
      tpl = EXAM_EVE;
      kind = "eve";
      includeHabits = false;
    } else if (toExam === 2) {
      tpl = TAPER2;
      kind = "taper2";
      includeHabits = false;
    } else if (toExam === 3) {
      tpl = TAPER1;
      kind = "taper1";
      includeHabits = true;
    } else if (d.getDay() === 5) {
      tpl = FRIDAY_CATCHUP;
      kind = "friday";
      includeHabits = true;
    } else {
      tpl = DAYTYPES[typeIdx % DAYTYPES.length];
      typeIdx++;
      kind = "study";
      includeHabits = true;
    }

    const blocks = tpl.blocks.map((b, bi) => ({
      id: `d${dayNum}_b${bi}`,
      title: b.title,
      tag: b.tag,
      tasks: b.tasks,
    }));
    if (includeHabits)
      blocks.push({
        id: `d${dayNum}_habits`,
        title: DAILY_HABITS.title,
        tag: DAILY_HABITS.tag,
        tasks: DAILY_HABITS.tasks,
      });

    schedule.push({
      day: dayNum,
      date: d,
      label: tpl.name,
      kind,
      badges: tpl.badges || ["p"],
      blocks,
      targets: tpl.targets,
      scores: kind === "study" ? [{ k: "r", l: "Reading /40" }, { k: "l", l: "Listening /40" }, { k: "w", l: "Writing task" }] : [],
    });
  }

  const examBlocks = EXAM_DAY_TASKS.blocks.map((b, bi) => ({
    id: `exam_b${bi}`,
    title: b.title,
    tag: b.tag,
    tasks: b.tasks,
  }));
  schedule.push({
    day: IELTS_TOTAL_DAYS + 1,
    date: IELTS_EXAM1,
    label: "🎯 EXAM DAY — First IELTS Test",
    kind: "exam",
    badges: ["exam"],
    blocks: examBlocks,
    targets: EXAM_DAY_TASKS.targets,
    scores: [{ k: "r", l: "Reading Band" }, { k: "l", l: "Listening Band" }, { k: "w", l: "Writing Band" }, { k: "sp", l: "Speaking Band" }],
    stratRules: EXAM_DAY_TASKS.stratRules,
  });

  return schedule;
}

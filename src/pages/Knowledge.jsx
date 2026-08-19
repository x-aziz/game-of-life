import { useState, useMemo } from "react";
import {
  BookOpen,
  Quote,
  Lightbulb,
  Target,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  Star,
  Zap,
  Bell,
  BookMarked,
  FileText,
  Mic,
  Globe,
  PenLine,
  Layers,
  CheckCircle2,
  Package,
  Megaphone,
  ShoppingCart,
  TrendingUp,
  MessageSquare,
  Brain,
  Flame,
  Shield,
  AlertCircle,
  ArrowRight,
  DollarSign,
  BarChart2,
  Users,
  Eye,
} from "lucide-react";

const C = {
  paper: "#fffde0",
  border: "#b8a000",
  accent: "#ffe600",
  accentDk: "#c8a000",
  text: "#1a1a00",
  muted: "#6b5900",
  faint: "#f5edcc",
};

const SEED = [
  {
    id: "k1",
    type: "notebook",
    pinned: true,
    rating: 5,
    status: "completed",
    date: "2018-01-01",
    category: "philosophy",
    title: "Personal Copybook — Foundational Flyleaf",
    titleAr: "دفتر المعرفة الشخصي — الصفحة الأولى",
    author: "Said Abdelaziz",
    source: "Personal Notebook (Circa 2018–2021)",
    quote: "حوادثُ، قد لا تثير اهتمامك — أمرّ منها مروراً وأحيا عليها شهور",
    quoteEn:
      '"Incidents that might not even catch your attention — I pass through them, and I live off them for months."',
    lessons: [
      "Deep observation: you extract fuel from micro-events that others dismiss entirely.",
      "Every failure, mentor conversation, or small win is raw data to be analyzed for months — not just processed and forgotten.",
      'Your internal "Lessons of the Day" feedback loop was running long before you formalized it in a productivity system.',
    ],
    execution:
      "This is the architectural origin of your Debt Paper, your Brain Dump, and your daily evaluation habit. When you met Prof. Riyadh Baghdadi once at a conference, you extracted motivation for months. When you failed IELTS twice, you turned it into a 17-day battle plan. This quote explains why.",
    reminders: [
      "What micro-event happened today that I haven't processed deeply enough yet?",
      "A single conversation today could fuel a month of execution — write it down.",
    ],
    ruleLink:
      "Rule 15: Watch your progress every day. Rule 2: Extract maximum value from every event.",
    tags: [
      "mindset",
      "philosophy",
      "self-awareness",
      "reflection",
      "foundation",
    ],
  },

  {
    id: "k2",
    type: "notebook",
    pinned: true,
    rating: 5,
    status: "completed",
    date: "2022-06-21",
    category: "entrepreneurship",
    title: "The 1% Curriculum — Day Zero Blueprint",
    titleAr: "منهج الـ 1% — يوم البداية",
    author: "Said Abdelaziz",
    source: "Personal Copybook | June 21, 2022 — Age 19",
    quote: "إبحث عن الحقيقة بنفسك وستراني هناك",
    quoteEn:
      '"Search for the truth by yourself, and you will see me there." — Written at 19 on the day you declared your own curriculum.',
    lessons: [
      "The 1% identity was not a reaction to success — it was a decision made before any result existed. You branded yourself as elite before a single achievement was recorded.",
      "Steve Jobs dot-connecting philosophy adopted at 19. Every skill listed (logo, accounting, English) was a weapon, not a hobby.",
      "You built your own university syllabus 3 months before classes started — institutions were a tool for you, not a destination.",
    ],
    execution:
      'Your 2022 list vs 2026 reality:\n• "programming" → Laravel 10, MERN, 98.5/100 bootcamp\n• "english" → IELTS 7.0\n• "Building a project" → GREEN LOOP (1st place 38 teams), PIRIMI\n• "Marketing" → LinkedIn 3,572 followers at 22\n• "travelling" → September 2026, Manchester, Salford MSc\nEvery dot connected.',
    reminders: [
      "Am I treating today as part of the 1% curriculum — or am I being a consumer?",
      '"All the dots will be connected one day." — What dot am I laying today?',
    ],
    ruleLink:
      "Rule 6: Escape neighbourhood thinking. Rule 20: 19→25 is the only window. Rule 14: Leave the comfort zone.",
    tags: [
      "1%",
      "curriculum",
      "self-directed",
      "blueprint",
      "day-zero",
      "steve-jobs",
      "age-19",
    ],
    curriculumMap: {
      col1: [
        "Computers",
        "Phones",
        "Cars",
        "Cards",
        "Projects",
        "Building a project",
        "Marketing",
        "Travelling",
      ],
      col2: [
        "Trades",
        "Encounters",
        "Sites",
        "Culture",
        "Camera",
        "Photography",
        "Programming",
        "Grants",
      ],
      col3: [
        "E-commerce",
        "Currencies",
        "Skills",
        "Podcasts",
        "Logo",
        "Accounting",
        "English",
      ],
    },
    ghostText:
      'The ink bleeding through revealed: "Hello, do you offer dropshipping service for this product?" — you were already messaging Chinese suppliers from your bedroom at 19.',
  },

  {
    id: "k3",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-07-01",
    category: "business",
    title: "Principles of E-Commerce — 6-Step International Pipeline",
    titleAr: "مبادئ التجارة الإلكترونية — خط عمليات دولي",
    author: "Said Abdelaziz",
    source: "Personal Copybook | June–July 2022",
    quote:
      "لا توجد ضمانات — Positive Feedback 90%↑ · Rating 4.5↑ · Reviews 100↑",
    quoteEn:
      '"There are no guarantees." — So you replaced gut-feel with hard metrics. Success is statistical, not emotional.',
    lessons: [
      "Success is statistical, not emotional. Hard thresholds (90%+ feedback, 4.5+ rating, 100+ reviews) eliminated guesswork. This analytical DNA later shaped your IELTS battle plan and Firebase decisions.",
      "You naturally think in ecosystems. YouCan + Canva + Namecheap + AliExpress = complete infrastructure built before you took a single CS class.",
      "Geographic limits are mental constructs. From Ghardaia at 19, you mapped: China supplier → Amazon USA research → global customer.",
    ],
    execution:
      "The 6-step pipeline you wrote in 2022 is the same logic you applied to every system:\n2022: Product → Supplier → Ad → Store → Campaign → Fulfill\n2024 Hackathon: Problem → Stack → Pitch → Deploy → Present → Win (1st, 38 teams)\nThe pipeline never changed. Only the domain evolved.",
    reminders: [
      "Am I making this decision emotionally or statistically? What is my 90%+ threshold?",
      "What ecosystem am I building — not just one tool, but the full infrastructure?",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 19: Accomplish quickly. Rule 11: Work super hard.",
    tags: [
      "e-commerce",
      "dropshipping",
      "SOP",
      "supply-chain",
      "business",
      "pipeline",
      "data-driven",
      "age-19",
    ],
    sopPipeline: [
      { step: 1, ar: "البحث عن منتج رابح", en: "Search for a winning product" },
      { step: 2, ar: "إيجاد مورد مناسب", en: "Find a suitable supplier" },
      {
        step: 3,
        ar: "إنشاء إعلان مناسب",
        en: "Create a suitable advertisement",
      },
      {
        step: 4,
        ar: "البدأ بتأسيس متجرك",
        en: "Start establishing your store",
      },
      { step: 5, ar: "إطلاق الحملة الإعلانية", en: "Launch the ad campaign" },
      {
        step: 6,
        ar: "تلبية الطلبات وتواصل مع عملاء",
        en: "Fulfill orders & communicate with clients",
      },
    ],
    productCriteria: [
      { ar: "يلبي الإحتياجات", en: "Meets a real need" },
      { ar: "جديد", en: "New / trending" },
      { ar: "يحل مشاكل", en: "Solves a real problem" },
      { ar: "يمكن إرساله كهدية", en: "Can be sent as a gift" },
      {
        ar: "صعب الإيجاد في الأسواق العادية",
        en: "Hard to find in normal markets",
      },
      { ar: "يكون order عالي", en: "High order volume / history" },
    ],
    supplierMetrics: [
      { metric: "Positive Feedback", threshold: "90%+", color: "#228b22" },
      { metric: "Seller Rating", threshold: "4.5+", color: "#c8a000" },
      { metric: "Reviews", threshold: "100+", color: "#1d4ed8" },
    ],
    supplierScript:
      "Hey, do you offer dropshipping service for this product?\nOkay, I'll start dropshipping your [product].\nPlease don't include any invoice or logo in my order.",
    techStack: [
      {
        tool: "YouCan",
        role: "Store builder",
        ar: "موقع لإنشاء متجر إلكتروني",
      },
      { tool: "Canva", role: "Branding / Logo", ar: "إنشاء logo" },
      { tool: "Namecheap", role: "Domain", ar: "شراء domain" },
      { tool: "AliExpress", role: "Supply (China)", ar: "مصدر المنتجات" },
      {
        tool: "Amazon USA",
        role: "Product research",
        ar: "بحث عن منتجات رابحة",
      },
      {
        tool: "Dropshero",
        role: "Winning products",
        ar: "يعرض المنتجات الرابحة",
      },
    ],
  },

  {
    id: "k4",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-04-01",
    category: "psychology",
    title: "The Art of Not Giving a F*ck — Stoic Emotional Calibration",
    titleAr: "فن اللامبالاة — المعايرة العاطفية الرواقية",
    author: "Mark Manson",
    source: "Storytel audiobook | Spring 2022",
    quote:
      "تجنب المعاناة ليست إلا شكل من أشكال المعاناة — الحياة عبارة عن سلسلة من مشاكل",
    quoteEn:
      '"Avoiding suffering is nothing but a form of suffering itself. Life is a series of problems — happiness comes from solving them, not from their absence."',
    lessons: [
      "Algorithmic Stoicism: Life is a series of problems. Happiness isn't the absence of bugs — it's the active process of fixing them. You view life like a debugger views code.",
      "You cannot achieve a dream without embracing its specific suffering. Choosing only the bright side while avoiding the cost is why most people fail.",
      "Comparisons are always bad: you compare the best of what another person has with the worst of what you have. The fix: stop comparing and use your own metrics.",
    ],
    execution:
      'This framework became the foundation of your emotional architecture. Before PIRIMI, before Salford, before IELTS — you decided at 19 that suffering is the fuel, not the enemy. Your late nights, the isolation, the IELTS failures — accepted as the cost of the dream, not resisted. "Experience all the pain in your youth to guarantee wisdom in your old age."',
    reminders: [
      "Am I trying to avoid a type of suffering — or choosing the right type for my goal?",
      "What comparison am I making right now that is destroying my focus? Stop. Use your own metrics.",
      "السعادة تأتي بحل المشاكل — what problem am I solving today?",
    ],
    ruleLink:
      "Rule 11: Work super hard — 100%. Rule 16: Go to bed exhausted every night. Rule 17: No rest until you achieve.",
    tags: [
      "stoicism",
      "suffering",
      "emotional-calibration",
      "mark-manson",
      "psychology",
      "age-19",
      "foundation",
    ],
  },

  {
    id: "k5",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-05-01",
    category: "mindset",
    title: "Cognitive Error Correction Engine — Think 6× Before Acting Once",
    titleAr: "محرك تصحيح الأخطاء المعرفية",
    author: "Said Abdelaziz",
    source: "Personal Copybook | May–June 2022",
    quote: "لكي تكون على صواب إعتقد دائماً انك مخطئ — فكر 6 مرات وطبق مرة",
    quoteEn:
      '"To eventually be right, always operate under the assumption that you are currently wrong. Think 6 times and execute once."',
    lessons: [
      "Radical Intellectual Humility: Forcing yourself to think you are wrong to discover what is right is engineering mindset — testers run edge cases to break a system; you run edge cases on your own beliefs.",
      "The Control Metric: Goals you can directly control (building functional things) generate clear progress. Goals outside your control (fame, validation) guarantee uncontrolled suffering.",
      "Exceptional people recognize their true strengths based strictly on reality — not ego, not wishful thinking.",
    ],
    execution:
      "You applied this cold framework when choosing Salford over other universities: strip the emotional appeal, map the controllable variables (visa, course depth, cost, UK job market), execute once. Same logic drove your IELTS battle plan — 17 days of systematic work after identifying every specific weakness category.",
    reminders: [
      "On this decision I am about to make — where am I assuming I am right when I might be wrong?",
      "Is this goal within my direct control or outside it? If outside — redesign the goal.",
      "فكر 6 مرات وطبق مرة — have I actually thought through all 6 angles?",
    ],
    ruleLink:
      "Rule 9: Be open and humble before experts. Rule 15: Watch your progress — evaluate with data not emotion.",
    tags: [
      "error-correction",
      "intellectual-humility",
      "control-metric",
      "first-principles",
      "cognitive-architecture",
      "2022",
    ],
  },

  {
    id: "k6",
    type: "book",
    pinned: true,
    rating: 5,
    status: "completed",
    date: "2022-07-01",
    category: "finance",
    title: "Rich Dad Poor Dad — Asset vs. Liability Architecture",
    titleAr: "الأب الغني والأب الفقير",
    author: "Robert Kiyosaki",
    source: "Personal Copybook | July–August 2022 — Age 19",
    quote:
      "كل دولار تخبئه في أصولك هو موظف يعمل من أجلك — الوظيفة مؤقتاً لبناء مشروع",
    quoteEn:
      '"Every dollar in your asset column is an automated employee working for you around the clock. A job is simply a temporary cash-flow engine to fund your own enterprise."',
    lessons: [
      "The Code-Asset Analogy: A developer's script automates labor; a dollar in equity automates wealth. You blended these two ideas at 19, which is why PIRIMI and your Laravel platforms are designed to scale without you.",
      "Venture Deconstruction (Ray Kroc/McDonald's): The true business isn't the burger — it's the real estate. The front-facing product is the vehicle; the underlying asset engine generates wealth. This explains your focus on backend architecture over surface UI.",
      "Calculated Use of Employment: Your DELFIV role was not a career — it was a strategic move to master complex platforms, study business systems, and fund your long-term build. Every employer since has been a classroom.",
    ],
    execution:
      "The UK financial strategy: Salford = credentialing asset. UK network = relationship capital. MSc = launchpad for the UK venture you will build during the programme. The 10–15 year sprint: master capital intensely, then pivot to innovation and knowledge authorship.",
    reminders: [
      "كل دولار في أصولك هو موظف — how many automated employees did I add this week?",
      "Am I using my current role as a launchpad or treating it as a destination?",
      "Rich focus on Net Worth. Poor focus on income. Which metric did I track today?",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 2: Focus on skills that will be income. Rule 20: 19→25 is the only window.",
    tags: [
      "rich-dad-poor-dad",
      "kiyosaki",
      "assets",
      "liabilities",
      "financial-literacy",
      "ray-kroc",
      "entrepreneurship",
      "age-19",
    ],
    wealthVsPoorMatrix: [
      { wealthy: "Focuses on Net Worth", poor: "Focuses on monthly income" },
      {
        wealthy: "Assets generate more assets",
        poor: "Salary → taxes → bills → food → housing",
      },
      {
        wealthy: "Uses job as launchpad",
        poor: "Job is the destination and safety net",
      },
      {
        wealthy: "Buys assets first",
        poor: "Accumulates liabilities believing they are assets",
      },
    ],
  },

  {
    id: "k7",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-09-01",
    category: "entrepreneurship",
    title:
      "The 8h/16h Execution Contract — Knowledge is the Only Capital You Need",
    titleAr: "عقد التنفيذ 8/16 ساعة",
    author: "Said Abdelaziz",
    source: "Personal Copybook | Autumn 2022 — University Year 1",
    quote:
      "من لا يتكلم أدوات القرن 21 سيهلك — إجعل وظيفتك لغرض التعلم لا للحصول على المال",
    quoteEn:
      '"Those who fail to master the digital tools of the 21st century will become obsolete. Treat your job as an elite training ground to learn systems, not just a paycheck."',
    lessons: [
      "The 8/16 Time Split: 8 hours for your day job to learn and survive; 16 hours to build your own assets. This discipline explains how you simultaneously completed a CS degree, worked at DELFIV, built PIRIMI, and won the Eco Hackathon against 38 teams.",
      "Knowledge Extraction Rule: Treat every workplace as an intelligence operation. When you joined DELFIV in IT support, you weren't fixing computers — you were studying internal business logic to later automate and build better versions.",
      "You do not need raw capital to start — you need specialized knowledge. Fear is just an unoptimized emotional metric for an active worker.",
    ],
    execution:
      "You are living this contract right now. September 2026 → Manchester → MSc Entrepreneurship. The 8 hours are academic and part-time income hours. The 16 hours are build hours for the UK venture you will launch during the programme. Same contract, higher altitude.",
    reminders: [
      "How many hours did I actually dedicate to building my own assets today — not consuming, building?",
      "What specific knowledge did I extract from today's environment that I can deploy in my own systems?",
      "من لا يتكلم أدوات القرن 21 سيهلك — which 21st-century tool am I weakest in right now?",
    ],
    ruleLink:
      "Rule 1: Summarize and learn after class. Rule 2: Work on earning during days off. Rule 11: 100% of daily habits.",
    tags: [
      "time-management",
      "8-16-split",
      "knowledge-extraction",
      "execution",
      "21st-century",
      "delfiv",
      "university-year-1",
    ],
  },

  {
    id: "k8",
    type: "notebook",
    pinned: true,
    rating: 5,
    status: "completed",
    date: "2022-07-15",
    category: "neuroscience",
    title: "Dopamine Architecture — The Creator Loop vs. The Consumption Trap",
    titleAr: "هندسة الدوبامين — حلقة الإنتاج مقابل فخ الاستهلاك",
    author: "Said Abdelaziz",
    source:
      "Personal Copybook | July–August 2022 (with hand-drawn molecular diagram)",
    quote:
      "الشغف يشتغل بالدوبامين — كلما أنتجت للحصول على DUP سيتوقف وتبدأ تنتج أكثر",
    quoteEn:
      '"Passion runs on Dopamine. The more you produce to get dopamine, the more your system drives you to produce even more. Addiction = dopamine via Consumption. Passion = dopamine via Creation."',
    lessons: [
      "Biochemical Self-Engineering: You drew the molecular structure of dopamine (C₈H₁₁NO₂) from scratch — benzene ring, hydroxyl groups, amine chain. You refused surface-level explanations and went to the literal molecule, treating your brain's chemistry as a system to optimize.",
      "The Creator Loop: Shopping/binging/gaming → dopamine via consumption → baseline drops → addiction. Teaching/inventing/engineering → dopamine via creation → baseline drops → passion. Same chemical. Different input source. You chose creation at 19.",
      "Serotonin is the completion hormone — it arrives after you finish a task. This is why shipping code and hitting milestones feels deeply satisfying. Your biology rewards completion, not activity.",
    ],
    execution:
      "This is exactly why you cut short-form video content. You recognized the consumption trap in your notebook in 2022 and designed your environment: DA7I7 podcast instead of Instagram, books instead of TikTok, building platforms instead of watching others build. This one decision compounded into your entire technical portfolio.",
    reminders: [
      "Where is my dopamine coming from today — creation or consumption?",
      "Am I shipping something today or just consuming? If consuming → what am I building with what I consumed?",
      "When idle time appears, my brain will seek dopamine. Am I routing it to creation or consumption?",
    ],
    ruleLink:
      "Rule 12: No Instagram, No Telegram, No Facebook. Rule 11: 100% of daily habits. Rule 13: Read before bed.",
    tags: [
      "dopamine",
      "neuroscience",
      "creator-loop",
      "consumption",
      "passion",
      "habit-design",
      "biochemistry",
      "C8H11NO2",
    ],
    dopamineMap: {
      consumption: {
        activities: ["Shopping", "Binging / Watching", "Gaming", "Scrolling"],
        result: "Addiction loop — baseline drops, you chase more",
      },
      creation: {
        activities: [
          "Engineering",
          "Teaching",
          "Building",
          "Inventing / Drawing",
        ],
        result: "Passion loop — baseline drops, you build more",
      },
      molecule: "C₈H₁₁NO₂ — Dopamine (hand-drawn by Said, 2022)",
    },
  },

  {
    id: "k9",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-10-01",
    category: "mindset",
    title: "The 7 Habits of Highly Effective People — Farm Theory Matrix",
    titleAr: "العادات السبع للناس الأكثر فاعلية — نظرية المزرعة",
    author: "Stephen Covey (1932–2012)",
    source: "Personal Copybook | Autumn 2022",
    quote:
      "التغيير الجذري يبدأ من الداخل إلى الخارج — إذا زرعت فكرة حصدت فعل، إذا زرعت فعل حصدت عادة، إذا زرعت عادة حصدت شخصية، إذا زرعت شخصية حصدت مصير",
    quoteEn:
      '"Radical transformation must always be executed from the inside out. Sow an Idea → reap an Action. Sow an Action → reap a Habit. Sow a Habit → reap a Character. Sow a Character → reap a Destiny."',
    lessons: [
      "The Farm Theory: People fail at change because they try to jump from Idea directly to Destiny overnight. Real growth is a farm — you plant, cultivate, and wait. The 5-stage change pipeline: Idea → Time → Practice → Planning → Review (weekly).",
      "Private Victory before Public Victory: Habits 1–3 (Dependence → Independence) before Habits 4–6 (Independence → Interdependence). You cannot build powerful networks if your internal OS still runs childhood dependence loops.",
      "Proactivity as Arbitrage: Moving before your environment forces you (proactive) means operating with leverage. Being forced to move means operating in survival mode. Proactivity compounds.",
    ],
    execution:
      "The Farm Theory explains your entire trajectory: at 19 you planted (20 rules, curriculum, discipline). At 22 you cultivated (BAC, bootcamp, DELFIV, hackathon). At 25 you harvest (Salford, MSc, UK launchpad). The weekly sprint review you wrote is identical to Agile: Plan → Practice → Review → Optimize → Score.",
    reminders: [
      "What seed am I planting today that I will harvest in 3 years?",
      "Am I operating in Private Victory mode or Public Victory mode right now?",
      "Weekly review: Idea I committed to this week → did I practice → did I plan → how do I score myself?",
    ],
    ruleLink:
      "Rule 15: Watch your progress every day. Rule 11: 100% of daily habits. Rule 18: Compensate every lost hour.",
    tags: [
      "stephen-covey",
      "7-habits",
      "farm-theory",
      "proactivity",
      "inside-out",
      "habit-design",
      "paradigm",
    ],
    farmTheory: [
      { sow: "فكرة (Idea)", reap: "فعل (Action)" },
      { sow: "فعل (Action)", reap: "عادة (Habit)" },
      { sow: "عادة (Habit)", reap: "شخصية (Character)" },
      { sow: "شخصية (Character)", reap: "مصير (Destiny)" },
    ],
    changePipeline: [
      "Idea (فكرة)",
      "Time (وقت)",
      "Practice (ممارسة)",
      "Planning (تخطيط)",
      "Review (مراجعة)",
    ],
  },

  {
    id: "k10",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-11-01",
    category: "psychology",
    title:
      "How to Win Friends and Influence People — Human Influence Architecture",
    titleAr: "كيف تكسب الأصدقاء وتؤثر على الناس — هندسة التأثير البشري",
    author: "Dale Carnegie (1888–1955)",
    source: "Personal Copybook | Autumn 2022",
    quote:
      'إذا أردت جمع العسل لا تهدم خلاياه — ضع الدود في صنارة — بدلها بالواو لا بـ "لكن"',
    quoteEn:
      '"If you want to gather honey, do not destroy the hive. Place the worm on the fishing hook. Never say BUT — always say AND."',
    lessons: [
      'The "And" Rule: "Your work is great BUT..." erases everything before it. "Your work is great AND next semester you will focus on mathematics" → opens the person instead of triggering defensiveness. One word change — infinite difference.',
      "The Egocentric Engine: In a group photo, the first person you look for is yourself. Every human is the main character of their universe. Structure all persuasion around what matters to them — not you.",
      "Principle 1 — Never criticize, condemn, or complain: Criticism carries zero utility and directly destroys relationships. Even Al Capone justified himself. No one ever sees themselves as the villain — criticism just triggers defensive loops.",
    ],
    execution:
      "At the Eco Hackathon (1st place, 38 teams), your ability to lead through persuasion and genuine interest in teammates' contributions — rather than ego criticism — was a core factor. In the UK, this becomes the foundation for networking at Salford and building co-founder partnerships.",
    reminders: [
      'Am I about to say "but"? Replace it with "and."',
      "Whose interests am I structuring this conversation around — mine or theirs?",
      "Before criticizing anyone today — ask: will this change anything, or just trigger their defensiveness?",
    ],
    ruleLink:
      "Rule 5: No rude words — ever. Rule 9: Be open and humble before experts.",
    tags: [
      "dale-carnegie",
      "influence",
      "communication",
      "persuasion",
      "relationships",
      "networking",
      "and-rule",
    ],
    carnegieRules: [
      {
        num: 1,
        ar: "لا تتهم ولا تلقي اللوم ولا تنتقد",
        en: "Never criticize, condemn, or complain",
      },
      {
        num: 2,
        ar: "ابدأ بالمدح الصادق والأمين",
        en: "Give sincere, honest appreciation",
      },
      {
        num: 3,
        ar: "ضع الدود في الصنارة",
        en: "Arouse an eager want — talk in terms of their interests",
      },
    ],
  },

  {
    id: "k11",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-12-01",
    category: "psychology",
    title:
      "Power of the Subconscious Mind + Who Moved My Cheese — Change Architecture",
    titleAr: "قوة العقل الباطن + من حرك قطعة جبني",
    author: "Joseph Murphy + Spencer Johnson & Kenneth Blanchard",
    source: "Personal Copybook | Winter 2022",
    quote:
      "العقل الباطن → 95% — العقل الواعي → 5% — أداة عقل باطن = تكرار — التغيير يحدث 100%",
    quoteEn:
      '"The subconscious runs 95% of your daily automation. The conscious controls only 5%. The subconscious programming tool = Repetition. Change is 100% inevitable — the only variable is which of 4 typologies you will be when it arrives."',
    lessons: [
      "The 95% Automation Drift: Your conscious mind (~15min memory, highly analytical) controls only 5% of your behavior. The subconscious (long-term storage, uncritical, 95%) drives everything automatically. Surface-level self-help fails because it addresses only 5% of the system.",
      'Repetition as the Subconscious Programming Tool: The subconscious only accepts information that is consistently repeated — exactly how advertising works. Never repeat a negative pattern. Always declare the positive: "أنا سعيد" not "أنا لست حزين."',
      "The 4 Change Typologies: (1) Moves before disruption → thrives. (2) Moves after disruption → survives. (3) Refuses to change → perishes. (4) Predicts change by probability before it arrives → dominates. Always operate as Type 4.",
    ],
    execution:
      "Your 20 rules, morning rituals, and DA7I7 podcast habit are the daily repetition protocol that writes directly to your subconscious 95%. Every prayer, every lesson summary, every page read before bed — you are running a write operation to your operating system. The UK move is a Type 4 decision: you predicted the Algerian tech ceiling before it became a wall and moved first.",
    reminders: [
      "What am I repeatedly saying to myself today — positive declaration or negative pattern?",
      "Which of the 4 change typologies am I operating as in my current situation?",
      "What is being written to my 95% by my daily environment? Is it what I want?",
    ],
    ruleLink:
      "Rule 4: Pray on time every day. Rule 6: Increase your thoughts. Rule 15: Evaluate yourself every day.",
    tags: [
      "subconscious",
      "joseph-murphy",
      "repetition",
      "change-management",
      "who-moved-my-cheese",
      "95-percent",
      "automation",
    ],
    changeTypes: [
      {
        type: 1,
        label: "Adapts before disruption",
        outcome: "Thrives — ends up stronger",
      },
      {
        type: 2,
        label: "Adapts after disruption",
        outcome: "Survives — damaged",
      },
      {
        type: 3,
        label: "Refuses to change",
        outcome: "Perishes — hardcoded for obsolescence",
      },
      {
        type: 4,
        label: "Predicts change by probability",
        outcome: "Dominates — moves before the market",
      },
    ],
  },

  {
    id: "k12",
    type: "book",
    pinned: true,
    rating: 5,
    status: "completed",
    date: "2023-01-01",
    category: "finance",
    title:
      "Secrets of the Millionaire Mind — Wealth Psychology & The Financial File System",
    titleAr: "أسرار عقل المليونير — علم نفس الثروة",
    author: "T. Harv Eker (1954–)",
    source: "Personal Copybook | Winter 2022–2023",
    quote:
      "الثراء على طريقة التفكير — المليونير يخسر ماله لكن لا يخسر معلوماته — أريد أن أهتم بالمال 10→15 سنة بعدها أحاول أبتكر",
    quoteEn:
      '"Wealth is a paradigm of thinking. A millionaire can lose every penny but never loses their knowledge of how money works. My plan: master capital for 10–15 years, then pivot entirely to invention and knowledge creation."',
    lessons: [
      "Upstream vs. Downstream: Poverty, debt, and low salary are NOT the root problem — they are downstream outcomes of inherited mental programming. The 3 inheritance vectors: Verbal Programming (what family said about money), Modeling (how family behaved with money), Specific Incidents (money traumas).",
      "The Financial File System: Your relationship with money is a file stored in your subconscious, inherited from family. The millionaire's file is optimized — the poor mind's file is obsolete. When money arrives, your brain automatically pulls up that file.",
      "The 3 Warning Signs of a Poor Mind: (1) Blame — always external. (2) Justification — elaborate excuses. (3) Complaining — victim archetype. The wealthy mind engineers opportunities, takes radical responsibility, and focuses entirely on solutions.",
    ],
    execution:
      "Your 10–15 year execution sprint: 2022–2037. Build the asset engine with maximum focus. After 2037 → author books, produce knowledge, invent systems. Your LinkedIn (3,572 followers at 22), your thesis (98.5/100), your Salford plan — all asset-building operations already running.",
    reminders: [
      "What is inside my inherited financial file? Have I audited it this year?",
      "Is my reaction right now Blame / Justification / Complaint — or Solution Engineering?",
      "الغني يركز على الفرص والفقير على العوائق — where is my focus right now?",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 18: Compensate every lost hour.",
    tags: [
      "millionaire-mind",
      "t-harv-eker",
      "wealth-psychology",
      "financial-programming",
      "poverty-mindset",
      "asset-engine",
    ],
    wealthVsPoorMatrix: [
      { wealthy: "Focuses on Net Worth", poor: "Focuses on monthly income" },
      { wealthy: "Focuses on Opportunities", poor: "Focuses on Obstacles" },
      {
        wealthy: "Lets fear push them to learn",
        poor: "Lets fear control their life",
      },
      {
        wealthy: "Takes radical responsibility",
        poor: "Blames external forces",
      },
    ],
  },

  {
    id: "k13",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-02-01",
    category: "psychology",
    title:
      "The Power of Now + Letting Go — Emotional Sovereignty & Hawkins Consciousness Scale",
    titleAr: "قوة الآن + السماح بالرحيل — السيادة العاطفية وسلم الوعي",
    author: "Eckhart Tolle (1948–) + David Hawkins (1927–2012)",
    source: "Personal Copybook | Early 2023",
    quote:
      "السر هو قوة الآن — الماضي والمستقبل عبارة عن وهم — الآن دواء — المواقف لا تؤلمنا بل المشاعر المرتبطة بها هي التي تؤلمنا",
    quoteEn:
      '"The secret is the power of the present moment. The past and future are illusions. The present is your medicine. External situations do not hurt you — it is the unreleased emotional files attached to those memories that cause the pain."',
    lessons: [
      "Root of Depression and Fear: We live chronically in the past (regret) or the future (anxiety). Childhood feels vibrant because children live entirely in the Now. Your untrained mind is the only entity pulling you away from the present moment.",
      "The 3 Failed Emotional Methods (Hawkins): (1) Suppression — buries it deeper. (2) Expression / Venting — amplifies and re-charges the negative loop. (3) Escape — movies, sport, scrolling. None heal. The only method: isolation + complete presence + allow the feeling fully without modification until it loses its grip.",
      "The Hawkins Consciousness Scale: 17 levels from Fear/Shame/Guilt (toxic zone) → Courage/Neutrality (transition) → Willingness/Acceptance/Reason/Love/Joy/Peace/Enlightenment (growth zone). Your target operating zone: Reason through Love.",
    ],
    execution:
      "Your daily architecture is an emotional sovereignty system: Prayer (5× per day = most powerful present-moment anchor you have — الصلاة هي مصدر الأقوى للتأمل), reading before bed (Tolle's deep focus), DA7I7 podcast (high-depth creation content). Combined, they process your emotional archive daily before it accumulates into depression.",
    reminders: [
      "Right now — am I in the past, the future, or the present? Return to NOW.",
      "What negative emotional file is active right now? Sit with it — don't suppress, don't vent, don't escape. Feel it fully until it passes.",
      "الآن دواء — when anxiety enters, disconnect from the thought stream and return to the immediate moment.",
    ],
    ruleLink:
      "Rule 4: Pray on time — in the mosque every day. Rule 13: Read before bed. Rule 15: Evaluate yourself every day.",
    tags: [
      "eckhart-tolle",
      "power-of-now",
      "david-hawkins",
      "letting-go",
      "emotional-sovereignty",
      "consciousness-scale",
      "present-moment",
      "prayer",
    ],
    hawkinsScale: {
      negative: [
        "Fear (الخوف)",
        "Grief / Sorrow (الحزن)",
        "Apathy (اللامبالاة)",
        "Guilt (الذنب)",
        "Shame (العار)",
      ],
      transition: [
        "Desire (الرغبة)",
        "Anger (الغضب)",
        "Pride (الكبرياء)",
        "Courage (الشجاعة)",
        "Neutrality (الحياد)",
      ],
      positive: [
        "Willingness (الاستعداد)",
        "Acceptance (القبول)",
        "Reason / Intellect (العقل)",
        "Love (الحب)",
        "Joy (البهجة)",
        "Peace (السلام)",
        "Enlightenment (التنوير)",
      ],
    },
  },

  {
    id: "k14",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-08-01",
    category: "entrepreneurship",
    title: "The 1-Page Marketing Plan — Know, Like, Trust System",
    titleAr: "خطة التسويق في صفحة واحدة",
    author: "Allan Dib",
    source: "Personal Copybook | 2022",
    quote:
      "Marketing is where money is — Nothing kills a business faster than a lack of oxygen (cash flow)",
    quoteEn:
      '"Marketing is not just advertising. It is the strategy that takes your target audience through: Know you → Like you → Trust you → Buy from you."',
    lessons: [
      "Marketing is not one thing — it is the unified architecture of Advertising + Promoting + Publicity + PR + Sales. Most people mistake one piece for the whole system.",
      "The Farmer vs. The Hunter: Hunters chase immediate transactions. Farmers cultivate long-term relationships. The harvest of a farmer dwarfs the hunter's daily catch. Build relationships, not just sales.",
      'Out of 1,000 people exposed to your campaign: 3% are ready to buy NOW, 7% are open to persuasion, 30% could buy later, 60% will never care. The key insight: if your message only says "Buy Now" you are fighting 97% of the room to reach 3%. Target the 40% instead.',
    ],
    execution:
      'For your Salford MSc Entrepreneurship launch: build your LinkedIn presence (3,572 followers already = database of leads). Use email + content to move cold audiences from "Know you" to "Trust you" before you ever pitch a service or product. Your multi-vendor platform (PIRIMI architecture) is the product — your personal brand is the funnel.',
    reminders: [
      "Am I talking about THEM (their problems, their needs) or about ME (my product, my company)? Flip it.",
      "Which stage are my connections in — Know / Like / Trust? What am I doing to move them forward today?",
      'Can I describe my product in ONE sentence? Steve Jobs: "1000 songs in your pocket."',
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 2: Focus on skills that will be future income.",
    tags: [
      "marketing",
      "1-page-plan",
      "know-like-trust",
      "farmer-vs-hunter",
      "prospects",
      "leads",
      "clients",
    ],
  },

  {
    id: "k15",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-09-20",
    category: "entrepreneurship",
    title:
      "E-Commerce DZ — Algerian Dropshipping Architecture & Success Formula",
    titleAr: "التجارة الإلكترونية الجزائرية — هندسة الدروبشيبينغ",
    author: "Said Abdelaziz",
    source: "Personal Copybook | Sept 2022 + E-Commerce DZ Course",
    quote:
      "التحدي ليس في إنشاء منصة أو BM — يوجد 4 أشياء تشغيل: Product && Price && Ads && Creative",
    quoteEn:
      '"The challenge is NOT in creating a platform or setting up a BM — those are copy-paste. The only variables that determine success are: Product × Price × Ads × Creative. If any = 0, Success = 0."',
    lessons: [
      "The Success Formula: Success = Product && Price && Ads && Creative [70%]. Everything else (platform, BM setup, niche selection) is copy-paste. The 4 variables are where 100% of your creative energy must go.",
      "The Engagement Ratio Rule: When Comments > Likes on a competitor ad → high probability of winning product → ad cost drops below $1 → thousands of orders. Optimal ratio: Likes ≈ Comments ≈ Shares within 30% of each other.",
      "The Pricing Equation (Algerian market): Cost 350 DA + Call Center 100 DA + Packaging 30 DA + Returns buffer 50 DA + Ad spend (CAC) 400 DA + Margin 500 DA = Retail price 1,150 DA. Delivery success rate must stay above 70% or all margin evaporates.",
    ],
    execution:
      "You already built the SOP for this in 2022. In the UK context: apply the same Product × Price × Ads × Creative formula to digital service selling (Laravel builds, MERN platforms, AI agents). The Meta BM warming protocol (small campaigns → engagement → traffic → conversion) mirrors startup growth hacking. Your PIRIMI multi-vendor architecture IS the Shopify equivalent — now fill it with products.",
    reminders: [
      "For any venture: Product × Price × Ads × Creative — which of the 4 is weakest right now?",
      "Am I targeting the right engagement ratios? High comments relative to likes = real buying intent.",
      "Happiness = Freedom = Control over time. E-commerce is not the goal — time sovereignty is.",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 19: Accomplish quickly. Rule 11: 100%.",
    tags: [
      "e-commerce",
      "dropshipping",
      "algeria",
      "meta-ads",
      "BM",
      "shopify",
      "success-formula",
      "creative",
    ],
    successFormula:
      "Success = Product && Price && Ads && Creative → if any variable = 0 → Success = 0",
  },

  {
    id: "k16",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-03-01",
    category: "mindset",
    title: "Atomic Habits — Identity-Based Habit Architecture",
    titleAr: "العادات الذرية — هندسة العادات القائمة على الهوية",
    author: "James Clear (1986–)",
    source: "Personal Copybook | 2023",
    quote:
      "حياتك التي تعيشها اليوم حدثت بسبب العادات الماضية — حياتك المستقبلية تعتمد على عادات اليوم",
    quoteEn:
      "\"Your current life is the lagging measure of your past habits. Your future life is entirely determined by the habits you execute today. Change your identity, not your goals — say 'I AM a builder' not 'I want to build'.\"",
    lessons: [
      'The Identity Shift: Never frame goals in the future tense ("I want to do X"). Anchor them in present identity ("I AM an X"). A person who says "I am an athlete" never skips the gym — a person who says "I want to lose 10kg" always eventually rebounds, because the identity never changed.',
      "The 3-Stage Habit Loop: Cue (the trigger) → Behavior (the action) → Reward (the signal to repeat). The CUE is the highest-leverage intervention point. To build a habit: make the cue obvious. To break a habit: make the cue invisible. You cannot add a habit without removing one, and cannot remove one without substituting.",
      "The 1% Aggregation Rule: Deconstruct any macro-habit into atomic sub-components. Improve each by 1%. Aggregated across time, fractional 1% improvements compound into 37× improvement over a year (1.01^365 = 37.78). This is why your daily 6-page Quran + cold water + Fajr routine matters — each is a 1% atomic deposit.",
    ],
    execution:
      "Applied directly to your UK transition: Gym clothes laid out the night before (cue) → gym is first appointment (behavior) → blood flow and mood lift (reward). Books placed in every room (environmental cue). No phone after Isha = reading cue. Your 20 rules ARE an atomic habit stack — each one is a designed cue-behavior-reward loop.",
    reminders: [
      "Who am I being right now — which identity am I operating from? Said the builder or Said the consumer?",
      "What cue can I make more visible to lock in the habit I am trying to build this week?",
      "Habit I want to break: what is the cue? How do I hide it completely?",
    ],
    ruleLink:
      "Rule 11: Work super hard — 100%. Rule 4: Pray on time every day. Rule 13: Read before bed.",
    tags: [
      "atomic-habits",
      "james-clear",
      "identity",
      "habit-loop",
      "cue-behavior-reward",
      "1-percent",
      "systems",
    ],
    habitLoop: [
      "Cue (الإشارة — make it obvious)",
      "Behavior (السلوك — make it attractive)",
      "Reward (المكافأة — make it satisfying)",
    ],
    layersOfChange: [
      "Outcomes / Goals (outer)",
      "Habits & Systems (middle)",
      "Identity (core — who you believe you are)",
    ],
  },

  {
    id: "k17",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-04-01",
    category: "tech",
    title: "Artificial Intelligence Architecture — From 1956 to 2026",
    titleAr: "هندسة الذكاء الاصطناعي — من 1956 إلى 2026",
    author: "Said Abdelaziz",
    source: "Personal Copybook — AI Course Notes",
    quote:
      "AI: theory and development of computer systems able to perform tasks that require human intelligence",
    quoteEn:
      '"Artificial Intelligence = visual perception + speech recognition + decision making + language translation. The three tiers: Narrow (ANI) → General (AGI) → Super (ASI). Python has all possible packages — it is the language of AI."',
    lessons: [
      "The 4 Catalysts of the Modern AI Boom: (1) More computational power, (2) Broad investment, (3) Big Data, (4) Better algorithms. Understanding WHY this moment is happening puts you ahead of 95% of developers who just use AI tools without understanding the engine.",
      "The Three Tiers of AI Evolution: Narrow AI (ANI) — task-specific, what exists today. General AI (AGI) — human-level across all domains, approaching fast. Super AI (ASI) — beyond human capability. You are entering Salford in September 2026 — AGI is the decade you will build your career in.",
      "Python is the dominant AI language because it has the largest ecosystem of packages (TensorFlow, PyTorch, scikit-learn, LangChain). Your existing Laravel + MERN stack experience is the business layer — Python + AI agents is the intelligence layer on top.",
    ],
    execution:
      "Your Salford MSc Entrepreneurship + Innovation thesis topic: AI agents for business process automation (the exact intersection of your full-stack skills + AI knowledge). Your PIRIMI multi-vendor platform + AI recommendation engine = a defensible UK startup thesis. This copybook entry from 2022-2023 predicted exactly where you would land.",
    reminders: [
      "Which AI sub-field am I weakest in right now — NLP, Computer Vision, or ML fundamentals?",
      "What business problem can I solve with Python + an LLM agent this week?",
      "من لا يتكلم أدوات القرن 21 سيهلك — AI is the primary tool of the 21st century.",
    ],
    ruleLink:
      "Rule 1: Learn new skills after class. Rule 10: Prioritize income-generating skills. Rule 19: Accomplish quickly.",
    tags: [
      "AI",
      "artificial-intelligence",
      "python",
      "machine-learning",
      "deep-learning",
      "NLP",
      "GPT",
      "salford",
      "tech",
    ],
    aiTiers: [
      {
        tier: "ANI — Artificial Narrow Intelligence",
        description:
          "Task-specific. ChatGPT, image recognition, translation. What exists today.",
      },
      {
        tier: "AGI — Artificial General Intelligence",
        description:
          "Human-level reasoning across all domains. The decade you are building in.",
      },
      {
        tier: "ASI — Artificial Super Intelligence",
        description: "Beyond human capability in all domains. The horizon.",
      },
    ],
  },

  {
    id: "k18",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-10-01",
    category: "entrepreneurship",
    title: "University Scholarships + Statement of Purpose Architecture",
    titleAr: "المنح الدراسية وهندسة خطاب النية",
    author: "Said Abdelaziz",
    source: "Personal Copybook — Scholarship Research Notes 2022",
    quote:
      "تسجل لـ 100 منحة تحصل واحدة — إبدأ التحضير مبكراً — الإنهاء يأخذ وقت",
    quoteEn:
      '"Apply to 100 scholarships to get one. Start preparation early. The completion takes significant time — begin well before any deadline. Knowledge is the only capital you need."',
    lessons: [
      "Statement of Purpose Architecture: Must be max 1 page. Frame the PROBLEM → position the university program as the SOLUTION → show YOUR SKILLS as proof you can execute → close with forward momentum. Never talk about yourself — talk about the problem you will solve and how the program enables it.",
      "Application Portfolio = Skills + Knowledge + Hobbies + Statement of Purpose + 2 Letters of Recommendation. The SOP opening: ① Define the problem. ② Present your solution/skills. ③ Leave an impression of progress and growth in the conclusion.",
      "The 100 Scholarship Rule (Data Expert Benhoun Taha): Apply to 100 scholarships to get 1. The filtering is statistical, not personal. Chevening UK requires IELTS + 2 years work experience. Cambridge: 80 fully-funded scholarships/year. Abdulla Al Ghurair Foundation funds Arabs worldwide.",
    ],
    execution:
      "This is the exact framework you used to get into Salford MSc Entrepreneurship & Innovation September 2026. The SOP template you designed at 19 (problem → skills → solution → impression of growth) became your application letter. The IELTS 7.0 after 3 attempts was the technical entry point. Result: Manchester. The preparation started years before the application.",
    reminders: [
      "For any application or pitch: What is the PROBLEM I am solving? How do MY SKILLS prove I can solve it?",
      "ابدأ بالسبب الصحيح لا تبدأ لكي يقول الناس انت رائع — start for the right reason, not validation.",
      "Apply to 100 opportunities to get 1. Volume + quality of targeting = results.",
    ],
    ruleLink:
      "Rule 14: Leave the comfort zone — seek opportunities. Rule 2: Explore scholarships and travel opportunities.",
    tags: [
      "scholarships",
      "chevening",
      "statement-of-purpose",
      "IELTS",
      "university",
      "salford",
      "application",
      "UK",
    ],
  },

  {
    id: "k19",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-05-01",
    category: "psychology",
    title: "Communication Mastery — Conversational Threading + Atomic Speaking",
    titleAr: "إتقان التواصل — التسلسل في المحادثة والكلام الذري",
    author: "Said Abdelaziz",
    source: "Personal Copybook — Communication Course Notes",
    quote:
      "Be efficient with your speaking — remove Uhm, Like, I guess, Well, You know — use pauses instead",
    quoteEn:
      '"The 100 Interaction Challenge: commit to 100 real physical interactions in 30 days. Spontaneous speaking is more prevalent than planned — your anxiety is not your enemy, greet it. A short sentence that lands beats a long paragraph that drifts."',
    lessons: [
      'Conversational Threading: Every sentence contains 3-4 hidden topic branches. State a rich sentence → let the other person choose which thread to pull. Example: "I went snowboarding for the first time with friends — it was much harder than it looked" opens: first-time experiences, winter sports, learning curves, friendship activities. Choose branches YOU genuinely care about.',
      'Use Statements not Questions: Instead of "What are you scared of?" say "I used to be terrified of the dark as a kid — I slept with my head under the covers to hide from monsters." This shares YOU, opens multiple threads, and builds intimacy faster than interrogation-style questions.',
      'Tip #18 — Efficiency Rule: Cut all filler words (Uhm, Like, I guess, Well, You know) — they carry zero informational value and signal low confidence. Tip #28: Use silence/pauses instead of fillers. A deliberate pause is 10× more powerful than "Uhm." Short + complete > long + filler.',
    ],
    execution:
      "Direct application for Salford: networking events, seminar Q&As, co-founder pitches. The 100 Interaction Challenge before September 2026. Every conversation is a threading exercise — plant 3-4 genuine topics, let them pull the thread. Your LinkedIn posts already do this — apply it in person.",
    reminders: [
      "What threads am I planting in my sentences today? Am I giving people things to engage with?",
      'Replace "I guess" / "You know" / "Uhm" with a breath and a pause.',
      "The 100 Interaction Challenge: how many real physical interactions have I had this week?",
    ],
    ruleLink:
      "Rule 8: Be confident — act as a man. Rule 5: No rude words. Rule 9: Be open and humble.",
    tags: [
      "communication",
      "conversational-threading",
      "public-speaking",
      "filler-words",
      "networking",
      "social-skills",
      "100-interactions",
    ],
  },

  {
    id: "k20",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-06-01",
    category: "mindset",
    title:
      "Business Model Canvas + Startup Architecture — The 4 Core Questions",
    titleAr: "نموذج العمل التجاري وهندسة الشركات الناشئة",
    author: "Said Abdelaziz",
    source: "Personal Copybook — BMC + Startup Seminar Notes",
    quote:
      "الفكرة هو تحويل النشاط التجاري التقليدي إلى منصة رقمية — الموارد البشرية هم الأساس ليس التكنولوجيا",
    quoteEn:
      '"Design your product WITH your customers — not for them. The 4 BMC questions: WHO are you helping? WHAT value do you offer? HOW do you deliver it? HOW MUCH capital does it require? Technology alone is never enough — people are the foundation."',
    lessons: [
      "The Business Model Canvas (Alexander Osterwalder): 9 building blocks reduce any business to: Customer Segments → Value Proposition → Channels → Customer Relationships → Revenue Streams → Key Resources → Key Activities → Key Partnerships → Cost Structure. The 4 macro questions: Who, What, How, How much — answer these before writing a single line of code.",
      "POC vs MVP: POC (Proof of Concept) = can this be built? MVP (Minimum Viable Product) = will someone pay for this? An idea that takes more than 2 years to reach market validation dies in the market. Build the minimum, test early, fail fast.",
      "The Biggest Challenge in Business is Competence (Steve Jobs): Bring together competent people → train them to the highest level of execution → step back and let them operate. The skill selection matrix: Leadership + Negotiation + Persuasion. Borrow money for investment (good). Borrow money to buy liabilities (bad). Correct decisions come from many mistakes → fail faster, produce faster.",
    ],
    execution:
      "This is your Salford MSc thesis architecture. The multi-vendor platform you built (PIRIMI architecture) = the HOW. The Algerian e-commerce gap you identified at 19 = the WHO and WHAT. Now in Manchester: apply the same BMC to the UK market gap you will identify during the MSc. Connections are everything — LinkedIn is your channel.",
    reminders: [
      "WHO am I helping? WHAT is my value proposition in ONE sentence? HOW do I deliver it? HOW MUCH does it cost to run?",
      "Am I building a POC (can it be built?) or an MVP (will they pay)? Which stage am I in?",
      "الإنسان يا إما يتطور أو ينزل لا يوجد ثبات — evolving or declining. No standing still.",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 19: Accomplish quickly. Rule 6: Think like the experts.",
    tags: [
      "BMC",
      "business-model-canvas",
      "startup",
      "MVP",
      "POC",
      "osterwalder",
      "entrepreneurship",
      "salford",
    ],
  },

  {
    id: "k21",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-10-15",
    category: "entrepreneurship",
    title: "Mentor Archive — 8 Ghardaia Seminar Profiles",
    titleAr: "أرشيف الموجهين — 8 ملامح من ندوات غرداية",
    author: "Said Abdelaziz",
    source: "Personal Copybook | Seminar Notes 2022–2023",
    quote:
      "القاع مزدحم يجب أن تبحث عن مكان فوق — الفرص علم النفس الحياة التي يجب استغلالها — connections هو كل شيء",
    quoteEn:
      '"The bottom is crowded — find a place at the top to escape the congestion. Opportunities are the life psychology that must be seized. Connections are everything."',
    lessons: [
      'Prof. Riad Baghdadi (MIT New York): "The single most important thing in this world — work on it, develop it, stay up late for its sake: what you love." Do not obsess over worldly status; care about what you love and you will live better than a millionaire. This is the man you met once at a conference and extracted fuel from for months.',
      "Dr. Walid Mosslem (Mind Hacker): Overcome fear from your youth. Surround yourself with English so your subconscious learns it effortlessly. The most critical element to sustain consistency is PURPOSE. Every journey begins with a single step. Shyness is what bars most people from most opportunities — you will realize this at an age when it is too late if you do not act now.",
      "Dros Online Framework: (1) Without Health everything else = 0. (2) The Bamboo Tree Rule: Sacrifices + Risks + Consistency + Discipline + Rejections + Criticism + Failures = Success. (3) Easy choices → Hard life. Hard choices → Easy life. (4) You will regret what you did NOT do far more than what you tried and failed.",
    ],
    execution:
      "These mentors appeared at different points in your Ghardaia years and each left a distinct imprint. Prof. Baghdadi = the permission to bet entirely on what you love. Dr. Walid Mosslem = the tactical English immersion + fear-elimination protocol. Dros Online = the Bamboo Tree equation that explains why your 4-year build looks like nothing from outside but will explode into view the moment it breaks the surface. At Salford, you are the bamboo in year 4.",
    reminders: [
      "أهم شيء واحد في هذه الدنيا وإشتغل عليه وطوره وإسهر من أجله — what is MY one thing today?",
      "Bamboo Tree Rule: am I still watering? The tree is growing underground even when nothing is visible.",
      "Easy choice vs. Hard choice — which am I making right now? Which life does each one lead to?",
    ],
    ruleLink:
      "Rule 8: Be confident — act as a man. Rule 14: Leave the comfort zone. Rule 20: 19→25 is the only window.",
    tags: [
      "mentors",
      "riad-baghdadi",
      "walid-mosslem",
      "dros-online",
      "ghardaia",
      "seminars",
      "bamboo-tree",
      "fear",
      "connections",
    ],
    mentorProfiles: [
      {
        name: "Prof. Riad Baghdadi",
        role: "Professor at MIT New York",
        keyLine:
          "Work on what you love — develop it — stay up late for it. You will live better than a millionaire.",
      },
      {
        name: "Dr. Abdelhak Hadj Aissa",
        role: "PhD Veterinary Medicine",
        keyLine:
          "12 Rules for Life. Peak window to discover passion: 18–25. Make all your thoughts logical. Write tomorrow's tasks even if circumstances are harsh.",
      },
      {
        name: "Data Expert Benhoun Taha",
        role: "Data Expert",
        keyLine:
          "Apply to 100 scholarships to get 1. Mathematics is the basis for everything. Listen to English for a year even if you don't understand.",
      },
      {
        name: "Dr. Hadj Mohamed Babaami",
        role: "Law Professor, University of Ghardaia",
        keyLine:
          "In harsh conditions, stay focused on your work. Never dismiss a beginning opportunity — 10 years later it could change everything.",
      },
      {
        name: "Dr. Mohamed Doumir",
        role: "Inventor, Author, Knowledge Scholar",
        keyLine:
          "30 years old is the final stretch for struggle. Build on what you learned and turn it into a business. The bottom is crowded — find a place at the top.",
      },
      {
        name: "Dr. Jaber Briane",
        role: "Physics / Energy / German company",
        keyLine:
          "Connections are everything. LinkedIn is excellent for networking. Participate in competitions outside your country to make scholarships and visas easier.",
      },
      {
        name: "Ben Youssef Ibrahim",
        role: "PhD Urbanism, Training & Social Policy Expert",
        keyLine:
          "90% of human negative reactions stem from fear. Migration must be calculated, purposeful, legal, and conscious. No progress without ambition.",
      },
      {
        name: "Dr. Walid Mosslem",
        role: "Computer Science, Mind Hacker",
        keyLine:
          "Overcome fear from youth. The most critical element for consistency = PURPOSE. Every journey begins with a single step.",
      },
    ],
  },

  {
    id: "k22",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-01-15",
    category: "business",
    title: "Tech Giants History — Microsoft, Apple & The Luxury Brand Religion",
    titleAr:
      "تاريخ عمالقة التكنولوجيا — مايكروسوفت وأبل وديانة العلامة التجارية",
    author: "Said Abdelaziz",
    source: "Personal Copybook | Business History Notes 2023",
    quote:
      "أنت لا تشتري موبايل أنت تشتري وجاهة — أنت لا تشتري سيارة Tesla أنت تشتري Elon Musk",
    quoteEn:
      '"You are not buying a phone — you are buying prestige. You are not buying a Tesla — you are buying Elon Musk. The founder becomes a spiritual leader (زعيم روحي) and the market becomes a temple."',
    lessons: [
      "The 86-DOS Deal (Bill Gates): Gates bought 86-DOS from Seattle Computer Products for $50K, modified it into MS-DOS, and licensed it to IBM → $200M+ profit. His father was a lawyer — that is why he knew how to legally protect assets and structure deals that others could not escape. Lesson: legal architecture + distribution leverage > technical innovation alone.",
      'The Destruction-by-Bundling Strategy: Microsoft destroyed Lotus (spreadsheet) with Excel bundled into Windows. Destroyed Netscape with Internet Explorer bundled into the OS. The lesson is not just "build better" — it is "control the distribution channel." Your PIRIMI multi-vendor platform must be the channel, not just the product.',
      "The Luxury Brand Religion (Apple): iPhone XS Max costs $450 to build, sells for $1,250. The $800 margin is not hardware profit — it is narrative profit. Apple built a Luxury Industry (not a tech company) using the same mechanics as Maybach, Louis Vuitton, Hermès, Cartier. The founder becomes a spiritual figure, the product becomes identity, and the buyer becomes a devotee. This is why 490 Apple stores are in luxury locations, not shopping malls.",
    ],
    execution:
      'These case studies directly inform your UK venture strategy. At Salford: you are not building software — you are building a brand with a luxury narrative. Your LinkedIn (3,572 followers at 22) is the beginning of the "founder as spiritual figure" architecture. The multi-vendor platform is the distribution channel. The story of Said Abdelaziz going from Ghardaia to Manchester is the narrative that makes the product sellable at a premium. Gates did not sell DOS — he sold the future of computing. Sell the vision, own the channel.',
    reminders: [
      "What is the narrative I am selling — not the product, the STORY? Can I say it in one sentence?",
      "Am I controlling the distribution channel or am I just building a product someone else will distribute?",
      "Gates bought 86-DOS for $50K and made $200M. What undervalued asset or knowledge gap am I sitting on right now?",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 6: Think like the experts. Rule 19: Accomplish quickly.",
    tags: [
      "microsoft",
      "apple",
      "bill-gates",
      "luxury-branding",
      "distribution",
      "86-DOS",
      "IBM",
      "narrative",
      "founder",
      "brand-religion",
    ],
    casestudies: [
      {
        company: "Microsoft",
        insight:
          "86-DOS bought for $50K → licensed to IBM → $200M+ profit. Bundling Excel killed Lotus. Bundling IE killed Netscape. Control distribution, not just the product.",
      },
      {
        company: "Apple",
        insight:
          "iPhone costs $450 to build, sells for $1,250. Margin = narrative. Apple = Luxury Industry, not tech company. 490 stores in luxury locations. Founder becomes spiritual leader.",
      },
      {
        company: "Tesla",
        insight:
          '"You don\'t buy a Tesla, you buy Elon Musk." The personal brand of the founder IS the marketing budget.',
      },
    ],
    wealthHistory: {
      stat1: "1887: 140 millionaires in the world",
      stat2: "2019: 21.3 million millionaires in the world",
      stat3:
        "Top 26 people (2018) = wealth of bottom 3.8 billion combined (Oxfam)",
      insight:
        "Old era: need large capital to become rich. New era: small capital + specialized knowledge + distribution leverage = massive scale.",
    },
  },
  {
    id: "k23",
    type: "book",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2023-07-01",
    category: "psychology",
    title: "The Forty — The Triune Brain & The Three States of the Self",
    titleAr: "كتاب الأربعون — الدماغ الثلاثي والنفوس الثلاث",
    author: "Unknown / Seminar Notes",
    source: "Personal Copybook | 2023",
    quote:
      "الصراع الداخلي ليس له حل وسيظل معك حتى الممات — النفس المطمئنة: انسجام شهوان وعطفان وعقلان",
    quoteEn:
      '"Internal conflict has no permanent solution — it stays with you until death. The peaceful self (النفس المطمئنة) is not the absence of instinct or emotion — it is when all three agree to follow reason."',
    lessons: [
      "The Triune Brain (3 Brothers): Shahwan (شهوان) = Reptilian brain — instincts, hunger, sleep, sex, anger, fear. Atfaan (عطفان) = Mammalian brain — relationships, emotions, social bonds. Aqlaan (عقلان) = Prefrontal cortex — logic, planning, executive function. Most human suffering comes from Shahwan and Atfaan overriding Aqlaan.",
      "The Three States of the Self: النفس الأمارة بالسوء = Shahwan + Atfaan control Aqlaan and force it to rationalize their impulses (addiction loop). النفس اللوامة = Aqlaan is awake but still loses to the other two — it blames instead of justifies (the guilt loop, the most common state). النفس المطمئنة = All three align and agree to follow Aqlaan — not absence of desire, but harmony under reason.",
      "Your true value is NOT in the car you drive, the money you have, the brands you wear, or physical strength. Your value is anchored entirely in your character, actions, and deen. As your knowledge expands, your judgment of other people naturally decreases — كل ما زاد علمك قل إنكارك على الناس.",
    ],
    execution:
      "This framework explains the architecture behind your 20 rules. Each rule is an attempt to keep Aqlaan in control: Rule 4 (prayer) = daily reset of Aqlaan dominance. Rule 12 (no social media) = cutting Shahwan's cheapest dopamine feed. Rule 13 (read before bed) = replacing Atfaan's anxiety loop with Aqlaan input. At Salford, every networking interaction, every pitch, every difficult decision — run it through the diagnostic: am I responding from Shahwan, Atfaan, or Aqlaan?",
    reminders: [
      "Right now — am I responding from Shahwan (instinct), Atfaan (emotion), or Aqlaan (reason)?",
      "Which state of the self am I in today — أمارة, لوامة, or مطمئنة? What shifted me there?",
      "كل ما زاد علمك قل إنكارك على الناس — have I added any knowledge today?",
    ],
    ruleLink:
      "Rule 4: Pray on time every day. Rule 12: No social media. Rule 13: Read before bed. Rule 15: Evaluate yourself daily.",
    tags: [
      "triune-brain",
      "shahwan",
      "atfaan",
      "aqlaan",
      "nafs",
      "islamic-psychology",
      "self-mastery",
      "the-forty",
      "النفس-المطمئنة",
    ],
  },

  {
    id: "k24",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2022-11-01",
    category: "entrepreneurship",
    title: "Human Capital Map — Network as a Technical Resource Stack",
    titleAr: "خريطة رأس المال البشري — الشبكة كمخزن تقني",
    author: "Said Abdelaziz",
    source: "Personal Copybook | Blue Document IMG20260616222334.jpg",
    quote: "work smart not hard — worke few earn big — connections هو كل شيء",
    quoteEn:
      '"Work smart not hard. Work few hours, earn big. You refuse to let interactions happen by chance — you treat your network like an interactive technical resource stack."',
    lessons: [
      "Network as a Competency Matrix: You mapped every person in your inner circle by their specific leverage skill — not by relationship type. Nazim = pushing yourself without hesitation. Berbachi Akram = fast accounting mindset. Zitoni = work few, earn big model. Amir = time management. Yakdan Bakeli = Marketing + BMC + Entrepreneurship. Your father = patience + communication + leadership. This is how the wealthy think about relationships.",
      "Technical Skill Clustering: You built a bottom-up IT knowledge tree: Aness Rezog (dev resources + opportunities), Rostom HadjSaid (software engineering), Hani (all programming languages), Youcef Baket (Unix/backend/hardware), Abdou Bodiaffe (IT general + hardware). Fares (UI/UX), Khaled (development), Affefe (data science + software engineering). You mapped your entire network as a deployable technical stack before you had a single project to deploy it on.",
      "The Human CRM Principle: Before you built Said's Life OS, you were manually building a human CRM in a notebook. You were tracking people by behavioral traits, financial acumen, and software stacks — not names and phone numbers. This is the origin of the CRM you are now building digitally.",
    ],
    execution:
      "This notebook page is the prototype of the app you are building right now. The handwritten competency map became the People section of your Life OS. In Manchester at Salford, apply this same framework immediately: map every classmate, professor, and network contact by their specific leverage skill within the first 30 days. Who is the BMC expert? Who knows UK startup law? Who has investor contacts? Deploy your network as a stack, not a list.",
    reminders: [
      "Who in my current environment has a skill I am missing? Have I mapped them yet?",
      "Am I letting interactions happen by chance — or am I engineering my network deliberately?",
      "worke few earn big — who in my network is doing this right now? What is their model?",
    ],
    ruleLink:
      "Rule 9: Be open and humble before experts. Rule 6: Think like the experts. Rule 14: Leave the comfort zone.",
    tags: [
      "network",
      "human-capital",
      "competency-map",
      "CRM",
      "social-leverage",
      "ghardaia",
      "inner-circle",
      "bootcamp",
    ],
    networkMap: [
      {
        person: "Nazim",
        skill: "Pushing yourself — whiteboard confidence — fearless execution",
      },
      { person: "Berbachi Akram", skill: "Fast mind thinking — accounting" },
      { person: "Zitoni", skill: "Work few hours, earn big — leverage model" },
      { person: "Amir", skill: "Time management" },
      {
        person: "Yakdan Bakeli",
        skill: "Marketing + BMC + Promoting + Entrepreneurship",
      },
      {
        person: "Dad",
        skill: "Patience + dealing with people + communication + leadership",
      },
      { person: "Fares", skill: "UI/UX Design" },
      { person: "Khaled", skill: "Development + Resources" },
      { person: "Affefe", skill: "Data Science + Software Engineering" },
      { person: "Youcef Baket", skill: "Unix / Backend / Hardware" },
      {
        person: "Hani",
        skill: "All programming languages + software resources",
      },
    ],
  },

  {
    id: "k25",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2024-06-01",
    category: "tech",
    title: "Data Structures & Algorithm Architecture — Stack (Pile) Primitives",
    titleAr: "هياكل البيانات والخوارزميات — مكدس البيانات",
    author: "Said Abdelaziz",
    source: "Personal Copybook | Bootcamp Phase Late 2024",
    quote: "الخوارزميات الصحيحة تأتي من كثرة الأخطاء — أخسر بأسرع وأنتج سريعاً",
    quoteEn:
      '"The correct algorithms come from making many mistakes. Fail faster, produce faster. Even a stack has a fundamental limitation — and a temporary auxiliary structure (Var R: Pile) solves it."',
    lessons: [
      "Stack (Pile) Architecture — LIFO: Last In, First Out. The core primitives: Init (initialize), Empiler (push), Dépiler (pop), Pile_Vide (is empty?). You cannot access lower elements without destroying the top — this forces you to think in temporary memory spaces. The solution to every stack limitation is an auxiliary stack (Var R: Pile).",
      "The Auxiliary Stack Pattern: To sort, reverse, insert at Kth position, or merge two sorted stacks — you always use a temporary helper stack R. This pattern (use a temporary space to solve a structural limitation) is a universal engineering metaphor: when a system blocks you, build a temporary layer to bypass the constraint. You applied this same logic to your IELTS prep (when you couldn't study during the day, you studied at night — auxiliary time).",
      "Algorithmic Operations Mastered: Trier (sort), Inverser (reverse), Fusion (merge two sorted stacks), Insertion at Kth position, Suppression at Kth position, Maximum element extraction. French CS notation syntax (the Algerian university standard). This is the foundation underneath every Firebase collection, every Firestore query, every sorting function in your Life OS.",
    ],
    execution:
      "These algorithm sheets explain why your code is architecturally clean. You understand what happens at the memory level — not just the abstraction. At Salford, when you build AI agents or data pipelines for your thesis, this low-level foundation means you will not be fooled by framework magic. You know what the framework is actually doing underneath. The bootcamp phase (98.5/100) was built on exactly this kind of deep-layer understanding.",
    reminders: [
      "When a system blocks me — what is the auxiliary structure I can build to bypass the constraint?",
      "Do I understand what this framework is doing underneath — or am I just using the abstraction?",
      "الخوارزميات الصحيحة تأتي من كثرة الأخطاء — what mistake in my code today taught me something?",
    ],
    ruleLink:
      "Rule 1: Summarize and learn new skills after class. Rule 19: Accomplish quickly. Rule 11: 100% of daily habits.",
    tags: [
      "data-structures",
      "algorithms",
      "stack",
      "pile",
      "LIFO",
      "bootcamp",
      "CS",
      "french-notation",
      "auxiliary-stack",
      "98-5",
    ],
    stackPrimitives: [
      { op: "Init(P)", desc: "Initialize empty stack" },
      { op: "Empiler(P, x)", desc: "Push element x onto stack P" },
      { op: "Dépiler(P)", desc: "Pop top element from stack P" },
      { op: "Pile_Vide(P)", desc: "Check if stack P is empty → Boolean" },
      { op: "Trier(P)", desc: "Sort stack using auxiliary stack R" },
      { op: "Inverser(P)", desc: "Reverse stack using auxiliary stack R" },
      {
        op: "Fusion(P1, P2)",
        desc: "Merge two sorted stacks into one sorted stack",
      },
    ],
  },

  {
    id: "k26",
    type: "notebook",
    pinned: true,
    rating: 5,
    status: "completed",
    date: "2023-03-01",
    category: "entrepreneurship",
    title: "The Life Roadmap — B.N.R. Master Plan (Ages 19→30)",
    titleAr: "خريطة الحياة — خطة B.N.R. الرئيسية من 19 إلى 30",
    author: "Said Abdelaziz",
    source:
      "Personal Roadmap Documents | March 1, 2023 (Birthday) — IMG20260616223924.jpg + IMG20260616223941.jpg",
    quote:
      "Age 19→25: Time to Learn and Develop — Strong Capital (raising). Age 25→30: Time for Applying and Have Risks.",
    quoteEn:
      '"You reverse-engineered your entire life on your birthday in 2023. Phase 1: build the skill stack and capital. Phase 2: deploy it into business structures, e-commerce, company ownership, and property investment. You are now exactly at the threshold of Phase 2."',
    lessons: [
      "Phase 1 (19→25) Skill Stack Blueprint: Web Development (6 months: March–August 2024 ✓), Mobile Development (4 months: Jan–April 2024 ✓), SEO (1 month: Jan 2025), UI/UX Design (4 months: March–June 2025), Graphic Design (4 months: March–June 2026), Copywriting + Video Editing + Digital Marketing (2027). Every skill was scheduled like a software sprint — not a wish.",
      "Phase 2 (25→30) Business Deployment: Freelancer → Small Business → Multiple Income Sources → E-commerce & Dropshipping → Open Company Projects → Entrepreneurship → Investing in Properties. This is the exact Kiyosaki asset-building cascade — skills generate capital, capital generates business, business generates assets, assets generate freedom.",
      "The 13h Deep Work System: While navigating Algerian university requirements, you explicitly carved out 13-hour deep work blocks EVERY DAY outside of college hours. Hackathons, IELTS, coding, immigration research, CV building — all done in the hours that normal people waste. This is the 8h/16h contract executed in real life.",
    ],
    execution:
      "Reality check on March 1, 2026 (your 23rd birthday):\n✓ Web Development → Laravel 10, MERN Stack, 98.5/100 bootcamp\n✓ Full-Stack Developer → DELFIV role achieved\n✓ Hackathon → GREEN LOOP, 1st place, 38 teams\n✓ IELTS → 7.0 achieved after 3 attempts (17-day battle plan)\n✓ Immigration research → completed\n✓ MSc application → Salford University of Manchester, September 2026\n✓ CV → 3,572 LinkedIn followers at 22\n\nYou are now entering Phase 2 at Salford. The roadmap worked.",
    reminders: [
      "I am now in Phase 2 (25→30): Time for Applying and Having Risks. What risk am I NOT taking that I should be?",
      "Phase 2 sequence: Freelancer → Small Business → E-commerce → Company → Entrepreneurship → Property. Which stage am I actively executing RIGHT NOW?",
      "The 13h system still applies at Salford. 8h = MSc classes + part-time. 13h = building the UK venture. Same contract, higher altitude.",
    ],
    ruleLink:
      "Rule 20: 19→25 is the only window — you used it. Rule 10: Prioritize income-generating skills. Rule 14: Leave the comfort zone.",
    tags: [
      "roadmap",
      "BNR",
      "life-plan",
      "19-25",
      "25-30",
      "phase-1",
      "phase-2",
      "skills",
      "business",
      "property",
      "2023",
      "birthday",
    ],
    phase1Skills: [
      {
        skill: "Web Development",
        duration: "6 months",
        period: "Mar–Aug 2024",
        status: "✓ Done — Laravel 10, MERN, 98.5/100",
      },
      {
        skill: "Mobile Development",
        duration: "4 months",
        period: "Jan–Apr 2024",
        status: "✓ Done",
      },
      {
        skill: "SEO",
        duration: "1 month",
        period: "Jan 2025",
        status: "Planned",
      },
      {
        skill: "UI/UX Design",
        duration: "4 months",
        period: "Mar–Jun 2025",
        status: "In progress",
      },
      {
        skill: "Graphic Design",
        duration: "4 months",
        period: "Mar–Jun 2026",
        status: "Upcoming",
      },
      {
        skill: "Copywriting",
        duration: "1 month",
        period: "Mar 2027",
        status: "Upcoming",
      },
      {
        skill: "Video Editing",
        duration: "1 month",
        period: "Jun 2027",
        status: "Upcoming",
      },
      {
        skill: "Digital Marketing",
        duration: "3 months",
        period: "Apr–Jun 2027",
        status: "Upcoming",
      },
    ],
    phase2Business: [
      "Freelancer — monetize skills directly",
      "Small Business → Multiple Income Sources",
      "E-commerce & Dropshipping",
      "Open Company Projects",
      "Entrepreneurship — multi-vendor platforms",
      "Investing in Properties",
    ],
    microRoadmap: [
      {
        period: "Jan–Feb 2024",
        focus: "College + code213 + English B1/B2 + events 1%",
      },
      {
        period: "Mar–Sep 2024",
        focus: "Software dev + hackathons + English B2+ + immigration research",
      },
      {
        period: "Aug–Nov 2024",
        focus: "Become Full-Stack Developer + hackathons + CV development",
      },
      {
        period: "Nov 2024–Jan 2025",
        focus: "English C1/C2 + immigration + internships + CV",
      },
      {
        period: "Jan–Feb 2025",
        focus: "AIMS Agency engineering + internships + CV iteration",
      },
      {
        period: "Feb–Jul 2025",
        focus:
          "Software Engineer role + IELTS preparation + Find immigration agency",
      },
      {
        period: "Jul–Aug 2025",
        focus:
          "Transition abroad preparation + professional work + self-learning",
      },
    ],
  },
  {
    id: "k27",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2018-01-01",
    category: "entrepreneurship",
    title: "Family Business Foundation — Lumatex, MGP, HVAC, Lumier Nahar",
    titleAr: "الأساس العائلي — لوماتيكس وشركات الأب",
    author: "Said Abdelaziz",
    source: "Life Experience | Ghardaia, Algeria | 2003–2026",
    quote: '"I just wanna become like my dad but not in Algeria — in UK."',
    quoteEn:
      '"You grew up watching entrepreneurship as a daily reality — not a concept from a book. Business was the air you breathed. The goal was never to escape it. The goal was to replicate it at a higher altitude."',
    lessons: [
      'The Four Business Model: Your father built and ran Lumatex2000 (textiles), MGP2000, HVAC2000 (climate systems), and Lumier Nahar 2000 — four distinct businesses across different sectors. The lesson: real entrepreneurs do not put everything in one basket. They build multiple income-generating systems. This is the origin of your "multiple income sources" fixation in every plan you wrote.',
      "Business as a Daily Education: You did not study entrepreneurship — you lived it. Money, profit, debt, responsibility, family disagreements about business decisions — these were dinner table conversations. By the time you read Kiyosaki at 19, you already had the lived intuition. The books just gave you the vocabulary for what you already understood.",
      '"Like My Dad But in the UK": The goal is not to escape your father\'s legacy — it is to replicate its spirit in a larger arena. Your father built commercial infrastructure in Algeria. You are building technical and commercial infrastructure for the global market. Same archetype, different geography, higher leverage.',
    ],
    execution:
      "The Lumatex succession plan is built into your B.N.R. roadmap: age 30 → executive role at Lumatex → age 33 → retail shop in Algeria → age 40 → full business ownership. Your father is also your potential first investor. The family business is not your ceiling — it is your launchpad and your safety net simultaneously.",
    reminders: [
      "What would my father do in this business situation — and how would I do it with technology on top?",
      "Am I building something that creates employment and opportunity for others — not just income for myself?",
      '"Like my dad but in the UK" — am I actually moving toward the UK version of his life, or am I drifting?',
    ],
    ruleLink:
      "Rule 20: 19→25 is the only window. Rule 10: Prioritize income-generating skills. Rule 14: Leave the comfort zone.",
    tags: [
      "family",
      "lumatex",
      "father",
      "algeria",
      "business-foundation",
      "multiple-income",
      "succession",
      "heritage",
    ],
  },
  {
    id: "k28",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2025-06-01",
    category: "entrepreneurship",
    title:
      "UK Immigration Architecture — The Legal Pathway to Permanent Residence",
    titleAr: "هندسة الهجرة إلى بريطانيا — الطريق القانوني للإقامة الدائمة",
    author: "Said Abdelaziz",
    source: "Personal Research + Profile Document | 2025–2026",
    quote:
      '"I would invest every second for this plan." — The plan has a legal architecture. Know every stage before you land.',
    quoteEn:
      '"Immigration is a life project. It is not something simple. You must stay there — not keep going back. The first two months are entirely about getting to know the country and diving deep into its details. Adaptation is very important."',
    lessons: [
      "The 4-Stage Legal Pathway: (1) Student Visa → MSc Salford September 2026. (2) Graduate Route → 2-year post-study work visa after MSc — no sponsorship needed, work any job. (3) Skilled Worker Visa → employer sponsorship OR self-sponsorship via your own UK company. (4) ILR (Indefinite Leave to Remain) → after 5 continuous years. (5) British Citizenship → 1 year after ILR. Each stage has specific requirements — know them before you arrive.",
      'The Financial Survival Architecture at Salford: MSc tuition target £11,000–£17,000. Part-time work limit: 20 hours/week during term. Savings target: £20,000–£40,000 over the full stay. Minimum living: every pound saved = one brick of the future shop. "I live on the minimum, minimum." This frugality is not poverty — it is disciplined delayed gratification with a specific destination.',
      "The Backup Countries (if UK fails): Ireland (English-speaking, EU access, similar legal system), Malaysia (MBA option, low cost, Muslim-friendly environment), UAE (tax-free, Algerian community, business-friendly). The UK is Plan A. These are not failures — they are pre-calculated pivot options. Having them removes the anxiety that kills decision-making.",
    ],
    execution:
      '"I promised my dad that I will arrive to open the shop there." This is not a vague ambition — it is a legal, financial, and operational plan: Student Visa → Graduate Route → Skilled Worker / Business → ILR → Citizenship → Shop. The neighbour in the UK who works in retail is the bridge between the legal residency and the commercial operation. Apprentice under them in Year 1 of the MSc. Learn the market. Then open.',
    reminders: [
      "Graduate Route: 2 years to work freely after MSc — do NOT leave the UK unnecessarily during this window.",
      "ILR requires 5 CONTINUOUS years — every trip home must be under 180 days/year. Track this from Day 1.",
      '"The first two months are entirely about getting to know the country" — resist the urge to execute everything immediately. Map first, build second.',
    ],
    ruleLink:
      "Rule 6: Escape neighbourhood thinking. Rule 14: Leave the comfort zone. Rule 20: 19→25 is the only window.",
    tags: [
      "UK",
      "immigration",
      "visa",
      "graduate-route",
      "ILR",
      "citizenship",
      "salford",
      "legal",
      "pathway",
    ],
    immigrationStages: [
      {
        stage: 1,
        name: "Student Visa",
        timeline: "Sep 2026",
        requirement: "MSc offer + £1,334/month maintenance funds",
      },
      {
        stage: 2,
        name: "Graduate Route",
        timeline: "Sep 2027",
        requirement: "MSc completed — 2 years free work",
      },
      {
        stage: 3,
        name: "Skilled Worker Visa",
        timeline: "2028–2029",
        requirement: "Employer sponsor OR own UK company",
      },
      {
        stage: 4,
        name: "ILR",
        timeline: "2031+",
        requirement: "5 continuous years residence",
      },
      {
        stage: 5,
        name: "British Citizenship",
        timeline: "2032+",
        requirement: "1 year after ILR",
      },
    ],
    backupCountries: [
      {
        country: "Ireland",
        reason: "English-speaking, EU access, similar legal system, lower cost",
      },
      {
        country: "Malaysia",
        reason:
          "MBA option, very low cost, Muslim-friendly, large business community",
      },
      {
        country: "UAE",
        reason:
          "Tax-free income, Algerian community, strong business environment",
      },
    ],
  },
  {
    id: "k29",
    type: "notebook",
    pinned: false,
    rating: 5,
    status: "completed",
    date: "2025-01-01",
    category: "psychology",
    title:
      "The Resignation Letter — How Said Abdelaziz Writes When the Stakes Are High",
    titleAr: "رسالة الاستقالة — كيف تكتب عندما يكون الأمر مهماً",
    author: "Said Abdelaziz",
    source: 'Personal Letter to Boss "Di Moussa" | 2025',
    quote:
      "\"I won't take much of your time. You've already taken enough of mine. I am leaving. Not in defeat. Not in anger.\"",
    quoteEn:
      '"I accepted this position because I needed the time more than I needed the money. I was preparing for something that required everything I had."',
    lessons: [
      'Your Writing Voice — 5 Traits: (1) Short punchy openers that establish power immediately. (2) Parallelism and contrast — perception vs. reality, empty pockets vs. full head of dreams. (3) Deep biographical contextualization — 18 years of early mornings, 2-hour bus commutes — proof of character, not complaint. (4) Familial duty as the fuel — the brother\'s struggles, the private promise. (5) Extreme pragmatism framed as character — "I needed the time more than the money."',
      'The Private Promise Framework: "My older brother was struggling... I promised myself quietly, privately, that one day I would be the one who helps. That promise became a fuel." This is not motivational rhetoric — it is the actual engine. Every plan you write, every platform you join, every sacrifice you make — it is this promise running underneath. Identify the private promise in every major goal you set.',
      'Time > Money as a Strategic Identity: "I accepted it because I needed the time more than I needed money." This single sentence contains the entire Kiyosaki + 8h/16h framework compressed into a human moment. When evaluating any opportunity — job, partnership, programme — the primary currency is always time, not money. Money is recoverable. Time is not.',
    ],
    execution:
      'This letter explains why you chose Salford over higher-ranked universities: the programme gives you TIME (Graduate Route, 20h/week work allowance, network access) more than it gives you prestige. The same logic that made you accept a low-paying job for the time it provided is the same logic driving every major decision. "I accepted it because I needed the time." Apply this filter to every decision at Salford.',
    reminders: [
      "What does this opportunity give me — time or money? Which do I actually need right now?",
      "What is the private promise running underneath my current goal? Have I written it down?",
      '"Try all pains in your youth to receive expectation when you grow up." — am I accepting the pain of today or trying to escape it?',
    ],
    ruleLink:
      "Rule 11: Work super hard — 100%. Rule 17: No rest until you achieve. Rule 18: Compensate every lost hour.",
    tags: [
      "writing",
      "resignation",
      "private-promise",
      "time-vs-money",
      "voice",
      "character",
      "brother",
      "family",
    ],
  },
  {
    id: "k31",
    type: "notebook",
    pinned: true,
    rating: 5,
    status: "active",
    date: "2025-01-01",
    category: "business",
    title: "Bazar2000 — The Algeria Multi-Vendor Platform Blueprint",
    titleAr: "بازار 2000 — خطة المنصة متعددة البائعين للجزائر",
    author: "Said Abdelaziz",
    source: "Business Planning Documents | IMG20260617092321 series | 2025",
    quote:
      '"I promised my father to build a physical monument to this transformation in Algiers. The software must fund it."',
    quoteEn:
      '"Bazar2000 is the digitization of everything your father built manually — Lumatex, MGP, HVAC, Lumier Nahar — combined into one centralized digital platform that fixes every problem traditional Algerian commerce has."',
    lessons: [
      "5 Revenue Streams on One Platform: (1) Commission Model — 10% on open marketplace sales. (2) B2B Subscriptions — high-volume bulk tiers, custom order management. (3) Value-Added Logistics — installation, warranties, expedited delivery. (4) Educational Platform — paid DIY and certification courses for industry. (5) Advertising Engine — paid homepage banners and priority vendor placement. Combined target: $18,000+/month.",
      "4 Core Problems Bazar2000 Solves in Algeria: (1) Delayed payments from corporate clients → automated billing, credit verification, debt collection integration. (2) Regional buyer shortages → unified e-commerce portal bypassing geographic limits, distribution hubs across provinces. (3) Disorganized ledger operations across multiple shops → centralized digital ledger, automated payroll and invoicing, single management dashboard. (4) Staff attrition from summer heat → digital-first infrastructure, remote-friendly administrative roles.",
      "The Technical Architecture: Multi-tenant database (Vendor ID isolation), commission ledger service (10% split on every transaction), AI recommendation engine (frequently_bought_together tables), dropshipping pipeline (webhook to supplier logistics), B2B bulk order engine (dynamic volume pricing tiers, CSV upload parser, automated invoice generation). This is your PIRIMI platform evolved into a full commercial operating system for Algeria.",
    ],
    execution:
      "Build sequence: (1) Multi-vendor backend — product catalog, vendor isolation, commission routing. (2) B2B bulk order engine — volume pricing, CSV parser, auto-invoicing. (3) AI recommendation microservice — bundle engine, upsell logic. (4) Analytics pipeline — clickstream events, vendor reports ($50-100/month). (5) Loyalty system — points, premium membership ($50/year). The white-label module ($3,500/month from 5 clients) can be built in parallel as a separate tenant skin on the same core.",
    reminders: [
      "Bazar2000 is not a side project — it is the Algeria-side of the promise to Dad. What feature have I actually coded this week?",
      "The platform funds the physical HQ in Algiers. Software first → cash flow → building. In that order.",
      "Which of the 4 core problems am I solving first? Delayed payments? Geographic limits? Ledger chaos? Staff attrition? Pick one.",
    ],
    ruleLink:
      "Rule 10: Prioritize income-generating skills. Rule 19: Accomplish quickly. Rule 6: Think like the experts.",
    tags: [
      "bazar2000",
      "algeria",
      "multi-vendor",
      "B2B",
      "e-commerce",
      "platform",
      "lumatex",
      "dad-promise",
      "PIRIMI",
    ],
    revenueModel: [
      {
        stream: "Marketplace Commission",
        monthly: "$9,500",
        source: "10% on marketplace sales + listing fees + premium placements",
      },
      {
        stream: "White-Label Solutions",
        monthly: "$3,500",
        source: "5 clients × maintenance fees + 5% sales commission",
      },
      {
        stream: "Cross-Selling & Upselling",
        monthly: "$5,000",
        source: "Bundles ($3k) + premium upgrades ($2k)",
      },
      {
        stream: "Dropshipping Pipeline",
        monthly: "$2,500",
        source: "100 products × $20 margin + 10 suppliers × $50/month listing",
      },
      {
        stream: "B2B Bulk Orders",
        monthly: "$5,000+",
        source:
          "Baseline; scales to $15,000 on single $100k enterprise order at 15%",
      },
      {
        stream: "Data Analytics",
        monthly: "Variable",
        source: "$50-100/month vendor reports + $200/month consulting",
      },
      {
        stream: "Loyalty Membership",
        monthly: "Variable",
        source: "$50/year per premium user",
      },
      {
        stream: "TOTAL TARGET",
        monthly: "$18,000+",
        source: "Combined baseline execution value",
      },
    ],
    technicalModules: [
      {
        module: "Multi-tenant DB",
        priority: 1,
        desc: "Vendor ID isolation, product catalog scoping, payment routing",
      },
      {
        module: "Commission Ledger",
        priority: 1,
        desc: "10% platform split on every transaction, automated vendor payout queue",
      },
      {
        module: "B2B Bulk Engine",
        priority: 2,
        desc: "Dynamic volume pricing, CSV order parser, auto-invoice generation, account manager CRM",
      },
      {
        module: "Dropshipping Pipeline",
        priority: 2,
        desc: "Webhook to supplier logistics endpoints, dual-price margin splitter",
      },
      {
        module: "AI Recommendation Engine",
        priority: 3,
        desc: "frequently_bought_together tables, bundle suggestion at checkout, upsell logic",
      },
      {
        module: "Analytics Pipeline",
        priority: 3,
        desc: "Async clickstream events, vendor reports, seasonal inventory insights",
      },
      {
        module: "Loyalty System",
        priority: 4,
        desc: "Points balance (1pt/$1), premium membership, tiered middleware at checkout",
      },
      {
        module: "White-Label Skin",
        priority: 4,
        desc: "Tenant-level branding (logo/colors), separate commission tier (5%)",
      },
    ],
  },
  {
  id:'k32', type:'notebook', pinned:true, rating:5, status:'active',
  date:'2026-06-22', category:'entrepreneurship',
  title:'The Master Plan — Said\'s Realistic UK Strategy (All Paths)',
  titleAr:'الخطة الرئيسية — الاستراتيجية الواقعية للمملكة المتحدة',
  author:'Said Abdelaziz + Claude',
  source:'Strategic planning session | June 2026',
  quote:'"Your plan should not depend on sponsorship, one visa, or one country. It should depend on skills, experience, savings, and assets. Visas help. Assets create wealth."',
  quoteEn:'"Your father\'s path: Shop → Experience → More shops. Your path: Tech + Entrepreneurship + Family business → Multiple income streams → Financial independence. Same archetype, higher altitude."',
  lessons:[
    'Your Real Assets (not what you wish for — what you actually have): CS degree + IELTS 7.0 + MSc Entrepreneurship & Innovation (Salford) + Full-stack developer (Laravel, MERN, 98.5/100 bootcamp) + English C1 + Trilingual (Arabic, French, English) + Hackathon winner + LinkedIn 3,572 followers + Family business background (4 businesses) + Father as potential investor + Acting talent + Competitive athlete (football, swimming). THIS is your stack. Build from here.',
    'The Core Strategy (non-negotiable): Learn skills → Gain experience → Build network → Save money → Invest capital → Build assets → Create businesses → Expand. NOT: Visa → Citizenship → Success. The visa is a tool, not the goal. The shop is the goal. The legacy is the goal.',
    'Acting is not a hobby — it is a career accelerator: Communication, sales presence, negotiation, leadership, public speaking, charisma under pressure. Every business skill is an acting skill. The MSc in Acting (if needed) is not a fallback — it is a weapon. People who can hold a room are worth more than people who can only code.',
  ],
  execution:`THE PLAN — 4 PATHS, ALL LEAD TO THE SAME DESTINATION:
 
PATH A (Best case — Sponsorship found):
MSc Salford (2026-2027)
→ Graduate Route visa (2 years free work)
→ Apply 500+ jobs (tech + business analyst + project coordinator)
→ Sponsorship found within 18 months
→ Skilled Worker Visa
→ Work 5 years → Save £40,000+
→ Learn UK market from inside
→ Open retail shop (neighbour's supply chain knowledge)
→ Invest in Algeria simultaneously
→ Millionaire by 35
 
PATH B (Sponsorship not found after 2 years):
MSc Salford complete (2027)
→ Graduate Route expires
→ Add MSc in Acting / Drama / Performance (UK)
→ 1-2 more years legal stay
→ Build acting portfolio + business portfolio simultaneously
→ "People fight for you" — companies see the rare profile: tech + business + communication + performance
→ Sponsorship found via acting industry OR business route
→ OR transition to Path C with a much stronger profile
 
PATH C (UK doesn't work — use UK degree elsewhere):
MSc Salford complete (2027)
→ Return to Algeria OR move to Ireland/UAE/Gulf
→ Return WITH: UK degree + English C1 + MSc Entrepreneurship + acting training + network
→ Join family business at executive level
→ Open first retail shop (Dad's loan + savings)
→ Build Bazar2000 digital platform
→ Expand to chain
 
PATH D (Parallel — always running regardless of visa):
While doing MSc:
→ 15h/week: tech role (Junior dev, tech support, startup assistant)
→ 5h/week: neighbour's retail shop (learn UK suppliers, margins, regulations, inventory)
→ Build Bazar2000 MVP remotely
→ Save aggressively (target £40,000 by end of MSc)
→ Send capital to Algeria for investment with brother
 
THE TIME SPLIT AT SALFORD (practical):
• 15h/week → tech work (sponsorship path)
• 5h/week → neighbour's shop (retail experience + UK market knowledge)
• 10h/week → Bazar2000 development (Algeria business)
• 5h/week → acting classes/training (communication + future option)
• Remaining → MSc coursework + network building`,
  reminders:[
    'The goal is not UK citizenship. The goal is a shop, financial independence, and making Dad proud. UK citizenship is one of many routes — not the only one.',
    '"People used to say I was exceptional." — Exceptional people have multiple weapons. Your weapons: code + entrepreneurship + languages + acting + family capital + competitive drive. Deploy ALL of them.',
    'If sponsorship fails after 2 years → ADD THE MSc IN ACTING. This is not plan B. This is Path B. It leads to the same destination via a different door.',
    'Whatever city you end up in — Manchester, Algiers, Dublin, Dubai — the formula is the same: learn the market → open the shop → expand. Geography is a variable. The formula is a constant.',
  ],
  ruleLink:'Rule 6: Think like the experts. Rule 14: Leave the comfort zone. Rule 20: 19→25 is the only window.',
  tags:['master-plan','uk','acting','sponsorship','retail-shop','salford','paths','strategy','dad','legacy','bazar2000'],
  paths:[
    { id:'A', name:'Sponsorship Found',      outcome:'Skilled Worker Visa → 5 years → shop → millionaire by 35',        probability:'Possible — requires 500+ applications + strong profile' },
    { id:'B', name:'MSc Acting Fallback',    outcome:'Extended legal stay → rare profile → sponsorship via different door',probability:'High — very few people have tech + business + performance' },
    { id:'C', name:'Return + Invest',        outcome:'UK degree → Algeria executive role → shop → Bazar2000 → chain',    probability:'Guaranteed — Dads backing + family capital already exists' },
    { id:'D', name:'Parallel Always',        outcome:'Retail experience + tech income + Bazar2000 MVP + £40k savings',    probability:'Certain — starts Day 1 of MSc regardless of other paths' },
  ],
  weeklyTimeAllocation:[
    { activity:'Tech work (sponsorship path)',  hours:15, why:'Highest chance of sponsorship + income' },
    { activity:'Neighbour retail shop',         hours:5,  why:'UK market knowledge + supply chain + margins' },
    { activity:'Bazar2000 development',         hours:10, why:'Algeria business + remote income' },
    { activity:'Acting classes/training',       hours:5,  why:'Communication weapon + Path B preparation' },
    { activity:'MSc coursework + networking',   hours:25, why:'The degree itself + the Salford network' },
  ],
}
];

const TYPES = {
  book: { label: "Book", icon: BookOpen, color: "#e8f4ff", badge: "#1d4ed8" },
  notebook: {
    label: "Notebook",
    icon: PenLine,
    color: "#f5f0ff",
    badge: "#7c3aed",
  },
  article: {
    label: "Article",
    icon: FileText,
    color: "#f0fff4",
    badge: "#228b22",
  },
  podcast: { label: "Podcast", icon: Mic, color: "#fff8e0", badge: "#c8a000" },
  lecture: {
    label: "Lecture",
    icon: Globe,
    color: "#fff0f0",
    badge: "#dc2626",
  },
  course: {
    label: "Course",
    icon: BookMarked,
    color: "#fef9f0",
    badge: "#b45309",
  },
};
const CATEGORIES = {
  philosophy: { label: "Philosophy", color: "#f5f0ff", text: "#7c3aed" },
  business: { label: "Business", color: "#fff8e0", text: "#c8a000" },
  tech: { label: "Tech", color: "#e8f4ff", text: "#1d4ed8" },
  mindset: { label: "Mindset", color: "#fff0f0", text: "#dc2626" },
  entrepreneurship: {
    label: "Entrepreneurship",
    color: "#f0fff4",
    text: "#228b22",
  },
  biography: { label: "Biography", color: "#fef9f0", text: "#b45309" },
  finance: { label: "Finance", color: "#fffde0", text: "#c8a000" },
  language: { label: "Language", color: "#f0f4ff", text: "#4f46e5" },
  psychology: { label: "Psychology", color: "#fdf4ff", text: "#9333ea" },
  neuroscience: { label: "Neuroscience", color: "#f0fff8", text: "#059669" },
  other: { label: "Other", color: "#f5f5f5", text: "#888" },
};

function lsGet(k, fb) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
}
function lsSave(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}

function Stars({ value, onChange, size = 14 }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={(hov || value) >= i ? C.accent : "none"}
          color={(hov || value) >= i ? C.accentDk : "#ccc"}
          style={{ cursor: onChange ? "pointer" : "default" }}
          onMouseEnter={() => onChange && setHov(i)}
          onMouseLeave={() => onChange && setHov(0)}
          onClick={() => onChange?.(i)}
        />
      ))}
    </div>
  );
}
function TagPill({ label, onRemove }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 12,
        background: C.faint,
        border: `1px solid ${C.border}44`,
        fontSize: 10,
        color: C.muted,
        fontWeight: 600,
      }}
    >
      #{label}
      {onRemove && (
        <X size={9} style={{ cursor: "pointer" }} onClick={onRemove} />
      )}
    </span>
  );
}


const STEP_ICONS = [
  Search,
  Package,
  Megaphone,
  ShoppingCart,
  TrendingUp,
  MessageSquare,
];

function CurriculumMap({ data }) {
  if (!data) return null;
  const cols = [data.col1 || [], data.col2 || [], data.col3 || []];
  const labels = ["Column I", "Column II", "Column III"];
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <Layers size={10} /> The 23-Domain Curriculum Map — June 21, 2022
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {cols.map((col, ci) => (
          <div
            key={ci}
            style={{
              background: "white",
              border: `1px solid ${C.border}33`,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.accentDk,
                letterSpacing: "0.05em",
                marginBottom: 8,
              }}
            >
              {labels[ci]}
            </div>
            {col.map((item, ii) => (
              <div
                key={ii}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 0",
                  borderBottom:
                    ii < col.length - 1 ? `1px solid ${C.border}11` : "none",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: C.accentDk,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 11, color: C.text }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "#aaa",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        23 domains — every dot eventually connected. Manchester 2026.
      </div>
    </div>
  );
}

function GhostText({ text }) {
  if (!text) return null;
  return (
    <div
      style={{
        marginTop: 10,
        background: "#1a1a00",
        borderRadius: 8,
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: C.accent,
          letterSpacing: "0.06em",
          marginBottom: 4,
        }}
      >
        👁 GHOST TEXT — INK BLEED FROM NEXT PAGE
      </div>
      <p
        style={{
          fontSize: 11,
          color: "#aaa",
          margin: 0,
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function SOPPipeline({ steps }) {
  if (!steps?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <Zap size={10} /> 6-Step Operational Pipeline
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {steps.map((s, i) => {
          const Icon = STEP_ICONS[i] || CheckCircle2;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 12px",
                background: "white",
                border: `1px solid ${C.border}33`,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: C.accent,
                  color: C.muted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {s.step}
              </div>
              <Icon size={14} color={C.accentDk} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
                  {s.en}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.muted,
                    direction: "rtl",
                    marginTop: 1,
                  }}
                >
                  {s.ar}
                </div>
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}

function ProductCriteria({ criteria }) {
  if (!criteria?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <CheckCircle2 size={10} /> Product Criteria
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {criteria.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              padding: "7px 10px",
              background: "white",
              border: `1px solid ${C.border}33`,
              borderRadius: 8,
            }}
          >
            <CheckCircle2
              size={12}
              color="#228b22"
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>
                {c.en}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  direction: "rtl",
                  marginTop: 1,
                }}
              >
                {c.ar}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplierMetrics({ metrics }) {
  if (!metrics?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <AlertCircle size={10} /> Supplier Validation Thresholds
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: `2px solid ${m.color}44`,
              borderRadius: 10,
              padding: "8px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>
              {m.threshold}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#aaa",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              {m.metric}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplierScript({ script }) {
  if (!script) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <MessageSquare size={10} /> Cold-Outreach Script
      </div>
      <div
        style={{
          background: "#1a1a00",
          borderRadius: 10,
          padding: "12px 16px",
          fontFamily: "monospace",
          fontSize: 11,
          color: "#ffe600",
          lineHeight: 1.9,
          whiteSpace: "pre-wrap",
        }}
      >
        {script}
      </div>
    </div>
  );
}

function TechStackGrid({ stack }) {
  if (!stack?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <Layers size={10} /> Tech Stack
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 8,
        }}
      >
        {stack.map((t, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: `1px solid ${C.border}33`,
              borderRadius: 8,
              padding: "8px 10px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: C.muted }}>
              {t.tool}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#228b22",
                fontWeight: 600,
                marginTop: 1,
              }}
            >
              {t.role}
            </div>
            <div
              style={{
                fontSize: 10,
                color: C.muted,
                marginTop: 2,
                direction: "rtl",
              }}
            >
              {t.ar}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DopamineMap({ data }) {
  if (!data) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <Brain size={10} /> Dopamine Source Routing — C₈H₁₁NO₂
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          {
            type: "consumption",
            label: "Consumption (استهلاك)",
            color: "#fee2e2",
            text: "#dc2626",
            icon: "🔻",
            data: data.consumption,
          },
          {
            type: "creation",
            label: "Creation (إنتاج)",
            color: "#e8fce8",
            text: "#228b22",
            icon: "🔺",
            data: data.creation,
          },
        ].map(({ label, color, text, icon, data: d }) => (
          <div
            key={label}
            style={{ background: color, borderRadius: 10, padding: 12 }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: text,
                marginBottom: 8,
              }}
            >
              {icon} {label}
            </div>
            {d.activities.map((a, i) => (
              <div
                key={i}
                style={{ fontSize: 10, color: C.text, padding: "2px 0" }}
              >
                {i + 1}. {a}
              </div>
            ))}
            <div
              style={{
                marginTop: 8,
                fontSize: 10,
                fontWeight: 600,
                color: text,
              }}
            >
              {d.result}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 10,
          color: "#aaa",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        {data.molecule}
      </div>
    </div>
  );
}

function FarmTheoryTable({ data, pipeline }) {
  if (!data?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <TrendingUp size={10} /> The Farm Theory Matrix (نظرية المزرعة)
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${C.border}33`,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 24px 1fr",
            background: C.accent,
            padding: "6px 12px",
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>If You Sow (إذا زرعت)</span>
          <span />
          <span>You Reap (حصدت)</span>
        </div>
        {data.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 24px 1fr",
              padding: "7px 12px",
              borderTop: `1px solid ${C.border}22`,
              alignItems: "center",
              background: i % 2 === 0 ? "white" : C.faint,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
              {row.sow}
            </span>
            <ArrowRight
              size={12}
              color={C.accentDk}
              style={{ margin: "0 auto" }}
            />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#228b22" }}>
              {row.reap}
            </span>
          </div>
        ))}
      </div>
      {pipeline && (
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: C.muted,
              marginRight: 4,
            }}
          >
            5-STAGE PIPELINE:
          </div>
          {pipeline.map((s, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  fontSize: 10,
                  background: C.faint,
                  padding: "2px 8px",
                  borderRadius: 8,
                  color: C.muted,
                  fontWeight: 600,
                }}
              >
                {s}
              </span>
              {i < pipeline.length - 1 && (
                <ArrowRight size={10} color={C.accentDk} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CarnegieRules({ rules, persuasion }) {
  if (!rules?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <Users size={10} /> Carnegie's Core Principles
      </div>
      <div style={{ display: "grid", gap: 6, marginBottom: 8 }}>
        {rules.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "8px 10px",
              background: "white",
              border: `1px solid ${C.border}33`,
              borderRadius: 8,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: C.accent,
                color: C.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {r.num}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>
                {r.en}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  direction: "rtl",
                  marginTop: 2,
                }}
              >
                {r.ar}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChangeTypology({ types }) {
  if (!types?.length) return null;
  const colors = ["#228b22", "#c8a000", "#dc2626", "#7c3aed"];
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <Shield size={10} /> The 4 Change Typologies
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {types.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "8px 12px",
              background: "white",
              border: `2px solid ${colors[i]}33`,
              borderRadius: 10,
              borderLeft: `4px solid ${colors[i]}`,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: colors[i] + "22",
                color: colors[i],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {t.type}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                {t.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: colors[i],
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {t.outcome}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HawkinsScale({ scale }) {
  if (!scale) return null;
  const zones = [
    {
      key: "positive",
      label: "High Positive Growth Zone",
      color: "#228b22",
      bg: "#e8fce8",
    },
    {
      key: "transition",
      label: "Transitional Turning Zone",
      color: "#c8a000",
      bg: "#fffde0",
    },
    {
      key: "negative",
      label: "Toxic Negative Zone",
      color: "#dc2626",
      bg: "#fee8e8",
    },
  ];
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <BarChart2 size={10} /> Hawkins Consciousness Scale — 17 Levels
      </div>
      {zones.map(({ key, label, color, bg }) => (
        <div
          key={key}
          style={{
            background: bg,
            border: `1px solid ${color}33`,
            borderRadius: 8,
            padding: "8px 12px",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color,
              letterSpacing: "0.05em",
              marginBottom: 4,
            }}
          >
            {label.toUpperCase()}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {scale[key].map((l, i) => (
              <span
                key={i}
                style={{
                  fontSize: 10,
                  background: "white",
                  border: `1px solid ${color}33`,
                  padding: "2px 7px",
                  borderRadius: 8,
                  color: C.text,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WealthMatrix({ matrix }) {
  if (!matrix?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={LBL}>
        <DollarSign size={10} /> Wealthy Mind vs. Poor Mind Matrix
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${C.border}33`,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: C.accent,
            padding: "6px 12px",
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>💰 Wealthy Mind</span>
          <span>⚠️ Poor Mind</span>
        </div>
        {matrix.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "7px 12px",
              borderTop: `1px solid ${C.border}22`,
              background: i % 2 === 0 ? "white" : C.faint,
            }}
          >
            <span style={{ fontSize: 11, color: "#228b22", fontWeight: 600 }}>
              {row.wealthy}
            </span>
            <span style={{ fontSize: 11, color: "#dc2626" }}>{row.poor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Knowledge Card ─────────────────────────────────────────────
function KnowledgeCard({ item, onUpdate, onDelete }) {
  const [exp, setExp] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    ...item,
    lessons: [...(item.lessons || [])],
    reminders: [...(item.reminders || [])],
  });
  const type = TYPES[item.type] || TYPES.book;
  const TypeIcon = type.icon;
  const cat = CATEGORIES[item.category] || CATEGORIES.other;
  const ff = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));
  function setLesson(i, v) {
    setForm((p) => {
      const l = [...p.lessons];
      l[i] = v;
      return { ...p, lessons: l };
    });
  }
  function setReminder(i, v) {
    setForm((p) => {
      const r = [...p.reminders];
      r[i] = v;
      return { ...p, reminders: r };
    });
  }
  function saveEdit() {
    onUpdate(item.id, form);
    setEditing(false);
  }
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${C.border}33`,
        borderLeft: `4px solid ${type.badge}`,
        boxShadow: item.pinned
          ? `0 0 0 2px ${C.accent}88`
          : "0 1px 4px rgba(180,160,0,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "12px 16px",
          cursor: "pointer",
        }}
        onClick={() => !editing && setExp((v) => !v)}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: type.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <TypeIcon size={16} color={type.badge} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 13,
                color: C.text,
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </span>
            {item.pinned && (
              <span
                style={{
                  fontSize: 9,
                  background: C.accent,
                  color: C.muted,
                  padding: "1px 6px",
                  borderRadius: 8,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                📌 PINNED
              </span>
            )}
          </div>
          {item.titleAr && (
            <div
              style={{
                fontSize: 12,
                color: C.muted,
                marginTop: 2,
                direction: "rtl",
                fontFamily: "serif",
              }}
            >
              {item.titleAr}
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 5,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "1px 8px",
                borderRadius: 10,
                fontSize: 9,
                fontWeight: 700,
                background: type.color,
                color: type.badge,
              }}
            >
              {type.label.toUpperCase()}
            </span>
            <span
              style={{
                padding: "1px 8px",
                borderRadius: 10,
                fontSize: 9,
                fontWeight: 700,
                background: cat.color,
                color: cat.text,
              }}
            >
              {cat.label.toUpperCase()}
            </span>
            <span style={{ fontSize: 10, color: "#aaa" }}>{item.author}</span>
            {item.date && (
              <span
                style={{
                  fontSize: 10,
                  color: "#aaa",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Calendar size={9} />
                {item.date}
              </span>
            )}
            <Stars value={item.rating} size={11} />
          </div>
          {item.tags?.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                marginTop: 5,
              }}
            >
              {item.tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            flexShrink: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onUpdate(item.id, { pinned: !item.pinned })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              padding: 4,
            }}
          >
            {item.pinned ? "📌" : "📍"}
          </button>
          <button
            onClick={() => {
              setEditing((v) => !v);
              setExp(true);
              setForm({
                ...item,
                lessons: [...(item.lessons || [])],
                reminders: [...(item.reminders || [])],
              });
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: C.accentDk,
              padding: 4,
            }}
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete?")) onDelete(item.id);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ddd",
              padding: 4,
            }}
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={() => !editing && setExp((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: C.accentDk,
              padding: 4,
            }}
          >
            {exp ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>
      {exp && !editing && (
        <div
          style={{ borderTop: `1px solid ${C.border}22`, background: C.paper }}
        >
          {item.quote && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <Quote size={10} /> Impactful Quote
              </div>
              <div
                style={{
                  direction: "rtl",
                  fontFamily: "serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.text,
                  lineHeight: 1.8,
                  padding: "8px 14px",
                  background: "white",
                  borderRadius: 8,
                  border: `1px solid ${C.border}33`,
                  borderLeft: `3px solid ${C.accentDk}`,
                  marginBottom: item.quoteEn ? 8 : 0,
                }}
              >
                {item.quote}
              </div>
              {item.quoteEn && (
                <div
                  style={{
                    fontSize: 12,
                    color: C.muted,
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    padding: "6px 12px",
                    borderLeft: `3px solid ${C.border}44`,
                  }}
                >
                  {item.quoteEn}
                </div>
              )}
            </div>
          )}
          <div
            style={{
              padding: "14px 18px",
              borderBottom: `1px solid ${C.border}22`,
            }}
          >
            <div style={LBL}>
              <Lightbulb size={10} /> Top 3 Lessons
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {item.lessons.filter(Boolean).map((l, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: C.accent,
                      color: C.muted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: C.text,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {item.execution && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <Target size={10} /> Real-World Execution
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: C.text,
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.execution}
              </p>
            </div>
          )}
          {/* Extended visual components */}
          {item.curriculumMap && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <CurriculumMap data={item.curriculumMap} />
              <GhostText text={item.ghostText} />
            </div>
          )}
          {item.sopPipeline && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <SOPPipeline steps={item.sopPipeline} />
              <ProductCriteria criteria={item.productCriteria} />
              <SupplierMetrics metrics={item.supplierMetrics} />
              <SupplierScript script={item.supplierScript} />
              <TechStackGrid stack={item.techStack} />
            </div>
          )}
          {item.dopamineMap && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <DopamineMap data={item.dopamineMap} />
            </div>
          )}
          {item.farmTheory && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <FarmTheoryTable
                data={item.farmTheory}
                pipeline={item.changePipeline}
              />
            </div>
          )}
          {item.carnegieRules && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <CarnegieRules rules={item.carnegieRules} />
            </div>
          )}
          {item.changeTypes && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <ChangeTypology types={item.changeTypes} />
            </div>
          )}
          {item.wealthVsPoorMatrix && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <WealthMatrix matrix={item.wealthVsPoorMatrix} />
            </div>
          )}
          {item.hawkinsScale && (
            <div
              style={{
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <HawkinsScale scale={item.hawkinsScale} />
            </div>
          )}
          {item.ruleLink && (
            <div
              style={{
                padding: "10px 18px",
                background: "#fffde0",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <Zap size={10} /> Connected Rules
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: C.muted,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {item.ruleLink}
              </p>
            </div>
          )}
          {(item.reminders || []).filter(Boolean).length > 0 && (
            <div style={{ padding: "12px 18px" }}>
              <div style={LBL}>
                <Bell size={10} /> Daily Reminders
              </div>
              {item.reminders.filter(Boolean).map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "7px 10px",
                    background: "white",
                    border: `1px solid ${C.border}44`,
                    borderRadius: 8,
                    marginBottom: 6,
                  }}
                >
                  <Bell
                    size={11}
                    color={C.accentDk}
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <span
                    style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}
                  >
                    {r}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {exp && editing && (
        <div
          style={{
            borderTop: `1px solid ${C.border}22`,
            background: C.paper,
            padding: 16,
            display: "grid",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 10,
            }}
          >
            <F label="Type">
              <select value={form.type} onChange={ff("type")} style={SEL}>
                {Object.entries(TYPES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </F>
            <F label="Category">
              <select
                value={form.category}
                onChange={ff("category")}
                style={SEL}
              >
                {Object.entries(CATEGORIES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </F>
            <F label="Rating">
              <Stars
                value={form.rating}
                onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
                size={18}
              />
            </F>
            <F label="Date">
              <input
                type="date"
                value={form.date}
                onChange={ff("date")}
                style={INP}
              />
            </F>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}
          >
            <F label="Title *">
              <input value={form.title} onChange={ff("title")} style={INP} />
            </F>
            <F label="Author">
              <input value={form.author} onChange={ff("author")} style={INP} />
            </F>
          </div>
          <F label="Arabic title">
            <input
              value={form.titleAr}
              onChange={ff("titleAr")}
              style={{ ...INP, direction: "rtl", fontFamily: "serif" }}
            />
          </F>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <F label="Quote (original)">
              <textarea
                value={form.quote}
                onChange={ff("quote")}
                style={{
                  ...INP,
                  minHeight: 64,
                  resize: "vertical",
                  direction: "rtl",
                  fontFamily: "serif",
                }}
              />
            </F>
            <F label="Quote (English)">
              <textarea
                value={form.quoteEn}
                onChange={ff("quoteEn")}
                style={{ ...INP, minHeight: 64, resize: "vertical" }}
              />
            </F>
          </div>
          <div>
            <div style={LBL}>
              <Lightbulb size={10} /> Top 3 Lessons
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 6,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: C.accent,
                    color: C.muted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <input
                  value={form.lessons[i] || ""}
                  onChange={(e) => setLesson(i, e.target.value)}
                  placeholder={`Lesson ${i + 1}...`}
                  style={INP}
                />
              </div>
            ))}
          </div>
          <F label="Real-World Execution">
            <textarea
              value={form.execution}
              onChange={ff("execution")}
              style={{ ...INP, minHeight: 80, resize: "vertical" }}
            />
          </F>
          <F label="Connected rules">
            <input
              value={form.ruleLink}
              onChange={ff("ruleLink")}
              style={INP}
            />
          </F>
          <div>
            <div style={LBL}>
              <Bell size={10} /> Daily reminders
            </div>
            {(form.reminders || []).map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <input
                  value={r}
                  onChange={(e) => setReminder(i, e.target.value)}
                  placeholder="Daily reminder..."
                  style={{ ...INP, flex: 1 }}
                />
                <button
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      reminders: p.reminders.filter((_, j) => j !== i),
                    }))
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#ddd",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setForm((p) => ({
                  ...p,
                  reminders: [...(p.reminders || []), ""],
                }))
              }
              style={{
                fontSize: 10,
                color: C.accentDk,
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Plus size={11} /> Add reminder
            </button>
          </div>
          <F label="Tags">
            <input
              defaultValue={form.tags?.join(", ") || ""}
              onBlur={(e) =>
                setForm((p) => ({
                  ...p,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                }))
              }
              style={INP}
            />
          </F>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveEdit} style={BTN_P}>
              <Check size={12} /> Save
            </button>
            <button onClick={() => setEditing(false)} style={BTN_C}>
              <X size={12} /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function Knowledge({
  items: propItems = [],
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [items, setItems] = useState(() => {
    const stored = lsGet("crm_knowledge", null);
    return stored && stored.length > 0 ? stored : SEED;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [view, setView] = useState("list");

  function updateLocal(id, u) {
    const updated = items.map((i) => (i.id === id ? { ...i, ...u } : i));
    setItems(updated);
    lsSave("crm_knowledge", updated);
    if (onUpdate) onUpdate(id, u);
  }
  function deleteLocal(id) {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    lsSave("crm_knowledge", updated);
    if (onDelete) onDelete(id);
  }
  function addLocal(item) {
    const updated = [item, ...items];
    setItems(updated);
    lsSave("crm_knowledge", updated);
    if (onAdd) onAdd(item);
  }

  const stats = useMemo(
    () => ({
      total: items.length,
      books: items.filter((i) => i.type === "book").length,
      notebooks: items.filter((i) => i.type === "notebook").length,
      reminders: items.flatMap((i) => (i.reminders || []).filter(Boolean))
        .length,
      pinned: items.filter((i) => i.pinned).length,
      avgRating: items.length
        ? (
            items.reduce((a, b) => a + (b.rating || 0), 0) / items.length
          ).toFixed(1)
        : 0,
    }),
    [items],
  );
  const filtered = useMemo(
    () =>
      items
        .filter((i) => {
          const ms =
            !search ||
            (i.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (i.author || "").toLowerCase().includes(search.toLowerCase()) ||
            (i.lessons || []).some((l) =>
              l.toLowerCase().includes(search.toLowerCase()),
            );
          const mt = typeFilter === "all" || i.type === typeFilter;
          const mc = catFilter === "all" || i.category === catFilter;
          return ms && mt && mc;
        })
        .sort(
          (a, b) =>
            (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
            new Date(b.date) - new Date(a.date),
        ),
    [items, search, typeFilter, catFilter],
  );
  const allReminders = items.flatMap((item) =>
    (item.reminders || [])
      .filter(Boolean)
      .map((r) => ({ text: r, source: item.title })),
  );

  return (
    <div
      style={{
        padding: 16,
        fontFamily: "Inter,system-ui,sans-serif",
        maxWidth: 960,
        margin: "0 auto",
        color: C.text,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: C.muted,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <BookOpen size={22} color={C.accentDk} /> Knowledge Copybook{" "}
            <span style={{ fontSize: 14, color: "#aaa", fontFamily: "serif" }}>
              دفتر المعرفة
            </span>
          </h2>
          <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
            Books · Notebooks · Articles · Courses — every source that shaped
            you
          </p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["list", "reminders"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: `1px solid ${view === v ? C.border : "#e0d800"}`,
                background: view === v ? C.accent : "white",
                color: view === v ? C.muted : "#888",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {v === "list" ? "📚 Library" : "🔔 Reminders"}
            </button>
          ))}
          <button
            onClick={() => setShowAdd((v) => !v)}
            style={{ ...BTN_P, display: "flex", alignItems: "center", gap: 5 }}
          >
            <Plus size={14} /> Add entry
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {[
          { v: stats.total, l: "Entries", c: C.muted },
          { v: stats.notebooks, l: "Notebooks", c: "#7c3aed" },
          { v: stats.books, l: "Books", c: "#1d4ed8" },
          { v: stats.pinned, l: "Pinned", c: C.accentDk },
          { v: stats.reminders, l: "Reminders", c: "#228b22" },
          { v: stats.avgRating + "★", l: "Avg rating", c: "#c8a000" },
        ].map(({ v, l, c }) => (
          <div
            key={l}
            style={{
              background: "white",
              border: `1px solid ${C.border}33`,
              borderRadius: 10,
              padding: "8px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: c }}>{v}</div>
            <div
              style={{
                fontSize: 9,
                color: "#aaa",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
      {showAdd && (
        <div
          style={{
            background: "white",
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 18,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: C.muted,
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <BookOpen size={18} color={C.accentDk} /> New knowledge entry
          </div>
          <AddFormInner
            onAdd={(item) => {
              addLocal(item);
              setShowAdd(false);
            }}
            onClose={() => setShowAdd(false)}
          />
        </div>
      )}
      {view === "list" && (
        <>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
              <Search
                size={13}
                style={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, author, lessons..."
                style={{
                  ...INP,
                  paddingLeft: 28,
                  background: C.paper,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ ...SEL, width: "auto", padding: "7px 10px" }}
            >
              <option value="all">All types</option>
              {Object.entries(TYPES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              style={{ ...SEL, width: "auto", padding: "7px 10px" }}
            >
              <option value="all">All categories</option>
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 14,
              overflowX: "auto",
              paddingBottom: 2,
            }}
          >
            <button
              onClick={() => setCatFilter("all")}
              style={{
                ...TAB,
                background: catFilter === "all" ? C.accent : "white",
                color: catFilter === "all" ? C.muted : "#888",
                border: `1px solid ${catFilter === "all" ? C.border : "#e0d800"}`,
              }}
            >
              All ({items.length})
            </button>
            {Object.entries(CATEGORIES).map(([k, v]) => {
              const n = items.filter((i) => i.category === k).length;
              if (!n) return null;
              return (
                <button
                  key={k}
                  onClick={() => setCatFilter(catFilter === k ? "all" : k)}
                  style={{
                    ...TAB,
                    background: catFilter === k ? v.color : "white",
                    color: catFilter === k ? v.text : "#888",
                    border: `1px solid ${catFilter === k ? v.text + "66" : "#e0d800"}`,
                  }}
                >
                  {v.label} ({n})
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: 48,
                color: "#bbb",
                fontSize: 13,
              }}
            >
              {items.length === 0 ? "No entries yet." : "No results."}
            </div>
          )}
          <div style={{ display: "grid", gap: 10 }}>
            {filtered.map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
                onUpdate={updateLocal}
                onDelete={deleteLocal}
              />
            ))}
          </div>
        </>
      )}
      {view === "reminders" && (
        <div style={{ display: "grid", gap: 8 }}>
          {allReminders.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: 32,
                color: "#bbb",
                fontSize: 12,
              }}
            >
              No reminders yet.
            </div>
          )}
          {allReminders.map((r, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: `1px solid ${C.border}33`,
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <Bell
                size={14}
                color={C.accentDk}
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p
                  style={{
                    fontSize: 12,
                    color: C.text,
                    margin: "0 0 3px",
                    lineHeight: 1.6,
                  }}
                >
                  {r.text}
                </p>
                <span style={{ fontSize: 10, color: "#aaa" }}>
                  From: <strong>{r.source}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddFormInner({ onAdd, onClose }) {
  const [form, setForm] = useState({
    type: "book",
    title: "",
    titleAr: "",
    author: "",
    source: "",
    category: "mindset",
    date: new Date().toISOString().slice(0, 10),
    rating: 5,
    status: "completed",
    quote: "",
    quoteEn: "",
    lessons: ["", "", ""],
    execution: "",
    reminders: [""],
    ruleLink: "",
    tags: [],
    pinned: false,
  });
  const ff = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));
  function setLesson(i, v) {
    setForm((p) => {
      const l = [...p.lessons];
      l[i] = v;
      return { ...p, lessons: l };
    });
  }
  function submit() {
    if (!form.title.trim()) return;
    onAdd({
      ...form,
      id: `k${Date.now()}`,
      lessons: form.lessons.filter(Boolean),
    });
  }
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 10,
        }}
      >
        <F label="Type">
          <select value={form.type} onChange={ff("type")} style={SEL}>
            {Object.entries(TYPES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </F>
        <F label="Category">
          <select value={form.category} onChange={ff("category")} style={SEL}>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </F>
        <F label="Rating">
          <Stars
            value={form.rating}
            onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
            size={18}
          />
        </F>
        <F label="Date">
          <input
            type="date"
            value={form.date}
            onChange={ff("date")}
            style={INP}
          />
        </F>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
        <F label="Title *">
          <input
            value={form.title}
            onChange={ff("title")}
            placeholder="Title..."
            style={INP}
          />
        </F>
        <F label="Author / Source">
          <input
            value={form.author}
            onChange={ff("author")}
            placeholder="Author..."
            style={INP}
          />
        </F>
      </div>
      <F label="Arabic title">
        <input
          value={form.titleAr}
          onChange={ff("titleAr")}
          placeholder="العنوان..."
          style={{ ...INP, direction: "rtl", fontFamily: "serif" }}
        />
      </F>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F label="Quote (original)">
          <textarea
            value={form.quote}
            onChange={ff("quote")}
            style={{
              ...INP,
              minHeight: 56,
              resize: "vertical",
              direction: "rtl",
              fontFamily: "serif",
            }}
          />
        </F>
        <F label="Quote (English)">
          <textarea
            value={form.quoteEn}
            onChange={ff("quoteEn")}
            style={{ ...INP, minHeight: 56, resize: "vertical" }}
          />
        </F>
      </div>
      <div>
        <div style={LBL}>
          <Lightbulb size={10} /> Top 3 Lessons
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 6,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: C.accent,
                color: C.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <input
              value={form.lessons[i] || ""}
              onChange={(e) => setLesson(i, e.target.value)}
              placeholder={`Lesson ${i + 1}...`}
              style={INP}
            />
          </div>
        ))}
      </div>
      <F label="Real-World Execution">
        <textarea
          value={form.execution}
          onChange={ff("execution")}
          style={{ ...INP, minHeight: 60, resize: "vertical" }}
        />
      </F>
      <F label="Connected rules">
        <input value={form.ruleLink} onChange={ff("ruleLink")} style={INP} />
      </F>
      <F label="Tags">
        <input
          onBlur={(e) =>
            setForm((p) => ({
              ...p,
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            }))
          }
          placeholder="mindset, business..."
          style={INP}
        />
      </F>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={submit} style={BTN_P}>
          <Plus size={13} /> Add to Copybook
        </button>
        <button onClick={onClose} style={BTN_C}>
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}

// Import Stars and TagPill from above (already defined)
function F({ label, children }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 9,
          fontWeight: 700,
          color: "#8a7000",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
const LBL = {
  fontSize: 9,
  fontWeight: 700,
  color: "#8a7000",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: 6,
  display: "flex",
  alignItems: "center",
  gap: 4,
};
const INP = {
  width: "100%",
  padding: "7px 10px",
  border: `1px solid ${C.border}66`,
  borderRadius: 8,
  fontSize: 11,
  fontFamily: "inherit",
  background: "white",
  boxSizing: "border-box",
  outline: "none",
};
const SEL = { ...INP, cursor: "pointer" };

const BTN_P = {
  padding: "7px 16px",
  background: C.accent,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 700,
  color: C.muted,
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
};
const BTN_C = {
  padding: "7px 12px",
  background: "transparent",
  border: "1px solid #ddd",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 11,
  color: "#888",
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
};
const TAB = {
  padding: "5px 12px",
  borderRadius: 20,
  cursor: "pointer",
  fontSize: 10,
  fontWeight: 600,
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  transition: "all 0.1s",
};

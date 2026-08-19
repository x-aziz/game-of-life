import { useState, useMemo } from "react";
import {
  User,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Zap,
  Brain,
  Target,
  Star,
  MapPin,
  Phone,
  Lightbulb,
  BookOpen,
  Clock,
  Tag,
  Users,
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

const STATUS_OPTIONS = [
  { value: "new", label: "New Contact", color: "#1d4ed8", bg: "#e8f4ff" },
  { value: "active", label: "Active", color: "#228b22", bg: "#e8fce8" },
  { value: "mentor", label: "Mentor", color: "#7c3aed", bg: "#f5f0ff" },
  {
    value: "cofounder",
    label: "Co-founder Potential",
    color: "#dc2626",
    bg: "#fee8e8",
  },
  {
    value: "investor",
    label: "Investor / Connector",
    color: "#b45309",
    bg: "#fef9f0",
  },
  { value: "peer", label: "Peer / Classmate", color: "#059669", bg: "#f0fff8" },
  {
    value: "professor",
    label: "Professor / Expert",
    color: "#c8a000",
    bg: "#fffde0",
  },
];

const STRENGTH_OPTIONS = [
  { value: "cold", label: "Cold", color: "#aaa" },
  { value: "warm", label: "Warm", color: "#c8a000" },
  { value: "close", label: "Close", color: "#228b22" },
];

const CONTEXT_OPTIONS = [
  "Salford MSc",
  "Networking Event",
  "Conference",
  "Online",
  "Hackathon",
  "Bootcamp",
  "Work",
  "Ghardaia",
  "Algeria",
  "Friend of Friend",
  "LinkedIn",
  "Other",
];

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

const SEED = [
  {
    id: "p1",
    name: "Prof. Riad Baghdadi",
    role: "Professor at MIT New York",
    context: "Conference — Ghardaia",
    status: "mentor",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Entrepreneurship mindset",
      "Academic research",
      "MIT network",
      "Passion-first philosophy",
    ],
    learnFrom: [
      "How to identify what you truly love",
      "How to navigate academic-to-entrepreneur transition",
      "MIT ecosystem access",
    ],
    hooks: [
      "What is the single most important thing you work on?",
      "How did you connect your passion to your career?",
      "What do you wish you knew at 22?",
    ],
    notes:
      'Met once at a conference in Ghardaia. Extracted motivation for months. His line: "Work on what you love — develop it — stay up late for it."',
    tags: ["mit", "mentor", "passion", "academia"],
  },
  // Paste these after p1 in the SEED array in People.jsx

  {
    id: "p2",
    name: "Nazim",
    role: "Classmate / Bootcamp Peer",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Fearless execution — jumps to whiteboard without hesitation",
      "High energy and speed",
      "Pushing himself constantly",
    ],
    learnFrom: [
      "How to act without overthinking",
      "Whiteboard confidence under pressure",
      "How to push past fear of being wrong publicly",
    ],
    hooks: [
      "How do you just go for it without hesitating?",
      "What drives you to push yourself that hard?",
    ],
    notes:
      'Observed in bootcamp — embodies the "push yourself" archetype. Jumps to the whiteboard first. No hesitation. Extract the psychology behind this.',
    tags: ["bootcamp", "execution", "fearless", "ghardaia"],
  },
  {
    id: "p3",
    name: "Berbachi Akram",
    role: "Classmate",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Fast mental math and accounting",
      "Quick mind thinking",
      "Numbers processing speed",
    ],
    learnFrom: [
      "Mental math shortcuts",
      "How to think faster with numbers",
      "Accounting fundamentals for business",
    ],
    hooks: [
      "How did you get so fast with numbers?",
      "Do you use any specific method for mental calculation?",
    ],
    notes:
      "Fast mind thinking in accounting. Study how he processes numbers at speed — this is a skill that compounds in business.",
    tags: ["accounting", "fast-thinking", "bootcamp", "numbers"],
  },
  {
    id: "p4",
    name: "Zitoni",
    role: "Peer — Leverage Model",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Work few hours earn big mindset",
      "Smart leverage over hard work",
      "Efficiency optimization",
    ],
    learnFrom: [
      "How he structures his income to work fewer hours",
      "What leverage mechanisms he uses",
      "How to separate time from income",
    ],
    hooks: [
      "Walk me through a typical day — how do you structure your work?",
      "What was the moment you stopped trading time for money?",
    ],
    notes:
      'Embodies "work few, earn big." Study his model — what asset or system is generating income while he works less? This is the Kiyosaki principle in action locally.',
    tags: ["leverage", "smart-work", "income-model", "algeria"],
  },
  {
    id: "p5",
    name: "Sliman",
    role: "Civil Engineer",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Leadership",
      "Civil engineering (génie civil)",
      "Team management",
    ],
    learnFrom: [
      "How engineers lead technical teams",
      "Leadership in structured environments",
      "Project management discipline",
    ],
    hooks: [
      "How do you manage people on a construction project?",
      "What is the hardest leadership challenge in engineering?",
    ],
    notes:
      "Linked to leadership. Civil engineering background. Study how technical people develop leadership skills — different pathway than business leadership.",
    tags: ["leadership", "civil-engineering", "management", "algeria"],
  },
  {
    id: "p6",
    name: "Dad",
    role: "Father — Life Mentor",
    context: "Ghardaia",
    status: "mentor",
    strength: "close",
    lastMet: "2026-01-01",
    nextMeeting: "",
    competencies: [
      "Patience — deep, structural patience",
      "Dealing with children and people",
      "Communication — calm under pressure",
      "Life wisdom from experience",
    ],
    learnFrom: [
      "How to maintain patience when things are not going as planned",
      "How to communicate with difficult people",
      "Long-term thinking over short-term reactions",
    ],
    hooks: [
      "What is the most important thing you learned about dealing with people?",
      "When did you develop your patience — was it always there or did you build it?",
      "What would you tell 22-year-old you?",
    ],
    notes:
      "Directly observed trait: patience + dealing with people + communication. These are leadership traits he developed through life, not a course. Extract the framework behind how he stays calm.",
    tags: ["family", "patience", "communication", "leadership", "life-mentor"],
  },
  {
    id: "p7",
    name: "Yakdan Bakeli",
    role: "Entrepreneurship / Marketing Peer",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Marketing",
      "Business Model Canvas (BMC)",
      "Promoting",
      "Sales",
      "Entrepreneurship frameworks",
    ],
    learnFrom: [
      "How he applies BMC to real projects",
      "His marketing and promoting methods",
      "How he thinks about building a business",
    ],
    hooks: [
      "Walk me through how you built your last marketing campaign",
      "How do you use the BMC practically — not just theoretically?",
      "What is your current project?",
    ],
    notes:
      "The entrepreneurship and marketing person in the network. Has hands-on knowledge of BMC, promoting, and sales. Good person to test business ideas with.",
    tags: ["marketing", "BMC", "entrepreneurship", "sales", "algeria"],
  },
  {
    id: "p8",
    name: "Lamin",
    role: "Risk Management / Backup Systems",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Taking precautions — اتخاذ الاحتياطات",
      "Backup systems and risk planning",
      "Structured thinking about failure scenarios",
    ],
    learnFrom: [
      "How to build robust backup plans for projects",
      "Risk mitigation before launching",
      "How to think about what can go wrong before it does",
    ],
    hooks: [
      "How do you approach risk in a project — what is your backup framework?",
      "What is the most important precaution people forget to take?",
    ],
    notes:
      'Represents the "backup / precautions" mindset. Rare trait — most builders only think forward. He thinks about what breaks first. This is a critical co-founder quality.',
    tags: ["risk-management", "backups", "precautions", "systems-thinking"],
  },
  {
    id: "p9",
    name: "Omar",
    role: "Brother — Grit Archetype",
    context: "Ghardaia",
    status: "active",
    strength: "close",
    lastMet: "2026-01-01",
    nextMeeting: "",
    competencies: [
      "المراجلة — uncompromising grit and masculinity",
      "Resilience under pressure",
      "Boldness in action",
    ],
    learnFrom: [
      "How he handles setbacks without emotional collapse",
      "The mental framework behind his grit",
      "How to embody المراجلة in daily decisions",
    ],
    hooks: [
      "How do you stay unbothered when things get hard?",
      "What does المراجلة mean to you in practice?",
    ],
    notes:
      "Brother. Embodies uncompromising grit (المراجلة). Study this closely — it is a behavioral archetype not many people maintain consistently. What is the internal rule that drives it?",
    tags: ["family", "grit", "resilience", "مراجلة", "mindset"],
  },
  {
    id: "p10",
    name: "Amir",
    role: "Time Management Expert",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Time management systems",
      "Strategic prioritization",
      "Daily structure and discipline",
    ],
    learnFrom: [
      "His exact time management system",
      "How he structures his day",
      "How he handles interruptions and distractions",
    ],
    hooks: [
      "Walk me through your exact daily schedule",
      "What is the single time management rule that changed everything for you?",
      "How do you decide what not to do?",
    ],
    notes:
      "The time management person in the network. Obsess over his system — time is the only non-renewable resource.",
    tags: ["time-management", "discipline", "productivity", "algeria"],
  },
  {
    id: "p11",
    name: "Yakdan Hamdi",
    role: "Strategic Decision Making",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Strategic decision making",
      "Good mindset framework",
      "Analytical thinking",
    ],
    learnFrom: [
      "His decision-making framework",
      "How he evaluates options under uncertainty",
      'How to build a "state decision" process',
    ],
    hooks: [
      "How do you make decisions when you have incomplete information?",
      "What is your framework for big decisions?",
    ],
    notes:
      'Linked to "strategic decision making" in the notebook. Study his decision process — decisions determine destiny.',
    tags: ["decision-making", "strategy", "mindset", "algeria"],
  },
  {
    id: "p12",
    name: "Ramy",
    role: "Charisma / Communication Model",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Natural talking ability",
      "Generating ideas fast",
      "Smart thinking on the spot",
      "Acting charismatic — presence and energy",
    ],
    learnFrom: [
      "How to be naturally charismatic in conversation",
      "How to generate ideas quickly in a group",
      "How to hold a room with presence",
    ],
    hooks: [
      "How do you come up with ideas so fast in conversation?",
      "What do you think about before walking into a room full of people?",
    ],
    notes:
      "Observed charisma model — talking, ideas, smart thinking, acting charismatic. Study the mechanics: what is he doing with eye contact, pacing, idea generation? These are learnable skills.",
    tags: ["charisma", "communication", "ideas", "social-skills", "algeria"],
  },
  {
    id: "p13",
    name: "Mustafa",
    role: "Finance / Trading / Freelancing",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Trading (financial markets)",
      "IT network and connections",
      "Freelancing income model",
      "Multiple income streams",
    ],
    learnFrom: [
      "How he started freelancing",
      "His trading methodology and risk approach",
      "How he built his IT connections network",
    ],
    hooks: [
      "How did you start freelancing — what was the first client?",
      "What does your trading setup look like — what do you track?",
      "How do you balance trading and freelancing?",
    ],
    notes:
      "Finance person — trading + IT friends + freelancing. Triangulated income: active (freelancing) + semi-passive (trading) + network (IT connections). Study the model.",
    tags: [
      "trading",
      "freelancing",
      "IT",
      "finance",
      "multiple-income",
      "algeria",
    ],
  },
  {
    id: "p14",
    name: "Mhagen",
    role: "Commerce / Life Philosophy",
    context: "Algeria",
    status: "active",
    strength: "warm",
    lastMet: "2022-01-01",
    nextMeeting: "",
    competencies: [
      "Commerce and trade",
      "Living cleverly — role of life philosophy",
      "Practical business thinking",
    ],
    learnFrom: [
      'His philosophy on the "role of life" — what does living cleverly mean to him?',
      "How he approaches commerce practically",
      "What principles guide his business decisions",
    ],
    hooks: [
      "What does it mean to you to live cleverly?",
      "How do you think about commerce differently from other people?",
    ],
    notes:
      '"Commerce + Role of life cleverly." This is someone who has developed a personal philosophy around business and living. Extract the framework.',
    tags: ["commerce", "philosophy", "clever-living", "business", "algeria"],
  },
  {
    id: "p15",
    name: "Affefe",
    role: "Data Science / Software Engineering",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Data Science",
      "Software Engineering",
      "Machine learning fundamentals",
    ],
    learnFrom: [
      "Data science workflow and tooling",
      "How to transition from software engineering to data science",
      "ML project structure",
    ],
    hooks: [
      "What does a data science project look like from start to finish in your workflow?",
      "What is the most underrated skill in data science?",
    ],
    notes:
      "Data science + software engineering dual competency. At Salford this becomes critical — AI + business = your thesis. He has the technical side.",
    tags: ["data-science", "software-engineering", "ML", "bootcamp", "tech"],
  },
  {
    id: "p16",
    name: "Khaled",
    role: "Development / Resources",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Full-stack development",
      "Finding and using dev resources efficiently",
      "Building systems",
    ],
    learnFrom: [
      "His resource library — what does he actually use?",
      "How he structures development projects",
      "Shortcuts and tools that save time",
    ],
    hooks: [
      "What is the most useful resource you have found that nobody talks about?",
      "How do you approach a new project — what is your first step?",
    ],
    notes:
      "Development + resources person. People who know where to find things are as valuable as people who know how to build things.",
    tags: ["development", "resources", "bootcamp", "full-stack", "tech"],
  },
  {
    id: "p17",
    name: "Fares",
    role: "UI/UX Design",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "UI/UX Design",
      "User experience thinking",
      "Visual design systems",
    ],
    learnFrom: [
      "How to think from a user perspective (not a developer perspective)",
      "Design principles that make products feel premium",
      "How to prototype quickly",
    ],
    hooks: [
      "How do you start a design — from the user or from the layout?",
      "What is the biggest mistake developers make when designing their own products?",
    ],
    notes:
      "UI/UX. Your weakness is design — you build backend-heavy. He thinks visually. This is a co-founder skill to develop proximity with.",
    tags: ["UI", "UX", "design", "bootcamp", "visual"],
  },
  {
    id: "p18",
    name: "Youcef Hamou",
    role: "IT Generalist",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "IT general knowledge",
      "Broad tech ecosystem understanding",
    ],
    learnFrom: [
      "How to stay current across multiple tech domains",
      "IT project approaches",
      "Tech ecosystem mapping",
    ],
    hooks: [
      "How do you keep up with so many different tech areas?",
      "What is your learning system for IT?",
    ],
    notes:
      "IT generalist in the network. Broad knowledge is valuable for problem identification — he can spot which domain a problem belongs to quickly.",
    tags: ["IT", "generalist", "tech", "bootcamp"],
  },
  {
    id: "p19",
    name: "Aness Rezog",
    role: "Development Resources / Opportunities",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Development resources",
      "Identifying opportunities in tech",
      "Dev community connections",
    ],
    learnFrom: [
      "Where he finds development opportunities",
      "His resource stack for learning",
      "How he identifies which opportunities to pursue",
    ],
    hooks: [
      "What opportunities are you seeing right now in the Algerian tech scene?",
      "What is your go-to resource for staying sharp?",
    ],
    notes:
      "Development resources + opportunities. The person who knows where the doors are before they open.",
    tags: ["development", "opportunities", "resources", "bootcamp", "algeria"],
  },
  {
    id: "p20",
    name: "Rostom HadjSaid",
    role: "Software Engineering Expert",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Software engineering depth",
      "SE best practices and architecture",
      "System design",
    ],
    learnFrom: [
      "Software engineering principles beyond just coding",
      "System design thinking",
      "How senior SEs approach architecture decisions",
    ],
    hooks: [
      "What is the most important software engineering principle that junior devs miss?",
      "How do you approach system design for a new project?",
    ],
    notes:
      "Deep software engineering knowledge. Not just coding — the full SE discipline: architecture, design patterns, systems thinking.",
    tags: ["software-engineering", "architecture", "SE", "bootcamp", "tech"],
  },
  {
    id: "p21",
    name: "Hani",
    role: "All Programming Languages / Software Resources",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Multiple programming languages",
      "Software resources and tooling",
      "Technical breadth across stacks",
    ],
    learnFrom: [
      "How to learn a new programming language efficiently",
      "Which language is worth learning next and why",
      "His resource library for software learning",
    ],
    hooks: [
      "If you could only learn one more language, what would it be and why?",
      "What is your method for picking up a new language fast?",
    ],
    notes:
      '"Stiff" — knows all programming languages. The polyglot. Consult when choosing a new technology — he has the comparative view.',
    tags: ["programming", "polyglot", "languages", "bootcamp", "resources"],
  },
  {
    id: "p22",
    name: "Youcef Baket",
    role: "Unix / Backend / Hardware",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Unix / Linux systems",
      "Backend development depth",
      "Hardware fundamentals",
      "Low-level systems knowledge",
    ],
    learnFrom: [
      "Unix/Linux command mastery and system administration",
      "Backend architecture at the OS level",
      "How hardware knowledge improves software decisions",
    ],
    hooks: [
      "What does understanding hardware change about how you write software?",
      "What are the most important Unix commands every developer should know?",
    ],
    notes:
      "Unix + Backend + Hardware. The person closest to the machine. When your backend has performance issues, he is the first person to call.",
    tags: ["unix", "linux", "backend", "hardware", "systems", "bootcamp"],
  },
  {
    id: "p23",
    name: "Abdou Bodiaffe",
    role: "IT General / Hardware / Architecture",
    context: "Bootcamp",
    status: "peer",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "IT in general — broad systems view",
      "Hardware architecture",
      "Understanding computing models and paradigms",
    ],
    learnFrom: [
      "Computing models and how different architectures compare",
      "Hardware decisions for software projects",
      "IT system integration thinking",
    ],
    hooks: [
      "How do hardware decisions affect software architecture?",
      "What computing model do you think is most underused right now?",
    ],
    notes:
      "IT general + hardware + computing models. Systems thinker at the infrastructure level. Valuable when building platforms that need to scale.",
    tags: ["IT", "hardware", "architecture", "computing-models", "bootcamp"],
  },
  {
    id: "p24",
    name: "Walid Laribi",
    role: "CEO & Co-founder — Maystro Delivery",
    context: "Conference",
    status: "active",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Startup founding and scaling",
      "Last-mile delivery logistics in Algeria",
      "CEO leadership and fundraising",
      "Algerian tech ecosystem navigation",
    ],
    learnFrom: [
      "How he scaled Maystro from idea to company",
      "Fundraising in Algeria — what works",
      "How to hire a first team",
      "Delivery/logistics as a business model",
    ],
    hooks: [
      "What was the hardest part of scaling Maystro?",
      "How did you find your first investors in Algeria?",
      "What would you do differently if you started Maystro today?",
    ],
    notes:
      "Speaker at a workshop Said organized. CEO of Maystro Delivery — one of Algeria's most recognized logistics startups. Direct access to Algerian startup ecosystem knowledge.",
    tags: ["maystro", "delivery", "startup", "algeria", "CEO", "speaker"],
  },
  {
    id: "p25",
    name: "Abdelkhabir Bengherabi",
    role: "DSI at SPA FALAIT",
    context: "Conference",
    status: "active",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "IT systems management at enterprise level",
      "Digital transformation in Algerian companies",
      "Information systems architecture",
      "Corporate IT leadership",
    ],
    learnFrom: [
      "How enterprise IT departments are structured in Algeria",
      "Digital transformation challenges in traditional Algerian companies",
      "How to navigate corporate IT from inside",
    ],
    hooks: [
      "What is the biggest IT challenge for traditional Algerian companies right now?",
      "How do you justify tech investment to non-technical executives?",
    ],
    notes:
      "DSI (Director of Information Systems) at SPA FALAIT. Workshop speaker. Represents the corporate IT track — useful for understanding the enterprise side of Algerian tech.",
    tags: ["IT", "enterprise", "algeria", "DSI", "corporate", "speaker"],
  },
  {
    id: "p26",
    name: "Amir Kerimi",
    role: "Facilitator — SlickPay",
    context: "Conference",
    status: "active",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "Fintech facilitation",
      "Payment systems in Algeria",
      "Event facilitation and workshop design",
      "FinTech ecosystem knowledge",
    ],
    learnFrom: [
      "How SlickPay approached payment infrastructure in Algeria",
      "FinTech regulatory environment in Algeria",
      "How to facilitate high-quality professional events",
    ],
    hooks: [
      "How does SlickPay navigate banking regulations in Algeria?",
      "What is the biggest gap in Algerian FinTech right now?",
    ],
    notes:
      "Facilitated the SlickPay event. Fintech context — payment systems are critical infrastructure for any e-commerce play in Algeria.",
    tags: ["fintech", "payments", "algeria", "slickpay", "facilitation"],
  },
  {
    id: "p27",
    name: "Mounir Ammari",
    role: "SlickPay — Professional Discovery Day",
    context: "Conference",
    status: "active",
    strength: "warm",
    lastMet: "2024-01-01",
    nextMeeting: "",
    competencies: [
      "FinTech product building",
      "Payment product discovery",
      "Professional event organization",
    ],
    learnFrom: [
      "SlickPay product architecture and decision process",
      "How to structure a professional discovery day",
      "FinTech product-market fit in Algeria",
    ],
    hooks: [
      "What problem does SlickPay solve that banks were failing to solve?",
      "How did you validate the product before building?",
    ],
    notes: "Led the SlickPay discovery day. Product-focused FinTech person.",
    tags: ["fintech", "slickpay", "product", "algeria"],
  },
  {
    id:'p28', name:'UK Neighbour (Retail)', role:'Retail Shop Owner — UK',
    context:'Friend of Friend', status:'active', strength:'warm',
    lastMet:'2026-01-01', nextMeeting:'',
    competencies:['UK retail operations from the inside','How to run a shop in the UK legally','UK business registration and VAT','Local customer dynamics'],
    learnFrom:['Day-to-day retail operations in the UK','How to start a shop legally as an immigrant','Supplier relationships in UK retail','What margins look like in UK retail'],
    hooks:['How did you get started with the shop?','What is the hardest part of running retail in the UK?','Would you take on someone to learn the business hands-on?'],
    notes:'"I promised my dad that I will arrive to open the shop there." This neighbour is the bridge — they are the person who can teach you UK retail from the inside before you open your own. Treat this relationship as a mentorship investment from Day 1 in Manchester.',
    tags:['retail','UK','mentor','shop','neighbour','practical'],
  },
];

function StatusBadge({ value }) {
  const s = STATUS_OPTIONS.find((x) => x.value === value) || STATUS_OPTIONS[0];
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: 9,
        fontWeight: 700,
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label.toUpperCase()}
    </span>
  );
}
function StrengthDot({ value }) {
  const s =
    STRENGTH_OPTIONS.find((x) => x.value === value) || STRENGTH_OPTIONS[0];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        color: s.color,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: s.color,
          display: "inline-block",
        }}
      />
      {s.label}
    </span>
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

function TagInput({ values, onChange, placeholder }) {
  const [inp, setInp] = useState("");
  function add() {
    const v = inp.trim();
    if (v && !values.includes(v)) {
      onChange([...values, v]);
      setInp("");
    }
  }
  return (
    <div>
      <div
        style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}
      >
        {values.map((v, i) => (
          <span
            key={i}
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
            {v}
            <X
              size={9}
              style={{ cursor: "pointer" }}
              onClick={() => onChange(values.filter((_, j) => j !== i))}
            />
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <input
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder || "Type and press Enter..."}
          style={{ ...INP, flex: 1 }}
        />
        <button onClick={add} style={{ ...BTN_P, padding: "7px 10px" }}>
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

function PersonCard({ person, onUpdate, onDelete }) {
  const [exp, setExp] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...person });

  function ff(field) {
    return (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  }
  function saveEdit() {
    onUpdate(person.id, form);
    setEditing(false);
  }

  const status =
    STATUS_OPTIONS.find((x) => x.value === person.status) || STATUS_OPTIONS[0];
  const strength =
    STRENGTH_OPTIONS.find((x) => x.value === person.strength) ||
    STRENGTH_OPTIONS[0];
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        border: `1px solid ${C.border}33`,
        borderLeft: `4px solid ${status.color}`,
        boxShadow: "0 1px 4px rgba(180,160,0,0.07)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
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
            width: 40,
            height: 40,
            borderRadius: 12,
            background: status.bg,
            border: `2px solid ${status.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 14,
            fontWeight: 800,
            color: status.color,
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 13, color: C.text }}>
            {person.name}
          </div>
          {person.role && (
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
              {person.role}
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
            <StatusBadge value={person.status} />
            <StrengthDot value={person.strength} />
            {person.context && (
              <span
                style={{
                  fontSize: 10,
                  color: "#aaa",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <MapPin size={9} />
                {person.context}
              </span>
            )}
            {person.lastMet && (
              <span
                style={{
                  fontSize: 10,
                  color: "#aaa",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Clock size={9} />
                Met: {person.lastMet}
              </span>
            )}
          </div>
          {person.tags?.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                marginTop: 5,
              }}
            >
              {person.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "1px 6px",
                    borderRadius: 8,
                    background: C.faint,
                    fontSize: 9,
                    color: C.muted,
                    fontWeight: 600,
                  }}
                >
                  #{t}
                </span>
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
            onClick={() => {
              setEditing((v) => !v);
              setExp(true);
              setForm({ ...person });
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
              if (window.confirm("Delete this person?")) onDelete(person.id);
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

      {/* Expanded Read View */}
      {exp && !editing && (
        <div
          style={{ borderTop: `1px solid ${C.border}22`, background: C.paper }}
        >
          {/* Competencies */}
          {person.competencies?.filter(Boolean).length > 0 && (
            <div
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <Brain size={10} /> Their Competencies — What They Know
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                }}
              >
                {person.competencies.filter(Boolean).map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      padding: "6px 10px",
                      background: "white",
                      border: `1px solid ${C.border}33`,
                      borderRadius: 8,
                    }}
                  >
                    <Zap
                      size={11}
                      color={C.accentDk}
                      style={{ flexShrink: 0, marginTop: 1 }}
                    />
                    <span style={{ fontSize: 11, color: C.text }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What to Learn */}
          {person.learnFrom?.filter(Boolean).length > 0 && (
            <div
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <Lightbulb size={10} /> What I Want to Learn From Them
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {person.learnFrom.filter(Boolean).map((l, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        background: C.accent,
                        color: C.muted,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Hooks */}
          {person.hooks?.filter(Boolean).length > 0 && (
            <div
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <MessageSquare size={10} /> Conversation Hooks — How to Open
                Them
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {person.hooks.filter(Boolean).map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      padding: "7px 12px",
                      background: "white",
                      border: `1px solid ${C.border}33`,
                      borderLeft: `3px solid ${C.accentDk}`,
                      borderRadius: 8,
                    }}
                  >
                    <MessageSquare
                      size={11}
                      color={C.accentDk}
                      style={{ flexShrink: 0, marginTop: 1 }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: C.text,
                        fontStyle: "italic",
                      }}
                    >
                      "{h}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Meeting */}
          {person.nextMeeting && (
            <div
              style={{
                padding: "10px 18px",
                background: "#fffde0",
                borderBottom: `1px solid ${C.border}22`,
              }}
            >
              <div style={LBL}>
                <Calendar size={10} /> Next Meeting
              </div>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>
                {person.nextMeeting}
              </span>
            </div>
          )}

          {/* Notes */}
          {person.notes && (
            <div style={{ padding: "12px 18px" }}>
              <div style={LBL}>
                <BookOpen size={10} /> Interaction Notes
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
                {person.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Edit Form */}
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
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}
          >
            <F label="Full Name *">
              <input value={form.name} onChange={ff("name")} style={INP} />
            </F>
            <F label="Role / Title">
              <input
                value={form.role || ""}
                onChange={ff("role")}
                style={INP}
              />
            </F>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            <F label="Status">
              <select value={form.status} onChange={ff("status")} style={SEL}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </F>
            <F label="Connection Strength">
              <select
                value={form.strength}
                onChange={ff("strength")}
                style={SEL}
              >
                {STRENGTH_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </F>
            <F label="Context / Where Met">
              <select
                value={form.context || ""}
                onChange={ff("context")}
                style={SEL}
              >
                <option value="">Select...</option>
                {CONTEXT_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </F>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <F label="Last Met">
              <input
                type="date"
                value={form.lastMet || ""}
                onChange={ff("lastMet")}
                style={INP}
              />
            </F>
            <F label="Next Meeting">
              <input
                type="date"
                value={form.nextMeeting || ""}
                onChange={ff("nextMeeting")}
                style={INP}
              />
            </F>
          </div>
          <div>
            <div style={LBL}>
              <Brain size={10} /> Their Competencies
            </div>
            <TagInput
              values={form.competencies || []}
              onChange={(v) => setForm((p) => ({ ...p, competencies: v }))}
              placeholder="Add a competency and press Enter..."
            />
          </div>
          <div>
            <div style={LBL}>
              <Lightbulb size={10} /> What I Want to Learn From Them
            </div>
            <TagInput
              values={form.learnFrom || []}
              onChange={(v) => setForm((p) => ({ ...p, learnFrom: v }))}
              placeholder="Add a learning goal and press Enter..."
            />
          </div>
          <div>
            <div style={LBL}>
              <MessageSquare size={10} /> Conversation Hooks
            </div>
            <TagInput
              values={form.hooks || []}
              onChange={(v) => setForm((p) => ({ ...p, hooks: v }))}
              placeholder="Add a conversation starter and press Enter..."
            />
          </div>
          <F label="Interaction Notes">
            <textarea
              value={form.notes || ""}
              onChange={ff("notes")}
              placeholder="What happened last time? What did you learn? What to follow up on?"
              style={{ ...INP, minHeight: 80, resize: "vertical" }}
            />
          </F>
          <div>
            <div style={LBL}>
              <Tag size={10} /> Tags
            </div>
            <TagInput
              values={form.tags || []}
              onChange={(v) => setForm((p) => ({ ...p, tags: v }))}
              placeholder="Add a tag and press Enter..."
            />
          </div>
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

// ── Add Person Form ─────────────────────────────────────────────
function AddForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    status: "new",
    strength: "cold",
    context: "Salford MSc",
    lastMet: new Date().toISOString().slice(0, 10),
    nextMeeting: "",
    competencies: [],
    learnFrom: [],
    hooks: [],
    notes: "",
    tags: [],
  });
  function ff(field) {
    return (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  }
  function submit() {
    if (!form.name.trim()) return;
    onAdd({ ...form, id: `p${Date.now()}` });
  }
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
        <F label="Full Name *">
          <input
            value={form.name}
            onChange={ff("name")}
            placeholder="Name..."
            style={INP}
          />
        </F>
        <F label="Role / Title">
          <input
            value={form.role}
            onChange={ff("role")}
            placeholder="Professor, Co-founder..."
            style={INP}
          />
        </F>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
      >
        <F label="Status">
          <select value={form.status} onChange={ff("status")} style={SEL}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </F>
        <F label="Connection Strength">
          <select value={form.strength} onChange={ff("strength")} style={SEL}>
            {STRENGTH_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </F>
        <F label="Context / Where Met">
          <select value={form.context} onChange={ff("context")} style={SEL}>
            {CONTEXT_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </F>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <F label="Last Met">
          <input
            type="date"
            value={form.lastMet}
            onChange={ff("lastMet")}
            style={INP}
          />
        </F>
        <F label="Next Meeting">
          <input
            type="date"
            value={form.nextMeeting}
            onChange={ff("nextMeeting")}
            style={INP}
          />
        </F>
      </div>
      <div>
        <div style={LBL}>
          <Brain size={10} /> Their Competencies
        </div>
        <TagInput
          values={form.competencies}
          onChange={(v) => setForm((p) => ({ ...p, competencies: v }))}
          placeholder="e.g. Laravel, UK startup law, VC networks..."
        />
      </div>
      <div>
        <div style={LBL}>
          <Lightbulb size={10} /> What I Want to Learn From Them
        </div>
        <TagInput
          values={form.learnFrom}
          onChange={(v) => setForm((p) => ({ ...p, learnFrom: v }))}
          placeholder="e.g. How to pitch to UK investors..."
        />
      </div>
      <div>
        <div style={LBL}>
          <MessageSquare size={10} /> Conversation Hooks
        </div>
        <TagInput
          values={form.hooks}
          onChange={(v) => setForm((p) => ({ ...p, hooks: v }))}
          placeholder="e.g. What project are you working on right now?"
        />
      </div>
      <F label="Notes">
        <textarea
          value={form.notes}
          onChange={ff("notes")}
          placeholder="First impression, what you talked about..."
          style={{ ...INP, minHeight: 60, resize: "vertical" }}
        />
      </F>
      <div>
        <div style={LBL}>
          <Tag size={10} /> Tags
        </div>
        <TagInput
          values={form.tags}
          onChange={(v) => setForm((p) => ({ ...p, tags: v }))}
          placeholder="e.g. salford, ai, investor..."
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={submit} style={BTN_P}>
          <Plus size={13} /> Add Person
        </button>
        <button onClick={onClose} style={BTN_C}>
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────
export default function People() {
  const [items, setItems] = useState(() => {
    const stored = lsGet("crm_people", null);
    return stored && stored.length > 0 ? stored : SEED;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [strengthFilter, setStrengthFilter] = useState("all");

  function updateLocal(id, u) {
    const updated = items.map((i) => (i.id === id ? { ...i, ...u } : i));
    setItems(updated);
    lsSave("crm_people", updated);
  }
  function deleteLocal(id) {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    lsSave("crm_people", updated);
  }
  function addLocal(item) {
    const updated = [item, ...items];
    setItems(updated);
    lsSave("crm_people", updated);
  }

  const stats = useMemo(
    () => ({
      total: items.length,
      mentors: items.filter((i) => i.status === "mentor").length,
      cofounders: items.filter((i) => i.status === "cofounder").length,
      salford: items.filter((i) => i.context === "Salford MSc").length,
      upcoming: items.filter(
        (i) => i.nextMeeting && new Date(i.nextMeeting) >= new Date(),
      ).length,
    }),
    [items],
  );

  const filtered = useMemo(
    () =>
      items
        .filter((i) => {
          const ms =
            !search ||
            (i.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (i.role || "").toLowerCase().includes(search.toLowerCase()) ||
            (i.competencies || []).some((c) =>
              c.toLowerCase().includes(search.toLowerCase()),
            ) ||
            (i.tags || []).some((t) =>
              t.toLowerCase().includes(search.toLowerCase()),
            );
          const mst = statusFilter === "all" || i.status === statusFilter;
          const mstr =
            strengthFilter === "all" || i.strength === strengthFilter;
          return ms && mst && mstr;
        })
        .sort((a, b) => {
          const order = {
            mentor: 0,
            cofounder: 1,
            investor: 2,
            professor: 3,
            active: 4,
            peer: 5,
            new: 6,
          };
          return (order[a.status] ?? 9) - (order[b.status] ?? 9);
        }),
    [items, search, statusFilter, strengthFilter],
  );

  const upcoming = items
    .filter((i) => i.nextMeeting && new Date(i.nextMeeting) >= new Date())
    .sort((a, b) => new Date(a.nextMeeting) - new Date(b.nextMeeting));

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
      {/* Header */}
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
            <Users size={22} color={C.accentDk} /> People Intelligence
            <span style={{ fontSize: 14, color: "#aaa", fontFamily: "serif" }}>
              دفتر الناس
            </span>
          </h2>
          <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
            Competencies · Learning Goals · Conversation Hooks — never walk into
            a meeting unprepared
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          style={{ ...BTN_P, display: "flex", alignItems: "center", gap: 5 }}
        >
          <Plus size={14} /> Add Person
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {[
          { v: stats.total, l: "People", c: C.muted },
          { v: stats.mentors, l: "Mentors", c: "#7c3aed" },
          { v: stats.cofounders, l: "Co-founders", c: "#dc2626" },
          { v: stats.salford, l: "Salford", c: "#1d4ed8" },
          { v: stats.upcoming, l: "Upcoming", c: "#228b22" },
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

      {/* Upcoming meetings banner */}
      {upcoming.length > 0 && (
        <div
          style={{
            background: "#fffde0",
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: "10px 16px",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.accentDk,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Calendar size={10} /> Upcoming Meetings
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {upcoming.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "white",
                  border: `1px solid ${C.border}33`,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 11,
                }}
              >
                <strong>{p.name}</strong>{" "}
                <span style={{ color: "#aaa" }}>→ {p.nextMeeting}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Form */}
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
            <User size={18} color={C.accentDk} /> New Person
          </div>
          <AddForm
            onAdd={(item) => {
              addLocal(item);
              setShowAdd(false);
            }}
            onClose={() => setShowAdd(false)}
          />
        </div>
      )}

      {/* Filters */}
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
            placeholder="Search name, role, competency, tag..."
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ ...SEL, width: "auto", padding: "7px 10px" }}
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={strengthFilter}
          onChange={(e) => setStrengthFilter(e.target.value)}
          style={{ ...SEL, width: "auto", padding: "7px 10px" }}
        >
          <option value="all">All Strengths</option>
          {STRENGTH_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter Pills */}
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
          onClick={() => setStatusFilter("all")}
          style={{
            padding: "5px 12px",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 600,
            whiteSpace: "nowrap",
            fontFamily: "inherit",
            background: statusFilter === "all" ? C.accent : "white",
            color: statusFilter === "all" ? C.muted : "#888",
            border: `1px solid ${statusFilter === "all" ? C.border : "#e0d800"}`,
          }}
        >
          All ({items.length})
        </button>
        {STATUS_OPTIONS.map((s) => {
          const n = items.filter((i) => i.status === s.value).length;
          if (!n) return null;
          return (
            <button
              key={s.value}
              onClick={() =>
                setStatusFilter(statusFilter === s.value ? "all" : s.value)
              }
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 10,
                fontWeight: 600,
                whiteSpace: "nowrap",
                fontFamily: "inherit",
                background: statusFilter === s.value ? s.bg : "white",
                color: statusFilter === s.value ? s.color : "#888",
                border: `1px solid ${statusFilter === s.value ? s.color + "66" : "#e0d800"}`,
              }}
            >
              {s.label} ({n})
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 48,
            color: "#bbb",
            fontSize: 13,
          }}
        >
          {items.length === 0
            ? "No people yet. Add someone you met today."
            : "No results."}
        </div>
      )}
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((p) => (
          <PersonCard
            key={p.id}
            person={p}
            onUpdate={updateLocal}
            onDelete={deleteLocal}
          />
        ))}
      </div>
    </div>
  );
}
    
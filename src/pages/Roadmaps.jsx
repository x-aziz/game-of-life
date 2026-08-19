import { useState, useMemo } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Target,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Zap,
  TrendingUp,
  Flag,
  BookOpen,
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
  { value: "active", label: "Active", color: "#228b22", bg: "#e8fce8" },
  { value: "planned", label: "Planned", color: "#1d4ed8", bg: "#e8f4ff" },
  { value: "paused", label: "Paused", color: "#c8a000", bg: "#fffde0" },
  { value: "done", label: "Completed", color: "#7c3aed", bg: "#f5f0ff" },
];

const MILESTONE_STATUS = [
  { value: "done", label: "Done", color: "#228b22", icon: CheckCircle2 },
  { value: "active", label: "Active", color: "#c8a000", icon: Clock },
  { value: "pending", label: "Pending", color: "#aaa", icon: Circle },
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
    id: "r1",
    title: "B.N.R. Master Life Plan — Age 19→30",
    description:
      "Written on my birthday March 1, 2023. Phase 1 (19→25): Build skill stack + strong capital. Phase 2 (25→30): Apply skills, take risks, build business structures and invest in properties.",
    status: "active",
    startDate: "2023-03-01",
    endDate: "2030-01-01",
    milestones: [
      {
        id: "m1",
        title: "Web Development (6 months)",
        date: "2024-08-01",
        status: "done",
        notes: "Laravel 10, MERN Stack — 98.5/100 bootcamp",
      },
      {
        id: "m2",
        title: "Mobile Development (4 months)",
        date: "2024-04-01",
        status: "done",
        notes: "Completed Jan–Apr 2024",
      },
      {
        id: "m3",
        title: "Full-Stack Developer role",
        date: "2024-09-01",
        status: "done",
        notes: "DELFIV — achieved",
      },
      {
        id: "m4",
        title: "Hackathon win",
        date: "2024-11-01",
        status: "done",
        notes: "GREEN LOOP — 1st place, 38 teams",
      },
      {
        id: "m5",
        title: "IELTS 7.0",
        date: "2025-06-01",
        status: "done",
        notes: "Achieved after 17-day battle plan — 3rd attempt",
      },
      {
        id: "m6",
        title: "MSc Application — Salford",
        date: "2025-12-01",
        status: "done",
        notes: "Accepted — MSc Entrepreneurship & Innovation",
      },
      {
        id: "m7",
        title: "UI/UX Design (4 months)",
        date: "2025-06-01",
        status: "done",
        notes: "Mar–Jun 2025",
      },
      {
        id: "m8",
        title: "SEO (1 month)",
        date: "2025-01-01",
        status: "done",
        notes: "Jan 2025",
      },
      {
        id: "m9",
        title: "Arrive at Salford — Manchester",
        date: "2026-09-01",
        status: "active",
        notes: "September 2026 — Phase 2 begins",
      },
      {
        id: "m10",
        title: "Graphic Design (4 months)",
        date: "2026-06-01",
        status: "active",
        notes: "Mar–Jun 2026",
      },
      {
        id: "m11",
        title: "Launch UK freelance / first client",
        date: "2026-12-01",
        status: "pending",
        notes: "Phase 2: Freelancer stage",
      },
      {
        id: "m12",
        title: "Copywriting + Video Editing",
        date: "2027-06-01",
        status: "pending",
        notes: "Jun–Jul 2027",
      },
      {
        id: "m13",
        title: "Digital Marketing (3 months)",
        date: "2027-06-01",
        status: "pending",
        notes: "Apr–Jun 2027",
      },
      {
        id: "m14",
        title: "Small Business → Income Sources",
        date: "2027-12-01",
        status: "pending",
        notes: "Phase 2: Business deployment",
      },
      {
        id: "m15",
        title: "E-commerce & Dropshipping",
        date: "2028-06-01",
        status: "pending",
        notes: "Phase 2: High-leverage internet retail",
      },
      {
        id: "m16",
        title: "Open Company / Entrepreneurship",
        date: "2029-01-01",
        status: "pending",
        notes: "Phase 2: Multi-vendor platform + company",
      },
      {
        id: "m17",
        title: "Invest in Properties",
        date: "2030-01-01",
        status: "pending",
        notes: "Phase 2: Lock profits into real estate assets",
      },
      {
        id: "m18",
        title: "SolveX1.0 Ideathon",
        date: "2024-06-01",
        status: "done",
        notes: "Participated — ideation competition",
      },
      {
        id: "m19",
        title: "Open Camp Hackathon",
        date: "2024-08-01",
        status: "done",
        notes: "Participated",
      },
      {
        id: "m20",
        title: "AiQuest'25 Hackathon organized",
        date: "2025-01-01",
        status: "done",
        notes: "January 2025 — organized full event",
      },
      {
        id: "m21",
        title: "Code213 Bootcamp 98.5/100",
        date: "2025-06-01",
        status: "done",
        notes: "Full-Stack JavaScript — highest score",
      },
      {
        id: "m22",
        title: "CS Bachelor's degree",
        date: "2025-07-01",
        status: "done",
        notes: "Information Systems — July 2025",
      },
      {
        id: "m23",
        title: "Upwork first client",
        date: "2026-12-01",
        status: "pending",
        notes: "Target: $500+ first project",
      },
      {
        id: "m24",
        title: "Upwork $15-20/hr rate achieved",
        date: "2027-06-01",
        status: "pending",
        notes: "From $5/hr current → $15-20/hr target",
      },
      {
        id: "m25",
        title: "$1,000+/month freelance income",
        date: "2027-06-01",
        status: "pending",
        notes: "Medium-term income goal",
      },
      {
        id: "m26",
        title: "Software agency launched",
        date: "2028-01-01",
        status: "pending",
        notes: "Long-term: team of developers",
      },
      {
        id: "m27",
        title: "SaaS product launched",
        date: "2029-01-01",
        status: "pending",
        notes: "Long-term: scalable product",
      },
      {
        id: "m28",
        title: "Millionaire net worth",
        date: "2030-01-01",
        status: "pending",
        notes: "The ultimate Phase 2 target",
      },
      {
        id: "m29",
        title: "UK neighbour retail apprenticeship",
        date: "2026-10-01",
        status: "pending",
        notes: "Learn retail operations from inside — before opening own shop",
      },
      {
        id: "m30",
        title: "Save £20,000–£40,000 during MSc",
        date: "2027-09-01",
        status: "pending",
        notes: "3-year aggressive savings target — every pound counts",
      },
      {
        id: "m31",
        title: "Graduate Route visa secured",
        date: "2027-10-01",
        status: "pending",
        notes: "2-year post-study work visa after MSc completion",
      },
      {
        id: "m32",
        title: "Skilled Worker Visa / Sponsorship",
        date: "2028-06-01",
        status: "pending",
        notes: "Target: tech company sponsor OR self-sponsor via business",
      },
      {
        id: "m33",
        title: "Invest in brother's Algeria shop",
        date: "2027-01-01",
        status: "pending",
        notes: "Send capital back — Algeria asset building while in UK",
      },
      {
        id: "m34",
        title: "Open UK retail shop (test unit)",
        date: "2029-01-01",
        status: "pending",
        notes: "The promise to Dad. Learn the market first via neighbour.",
      },
      {
        id: "m35",
        title: "ILR — Indefinite Leave to Remain",
        date: "2031-01-01",
        status: "pending",
        notes: "After 5 years continuous residence — the legal foundation",
      },
      {
        id: "m36",
        title: "British citizenship application",
        date: "2032-01-01",
        status: "pending",
        notes: "After ILR — the final mobility asset",
      },
      {
        id: "bz1",
        title: "Bazar2000 — Multi-vendor backend MVP",
        date: "2027-06-01",
        status: "pending",
        notes:
          "Priority 1: Vendor isolation + commission ledger + product catalog",
      },
      {
        id: "bz2",
        title: "Bazar2000 — B2B bulk order engine",
        date: "2027-09-01",
        status: "pending",
        notes: "Priority 2: Volume pricing tiers + CSV parser + auto-invoicing",
      },
      {
        id: "bz3",
        title: "Bazar2000 — Dropshipping pipeline live",
        date: "2027-12-01",
        status: "pending",
        notes: "Priority 2: Supplier webhooks + margin splitter",
      },
      {
        id: "bz4",
        title: "Bazar2000 — AI recommendation engine",
        date: "2028-03-01",
        status: "pending",
        notes: "Priority 3: Bundle engine + upsell logic at checkout",
      },
      {
        id: "bz5",
        title: "Bazar2000 — Analytics + vendor reports live",
        date: "2028-06-01",
        status: "pending",
        notes: "Priority 3: $50-100/month vendor insight reports",
      },
      {
        id: "bz6",
        title: "Bazar2000 — $5,000/month revenue",
        date: "2028-06-01",
        status: "pending",
        notes: "Revenue milestone: B2B + commission + dropshipping combined",
      },
      {
        id: "bz7",
        title: "Bazar2000 — $18,000/month revenue target",
        date: "2029-01-01",
        status: "pending",
        notes:
          "All 5 streams live: marketplace + white-label + cross-sell + dropship + B2B",
      },
      {
        id: "bz8",
        title: "Bazar2000 — Physical HQ in Algiers",
        date: "2030-01-01",
        status: "pending",
        notes: "The promise to Dad. Software cash flow funds the building.",
      },
    ],
  },
  {
    id: "r2",
    title: "Salford MSc Entrepreneurship — Sep 2026",
    description:
      "The gateway to Phase 2. MSc Entrepreneurship & Innovation at University of Salford, Manchester. Build UK network, develop thesis on AI agents for business process automation, launch first UK venture during the programme.",
    status: "active",
    startDate: "2026-09-01",
    endDate: "2027-09-01",
    milestones: [
      {
        id: "s1",
        title: "Arrive in Manchester",
        date: "2026-09-01",
        status: "pending",
        notes:
          "First 30 days: map the environment, add every classmate to People CRM",
      },
      {
        id: "s2",
        title: "100 Interaction Challenge",
        date: "2026-10-01",
        status: "pending",
        notes:
          "Meet 100 real people in first 30 days — conversational threading",
      },
      {
        id: "s3",
        title: "Identify thesis topic",
        date: "2026-11-01",
        status: "pending",
        notes:
          "AI agents for business automation — PIRIMI + AI = defensible thesis",
      },
      {
        id: "s4",
        title: "First part-time income stream",
        date: "2026-12-01",
        status: "pending",
        notes: "Freelance Laravel / MERN builds or part-time role",
      },
      {
        id: "s5",
        title: "Thesis proposal submitted",
        date: "2027-01-01",
        status: "pending",
        notes: "Research proposal + supervisor confirmed",
      },
      {
        id: "s6",
        title: "UK venture MVP launched",
        date: "2027-06-01",
        status: "pending",
        notes: "POC validated — will someone pay for this?",
      },
      {
        id: "s7",
        title: "MSc completed",
        date: "2027-09-01",
        status: "pending",
        notes: "Thesis submitted — MSc Entrepreneurship & Innovation",
      },
    ],
  },
  {
    id: "r3",
    title: "Goals Hierarchy — Short / Medium / Long Term",
    description:
      "Living goals list extracted from career planning sessions. Short-term = next 12 months. Medium-term = 1-3 years. Long-term = 3-10 years.",
    status: "active",
    startDate: "2026-09-01",
    endDate: "2030-01-01",
    milestones: [
      // SHORT-TERM (next 12 months)
      {
        id: "g1",
        title: "Secure first Upwork client — $500+ project",
        date: "2026-12-01",
        status: "pending",
        notes: "Short-term — start at $5/hr, target first project",
      },
      {
        id: "g2",
        title: "Reach $1,000+/month freelance income",
        date: "2027-03-01",
        status: "pending",
        notes: "Short-term — income milestone",
      },
      {
        id: "g3",
        title: "Build 3 additional portfolio projects",
        date: "2027-01-01",
        status: "pending",
        notes: "Short-term — MERN + Laravel + AI",
      },
      {
        id: "g4",
        title: "Start creating technical content on LinkedIn",
        date: "2026-10-01",
        status: "pending",
        notes: "Short-term — turn overthinking into content",
      },
      {
        id: "g5",
        title: "Increase LinkedIn to 5,000 followers",
        date: "2027-06-01",
        status: "pending",
        notes: "Short-term — from 3,572 current",
      },
      {
        id: "g6",
        title: "Complete Graphic Design (4 months)",
        date: "2026-06-01",
        status: "active",
        notes: "Short-term — Mar–Jun 2026",
      },
      // MEDIUM-TERM (1-3 years)
      {
        id: "g7",
        title: "Become recognized MERN/Laravel specialist in UK",
        date: "2027-12-01",
        status: "pending",
        notes: "Medium-term — reputation milestone",
      },
      {
        id: "g8",
        title: "Mentor 1 junior developer",
        date: "2027-09-01",
        status: "pending",
        notes: "Medium-term — give back, build leadership",
      },
      {
        id: "g9",
        title: "Integrate AI into a web application",
        date: "2027-06-01",
        status: "pending",
        notes: "Medium-term — Python + LLM agent on top of existing platforms",
      },
      {
        id: "g10",
        title: "Speak at a conference or event",
        date: "2028-01-01",
        status: "pending",
        notes: "Medium-term — UK entrepreneurship or tech event",
      },
      {
        id: "g11",
        title: "Launch UK-based freelance agency",
        date: "2028-06-01",
        status: "pending",
        notes: "Medium-term — team of developers",
      },
      // LONG-TERM (3-10 years)
      {
        id: "g12",
        title: "Launch software agency with a team",
        date: "2029-01-01",
        status: "pending",
        notes: "Long-term — scale beyond solo freelancing",
      },
      {
        id: "g13",
        title: "Build a SaaS product",
        date: "2029-06-01",
        status: "pending",
        notes: "Long-term — scalable recurring revenue",
      },
      {
        id: "g14",
        title: "Open physical retail store (UK or Algeria)",
        date: "2029-01-01",
        status: "pending",
        notes: "Long-term — Lumatex succession + UK retail experience",
      },
      {
        id: "g15",
        title: "Become financially independent",
        date: "2029-01-01",
        status: "pending",
        notes: "Long-term — money works for me, not the reverse",
      },
      {
        id: "g16",
        title: "Millionaire net worth by age 30",
        date: "2030-03-01",
        status: "pending",
        notes: "Long-term — the number",
      },
      {
        id: "g17",
        title: "Build multi-vendor e-commerce platform for Algeria",
        date: "2029-01-01",
        status: "pending",
        notes: "Long-term — PIRIMI scaled + AI + logistics",
      },
      {
        id: "g18",
        title: "Create opportunities for others",
        date: "2030-01-01",
        status: "pending",
        notes: "Long-term — hire, mentor, invest in others",
      },
    ],
  },
  {
    id: "r4",
    title: "5-Phase Life Blueprint — Age 19→30 (Detailed)",
    description:
      "Comprehensive phase-by-phase plan with daily hour commitments, specific resources, tasks, and expected outcomes. Academic → MSc Prep → UK Master's → Early Career → Wealth Building.",
    status: "active",
    startDate: "2022-01-01",
    endDate: "2030-01-01",
    milestones: [
      // ── PHASE 1: Academic Excellence & Skill Building (Age 19-21) ──
      {
        id: "r4m1",
        title: "Complete Bachelor's with top grades",
        date: "2025-07-01",
        status: "done",
        notes:
          "Phase 1 | 3-4h/day | Coursera, Udemy, Khan Academy | → High GPA, strong CS foundation",
      },
      {
        id: "r4m2",
        title: "Achieve IELTS 6.5-7.0",
        date: "2025-06-01",
        status: "done",
        notes:
          "Phase 1 | Age 20-21 | 1-2h/day | Cambridge IELTS books, IELTS Liz, IELTS Simon | → Target score achieved. Actual: 7.0 ✓",
      },
      {
        id: "r4m3",
        title: "Build a strong portfolio",
        date: "2025-06-01",
        status: "done",
        notes:
          "Phase 1 | 1-2h/day | Coursera, LinkedIn, Upwork, Fiverr | → Certifications, experience, projects in portfolio ✓",
      },
      {
        id: "r4m4",
        title: "Financial literacy and savings habit",
        date: "2025-01-01",
        status: "done",
        notes:
          "Phase 1 | 1h/week | Rich Dad Poor Dad, budgeting apps | → Savings, basic financial literacy ✓",
      },

      // ── PHASE 2: Master's Preparation & Application (Age 21-22) ──
      {
        id: "r4m5",
        title: "Apply for Master's programmes in UK",
        date: "2025-12-01",
        status: "done",
        notes:
          "Phase 2 | 2-3h/week | University websites, scholarship databases | → Successful admission to UK university. Salford ✓",
      },
      {
        id: "r4m6",
        title: "Gain practical experience (internships/projects)",
        date: "2025-09-01",
        status: "done",
        notes:
          "Phase 2 | Age 21-22 | 1-2h/day | Internships, personal projects, open-source | → Enhanced practical experience ✓",
      },
      {
        id: "r4m7",
        title: "Continued skill development (AI, Cybersecurity)",
        date: "2026-06-01",
        status: "active",
        notes:
          "Phase 2 | 1-2h/day | Coursera, edX, industry workshops | → Specialized skills",
      },
      {
        id: "r4m8",
        title: "Financial planning for UK life",
        date: "2026-08-01",
        status: "active",
        notes:
          "Phase 2 | 1h/week | Savings accounts, currency exchange tools | → $10,000-$15,000 saved for UK",
      },

      // ── PHASE 3: Master's Program in UK (Age 22-23) ──
      {
        id: "r4m9",
        title: "Excel in Master's programme — maintain high GPA",
        date: "2027-06-01",
        status: "pending",
        notes:
          "Phase 3 | Age 22-23 | 4-5h/day | University resources, academic journals | → Strong academic performance",
      },
      {
        id: "r4m10",
        title: "Build UK professional network",
        date: "2027-06-01",
        status: "pending",
        notes:
          "Phase 3 | 1-2h/day | Career fairs, LinkedIn, university events | → UK work experience, professional network",
      },
      {
        id: "r4m11",
        title: "Gain UK work experience / internship",
        date: "2027-03-01",
        status: "pending",
        notes:
          "Phase 3 | 2-3h/week | University career services, job boards | → Secured job offers, visa ready",
      },
      {
        id: "r4m12",
        title: "Apply for jobs + prepare Graduate Route visa",
        date: "2027-08-01",
        status: "pending",
        notes:
          "Phase 3 | Job boards, company websites, mentorship | → Career progression, increased salary",
      },

      // ── PHASE 4: Early Career & Financial Growth (Age 23-26) ──
      {
        id: "r4m13",
        title: "Establish full-time IT career — focus on growth",
        date: "2028-01-01",
        status: "pending",
        notes:
          "Phase 4 | Age 23-26 | 8-10h/day | Job boards, company websites | → Career progression, increased salary",
      },
      {
        id: "r4m14",
        title: "Save 30-50% of income — start investing",
        date: "2028-06-01",
        status: "pending",
        notes:
          "Phase 4 | 2-3h/week | Investment books, stock market apps | → Growing savings and investments",
      },
      {
        id: "r4m15",
        title: "Start side business or join a startup",
        date: "2028-06-01",
        status: "pending",
        notes:
          "Phase 4 | 5-10h/week | Freelance platforms, startup incubators | → Additional income, business experience",
      },

      // ── PHASE 5: Wealth Building & Long-Term Planning (Age 26-28) ──
      {
        id: "r4m16",
        title: "Move into senior/management role",
        date: "2029-01-01",
        status: "pending",
        notes:
          "Phase 5 | Age 26-28 | 8-10h/day | Career development programs, networking | → Senior role, increased earning potential",
      },
      {
        id: "r4m17",
        title: "Aim for £500,000 net worth by age 26-27",
        date: "2029-06-01",
        status: "pending",
        notes:
          "Phase 5 | 2-3h/week | Real estate investment courses, financial advisors | → Significant wealth accumulation",
      },
      {
        id: "r4m18",
        title: "Invest in real estate",
        date: "2029-06-01",
        status: "pending",
        notes:
          "Phase 5 | Real estate investment | → Significant wealth accumulation",
      },
      {
        id: "r4m19",
        title: "Work towards $1M net worth by age 28",
        date: "2030-01-01",
        status: "pending",
        notes:
          "Phase 5 | 2-3h/week | Financial planning tools, legacy planning resources | → Achieved millionaire status",
      },
    ],
  },
];

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
const BTN_SM = {
  padding: "4px 8px",
  background: "transparent",
  border: `1px solid ${C.border}44`,
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 10,
  color: C.muted,
  fontFamily: "inherit",
  display: "inline-flex",
  alignItems: "center",
  gap: 3,
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

// ── Progress bar ────────────────────────────────────────────────
function ProgressBar({ milestones }) {
  const done = milestones.filter((m) => m.status === "done").length;
  const pct = milestones.length
    ? Math.round((done / milestones.length) * 100)
    : 0;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: C.muted,
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        <span>
          {done}/{milestones.length} milestones
        </span>
        <span>{pct}%</span>
      </div>
      <div
        style={{
          height: 6,
          background: "#e0d800",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background:
              pct === 100 ? "#7c3aed" : pct > 50 ? "#228b22" : C.accentDk,
            borderRadius: 3,
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}

// ── Milestone row ───────────────────────────────────────────────
function MilestoneRow({ m, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...m });
  const ms =
    MILESTONE_STATUS.find((s) => s.value === m.status) || MILESTONE_STATUS[2];
  const Icon = ms.icon;

  if (editing) {
    return (
      <div
        style={{
          background: C.paper,
          borderRadius: 8,
          padding: 10,
          border: `1px solid ${C.border}44`,
          display: "grid",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 8,
          }}
        >
          <F label="Title">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              style={INP}
            />
          </F>
          <F label="Date">
            <input
              type="date"
              value={form.date || ""}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              style={INP}
            />
          </F>
          <F label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value }))
              }
              style={SEL}
            >
              {MILESTONE_STATUS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </F>
        </div>
        <F label="Notes">
          <input
            value={form.notes || ""}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            style={INP}
          />
        </F>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => {
              onUpdate(form);
              setEditing(false);
            }}
            style={{
              ...BTN_SM,
              background: C.accent,
              border: `1px solid ${C.border}`,
            }}
          >
            <Check size={10} /> Save
          </button>
          <button onClick={() => setEditing(false)} style={BTN_SM}>
            <X size={10} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "8px 0",
        borderBottom: `1px solid ${C.border}11`,
      }}
    >
      {/* Status icon — click to cycle */}
      <button
        onClick={() => {
          const order = ["pending", "active", "done"];
          const next = order[(order.indexOf(m.status) + 1) % 3];
          onUpdate({ ...m, status: next });
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginTop: 1,
          flexShrink: 0,
        }}
      >
        <Icon size={16} color={ms.color} />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: m.status === "done" ? 600 : 700,
              color: m.status === "done" ? "#aaa" : C.text,
              textDecoration: m.status === "done" ? "line-through" : "none",
            }}
          >
            {m.title}
          </span>
          {m.date && (
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
              {m.date}
            </span>
          )}
          <span
            style={{
              fontSize: 9,
              padding: "1px 6px",
              borderRadius: 6,
              background: ms.color + "22",
              color: ms.color,
              fontWeight: 700,
            }}
          >
            {ms.label}
          </span>
        </div>
        {m.notes && (
          <div
            style={{
              fontSize: 10,
              color: C.muted,
              marginTop: 2,
              lineHeight: 1.5,
            }}
          >
            {m.notes}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
        <button
          onClick={() => {
            setForm({ ...m });
            setEditing(true);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.accentDk,
            padding: 2,
          }}
        >
          <Edit3 size={11} />
        </button>
        <button
          onClick={() => onDelete(m.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#ddd",
            padding: 2,
          }}
        >
          <Trash2 size={11} />
        </button>
      </div>
    </div>
  );
}

// ── Roadmap Card ────────────────────────────────────────────────
function RoadmapCard({ roadmap, onUpdate, onDelete }) {
  const [exp, setExp] = useState(roadmap.status === "active");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...roadmap });
  const [newM, setNewM] = useState({
    title: "",
    date: "",
    status: "pending",
    notes: "",
  });
  const [addingM, setAddingM] = useState(false);

  const st =
    STATUS_OPTIONS.find((s) => s.value === roadmap.status) || STATUS_OPTIONS[0];
  const done = roadmap.milestones.filter((m) => m.status === "done").length;
  const active = roadmap.milestones.filter((m) => m.status === "active").length;

  function updateMilestone(updated) {
    const milestones = roadmap.milestones.map((m) =>
      m.id === updated.id ? updated : m,
    );
    onUpdate(roadmap.id, { milestones });
  }
  function deleteMilestone(mid) {
    onUpdate(roadmap.id, {
      milestones: roadmap.milestones.filter((m) => m.id !== mid),
    });
  }
  function addMilestone() {
    if (!newM.title.trim()) return;
    const m = { ...newM, id: `m${Date.now()}` };
    onUpdate(roadmap.id, { milestones: [...roadmap.milestones, m] });
    setNewM({ title: "", date: "", status: "pending", notes: "" });
    setAddingM(false);
  }

  if (editing) {
    return (
      <div
        style={{
          background: "white",
          border: `2px solid ${C.border}`,
          borderRadius: 14,
          padding: 18,
          display: "grid",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <F label="Title *">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              style={INP}
            />
          </F>
          <F label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value }))
              }
              style={SEL}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </F>
          <F label="Start">
            <input
              type="date"
              value={form.startDate || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, startDate: e.target.value }))
              }
              style={INP}
            />
          </F>
          <F label="End">
            <input
              type="date"
              value={form.endDate || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, endDate: e.target.value }))
              }
              style={INP}
            />
          </F>
        </div>
        <F label="Description">
          <textarea
            value={form.description || ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            style={{ ...INP, minHeight: 60, resize: "vertical" }}
          />
        </F>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => {
              onUpdate(roadmap.id, form);
              setEditing(false);
            }}
            style={BTN_P}
          >
            <Check size={12} /> Save
          </button>
          <button onClick={() => setEditing(false)} style={BTN_C}>
            <X size={12} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        border: `1px solid ${C.border}33`,
        borderLeft: `4px solid ${st.color}`,
        boxShadow: "0 1px 4px rgba(180,160,0,0.07)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{ padding: "14px 18px", cursor: "pointer" }}
        onClick={() => setExp((v) => !v)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Flag size={14} color={st.color} />
              <span style={{ fontWeight: 800, fontSize: 14, color: C.text }}>
                {roadmap.title}
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontSize: 9,
                  fontWeight: 700,
                  background: st.bg,
                  color: st.color,
                }}
              >
                {st.label.toUpperCase()}
              </span>
            </div>
            {roadmap.description && (
              <p
                style={{
                  fontSize: 11,
                  color: C.muted,
                  margin: "6px 0 0",
                  lineHeight: 1.6,
                }}
              >
                {roadmap.description}
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              {roadmap.startDate && (
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
                  Start: {roadmap.startDate}
                </span>
              )}
              {roadmap.endDate && (
                <span
                  style={{
                    fontSize: 10,
                    color: "#aaa",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Target size={9} />
                  End: {roadmap.endDate}
                </span>
              )}
              <span style={{ fontSize: 10, color: "#228b22", fontWeight: 600 }}>
                ✓ {done} done
              </span>
              {active > 0 && (
                <span
                  style={{ fontSize: 10, color: C.accentDk, fontWeight: 600 }}
                >
                  ⚡ {active} active
                </span>
              )}
            </div>
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
              onClick={() => setEditing(true)}
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
                if (window.confirm("Delete this roadmap?"))
                  onDelete(roadmap.id);
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
              onClick={() => setExp((v) => !v)}
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
        <div style={{ marginTop: 10 }}>
          <ProgressBar milestones={roadmap.milestones} />
        </div>
      </div>

      {/* Milestones */}
      {exp && (
        <div
          style={{
            borderTop: `1px solid ${C.border}22`,
            background: C.paper,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "#8a7000",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Target size={9} /> Milestones
            </div>
            <button
              onClick={() => setAddingM((v) => !v)}
              style={{
                ...BTN_SM,
                background: C.accent,
                border: `1px solid ${C.border}`,
              }}
            >
              <Plus size={10} /> Add milestone
            </button>
          </div>

          {addingM && (
            <div
              style={{
                background: "white",
                borderRadius: 8,
                padding: 10,
                border: `1px solid ${C.border}44`,
                marginBottom: 10,
                display: "grid",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  gap: 8,
                }}
              >
                <F label="Title *">
                  <input
                    value={newM.title}
                    onChange={(e) =>
                      setNewM((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Milestone..."
                    style={INP}
                    autoFocus
                  />
                </F>
                <F label="Date">
                  <input
                    type="date"
                    value={newM.date}
                    onChange={(e) =>
                      setNewM((p) => ({ ...p, date: e.target.value }))
                    }
                    style={INP}
                  />
                </F>
                <F label="Status">
                  <select
                    value={newM.status}
                    onChange={(e) =>
                      setNewM((p) => ({ ...p, status: e.target.value }))
                    }
                    style={SEL}
                  >
                    {MILESTONE_STATUS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </F>
              </div>
              <F label="Notes">
                <input
                  value={newM.notes}
                  onChange={(e) =>
                    setNewM((p) => ({ ...p, notes: e.target.value }))
                  }
                  placeholder="Optional notes..."
                  style={INP}
                />
              </F>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={addMilestone}
                  style={{
                    ...BTN_SM,
                    background: C.accent,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <Check size={10} /> Add
                </button>
                <button onClick={() => setAddingM(false)} style={BTN_SM}>
                  <X size={10} /> Cancel
                </button>
              </div>
            </div>
          )}

          {roadmap.milestones.length === 0 && !addingM && (
            <div
              style={{
                textAlign: "center",
                padding: 20,
                color: "#bbb",
                fontSize: 12,
              }}
            >
              No milestones yet. Add your first one.
            </div>
          )}

          <div>
            {roadmap.milestones.map((m) => (
              <MilestoneRow
                key={m.id}
                m={m}
                onUpdate={updateMilestone}
                onDelete={deleteMilestone}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add Roadmap Form ────────────────────────────────────────────
function AddForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "planned",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    milestones: [],
  });
  function submit() {
    if (!form.title.trim()) return;
    onAdd({ ...form, id: `r${Date.now()}` });
  }
  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: 18,
        marginBottom: 16,
        display: "grid",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: C.muted,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Flag size={16} color={C.accentDk} /> New Roadmap
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 10,
        }}
      >
        <F label="Title *">
          <input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Roadmap title..."
            style={INP}
            autoFocus
          />
        </F>
        <F label="Status">
          <select
            value={form.status}
            onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
            style={SEL}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </F>
        <F label="Start">
          <input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, startDate: e.target.value }))
            }
            style={INP}
          />
        </F>
        <F label="End">
          <input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, endDate: e.target.value }))
            }
            style={INP}
          />
        </F>
      </div>
      <F label="Description">
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="What is this roadmap about?"
          style={{ ...INP, minHeight: 60, resize: "vertical" }}
        />
      </F>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={submit} style={BTN_P}>
          <Plus size={13} /> Create Roadmap
        </button>
        <button onClick={onClose} style={BTN_C}>
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────
export default function Roadmaps() {
  const [items, setItems] = useState(() => {
    const stored = lsGet("crm_roadmaps", null);
    return stored && stored.length > 0 ? stored : SEED;
  });
  const [showAdd, setShowAdd] = useState(false);

  function updateLocal(id, u) {
    const updated = items.map((i) => (i.id === id ? { ...i, ...u } : i));
    setItems(updated);
    lsSave("crm_roadmaps", updated);
  }
  function deleteLocal(id) {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    lsSave("crm_roadmaps", updated);
  }
  function addLocal(item) {
    const updated = [item, ...items];
    setItems(updated);
    lsSave("crm_roadmaps", updated);
  }

  const totalDone = items
    .flatMap((r) => r.milestones)
    .filter((m) => m.status === "done").length;
  const totalMilestones = items.flatMap((r) => r.milestones).length;
  const active = items.filter((r) => r.status === "active").length;

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
            <TrendingUp size={22} color={C.accentDk} /> Roadmaps & Plans
            <span style={{ fontSize: 14, color: "#aaa", fontFamily: "serif" }}>
              خرائط الطريق
            </span>
          </h2>
          <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
            Life plans · Career milestones · Project roadmaps — click a
            milestone icon to cycle its status
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          style={{ ...BTN_P, display: "flex", alignItems: "center", gap: 5 }}
        >
          <Plus size={14} /> New Roadmap
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {[
          { v: items.length, l: "Roadmaps", c: C.muted },
          { v: active, l: "Active", c: "#228b22" },
          { v: totalDone, l: "Done", c: "#7c3aed" },
          {
            v: `${totalDone}/${totalMilestones}`,
            l: "Milestones",
            c: C.accentDk,
          },
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
        <AddForm
          onAdd={(item) => {
            addLocal(item);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((r) => (
          <RoadmapCard
            key={r.id}
            roadmap={r}
            onUpdate={updateLocal}
            onDelete={deleteLocal}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 48,
            color: "#bbb",
            fontSize: 13,
          }}
        >
          No roadmaps yet. Create your first one.
        </div>
      )}
    </div>
  );
}

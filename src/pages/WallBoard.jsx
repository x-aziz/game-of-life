import { useState, useMemo } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Search,
  Target,
  Zap,
  Star,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Trophy,
  Globe,
  Smile,
  ChevronDown,
  ChevronUp,
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

// Sticker types — each has a color + icon
const TYPES = [
  {
    value: "motivation",
    label: "Motivation",
    icon: Zap,
    color: "#ffe600",
    text: "#5a4a00",
    border: "#c8a000",
  },
  {
    value: "plan",
    label: "Plan",
    icon: Target,
    color: "#e8f4ff",
    text: "#1d4ed8",
    border: "#1d4ed8",
  },
  {
    value: "task",
    label: "Task",
    icon: Check,
    color: "#e8fce8",
    text: "#228b22",
    border: "#228b22",
  },
  {
    value: "reminder",
    label: "Reminder",
    icon: AlertCircle,
    color: "#fff0f0",
    text: "#dc2626",
    border: "#dc2626",
  },
  {
    value: "achievement",
    label: "Achievement",
    icon: Trophy,
    color: "#f5f0ff",
    text: "#7c3aed",
    border: "#7c3aed",
  },
  {
    value: "vocab",
    label: "Vocab",
    icon: Globe,
    color: "#f0fff8",
    text: "#059669",
    border: "#059669",
  },
  {
    value: "quote",
    label: "Quote",
    icon: Smile,
    color: "#fef9f0",
    text: "#b45309",
    border: "#b45309",
  },
  {
    value: "idea",
    label: "Idea",
    icon: Lightbulb,
    color: "#fff8e0",
    text: "#c8a000",
    border: "#b8a000",
  },
  {
    value: "note",
    label: "Note",
    icon: BookOpen,
    color: "#f5f5f5",
    text: "#555",
    border: "#bbb",
  },
];

// Sticker colors — physical color of the sticker paper
const COLORS = [
  { value: "yellow", hex: "#ffe600", label: "Yellow" },
  { value: "pink", hex: "#ffb3d1", label: "Pink" },
  { value: "blue", hex: "#b3d4ff", label: "Blue" },
  { value: "green", hex: "#b3ffcc", label: "Green" },
  { value: "orange", hex: "#ffcc99", label: "Orange" },
  { value: "purple", hex: "#e0b3ff", label: "Purple" },
  { value: "white", hex: "#ffffff", label: "White" },
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
    id: "w1",
    type: "motivation",
    color: "yellow",
    pinned: true,
    date: "2022-06-21",
    content:
      "The question is: How the fuck these people have Ferraries\n\nI couldn't sleep one day asking this question.",
    tags: ["drive", "wealth", "obsession"],
  },
  {
    id: "w2",
    type: "quote",
    color: "white",
    date: "2022-06-21",
    content: "تعلم شيء من كل شيء\n\nLearn something from everything.",
    tags: ["mindset", "learning"],
  },
  {
    id: "w3",
    type: "motivation",
    color: "yellow",
    date: "2022-06-21",
    content: "شغفك حوله إلى بيزنس\n\nTurn your passion into a business.",
    tags: ["passion", "business"],
  },
  {
    id: "w4",
    type: "reminder",
    color: "pink",
    date: "2022-06-21",
    content:
      "لتخلص من مشاعر السلبية وعيش السعادة هو أن تعيش الآن.\n\nTo get rid of negative emotions and live happily — live in the NOW.",
    tags: ["present-moment", "mental-health"],
  },
  {
    id: "w5",
    type: "plan",
    color: "blue",
    date: "2023-01-01",
    content:
      "Instead of just studying at university:\n\n• Work online → branding, e-commerce, dropshipping, freelance\n• Join gym\n• Learn skills\n• Study formation → web dev, accounting, management\n• Search and apply for scholarships",
    tags: ["self-reliance", "alternative-education", "plan"],
  },
  {
    id: "w6",
    type: "task",
    color: "green",
    date: "2023-01-01",
    content:
      "5-Step Learning Method:\n1. Write words even if you don't understand\n2. Search the internet about the topic\n3. Make a summary of alternative models\n4. Read a book\n5. Review from wake-up to that moment",
    tags: ["learning-method", "study", "system"],
  },
  {
    id: "w7",
    type: "vocab",
    color: "orange",
    date: "2023-06-01",
    content:
      "French → Arabic vocab:\n• Particulièrement → بشكل خاص\n• absolument → تماما\n• autrement → بشكل مختلف\n• quand même → على أي حال\n• Parfaitement → بشكل مثالي\n• effectivement → فعلا\n• dehors → في الخارج",
    tags: ["french", "arabic", "vocab", "language"],
  },
  {
    id: "w8",
    type: "vocab",
    color: "orange",
    date: "2023-06-01",
    content:
      "French → Arabic vocab:\n• la nouvelle → خبر\n• hasard → عشوائي\n• la chance → الحظ\n• la création → ابتكار\n• la règle → قاعدة\n• rencontre → مقابلة\n• l'entretien → مقابلة عمل\n• renseignement → معلومة",
    tags: ["french", "arabic", "vocab", "language"],
  },
  {
    id: "w9",
    type: "achievement",
    color: "purple",
    date: "2024-01-01",
    content:
      "Personal SWOT — Strengths:\n✓ Emotional Intelligence\n✓ Well-organized\n✓ Empathy\n✓ Creativity\n✓ Discipline\n✓ Consistency\n✓ Athletic talent\n✓ Ambition\n\nPlan: use strengths to develop soft skills and tackle weaknesses.",
    tags: ["SWOT", "self-audit", "strengths"],
  },
  {
    id: "w10",
    type: "reminder",
    color: "pink",
    date: "2024-01-01",
    content:
      "Weaknesses to overcome:\n• Low Confidence → build track record\n• Weak negotiation → practice + LinkedIn presence\n• Overthinking → channel into content\n• Short Focus → Pomodoro + environment design\n• Leg shaking / stress → physical training",
    tags: ["SWOT", "weaknesses", "self-improvement"],
  },
  {
    id: "w11",
    type: "quote",
    color: "yellow",
    pinned: true,
    date: "2024-01-01",
    content:
      '"I just wanna become like my dad but not in Algeria — in UK."\n\n— Said Abdelaziz',
    tags: ["vision", "uk", "family", "drive"],
  },
  {
    id: "w12",
    type: "motivation",
    color: "orange",
    date: "2024-01-01",
    content:
      '"Once I land my leg on UK I will do whatever it takes to show my talent — whether in acting or in business."\n\n— Said Abdelaziz',
    tags: ["uk", "acting", "business", "commitment"],
  },
  {
    id: "w13",
    type: "quote",
    color: "white",
    date: "2024-01-01",
    content:
      '"I don\'t hate learning. I hate learning without building."\n\n— Said Abdelaziz',
    tags: ["learning", "building", "identity", "philosophy"],
  },
  {
    id: "w14",
    type: "motivation",
    color: "yellow",
    date: "2024-01-01",
    content:
      '"I will leave Algeria one day. And the only way out is education."\n\n— Said Abdelaziz',
    tags: ["algeria", "education", "freedom", "drive"],
  },
  {
    id: "w15",
    type: "achievement",
    color: "purple",
    date: "2025-07-01",
    content:
      "✓ CS Bachelor's Degree — Information Systems\n✓ Code213 Bootcamp — 98.5/100\n✓ GREEN LOOP Hackathon — 1st place, 38 teams\n✓ IELTS 7.0\n✓ Salford MSc Accepted\n✓ LinkedIn 3,572 followers at 22\n\nPhase 1 complete.",
    tags: ["achievements", "phase-1", "wins", "proof"],
  },
  {
    id: "w16",
    type: "plan",
    color: "blue",
    date: "2026-09-01",
    content:
      "UK Plan — Phase 2 Sequence:\n\n① Freelancer → first Upwork client $500+\n② $1,000+/month income\n③ Small Business + Multiple income sources\n④ E-commerce & Dropshipping\n⑤ Open Company + Entrepreneurship\n⑥ Invest in Properties\n⑦ Millionaire net worth by 30",
    tags: ["uk", "phase-2", "plan", "wealth", "sequence"],
  },
  {
    id: "w17",
    type: "reminder",
    color: "pink",
    date: "2024-01-01",
    content:
      "WEAKNESSES TO WORK ON:\n• Low confidence → build track record\n• Weak negotiation → practice + LinkedIn\n• Overthinking → channel into content\n• Perfectionism → ship before perfect\n• Fear of failure → failure = data",
    tags: ["weaknesses", "self-audit", "growth"],
  },
  {
    id: "w18",
    type: "task",
    color: "green",
    date: "2026-09-01",
    content:
      "SALFORD DAY 1 CHECKLIST:\n□ Add every classmate to People CRM\n□ Identify 3 potential co-founders\n□ Find the entrepreneurship club\n□ Set up part-time job search\n□ Run 100 Interaction Challenge\n□ Map professors by expertise\n□ Join 1 competition in first month",
    tags: ["salford", "checklist", "day-1", "manchester"],
  },
  {
    id: "w19",
    type: "motivation",
    color: "yellow",
    pinned: true,
    date: "2025-01-01",
    content:
      '"I promised my dad that I will arrive to open the shop there."\n\n— Said Abdelaziz\n\nThis is not a wish. It is a promise.',
    tags: ["promise", "dad", "shop", "uk", "commitment"],
  },
  {
    id: "w20",
    type: "quote",
    color: "white",
    date: "2025-01-01",
    content: '"I would invest every second for this plan."\n\n— Said Abdelaziz',
    tags: ["commitment", "time", "plan", "drive"],
  },
  {
    id: "w21",
    type: "reminder",
    color: "pink",
    date: "2025-01-01",
    content:
      '"I\'m just planning over planning over planning."\n\nStop. Pick one plan. Execute it.\n\nThe plan is already written. September 2026. Manchester. Phase 2.',
    tags: ["overplanning", "execution", "reminder", "focus"],
  },
  {
    id: "w22",
    type: "motivation",
    color: "orange",
    date: "2025-01-01",
    content:
      '"I live on the minimum, minimum in every cost that comes to me."\n\nFrugality is not poverty — it is delayed gratification with a roadmap.\n\nEvery pound saved at Salford = one brick of the shop.',
    tags: ["frugality", "savings", "mindset", "salford"],
  },
  {
    id: "w23",
    type: "plan",
    color: "blue",
    date: "2026-09-01",
    content:
      'UK SAVINGS TARGET — Salford 3 Years:\n\n• Minimum: £20,000–£30,000\n• Target: £40,000\n• Method: part-time work (20h/week) + frugal living\n• Every £ saved = invested into Algeria shop OR UK business\n\n"Whatever it takes."',
    tags: ["savings", "uk", "target", "salford", "financial-plan"],
  },
  {
    id: "w24",
    type: "quote",
    color: "yellow",
    pinned: true,
    date: "2023-01-01",
    content:
      '"Try all pains in your youth to receive expectation when you grow up.\n\nAnything you do, it should be with a purpose."\n\n— Said\'s wall, 2023',
    tags: ["purpose", "pain", "youth", "philosophy"],
  },
  {
    id: "w25",
    type: "reminder",
    color: "blue",
    date: "2023-01-01",
    content:
      "FIRST PRINCIPLES:\n\n→ Delay gratification\n  (even progress may be a fake gratification)\n→ Avoid shortcuts → take hard choices\n→ Apply leverage\n\nIn your 20s: don't shortcut time.\nDo that in your 40s and 30s.",
    tags: ["first-principles", "discipline", "shortcuts", "leverage"],
  },
  {
    id: "w26",
    type: "task",
    color: "green",
    date: "2023-06-01",
    content:
      "TRAMWAY SCHEDULE — Zero Dead Time:\n\nSaturday → Read IT English PDF\nSunday → Networking\nMonday → Read book / video summaries\nWednesday & Thursday → Podcasts\nSunday & Wednesday → English Copybook\n\nCommute = mobile classroom.",
    tags: ["tramway", "schedule", "english", "networking", "dead-time"],
  },
  {
    id: "w27",
    type: "task",
    color: "orange",
    date: "2023-06-01",
    content:
      "CONTENT DIET — Weekly Schedule:\n\nSaturday → Business / Finance\nSunday → Iman Gadzhi (scaling)\nMonday → Andrew Tate (discipline)\nTuesday → Diary of a CEO\nWednesday → New generation\nThursday → Younes / Omar Rahman",
    tags: ["content", "podcast", "schedule", "dopamine", "creators"],
  },
  {
    id: "w28",
    type: "motivation",
    color: "white",
    date: "2023-11-01",
    content:
      '"develop my english → search, speak, write every day\nmake a good body → sport day by day, healthy food, 1L water, meditation\nbe organized → prayer at its time, every day has a program, no free time\nbe straight → anything with no interest, leave it\nbe clever and cultured → talk, listen, act only interest; ask what are the best ways to do this every day"',
    tags: ["habits", "english", "body", "discipline", "identity"],
  },
  {
    id: "w29",
    type: "achievement",
    color: "purple",
    date: "2025-09-29",
    content:
      'CNEMPN Aviation Medical — Inapte Définitif au Vol\nDate: 29/09/2025\nGhardaia → Born: 01/03/2003\n\n"Unfit for flight" — by their definition.\n\nThe bureaucrats signed their names to a refusal.\nThey do not get to sign their names to the final destination.\n\n→ Doubled down on Full-Stack + Salford.',
    tags: ["setback", "aviation", "pivot", "resilience", "bureaucracy"],
  },
  {
    id: "w30",
    type: "plan",
    color: "green",
    date: "2023-01-01",
    content:
      "FREELANCE PLATFORM DEPLOYMENT:\n\nUpwork · Fiverr · Freelancer · PeoplePerHour\nToptal · Guru · Workana · SolidGigs\nAngelList/Wellfound · Hubstaff Talent\nMostaqil (مستقل) · FlexJobs · We Work Remotely\nBehance · Dribbble (UI/UX portfolio)\n\nTreat your skills as a product.\nDistribute to every market.",
    tags: ["freelance", "platforms", "upwork", "deployment", "skills"],
  },
  {
    id: "w31",
    type: "task",
    color: "yellow",
    date: "2023-01-01",
    content:
      "MORNING PROTOCOL:\n\n1. Wake up + Du'a الحمد لله الذي أحيانا\n2. Drink water\n3. Open window\n4. Change clothes\n5. Shower + Du'a\n6. Prayer + Quran at mosque\n7. Du'a النور: اللهم اجعل في قلبي نوراً\n\n\"O Allah, make this day a day of good.\"",
    tags: ["morning", "protocol", "prayer", "quran", "routine", "fajr"],
  },
  {
  id:'w35', type:'plan', color:'blue',
  date:'2025-01-01',
  content:'BAZAR2000 — Revenue Target: $18,000/month\n\n① Marketplace commission → $9,500\n② White-label (5 clients) → $3,500\n③ Cross-sell/upsell → $5,000\n④ Dropshipping → $2,500\n⑤ B2B bulk orders → $5,000+\n\nBuild sequence:\nMulti-vendor backend → B2B engine → AI recs → Analytics → Loyalty',
  tags:['bazar2000','revenue','plan','algeria','platform'],
}
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

// ── Single Sticker ──────────────────────────────────────────────
function Sticker({ item, onUpdate, onDelete, compact }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...item });
  const t = TYPES.find((x) => x.value === item.type) || TYPES[8];
  const Icon = t.icon;
  const stickerColor =
    COLORS.find((x) => x.value === item.color)?.hex || "#ffe600";

  function save() {
    onUpdate(item.id, form);
    setEditing(false);
  }

  if (editing) {
    return (
      <div
        style={{
          background: "white",
          border: `2px solid ${C.border}`,
          borderRadius: 12,
          padding: 14,
          display: "grid",
          gap: 10,
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <F label="Type">
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              style={SEL}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </F>
          <F label="Sticker Color">
            <div style={{ display: "flex", gap: 6, paddingTop: 4 }}>
              {COLORS.map((c) => (
                <div
                  key={c.value}
                  onClick={() => setForm((p) => ({ ...p, color: c.value }))}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 4,
                    background: c.hex,
                    border: `2px solid ${form.color === c.value ? C.border : "#ddd"}`,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  title={c.label}
                />
              ))}
            </div>
          </F>
        </div>
        <F label="Content">
          <textarea
            value={form.content}
            onChange={(e) =>
              setForm((p) => ({ ...p, content: e.target.value }))
            }
            style={{ ...INP, minHeight: 100, resize: "vertical" }}
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
        <F label="Tags">
          <input
            value={(form.tags || []).join(", ")}
            onBlur={(e) =>
              setForm((p) => ({
                ...p,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="tag1, tag2..."
            style={INP}
          />
        </F>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={save} style={BTN_P}>
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
        background: stickerColor,
        borderRadius: 4,
        padding: "12px 14px",
        position: "relative",
        boxShadow:
          "2px 3px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
        border: `1px solid ${stickerColor === "#ffffff" ? "#ddd" : "transparent"}`,
        minHeight: compact ? 80 : 100,
        cursor: "default",
        transition: "transform 0.1s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "rotate(0deg) scale(1.02)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "rotate(0deg) scale(1)")
      }
    >
      {/* Type badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 8,
            fontWeight: 700,
            color: t.text,
            background: "rgba(255,255,255,0.5)",
            padding: "1px 6px",
            borderRadius: 8,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <Icon size={8} />
          {t.label}
        </span>
        <div style={{ display: "flex", gap: 2 }}>
          <button
            onClick={() => setEditing(true)}
            style={{
              background: "rgba(255,255,255,0.4)",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              padding: "2px 4px",
              color: "#333",
            }}
          >
            <Edit3 size={10} />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Remove sticker?")) onDelete(item.id);
            }}
            style={{
              background: "rgba(255,255,255,0.4)",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              padding: "2px 4px",
              color: "#333",
            }}
          >
            <Trash2 size={10} />
          </button>
        </div>
      </div>

      {/* Content */}
      <p
        style={{
          fontSize: 11,
          color: "#1a1a00",
          margin: 0,
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {item.content}
      </p>

      {/* Footer */}
      <div
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {item.tags?.length > 0 && (
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {item.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 8,
                  background: "rgba(0,0,0,0.1)",
                  padding: "1px 5px",
                  borderRadius: 6,
                  color: "#333",
                }}
              >
                #{t}
              </span>
            ))}
          </div>
        )}
        {item.date && (
          <span style={{ fontSize: 8, color: "#555", opacity: 0.7 }}>
            {item.date}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Quick Add Form ──────────────────────────────────────────────
function QuickAdd({ onAdd, onClose }) {
  const [form, setForm] = useState({
    type: "motivation",
    color: "yellow",
    content: "",
    date: new Date().toISOString().slice(0, 10),
    tags: [],
  });
  function submit() {
    if (!form.content.trim()) return;
    onAdd({ ...form, id: `w${Date.now()}`, tags: form.tags || [] });
  }
  return (
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
          fontSize: 13,
          fontWeight: 800,
          color: C.muted,
          marginBottom: 12,
        }}
      >
        📌 New Sticker
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 8,
            alignItems: "end",
          }}
        >
          <F label="Type">
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              style={SEL}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </F>
          <div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "#8a7000",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Color
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {COLORS.map((c) => (
                <div
                  key={c.value}
                  onClick={() => setForm((p) => ({ ...p, color: c.value }))}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: c.hex,
                    border: `2px solid ${form.color === c.value ? C.border : "#ddd"}`,
                    cursor: "pointer",
                  }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
        <F label="Content">
          <textarea
            value={form.content}
            onChange={(e) =>
              setForm((p) => ({ ...p, content: e.target.value }))
            }
            placeholder="Write anything — plan, task, quote, vocab, reminder, achievement..."
            style={{ ...INP, minHeight: 90, resize: "vertical" }}
            autoFocus
          />
        </F>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <F label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              style={INP}
            />
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
              placeholder="tag1, tag2..."
              style={INP}
            />
          </F>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={submit} style={BTN_P}>
            <Plus size={13} /> Stick it
          </button>
          <button onClick={onClose} style={BTN_C}>
            <X size={12} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────
export default function WallBoard() {
  const [items, setItems] = useState(() => {
    const stored = lsGet("crm_wall", null);
    return stored && stored.length > 0 ? stored : SEED;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState("board"); // board | list

  function updateLocal(id, u) {
    const updated = items.map((i) => (i.id === id ? { ...i, ...u } : i));
    setItems(updated);
    lsSave("crm_wall", updated);
  }
  function deleteLocal(id) {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    lsSave("crm_wall", updated);
  }
  function addLocal(item) {
    const updated = [item, ...items];
    setItems(updated);
    lsSave("crm_wall", updated);
  }

  const stats = useMemo(() => {
    const counts = {};
    TYPES.forEach((t) => {
      counts[t.value] = items.filter((i) => i.type === t.value).length;
    });
    return { total: items.length, ...counts };
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        const ms =
          !search ||
          i.content.toLowerCase().includes(search.toLowerCase()) ||
          (i.tags || []).some((t) =>
            t.toLowerCase().includes(search.toLowerCase()),
          );
        const mt = typeFilter === "all" || i.type === typeFilter;
        return ms && mt;
      }),
    [items, search, typeFilter],
  );

  return (
    <div
      style={{
        padding: 16,
        fontFamily: "Inter,system-ui,sans-serif",
        maxWidth: 1100,
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
            📌 Wall Board{" "}
            <span style={{ fontSize: 14, color: "#aaa", fontFamily: "serif" }}>
              لوحة الحائط
            </span>
          </h2>
          <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
            Plans · Tasks · Quotes · Vocab · Reminders · Achievements — your
            physical wall, digitized
          </p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["board", "list"].map((v) => (
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
              {v === "board" ? "📌 Board" : "☰ List"}
            </button>
          ))}
          <button
            onClick={() => setShowAdd((v) => !v)}
            style={{ ...BTN_P, display: "flex", alignItems: "center", gap: 5 }}
          >
            <Plus size={14} /> Add Sticker
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 14,
          overflowX: "auto",
          paddingBottom: 2,
        }}
      >
        <div
          style={{
            background: "white",
            border: `1px solid ${C.border}33`,
            borderRadius: 10,
            padding: "6px 12px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: C.muted }}>
            {stats.total}
          </div>
          <div
            style={{
              fontSize: 8,
              color: "#aaa",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Total
          </div>
        </div>
        {TYPES.map((t) => {
          if (!stats[t.value]) return null;
          return (
            <div
              key={t.value}
              style={{
                background: t.color,
                border: `1px solid ${t.border}44`,
                borderRadius: 10,
                padding: "6px 12px",
                textAlign: "center",
                flexShrink: 0,
                cursor: "pointer",
                opacity: typeFilter === t.value ? 1 : 0.75,
              }}
              onClick={() =>
                setTypeFilter(typeFilter === t.value ? "all" : t.value)
              }
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>
                {stats[t.value]}
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: t.text,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {t.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add */}
      {showAdd && (
        <QuickAdd
          onAdd={(item) => {
            addLocal(item);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}

      {/* Search + filter */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
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
            placeholder="Search stickers..."
            style={{ ...INP, paddingLeft: 28, background: C.paper }}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ ...SEL, width: "auto", padding: "7px 10px" }}
        >
          <option value="all">All types</option>
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
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
          {items.length === 0
            ? "No stickers yet. Add your first one."
            : "No results."}
        </div>
      )}

      {/* Board view — masonry-style grid */}
      {view === "board" && filtered.length > 0 && (
        <div style={{ columns: "4 220px", columnGap: 12 }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                breakInside: "avoid",
                marginBottom: 12,
                display: "inline-block",
                width: "100%",
                transform: `rotate(${((item.id.charCodeAt(1) || 0) % 5) - 2}deg)`,
              }}
            >
              <Sticker
                item={item}
                onUpdate={updateLocal}
                onDelete={deleteLocal}
              />
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && filtered.length > 0 && (
        <div style={{ display: "grid", gap: 8 }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ transform: "none" }}>
              <Sticker
                item={item}
                onUpdate={updateLocal}
                onDelete={deleteLocal}
                compact
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

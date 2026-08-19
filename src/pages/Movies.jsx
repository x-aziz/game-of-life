import { useState, useMemo } from "react";
import {
  Film,
  Tv,
  Play,
  BookOpen,
  Star,
  Tag,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Filter,
  Lightbulb,
  Target,
  Zap,
  Eye,
  RotateCcw,
  Trash2,
  Edit3,
  Check,
  X,
  TrendingUp,
  Brain,
  Award,
} from "lucide-react";

// ── Color tokens ───────────────────────────────────────────────
const C = {
  paper: "#fffde0",
  border: "#b8a000",
  accent: "#ffe600",
  accentDk: "#c8a000",
  text: "#1a1a00",
  muted: "#6b5900",
  faint: "#f5edcc",
};

// ── Master watchlist — pre-loaded from Said's papers ──────────
const SEED = [
  // Entrepreneurship & Business Growth
  {
    id: "m1",
    title: "The Social Network",
    year: 2010,
    type: "movie",
    category: "entrepreneurship",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Strategic Thinking",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m2",
    title: "The Founder",
    year: 2016,
    type: "movie",
    category: "entrepreneurship",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Scaling Systems",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m3",
    title: "Moneyball",
    year: 2011,
    type: "movie",
    category: "entrepreneurship",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Data Analytics",
    biz_idea: "",
    watched: "",
  },
  // Wealth, Power & Strategic Thinking
  {
    id: "m4",
    title: "Steve Jobs",
    year: 2015,
    type: "movie",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Vision & Leadership",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m5",
    title: "Pirates of Silicon Valley",
    year: 1999,
    type: "series",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Competition",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m6",
    title: "Wall Street",
    year: 1987,
    type: "movie",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Finance & Investment",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m7",
    title: "The Big Short",
    year: 2015,
    type: "movie",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Financial Literacy",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m8",
    title: "Wolf of Wall Street",
    year: 2013,
    type: "movie",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Sales & Persuasion",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m9",
    title: "Margin Call",
    year: 2011,
    type: "movie",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Decision Making",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m10",
    title: "Glengarry Glen Ross",
    year: 1992,
    type: "movie",
    category: "wealth-strategy",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Negotiation",
    biz_idea: "",
    watched: "",
  },
  // Leadership & Influence
  {
    id: "m11",
    title: "The Godfather Trilogy",
    year: 1972,
    type: "series",
    category: "leadership",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Power & Loyalty",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m12",
    title: "There Will Be Blood",
    year: 2007,
    type: "movie",
    category: "leadership",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Ambition & Strategy",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m13",
    title: "The Pursuit of Happyness",
    year: 2006,
    type: "movie",
    category: "leadership",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Resilience",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m14",
    title: "Boiler Room",
    year: 2000,
    type: "movie",
    category: "leadership",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Sales Tactics",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m15",
    title: "Catch Me If You Can",
    year: 2002,
    type: "movie",
    category: "leadership",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Adaptability",
    biz_idea: "",
    watched: "",
  },
  // Technology & Innovation
  {
    id: "m16",
    title: "The Billion Dollar Code",
    year: 2021,
    type: "series",
    category: "tech-innovation",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "IP & Startup Law",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m17",
    title: "Ex Machina",
    year: 2014,
    type: "movie",
    category: "tech-innovation",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "AI Ethics",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m18",
    title: "Ready Player One",
    year: 2018,
    type: "movie",
    category: "tech-innovation",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Future Tech Vision",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m19",
    title: "Inception",
    year: 2010,
    type: "movie",
    category: "tech-innovation",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Complex Problem Solving",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m20",
    title: "Tenet",
    year: 2020,
    type: "movie",
    category: "tech-innovation",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Calculated Risk",
    biz_idea: "",
    watched: "",
  },
  // Discipline, Hard Work & Success
  {
    id: "m21",
    title: "Whiplash",
    year: 2014,
    type: "movie",
    category: "discipline",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Extreme Dedication",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m22",
    title: "Rocky / Creed",
    year: 1976,
    type: "series",
    category: "discipline",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Persistence",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m23",
    title: "Ford v Ferrari",
    year: 2019,
    type: "movie",
    category: "discipline",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Innovation & Competition",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m24",
    title: "American Gangster",
    year: 2007,
    type: "movie",
    category: "discipline",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Vision & Control",
    biz_idea: "",
    watched: "",
  },
  {
    id: "m25",
    title: "Jobs",
    year: 2013,
    type: "movie",
    category: "discipline",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Excellence Mindset",
    biz_idea: "",
    watched: "",
  },
];

const CATEGORIES = [
  {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    icon: TrendingUp,
    color: "#e8fce8",
    badge: "#228b22",
  },
  {
    id: "wealth-strategy",
    label: "Wealth & Strategy",
    icon: Award,
    color: "#fff8e0",
    badge: "#c8a000",
  },
  {
    id: "leadership",
    label: "Leadership",
    icon: Target,
    color: "#f5f0ff",
    badge: "#7c3aed",
  },
  {
    id: "tech-innovation",
    label: "Tech & Innovation",
    icon: Zap,
    color: "#e8f4ff",
    badge: "#1d4ed8",
  },
  {
    id: "discipline",
    label: "Discipline & Success",
    icon: Brain,
    color: "#fff0f0",
    badge: "#dc2626",
  },
];

const STATUS_CFG = {
  watchlist: {
    label: "Watchlist",
    color: "#e8f4ff",
    text: "#1d4ed8",
    icon: Eye,
  },
  watching: {
    label: "Watching",
    color: "#fff8e0",
    text: "#c8a000",
    icon: Play,
  },
  completed: {
    label: "Completed",
    color: "#e8fce8",
    text: "#228b22",
    icon: Check,
  },
  rewatch: {
    label: "Re-watch",
    color: "#f5f0ff",
    text: "#7c3aed",
    icon: RotateCcw,
  },
};

const SOFT_SKILLS = [
  "Strategic Thinking",
  "Scaling Systems",
  "Data Analytics",
  "Vision & Leadership",
  "Competition",
  "Finance & Investment",
  "Financial Literacy",
  "Sales & Persuasion",
  "Decision Making",
  "Negotiation",
  "Power & Loyalty",
  "Ambition & Strategy",
  "Resilience",
  "Sales Tactics",
  "Adaptability",
  "IP & Startup Law",
  "AI Ethics",
  "Future Tech Vision",
  "Complex Problem Solving",
  "Calculated Risk",
  "Extreme Dedication",
  "Persistence",
  "Innovation & Competition",
  "Vision & Control",
  "Excellence Mindset",
  "Communication",
  "Focus",
  "Time Management",
  "Networking",
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

// ── Star rating ────────────────────────────────────────────────
function Stars({ value, onChange, size = 16 }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={(hov || value) >= i ? C.accent : "none"}
          color={(hov || value) >= i ? C.accentDk : "#ccc"}
          style={{
            cursor: onChange ? "pointer" : "default",
            transition: "color 0.1s",
          }}
          onMouseEnter={() => onChange && setHov(i)}
          onMouseLeave={() => onChange && setHov(0)}
          onClick={() => onChange?.(i)}
        />
      ))}
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────
function StatusBadge({ status, onClick }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.watchlist;
  const Icon = cfg.icon;
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 10px",
        borderRadius: 20,
        background: cfg.color,
        color: cfg.text,
        border: `1px solid ${cfg.text}33`,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.03em",
        cursor: onClick ? "pointer" : "default",
        fontFamily: "inherit",
        transition: "opacity 0.1s",
      }}
    >
      <Icon size={9} />
      {cfg.label.toUpperCase()}
    </button>
  );
}

// ── Category badge ─────────────────────────────────────────────
function CatBadge({ catId }) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  if (!cat) return null;
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 10,
        background: cat.color,
        color: cat.badge,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.04em",
        border: `1px solid ${cat.badge}33`,
      }}
    >
      {cat.label.toUpperCase()}
    </span>
  );
}

// ── Expandable movie card ──────────────────────────────────────
function MovieCard({ movie, onUpdate, onDelete }) {
  const [exp, setExp] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...movie });

  function cycleStatus() {
    const order = ["watchlist", "watching", "completed", "rewatch"];
    const next = order[(order.indexOf(movie.status) + 1) % order.length];
    onUpdate(movie.id, { status: next });
  }

  function saveEdit() {
    onUpdate(movie.id, form);
    setEditing(false);
  }

  const cat = CATEGORIES.find((c) => c.id === movie.category);
  const typeIcon =
    movie.type === "series" ? (
      <Tv size={14} color={C.muted} />
    ) : (
      <Film size={14} color={C.muted} />
    );

  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${C.border}44`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(180,160,0,0.08)",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          background:
            movie.status === "completed"
              ? "#f0fff0"
              : movie.status === "watching"
                ? "#fffdf0"
                : "white",
          borderBottom: exp ? `1px solid ${C.border}22` : "none",
          cursor: "pointer",
        }}
        onClick={() => {
          if (!editing) setExp((v) => !v);
        }}
      >
        {/* Type icon */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: C.faint,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {typeIcon}
        </div>

        {/* Title + meta */}
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
                fontWeight: 700,
                fontSize: 13,
                color: C.text,
                textDecoration: movie.status === "completed" ? "none" : "none",
              }}
            >
              {movie.title}
            </span>
            <span style={{ fontSize: 10, color: C.muted }}>({movie.year})</span>
            <CatBadge catId={movie.category} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
            }}
          >
            <StatusBadge
              status={movie.status}
              onClick={(e) => {
                e.stopPropagation();
                cycleStatus();
              }}
            />
            {movie.rating > 0 && <Stars value={movie.rating} size={12} />}
            {movie.soft_skill && (
              <span
                style={{
                  fontSize: 10,
                  color: C.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Target size={9} />
                {movie.soft_skill}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexShrink: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setEditing((v) => !v);
              setExp(true);
              setForm({ ...movie });
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
              if (window.confirm("Delete?")) onDelete(movie.id);
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
          <div style={{ color: C.accentDk }}>
            {exp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded view */}
      {exp && !editing && (
        <div
          style={{
            padding: "12px 16px",
            background: C.paper,
            display: "grid",
            gap: 12,
          }}
        >
          {movie.lessons && (
            <div>
              <div style={LABEL_STYLE}>
                <Lightbulb size={10} /> Core Takeaway
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: C.text,
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {movie.lessons}
              </p>
            </div>
          )}
          {movie.biz_idea && (
            <div
              style={{
                background: "#fffde0",
                borderLeft: `3px solid ${C.accent}`,
                borderRadius: "0 8px 8px 0",
                padding: "8px 12px",
              }}
            >
              <div style={LABEL_STYLE}>
                <Zap size={10} /> Business / Project Idea Sparked
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: C.text,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {movie.biz_idea}
              </p>
            </div>
          )}
          {movie.watched && (
            <div
              style={{
                fontSize: 10,
                color: C.muted,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Calendar size={10} /> Last watched: {movie.watched}
            </div>
          )}
          {!movie.lessons && !movie.biz_idea && (
            <p
              style={{
                fontSize: 11,
                color: "#bbb",
                textAlign: "center",
                padding: "8px 0",
                margin: 0,
              }}
            >
              Click ✏️ to add your takeaway and business ideas
            </p>
          )}
        </div>
      )}

      {/* Edit form */}
      {exp && editing && (
        <div
          style={{
            padding: "14px 16px",
            background: C.paper,
            display: "grid",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            <div>
              <div style={LABEL_STYLE}>Status</div>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                style={SEL}
              >
                {Object.entries(STATUS_CFG).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div style={LABEL_STYLE}>Rating</div>
              <Stars
                value={form.rating}
                onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
                size={18}
              />
            </div>
            <div>
              <div style={LABEL_STYLE}>Date watched</div>
              <input
                type="date"
                value={form.watched}
                onChange={(e) =>
                  setForm((p) => ({ ...p, watched: e.target.value }))
                }
                style={INP}
              />
            </div>
          </div>
          <div>
            <div style={LABEL_STYLE}>Target soft skill</div>
            <select
              value={form.soft_skill}
              onChange={(e) =>
                setForm((p) => ({ ...p, soft_skill: e.target.value }))
              }
              style={SEL}
            >
              {SOFT_SKILLS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <div style={LABEL_STYLE}>
              <Lightbulb size={10} /> Core takeaway / lesson
            </div>
            <textarea
              value={form.lessons}
              onChange={(e) =>
                setForm((p) => ({ ...p, lessons: e.target.value }))
              }
              placeholder="What is the main business or life lesson from this film? What strategy can you apply this week?"
              style={{ ...INP, minHeight: 72, resize: "vertical" }}
            />
          </div>
          <div>
            <div style={LABEL_STYLE}>
              <Zap size={10} /> Business / project idea sparked
            </div>
            <textarea
              value={form.biz_idea}
              onChange={(e) =>
                setForm((p) => ({ ...p, biz_idea: e.target.value }))
              }
              placeholder="What software module, CRM workflow, or startup idea did this film trigger in your mind?"
              style={{ ...INP, minHeight: 56, resize: "vertical" }}
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

// ── Add custom movie form ──────────────────────────────────────
function AddMovieForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    year: new Date().getFullYear(),
    type: "movie",
    category: "entrepreneurship",
    status: "watchlist",
    rating: 0,
    lessons: "",
    soft_skill: "Strategic Thinking",
    biz_idea: "",
    watched: "",
  });
  const f = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  function submit() {
    if (!form.title.trim()) return;
    onAdd({ ...form, id: `m${Date.now()}`, year: parseInt(form.year) || 2024 });
    onClose();
  }

  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: 18,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: C.muted,
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Film size={16} /> Add to your library
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div>
          <div style={LABEL_STYLE}>Title *</div>
          <input
            value={form.title}
            onChange={f("title")}
            placeholder="Movie or series name"
            style={INP}
          />
        </div>
        <div>
          <div style={LABEL_STYLE}>Year</div>
          <input
            type="number"
            value={form.year}
            onChange={f("year")}
            style={INP}
          />
        </div>
        <div>
          <div style={LABEL_STYLE}>Type</div>
          <select value={form.type} onChange={f("type")} style={SEL}>
            <option value="movie">🎬 Movie</option>
            <option value="series">📺 Series</option>
            <option value="documentary">🎥 Documentary</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div>
          <div style={LABEL_STYLE}>Category</div>
          <select value={form.category} onChange={f("category")} style={SEL}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div style={LABEL_STYLE}>Status</div>
          <select value={form.status} onChange={f("status")} style={SEL}>
            {Object.entries(STATUS_CFG).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div style={LABEL_STYLE}>Soft skill</div>
          <select
            value={form.soft_skill}
            onChange={f("soft_skill")}
            style={SEL}
          >
            {SOFT_SKILLS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={submit} style={BTN_P}>
          <Plus size={12} /> Add to library
        </button>
        <button onClick={onClose} style={BTN_C}>
          <X size={12} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function Movies({
  items: propItems = [],
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [movies, setMovies] = useState(() => {
    const stored = lsGet("crm_movies", null);
    // First time: load seed list
    if (!stored || stored.length === 0) {
      lsSave("crm_movies", SEED);
      return SEED;
    }
    return stored;
  });
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statFilter, setStatFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [view, setView] = useState("list"); // 'list' | 'grid'

  // Sync to parent if hooks provided
  function updateLocal(id, updates) {
    const updated = movies.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setMovies(updated);
    lsSave("crm_movies", updated);
    if (onUpdate) onUpdate(id, updates);
  }

  function deleteLocal(id) {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    lsSave("crm_movies", updated);
    if (onDelete) onDelete(id);
  }

  function addLocal(movie) {
    const updated = [movie, ...movies];
    setMovies(updated);
    lsSave("crm_movies", updated);
    if (onAdd) onAdd(movie);
  }

  // ── Stats ────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: movies.length,
      completed: movies.filter((m) => m.status === "completed").length,
      watching: movies.filter((m) => m.status === "watching").length,
      watchlist: movies.filter((m) => m.status === "watchlist").length,
      avgRating: movies.filter((m) => m.rating > 0).length
        ? (
            movies
              .filter((m) => m.rating > 0)
              .reduce((a, b) => a + b.rating, 0) /
            movies.filter((m) => m.rating > 0).length
          ).toFixed(1)
        : "—",
      withLessons: movies.filter((m) => m.lessons).length,
      withIdeas: movies.filter((m) => m.biz_idea).length,
    }),
    [movies],
  );

  // ── Filter ───────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      movies.filter((m) => {
        const ms =
          !search ||
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          (m.lessons || "").toLowerCase().includes(search.toLowerCase()) ||
          (m.soft_skill || "").toLowerCase().includes(search.toLowerCase());
        const mc = catFilter === "all" || m.category === catFilter;
        const mv = statFilter === "all" || m.status === statFilter;
        return ms && mc && mv;
      }),
    [movies, search, catFilter, statFilter],
  );

  // Group by category for list view
  const grouped = useMemo(() => {
    const g = {};
    CATEGORIES.forEach((c) => {
      g[c.id] = filtered.filter((m) => m.category === c.id);
    });
    return g;
  }, [filtered]);

  const progress = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

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
      {/* ── Page header ── */}
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
            <Film size={22} color={C.accentDk} /> Media Intelligence Library
          </h2>
          <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
            Turn every film into a strategic asset — lessons, skills, ideas
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          style={{ ...BTN_P, gap: 6, display: "flex", alignItems: "center" }}
        >
          <Plus size={14} /> Add film
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {[
          { v: stats.total, l: "Total", c: C.muted },
          { v: stats.completed, l: "Watched", c: "#228b22" },
          { v: stats.watching, l: "Watching", c: "#c8a000" },
          { v: stats.watchlist, l: "Watchlist", c: "#1d4ed8" },
          { v: stats.avgRating + "★", l: "Avg rating", c: C.accentDk },
          { v: stats.withLessons, l: "Lessons", c: "#7c3aed" },
          { v: stats.withIdeas, l: "Ideas", c: "#dc2626" },
        ].map(({ v, l, c }) => (
          <div
            key={l}
            style={{
              background: "white",
              border: `1px solid ${C.border}33`,
              borderRadius: 10,
              padding: "8px 10px",
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

      {/* Overall progress bar */}
      <div
        style={{
          background: "white",
          border: `1px solid ${C.border}33`,
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: C.muted,
            marginBottom: 6,
          }}
        >
          <span style={{ fontWeight: 600 }}>📽️ Watchlist progress</span>
          <span style={{ fontWeight: 700, color: C.accentDk }}>
            {stats.completed} / {stats.total} ({progress}%)
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: C.faint,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg,${C.accentDk},#228b22)`,
              borderRadius: 4,
              transition: "width 0.6s",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {CATEGORIES.map((cat) => {
            const n = movies.filter((m) => m.category === cat.id).length;
            const d = movies.filter(
              (m) => m.category === cat.id && m.status === "completed",
            ).length;
            const p = n ? Math.round((d / n) * 100) : 0;
            const Icon = cat.icon;
            return (
              <div key={cat.id} style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 9,
                    color: cat.badge,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    marginBottom: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon size={9} />
                  {cat.label.split(" ")[0]}
                </div>
                <div
                  style={{ height: 4, background: C.faint, borderRadius: 2 }}
                >
                  <div
                    style={{
                      width: `${p}%`,
                      height: "100%",
                      background: cat.badge,
                      borderRadius: 2,
                    }}
                  />
                </div>
                <div style={{ fontSize: 9, color: "#aaa", marginTop: 1 }}>
                  {d}/{n}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Add form ── */}
      {showAdd && (
        <AddMovieForm onAdd={addLocal} onClose={() => setShowAdd(false)} />
      )}

      {/* ── Filters ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
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
            placeholder="Search title, lesson, skill..."
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
          value={statFilter}
          onChange={(e) => setStatFilter(e.target.value)}
          style={{ ...SEL, width: "auto", padding: "7px 10px" }}
        >
          <option value="all">All status</option>
          {Object.entries(STATUS_CFG).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category filter tabs */}
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
            ...TAB_BTN,
            background: catFilter === "all" ? C.accent : "white",
            color: catFilter === "all" ? C.muted : "#888",
            border: `1px solid ${catFilter === "all" ? C.border : "#e0d800"}`,
          }}
        >
          All ({movies.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = movies.filter((m) => m.category === cat.id).length;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() =>
                setCatFilter(catFilter === cat.id ? "all" : cat.id)
              }
              style={{
                ...TAB_BTN,
                background: catFilter === cat.id ? cat.color : "white",
                color: catFilter === cat.id ? cat.badge : "#888",
                border: `1px solid ${catFilter === cat.id ? cat.badge + "66" : "#e0d800"}`,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Icon size={11} />
              {cat.label.split(" & ")[0]} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Movie list — grouped by category ── */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 48,
            color: "#bbb",
            fontSize: 13,
          }}
        >
          {movies.length === 0
            ? "No films yet."
            : "No results for this filter."}
        </div>
      )}

      {catFilter === "all" ? (
        // Grouped by category
        CATEGORIES.map((cat) => {
          const group = grouped[cat.id];
          if (!group.length) return null;
          const Icon = cat.icon;
          return (
            <div key={cat.id} style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  paddingBottom: 6,
                  borderBottom: `2px solid ${cat.badge}22`,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: cat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={14} color={cat.badge} />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: cat.badge,
                    letterSpacing: "0.02em",
                  }}
                >
                  {cat.label}
                </span>
                <span style={{ fontSize: 10, color: "#aaa" }}>
                  {group.filter((m) => m.status === "completed").length}/
                  {group.length} watched
                </span>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {group.map((m) => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onUpdate={updateLocal}
                    onDelete={deleteLocal}
                  />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        // Flat list when category filtered
        <div style={{ display: "grid", gap: 8 }}>
          {filtered.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onUpdate={updateLocal}
              onDelete={deleteLocal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────
const LABEL_STYLE = {
  fontSize: 9,
  fontWeight: 700,
  color: "#8a7000",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: 4,
  display: "flex",
  alignItems: "center",
  gap: 3,
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
const SEL = {
  ...INP,
  cursor: "pointer",
};
const BTN_P = {
  padding: "7px 16px",
  background: C.accent,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 700,
  color: C.muted,
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  fontFamily: "inherit",
};
const BTN_C = {
  padding: "7px 14px",
  background: "transparent",
  border: "1px solid #ddd",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 11,
  color: "#888",
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  fontFamily: "inherit",
};
const TAB_BTN = {
  padding: "5px 12px",
  borderRadius: 20,
  cursor: "pointer",
  fontSize: 10,
  fontWeight: 600,
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  transition: "all 0.1s",
};

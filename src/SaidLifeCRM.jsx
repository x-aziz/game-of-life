import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  Calendar,
  CheckSquare,
  Wallet,
  Brain,
  BarChart3,
  Archive as ArchiveIcon,
  Settings as SettingsIcon,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  GripVertical,
  Save,
} from "lucide-react";

// ---------- DEFAULT DATA ----------

const DEFAULT_COLUMNS = [
  {
    id: "shower",
    title: "Shower",
    time: "03:45 → 04:00",
    color: "#e8f4ff",
    width: 130,
  },
  {
    id: "prayer1",
    title: "Prayer + Quran",
    time: "04:00 → 04:30",
    color: "#f5f0ff",
    width: 150,
  },
  {
    id: "breakfast",
    title: "Breakfast",
    time: "04:30 → 05:00",
    color: "#fffde0",
    width: 130,
  },
  {
    id: "transport",
    title: "Transport",
    time: "05:00 → 06:00",
    color: "#fffde0",
    width: 140,
  },
  {
    id: "program",
    title: "Program / Tasks",
    time: "06:00 → 12:45",
    color: "#ffffff",
    width: 220,
  },
  {
    id: "break",
    title: "Break",
    time: "12:45 → 01:00",
    color: "#fffde0",
    width: 120,
  },
  {
    id: "networking",
    title: "Networking",
    time: "01:00 → 03:00",
    color: "#fffde0",
    width: 160,
  },
  {
    id: "english",
    title: "English / SEQ",
    time: "03:00 → 05:00",
    color: "#fffde0",
    width: 150,
  },
  {
    id: "prayer2",
    title: "Prayer + Snack",
    time: "05:00 → 05:30",
    color: "#f5f0ff",
    width: 150,
  },
  {
    id: "fun",
    title: "Fun / Dinner",
    time: "05:30 → 08:45",
    color: "#fffde0",
    width: 150,
  },
  {
    id: "prayer3",
    title: "Prayer",
    time: "08:45 → 09:00",
    color: "#f5f0ff",
    width: 110,
  },
  {
    id: "evaluation",
    title: "Evaluation",
    time: "09:00 → 09:30",
    color: "#fff8f0",
    width: 150,
  },
  {
    id: "sleep",
    title: "Sleep",
    time: "10:00 → 03:45",
    color: "#e8f4ff",
    width: 130,
  },
];

const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const DAY_SHORT = ["S", "S", "M", "T", "W", "T", "F"];

const TAGS = [
  "Study",
  "Work",
  "English",
  "Project",
  "Networking",
  "Fun",
  "Prayer",
  "Gym",
];
const TAG_COLORS = {
  Study: "#7c6ae8",
  Work: "#2563eb",
  English: "#0d9488",
  Project: "#c2410c",
  Networking: "#be185d",
  Fun: "#ca8a04",
  Prayer: "#6d28d9",
  Gym: "#dc2626",
};

const DEFAULT_HABITS = [
  "1H for learning English",
  "Watch motivation video",
  "Learn skill (tech / coding)",
  "Sport + exercise + shower",
  "Ask, try, socialize, meet new people",
  "Eat healthy food",
  "Drink 1L of water",
  "10min meditation",
  "Prayer at its time (5 prayers)",
  "Review + memorize 2 pages Quran",
  "Listen to IT podcast",
  "10 pages from a book",
  "No wasted time",
  "Journaling / Brain dump",
];

const DEBT_CATEGORIES = [
  "Skill",
  "Gym",
  "English",
  "Immigration",
  "Discover",
  "Other",
];
const DEBT_CAT_COLORS = {
  Skill: "#7c6ae8",
  Gym: "#dc2626",
  English: "#0d9488",
  Immigration: "#2563eb",
  Discover: "#ca8a04",
  Other: "#6b7280",
};

const BRAIN_TAGS = [
  "motivation",
  "business",
  "english",
  "tech",
  "life",
  "family",
];

function emptyWeekData() {
  const days = {};
  DAYS.forEach((d) => {
    days[d] = {
      cells: {},
      tasks: [], // {id, text, done, tag}
      evaluation: {
        score: 0,
        top3: ["", "", ""],
        brainDump: "",
        lessons: "",
        planNextDay: "",
      },
    };
  });
  return days;
}

function emptyHabitWeek() {
  const habits = {};
  DEFAULT_HABITS.forEach((h, i) => {
    habits[`h${i}`] = {
      name: h,
      days: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" },
    };
  });
  return habits;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function getWeekLabel(offset) {
  const now = new Date(2026, 5, 16); // Jun 16 2026 reference (week start)
  const start = new Date(now);
  start.setDate(start.getDate() + offset * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const opts = { month: "short", day: "numeric" };
  const weekNum = 25 + offset;
  return `Week ${weekNum} — ${start.toLocaleDateString("en-US", opts)}–${end.toLocaleDateString("en-US", opts)}, ${end.getFullYear()}`;
}

// ---------- ROOT APP ----------

export default function SaidLifeCRM() {
  const [section, setSection] = useState("schedule");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekData, setWeekData] = useState(emptyWeekData());
  const [habitWeek, setHabitWeek] = useState(emptyHabitWeek());
  const [debts, setDebts] = useState([]);
  const [brainDumps, setBrainDumps] = useState([]);
  const [archive, setArchive] = useState({}); // { weekLabel: { weekData, habitWeek } }
  const [evalModalDay, setEvalModalDay] = useState(null);
  const [toast, setToast] = useState("");

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const weekLabel = getWeekLabel(weekOffset);

  const weekScore = useMemo(() => {
    const scores = DAYS.map((d) => weekData[d]?.evaluation?.score || 0);
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / DAYS.length);
  }, [weekData]);

  const archiveCurrentWeek = useCallback(() => {
    setArchive((prev) => ({
      ...prev,
      [weekLabel]: { weekData, habitWeek, score: weekScore },
    }));
  }, [weekLabel, weekData, habitWeek, weekScore]);

  const goWeek = (dir) => {
    archiveCurrentWeek();
    const nextOffset = weekOffset + dir;
    const nextLabel = getWeekLabel(nextOffset);
    if (archive[nextLabel]) {
      setWeekData(archive[nextLabel].weekData);
      setHabitWeek(archive[nextLabel].habitWeek);
    } else {
      setWeekData(emptyWeekData());
      setHabitWeek(emptyHabitWeek());
    }
    setWeekOffset(nextOffset);
  };

  const copyLastWeek = () => {
    const prevLabel = getWeekLabel(weekOffset - 1);
    const prev = archive[prevLabel];
    if (!prev) {
      showToast("No previous week saved yet");
      return;
    }
    const cloned = JSON.parse(JSON.stringify(prev.weekData));
    DAYS.forEach((d) => {
      cloned[d].evaluation = {
        score: 0,
        top3: ["", "", ""],
        brainDump: "",
        lessons: "",
        planNextDay: "",
      };
      cloned[d].tasks = cloned[d].tasks.map((t) => ({ ...t, done: false }));
    });
    setWeekData(cloned);
    showToast("Copied structure from last week");
  };

  const exportJSON = () => {
    archiveCurrentWeek();
    const payload = {
      columns,
      archive: {
        ...archive,
        [weekLabel]: { weekData, habitWeek, score: weekScore },
      },
      debts,
      brainDumps,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `said-crm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported backup JSON");
  };

  const importJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.columns) setColumns(data.columns);
        if (data.archive) {
          setArchive(data.archive);
          const cur = data.archive[weekLabel];
          if (cur) {
            setWeekData(cur.weekData);
            setHabitWeek(cur.habitWeek);
          }
        }
        if (data.debts) setDebts(data.debts);
        if (data.brainDumps) setBrainDumps(data.brainDumps);
        showToast("Backup loaded");
      } catch (err) {
        showToast("Couldn't read that file");
      }
    };
    reader.readAsText(file);
  };

  const navItems = [
    { id: "schedule", label: "Weekly Schedule", icon: Calendar },
    { id: "habits", label: "Habit Tracker", icon: CheckSquare },
    { id: "debt", label: "Debt Paper", icon: Wallet },
    { id: "brain", label: "Brain Dump", icon: Brain },
    { id: "stats", label: "Statistics", icon: BarChart3 },
    { id: "archive", label: "Archive", icon: ArchiveIcon },
  ];

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        height: "100%",
        minHeight: 700,
        background: "#faf8ee",
        color: "#2b2412",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? 196 : 56,
          transition: "width .18s ease",
          background: "#ffffff",
          borderRight: "1px solid #ecdf9a",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            padding: "16px 14px",
            borderBottom: "1px solid #f1e8c4",
          }}
        >
          {sidebarOpen && (
            <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 0.2 }}>
              Said Abdelaziz's Life CRM
            </div>
          )}
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a08a2d",
              padding: 4,
            }}
          >
            {sidebarOpen ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        </div>
        <div
          style={{
            flex: 1,
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 10px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: active ? "#fff1b8" : "transparent",
                  color: active ? "#7a5b00" : "#5c5230",
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 500,
                  textAlign: "left",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                }}
              >
                <Icon size={16} strokeWidth={2} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
        <div
          style={{
            padding: 10,
            borderTop: "1px solid #f1e8c4",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <button onClick={exportJSON} style={smallBtnStyle(sidebarOpen)}>
            <Download size={14} /> {sidebarOpen && "Export backup"}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={smallBtnStyle(sidebarOpen)}
          >
            <Upload size={14} /> {sidebarOpen && "Import backup"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importJSON}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        {section === "schedule" && (
          <ScheduleView
            columns={columns}
            setColumns={setColumns}
            weekData={weekData}
            setWeekData={setWeekData}
            weekLabel={weekLabel}
            weekScore={weekScore}
            goWeek={goWeek}
            copyLastWeek={copyLastWeek}
            setEvalModalDay={setEvalModalDay}
            showToast={showToast}
          />
        )}
        {section === "habits" && (
          <HabitTrackerView habitWeek={habitWeek} setHabitWeek={setHabitWeek} />
        )}
        {section === "debt" && (
          <DebtPaperView debts={debts} setDebts={setDebts} />
        )}
        {section === "brain" && (
          <BrainDumpView
            brainDumps={brainDumps}
            setBrainDumps={setBrainDumps}
          />
        )}
        {section === "stats" && (
          <StatisticsView
            archive={archive}
            weekData={weekData}
            weekLabel={weekLabel}
            weekScore={weekScore}
            habitWeek={habitWeek}
            debts={debts}
          />
        )}
        {section === "archive" && <ArchiveView archive={archive} />}
      </div>

      {evalModalDay && (
        <EvaluationModal
          day={evalModalDay}
          weekData={weekData}
          setWeekData={setWeekData}
          onClose={() => setEvalModalDay(null)}
        />
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2b2412",
            color: "#fffde0",
            padding: "9px 16px",
            borderRadius: 8,
            fontSize: 12.5,
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            zIndex: 999,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function smallBtnStyle(open) {
  return {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 9px",
    borderRadius: 7,
    border: "1px solid #ecdf9a",
    background: "#fffef6",
    cursor: "pointer",
    fontSize: 11.5,
    color: "#7a5b00",
    justifyContent: open ? "flex-start" : "center",
  };
}

// ---------- SECTION 1: WEEKLY SCHEDULE ----------

function ScheduleView({
  columns,
  setColumns,
  weekData,
  setWeekData,
  weekLabel,
  weekScore,
  goWeek,
  copyLastWeek,
  setEvalModalDay,
  showToast,
}) {
  const updateCell = (day, colId, value) => {
    setWeekData((prev) => ({
      ...prev,
      [day]: { ...prev[day], cells: { ...prev[day].cells, [colId]: value } },
    }));
  };

  const addColumn = () => {
    const title = prompt("Column title:");
    if (!title) return;
    const time = prompt("Time range (e.g. 06:00 → 07:00):", "") || "";
    setColumns((prev) => [
      ...prev,
      { id: uid(), title, time, color: "#fffde0", width: 140 },
    ]);
  };

  const deleteColumn = (id) => {
    if (!confirm("Delete this column for all days?")) return;
    setColumns((prev) => prev.filter((c) => c.id !== id));
  };

  const updateColumnTime = (id, time) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, time } : c)));
  };

  const updateColumnTitle = (id, title) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)));
  };

  const addTask = (day) => {
    const text = prompt("Task:");
    if (!text) return;
    setWeekData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: [
          ...prev[day].tasks,
          { id: uid(), text, done: false, tag: "Study" },
        ],
      },
    }));
  };

  const toggleTask = (day, taskId) => {
    setWeekData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: prev[day].tasks.map((t) =>
          t.id === taskId ? { ...t, done: !t.done } : t,
        ),
      },
    }));
  };

  const setTaskTag = (day, taskId, tag) => {
    setWeekData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: prev[day].tasks.map((t) =>
          t.id === taskId ? { ...t, tag } : t,
        ),
      },
    }));
  };

  const removeTask = (day, taskId) => {
    setWeekData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: prev[day].tasks.filter((t) => t.id !== taskId),
      },
    }));
  };

  const dayCompletion = (day) => {
    const tasks = weekData[day]?.tasks || [];
    if (tasks.length === 0) return weekData[day]?.evaluation?.score || 0;
    const done = tasks.filter((t) => t.done).length;
    return Math.round((done / tasks.length) * 100);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Weekly Schedule</div>
          <div style={{ fontSize: 12, color: "#8a7d4a", marginTop: 2 }}>
            {weekLabel}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ScoreBadge score={weekScore} />
          <button onClick={() => goWeek(-1)} style={iconBtn}>
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => goWeek(1)} style={iconBtn}>
            <ChevronRight size={15} />
          </button>
          <button onClick={copyLastWeek} style={textBtn}>
            Copy last week
          </button>
          <button onClick={addColumn} style={textBtnPrimary}>
            <Plus size={13} /> Add column
          </button>
        </div>
      </div>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #e8dca0",
          borderRadius: 10,
          background: "#fffef6",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "max-content",
            minWidth: "100%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  ...thStyle,
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  background: "#ffd600",
                  width: 84,
                  minWidth: 84,
                }}
              >
                Day
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  style={{
                    ...thStyle,
                    background: "#ffe600",
                    minWidth: col.width,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <input
                      value={col.title}
                      onChange={(e) =>
                        updateColumnTitle(col.id, e.target.value)
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        fontWeight: 700,
                        fontSize: 11,
                        textAlign: "center",
                        width: "100%",
                        color: "#5c4d00",
                      }}
                    />
                    <button
                      onClick={() => deleteColumn(col.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#a08a2d",
                        opacity: 0.5,
                      }}
                    >
                      <X size={11} />
                    </button>
                  </div>
                  <input
                    value={col.time}
                    onChange={(e) => updateColumnTime(col.id, e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: 10,
                      textAlign: "center",
                      width: "100%",
                      color: "#8a7d4a",
                      fontWeight: 400,
                    }}
                  />
                </th>
              ))}
              <th style={{ ...thStyle, background: "#fff8f0", minWidth: 100 }}>
                Today %
              </th>
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day}>
                <td
                  style={{
                    ...tdStyle,
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                    background: "#ffd600",
                    fontWeight: 700,
                    fontSize: 11,
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    textAlign: "center",
                    padding: "10px 0",
                    color: "#5c4d00",
                  }}
                >
                  {day}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.id}
                    style={{
                      ...tdStyle,
                      background: col.color,
                      verticalAlign: "top",
                      minWidth: col.width,
                    }}
                  >
                    {col.id === "program" ? (
                      <ProgramCell
                        day={day}
                        tasks={weekData[day]?.tasks || []}
                        addTask={addTask}
                        toggleTask={toggleTask}
                        removeTask={removeTask}
                        setTaskTag={setTaskTag}
                      />
                    ) : (
                      <textarea
                        value={weekData[day]?.cells?.[col.id] || ""}
                        onChange={(e) =>
                          updateCell(day, col.id, e.target.value)
                        }
                        placeholder="…"
                        style={{
                          width: "100%",
                          minHeight: 52,
                          background: "transparent",
                          border: "none",
                          resize: "vertical",
                          fontSize: 11.5,
                          fontFamily: "inherit",
                          color: "#3b3320",
                          lineHeight: 1.5,
                          outline: "none",
                        }}
                      />
                    )}
                  </td>
                ))}
                <td
                  style={{
                    ...tdStyle,
                    background: "#fff8f0",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setEvalModalDay(day)}
                >
                  <DayPercent value={dayCompletion(day)} />
                  <div
                    style={{ fontSize: 9.5, color: "#a08a2d", marginTop: 3 }}
                  >
                    Evaluate →
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: 11, color: "#a08a2d", marginTop: 8 }}>
        Click any cell to edit · Click "Today %" to open the daily evaluation
      </div>
    </div>
  );
}

function ProgramCell({
  day,
  tasks,
  addTask,
  toggleTask,
  removeTask,
  setTaskTag,
}) {
  const circled = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];
  return (
    <div style={{ minHeight: 52 }}>
      {tasks.map((t, i) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 10.5, color: "#a08a2d", flexShrink: 0 }}>
            {circled[i] || i + 1}
          </span>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => toggleTask(day, t.id)}
            style={{ flexShrink: 0, accentColor: "#7c6ae8" }}
          />
          <span
            style={{
              fontSize: 11,
              flex: 1,
              textDecoration: t.done ? "line-through" : "none",
              color: t.done ? "#a08a2d" : "#3b3320",
            }}
          >
            {t.text}
          </span>
          <select
            value={t.tag}
            onChange={(e) => setTaskTag(day, t.id, e.target.value)}
            style={{
              fontSize: 8.5,
              border: "none",
              background: TAG_COLORS[t.tag] + "22",
              color: TAG_COLORS[t.tag],
              borderRadius: 4,
              padding: "1px 3px",
              fontWeight: 600,
            }}
          >
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeTask(day, t.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#c0392b",
              opacity: 0.5,
              flexShrink: 0,
            }}
          >
            <X size={10} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addTask(day)}
        style={{
          fontSize: 10,
          color: "#7a5b00",
          background: "none",
          border: "1px dashed #d9c97a",
          borderRadius: 5,
          padding: "2px 7px",
          cursor: "pointer",
          marginTop: 2,
        }}
      >
        + Add task
      </button>
    </div>
  );
}

function DayPercent({ value }) {
  const color =
    value >= 81
      ? "#16a34a"
      : value >= 61
        ? "#ca8a04"
        : value >= 31
          ? "#ea580c"
          : "#dc2626";
  return <div style={{ fontWeight: 700, fontSize: 13, color }}>{value}%</div>;
}

function ScoreBadge({ score }) {
  const color =
    score >= 81
      ? "#16a34a"
      : score >= 61
        ? "#ca8a04"
        : score >= 31
          ? "#ea580c"
          : "#dc2626";
  return (
    <div
      style={{
        background: color + "1a",
        color,
        fontWeight: 700,
        fontSize: 12,
        padding: "5px 11px",
        borderRadius: 7,
        border: `1px solid ${color}44`,
      }}
    >
      Week: {score}%
    </div>
  );
}

const thStyle = {
  padding: "9px 10px",
  borderBottom: "2px solid #d9c060",
  borderRight: "1px solid #ecdf9a",
  fontSize: 11,
  textAlign: "center",
};
const tdStyle = {
  padding: "8px 9px",
  borderBottom: "1px solid #f1e8c4",
  borderRight: "1px solid #f1e8c4",
  verticalAlign: "middle",
};
const iconBtn = {
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e8dca0",
  background: "#fffef6",
  borderRadius: 7,
  cursor: "pointer",
  color: "#7a5b00",
};
const textBtn = {
  fontSize: 11.5,
  padding: "6px 11px",
  border: "1px solid #e8dca0",
  background: "#fffef6",
  borderRadius: 7,
  cursor: "pointer",
  color: "#5c5230",
};
const textBtnPrimary = {
  fontSize: 11.5,
  padding: "6px 11px",
  border: "1px solid #d9c060",
  background: "#fff1b8",
  borderRadius: 7,
  cursor: "pointer",
  color: "#7a5b00",
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontWeight: 600,
};

// ---------- SECTION 2: HABIT TRACKER ----------

function HabitTrackerView({ habitWeek, setHabitWeek }) {
  const cycle = { "": "✓", "✓": "/", "/": "✗", "✗": "" };

  const toggleCell = (habitId, dayIdx) => {
    setHabitWeek((prev) => {
      const cur = prev[habitId].days[dayIdx] || "";
      return {
        ...prev,
        [habitId]: {
          ...prev[habitId],
          days: { ...prev[habitId].days, [dayIdx]: cycle[cur] },
        },
      };
    });
  };

  const addHabit = () => {
    const name = prompt("New habit:");
    if (!name) return;
    const id = uid();
    setHabitWeek((prev) => ({
      ...prev,
      [id]: { name, days: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" } },
    }));
  };

  const deleteHabit = (id) => {
    setHabitWeek((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const habitPct = (habit) => {
    const vals = Object.values(habit.days);
    const score = vals.reduce(
      (s, v) => s + (v === "✓" ? 1 : v === "/" ? 0.5 : 0),
      0,
    );
    return Math.round((score / 7) * 100);
  };

  const dayPct = (idx) => {
    const all = Object.values(habitWeek);
    if (all.length === 0) return 0;
    const score = all.reduce(
      (s, h) => s + (h.days[idx] === "✓" ? 1 : h.days[idx] === "/" ? 0.5 : 0),
      0,
    );
    return Math.round((score / all.length) * 100);
  };

  const weekTotal = useMemo(() => {
    const all = Object.values(habitWeek);
    if (all.length === 0) return 0;
    let totalScore = 0;
    all.forEach((h) =>
      Object.values(h.days).forEach((v) => {
        totalScore += v === "✓" ? 1 : v === "/" ? 0.5 : 0;
      }),
    );
    return Math.round((totalScore / (all.length * 7)) * 100);
  }, [habitWeek]);

  const cellColor = (v) =>
    v === "✓"
      ? "#16a34a"
      : v === "/"
        ? "#ca8a04"
        : v === "✗"
          ? "#dc2626"
          : "#cfc593";
  const cellBg = (v) =>
    v === "✓"
      ? "#eafbef"
      : v === "/"
        ? "#fff8e8"
        : v === "✗"
          ? "#fdecec"
          : "#fffef6";

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Habit Tracker</div>
          <div style={{ fontSize: 12, color: "#8a7d4a", marginTop: 2 }}>
            Click a cell to cycle: empty → ✓ → / → ✗
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <ScoreBadge score={weekTotal} />
          <button onClick={addHabit} style={textBtnPrimary}>
            <Plus size={13} /> Add habit
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #e8dca0",
          borderRadius: 10,
          overflow: "hidden",
          background: "#fffef6",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  ...thStyle,
                  textAlign: "left",
                  background: "#ffe600",
                  minWidth: 220,
                }}
              >
                Habit
              </th>
              {DAY_SHORT.map((d, i) => (
                <th
                  key={i}
                  style={{ ...thStyle, background: "#ffe600", width: 46 }}
                >
                  {d}
                </th>
              ))}
              <th style={{ ...thStyle, background: "#fff8f0", width: 64 }}>
                %
              </th>
              <th style={{ ...thStyle, background: "#ffe600", width: 28 }}></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(habitWeek).map(([id, habit]) => (
              <tr key={id}>
                <td style={{ ...tdStyle, fontSize: 11.5 }}>{habit.name}</td>
                {DAY_SHORT.map((_, i) => (
                  <td
                    key={i}
                    style={{ ...tdStyle, textAlign: "center", padding: 0 }}
                  >
                    <button
                      onClick={() => toggleCell(id, i)}
                      style={{
                        width: "100%",
                        height: 36,
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: 13,
                        background: cellBg(habit.days[i]),
                        color: cellColor(habit.days[i]),
                      }}
                    >
                      {habit.days[i] || "·"}
                    </button>
                  </td>
                ))}
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <DayPercent value={habitPct(habit)} />
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={() => deleteHabit(id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#c0392b",
                      opacity: 0.5,
                    }}
                  >
                    <X size={12} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: 700,
                  fontSize: 11.5,
                  background: "#fff8f0",
                }}
              >
                Evaluation of day
              </td>
              {DAY_SHORT.map((_, i) => (
                <td
                  key={i}
                  style={{
                    ...tdStyle,
                    textAlign: "center",
                    background: "#fff8f0",
                  }}
                >
                  <DayPercent value={dayPct(i)} />
                </td>
              ))}
              <td style={{ ...tdStyle, background: "#fff8f0" }}></td>
              <td style={{ ...tdStyle, background: "#fff8f0" }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- SECTION 3: DEBT PAPER ----------

function DebtPaperView({ debts, setDebts }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: "",
    day: "Saturday",
    from: "",
    to: "",
    category: "Skill",
    what: "",
  });

  const addDebt = () => {
    if (!form.what.trim()) return;
    const from = form.from || "00:00";
    const to = form.to || "00:00";
    const [fh, fm] = from.split(":").map(Number);
    const [th, tm] = to.split(":").map(Number);
    let hours = th + tm / 60 - (fh + fm / 60);
    if (hours < 0) hours += 24;
    setDebts((prev) => [
      ...prev,
      {
        id: uid(),
        ...form,
        hours: Math.round(hours * 10) / 10,
        done: false,
        createdAt: Date.now(),
      },
    ]);
    setForm({
      date: "",
      day: "Saturday",
      from: "",
      to: "",
      category: "Skill",
      what: "",
    });
    setShowForm(false);
  };

  const toggleDone = (id) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d)),
    );
  };

  const removeDebt = (id) =>
    setDebts((prev) => prev.filter((d) => d.id !== id));

  const stats = useMemo(() => {
    const byCategory = {};
    DEBT_CATEGORIES.forEach((c) => {
      byCategory[c] = { sessions: 0, hoursDone: 0, total: 0 };
    });
    debts.forEach((d) => {
      const c =
        byCategory[d.category] ||
        (byCategory[d.category] = { sessions: 0, hoursDone: 0, total: 0 });
      c.total += 1;
      if (d.done) {
        c.sessions += 1;
        c.hoursDone += d.hours;
      }
    });
    return byCategory;
  }, [debts]);

  const totalOwed = debts
    .filter((d) => !d.done)
    .reduce((s, d) => s + d.hours, 0);
  const totalRecovered = debts
    .filter((d) => d.done)
    .reduce((s, d) => s + d.hours, 0);
  const recoveryRate =
    totalOwed + totalRecovered > 0
      ? Math.round((totalRecovered / (totalOwed + totalRecovered)) * 100)
      : 0;

  const isOverdue = (d) => {
    if (d.done) return false;
    const ageMs = Date.now() - d.createdAt;
    return ageMs > 3 * 24 * 60 * 60 * 1000;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Debt Paper</div>
          <div style={{ fontSize: 12, color: "#8a7d4a", marginTop: 2 }}>
            Tasks you owe yourself — missed sessions to recover
          </div>
        </div>
        <button onClick={() => setShowForm(true)} style={textBtnPrimary}>
          <Plus size={13} /> Add debt
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <StatCard label="Hours owed" value={`${totalOwed}h`} color="#dc2626" />
        <StatCard
          label="Hours recovered"
          value={`${totalRecovered}h`}
          color="#16a34a"
        />
        <StatCard
          label="Recovery rate"
          value={`${recoveryRate}%`}
          color="#7c6ae8"
        />
      </div>

      {showForm && (
        <div
          style={{
            background: "#fffef6",
            border: "1px solid #e8dca0",
            borderRadius: 10,
            padding: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <select
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
              style={inputStyle}
            >
              {DAYS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="From (e.g. 04:30)"
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="To (e.g. 07:30)"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              style={inputStyle}
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={inputStyle}
            >
              {DEBT_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="What you owe / lost"
              value={form.what}
              onChange={(e) => setForm({ ...form, what: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={addDebt} style={textBtnPrimary}>
              Save debt
            </button>
            <button onClick={() => setShowForm(false)} style={textBtn}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          border: "1px solid #e8dca0",
          borderRadius: 10,
          overflow: "hidden",
          background: "#fffef6",
          marginBottom: 20,
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, background: "#ffe600", width: 40 }}>
                ✓
              </th>
              <th style={{ ...thStyle, background: "#ffe600" }}>Day</th>
              <th style={{ ...thStyle, background: "#ffe600" }}>From → To</th>
              <th style={{ ...thStyle, background: "#ffe600" }}>Hours</th>
              <th style={{ ...thStyle, background: "#ffe600" }}>Category</th>
              <th
                style={{ ...thStyle, background: "#ffe600", textAlign: "left" }}
              >
                What I owe
              </th>
              <th style={{ ...thStyle, background: "#ffe600", width: 30 }}></th>
            </tr>
          </thead>
          <tbody>
            {debts.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    ...tdStyle,
                    textAlign: "center",
                    color: "#a08a2d",
                    padding: 20,
                  }}
                >
                  No debts logged. Good — or click "Add debt" to log a missed
                  task.
                </td>
              </tr>
            )}
            {debts.map((d) => (
              <tr
                key={d.id}
                style={{ background: isOverdue(d) ? "#fdecec" : "transparent" }}
              >
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={d.done}
                    onChange={() => toggleDone(d.id)}
                    style={{ accentColor: "#16a34a" }}
                  />
                </td>
                <td style={{ ...tdStyle, fontSize: 11.5 }}>{d.day}</td>
                <td style={{ ...tdStyle, fontSize: 11.5 }}>
                  {d.from} → {d.to}
                </td>
                <td style={{ ...tdStyle, fontSize: 11.5 }}>{d.hours}h</td>
                <td style={{ ...tdStyle }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: DEBT_CAT_COLORS[d.category],
                      background: DEBT_CAT_COLORS[d.category] + "22",
                      padding: "2px 7px",
                      borderRadius: 5,
                    }}
                  >
                    {d.category}
                  </span>
                </td>
                <td
                  style={{
                    ...tdStyle,
                    fontSize: 11.5,
                    textDecoration: d.done ? "line-through" : "none",
                    color: d.done ? "#a08a2d" : "#3b3320",
                  }}
                >
                  {d.what}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={() => removeDebt(d.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#c0392b",
                      opacity: 0.5,
                    }}
                  >
                    <X size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        Debt statistics by category
      </div>
      <div
        style={{
          border: "1px solid #e8dca0",
          borderRadius: 10,
          overflow: "hidden",
          background: "#fffef6",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{ ...thStyle, background: "#ffe600", textAlign: "left" }}
              >
                Category
              </th>
              <th style={{ ...thStyle, background: "#ffe600" }}>
                Sessions done
              </th>
              <th style={{ ...thStyle, background: "#ffe600" }}>
                Hours recovered
              </th>
              <th style={{ ...thStyle, background: "#ffe600" }}>
                Total logged
              </th>
              <th style={{ ...thStyle, background: "#ffe600" }}>%</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats).map(([cat, s]) => (
              <tr key={cat}>
                <td
                  style={{
                    ...tdStyle,
                    fontWeight: 600,
                    color: DEBT_CAT_COLORS[cat],
                  }}
                >
                  {cat}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  {s.sessions}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  {s.hoursDone}h
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{s.total}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <DayPercent
                    value={
                      s.total > 0 ? Math.round((s.sessions / s.total) * 100) : 0
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        background: "#fffef6",
        border: "1px solid #e8dca0",
        borderRadius: 10,
        padding: "12px 16px",
      }}
    >
      <div style={{ fontSize: 11, color: "#8a7d4a" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color, marginTop: 2 }}>
        {value}
      </div>
    </div>
  );
}

const inputStyle = {
  fontSize: 11.5,
  padding: "7px 9px",
  border: "1px solid #e8dca0",
  borderRadius: 6,
  background: "#fffef6",
  color: "#3b3320",
};

// ---------- SECTION 4: EVALUATION MODAL ----------

function EvaluationModal({ day, weekData, setWeekData, onClose }) {
  const ev = weekData[day]?.evaluation || {
    score: 0,
    top3: ["", "", ""],
    brainDump: "",
    lessons: "",
    planNextDay: "",
  };

  const update = (field, value) => {
    setWeekData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        evaluation: { ...prev[day].evaluation, [field]: value },
      },
    }));
  };

  const updateTop3 = (idx, value) => {
    const next = [...ev.top3];
    next[idx] = value;
    update("top3", next);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(43,36,18,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fffef6",
          borderRadius: 14,
          width: 540,
          maxWidth: "100%",
          maxHeight: "88vh",
          overflow: "auto",
          padding: 22,
          border: "1px solid #e8dca0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700 }}>Evaluate — {day}</div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8a7d4a",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <Field label="Top 3 of the day">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              value={ev.top3[i]}
              onChange={(e) => updateTop3(i, e.target.value)}
              placeholder={`#${i + 1}`}
              style={{ ...inputStyle, width: "100%", marginBottom: 6 }}
            />
          ))}
        </Field>

        <Field label="Brain dump">
          <textarea
            value={ev.brainDump}
            onChange={(e) => update("brainDump", e.target.value)}
            rows={3}
            style={{ ...inputStyle, width: "100%", resize: "vertical" }}
          />
        </Field>

        <Field label="Lessons of the day">
          <textarea
            value={ev.lessons}
            onChange={(e) => update("lessons", e.target.value)}
            rows={2}
            style={{ ...inputStyle, width: "100%", resize: "vertical" }}
          />
        </Field>

        <Field label={`Day score: ${ev.score}%`}>
          <input
            type="range"
            min={0}
            max={100}
            value={ev.score}
            onChange={(e) => update("score", Number(e.target.value))}
            style={{ width: "100%", accentColor: "#7c6ae8" }}
          />
        </Field>

        <Field label="Planning for next day">
          <textarea
            value={ev.planNextDay}
            onChange={(e) => update("planNextDay", e.target.value)}
            rows={2}
            style={{ ...inputStyle, width: "100%", resize: "vertical" }}
          />
        </Field>

        <button
          onClick={onClose}
          style={{
            ...textBtnPrimary,
            width: "100%",
            justifyContent: "center",
            marginTop: 6,
          }}
        >
          <Save size={13} /> Done
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: "#5c5230",
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

// ---------- SECTION 5: BRAIN DUMP ----------

function BrainDumpView({ brainDumps, setBrainDumps }) {
  const [content, setContent] = useState("");
  const [lessons, setLessons] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const save = () => {
    if (!content.trim() && !lessons.trim()) return;
    setBrainDumps((prev) => [
      {
        id: uid(),
        date: new Date().toISOString(),
        content,
        lessons,
        tags: activeTags,
      },
      ...prev,
    ]);
    setContent("");
    setLessons("");
    setActiveTags([]);
  };

  const filtered = brainDumps.filter((b) => {
    const matchesSearch =
      !search ||
      b.content.toLowerCase().includes(search.toLowerCase()) ||
      b.lessons.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !filterTag || b.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>
        Brain Dump + Lessons
      </div>
      <div style={{ fontSize: 12, color: "#8a7d4a", marginBottom: 16 }}>
        Empty your mind on paper first — clarity comes from thinking out loud
      </div>

      <div
        style={{
          background: "#fffef6",
          border: "1px solid #e8dca0",
          borderRadius: 10,
          padding: 14,
          marginBottom: 20,
        }}
      >
        <Field label="Brain dump — anything on your mind">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{ ...inputStyle, width: "100%", resize: "vertical" }}
          />
        </Field>
        <Field label="Lessons of the day">
          <textarea
            value={lessons}
            onChange={(e) => setLessons(e.target.value)}
            rows={2}
            style={{ ...inputStyle, width: "100%", resize: "vertical" }}
          />
        </Field>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          {BRAIN_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                fontSize: 10.5,
                padding: "4px 10px",
                borderRadius: 14,
                cursor: "pointer",
                border: activeTags.includes(tag)
                  ? "1px solid #7c6ae8"
                  : "1px solid #e8dca0",
                background: activeTags.includes(tag) ? "#7c6ae822" : "#fffef6",
                color: activeTags.includes(tag) ? "#7c6ae8" : "#8a7d4a",
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
        <button onClick={save} style={textBtnPrimary}>
          <Plus size={13} /> Save entry
        </button>
      </div>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search entries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: 180 }}
        />
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={inputStyle}
        >
          <option value="">All tags</option>
          {BRAIN_TAGS.map((t) => (
            <option key={t} value={t}>
              #{t}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ color: "#a08a2d", fontSize: 12 }}>No entries yet.</div>
        )}
        {filtered.map((b) => (
          <div
            key={b.id}
            style={{
              background: "#fffef6",
              border: "1px solid #e8dca0",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div style={{ fontSize: 10.5, color: "#a08a2d", marginBottom: 6 }}>
              {new Date(b.date).toLocaleString()}
            </div>
            {b.content && (
              <div style={{ fontSize: 12, marginBottom: 6, color: "#3b3320" }}>
                {b.content}
              </div>
            )}
            {b.lessons && (
              <div
                style={{
                  fontSize: 11.5,
                  color: "#7a5b00",
                  fontStyle: "italic",
                  marginBottom: 6,
                }}
              >
                Lesson: {b.lessons}
              </div>
            )}
            <div style={{ display: "flex", gap: 5 }}>
              {b.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 9.5,
                    color: "#7c6ae8",
                    background: "#7c6ae822",
                    padding: "2px 7px",
                    borderRadius: 10,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- SECTION 6: STATISTICS & ARCHIVE ----------

function StatisticsView({
  archive,
  weekData,
  weekLabel,
  weekScore,
  habitWeek,
  debts,
}) {
  const allWeeks = useMemo(() => {
    const entries = Object.entries(archive);
    entries.push([weekLabel, { weekData, habitWeek, score: weekScore }]);
    return entries;
  }, [archive, weekData, weekLabel, weekScore, habitWeek]);

  const trend = allWeeks.map(([label, w]) => ({
    label: label.split("—")[0].trim(),
    score: w.score,
  }));

  const habitTotals = useMemo(() => {
    const totals = {};
    Object.values(habitWeek).forEach((h) => {
      const vals = Object.values(h.days);
      const score = vals.reduce(
        (s, v) => s + (v === "✓" ? 1 : v === "/" ? 0.5 : 0),
        0,
      );
      totals[h.name] = Math.round((score / 7) * 100);
    });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [habitWeek]);

  const best = habitTotals.slice(0, 3);
  const worst = [...habitTotals].sort((a, b) => a[1] - b[1]).slice(0, 3);

  const totalDebtHours = debts.reduce((s, d) => s + d.hours, 0);
  const recoveredHours = debts
    .filter((d) => d.done)
    .reduce((s, d) => s + d.hours, 0);

  const bestWeek = trend.reduce(
    (a, b) => (b.score > a.score ? b : a),
    trend[0] || { label: "—", score: 0 },
  );
  const worstWeek = trend.reduce(
    (a, b) => (b.score < a.score ? b : a),
    trend[0] || { label: "—", score: 0 },
  );

  return (
    <div>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>
        Statistics
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginBottom: 22,
        }}
      >
        <StatCard
          label="Current week score"
          value={`${weekScore}%`}
          color="#7c6ae8"
        />
        <StatCard
          label="Best week"
          value={`${bestWeek.score}%`}
          color="#16a34a"
        />
        <StatCard
          label="Worst week"
          value={`${worstWeek.score}%`}
          color="#dc2626"
        />
        <StatCard
          label="Debt hours recovered"
          value={`${recoveredHours}h / ${totalDebtHours}h`}
          color="#ca8a04"
        />
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        Weekly score trend
      </div>
      <div
        style={{
          background: "#fffef6",
          border: "1px solid #e8dca0",
          borderRadius: 10,
          padding: 16,
          marginBottom: 22,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 140,
        }}
      >
        {trend.map((w, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div style={{ fontSize: 10, color: "#8a7d4a" }}>{w.score}%</div>
            <div
              style={{
                width: "100%",
                height: Math.max(4, (w.score / 100) * 90),
                background: "#7c6ae8",
                borderRadius: "4px 4px 0 0",
                opacity: 0.4 + (w.score / 100) * 0.6,
              }}
            />
            <div style={{ fontSize: 9, color: "#a08a2d" }}>{w.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 8,
              color: "#16a34a",
            }}
          >
            Most completed habits
          </div>
          <div
            style={{
              background: "#fffef6",
              border: "1px solid #e8dca0",
              borderRadius: 10,
              padding: 12,
            }}
          >
            {best.map(([name, pct]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11.5,
                  padding: "6px 0",
                  borderBottom: "1px solid #f1e8c4",
                }}
              >
                <span>{name}</span>
                <span style={{ fontWeight: 700, color: "#16a34a" }}>
                  {pct}%
                </span>
              </div>
            ))}
            {best.length === 0 && (
              <div style={{ fontSize: 11, color: "#a08a2d" }}>
                No habit data yet
              </div>
            )}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 8,
              color: "#dc2626",
            }}
          >
            Most missed habits
          </div>
          <div
            style={{
              background: "#fffef6",
              border: "1px solid #e8dca0",
              borderRadius: 10,
              padding: 12,
            }}
          >
            {worst.map(([name, pct]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11.5,
                  padding: "6px 0",
                  borderBottom: "1px solid #f1e8c4",
                }}
              >
                <span>{name}</span>
                <span style={{ fontWeight: 700, color: "#dc2626" }}>
                  {pct}%
                </span>
              </div>
            ))}
            {worst.length === 0 && (
              <div style={{ fontSize: 11, color: "#a08a2d" }}>
                No habit data yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchiveView({ archive }) {
  const [selected, setSelected] = useState(null);
  const weeks = Object.entries(archive);

  return (
    <div>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
        Archive
      </div>
      <div style={{ fontSize: 12, color: "#8a7d4a", marginBottom: 16 }}>
        Past weeks are saved here automatically when you navigate forward/back
        in the schedule
      </div>

      {weeks.length === 0 && (
        <div
          style={{
            background: "#fffef6",
            border: "1px dashed #e8dca0",
            borderRadius: 10,
            padding: 30,
            textAlign: "center",
            color: "#a08a2d",
            fontSize: 12.5,
          }}
        >
          No archived weeks yet. Navigate to a different week in the Weekly
          Schedule to archive the current one.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 10,
        }}
      >
        {weeks.map(([label, w]) => (
          <div
            key={label}
            onClick={() => setSelected(selected === label ? null : label)}
            style={{
              background: "#fffef6",
              border: "1px solid #e8dca0",
              borderRadius: 10,
              padding: 14,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 11.5, fontWeight: 600, marginBottom: 6 }}>
              {label}
            </div>
            <ScoreBadge score={w.score || 0} />
          </div>
        ))}
      </div>

      {selected && archive[selected] && (
        <div
          style={{
            marginTop: 18,
            background: "#fffef6",
            border: "1px solid #e8dca0",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
            {selected} — read-only view
          </div>
          {DAYS.map((day) => {
            const dayData = archive[selected].weekData[day];
            return (
              <div
                key={day}
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                  borderBottom: "1px solid #f1e8c4",
                }}
              >
                <div
                  style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 4 }}
                >
                  {day} — {dayData?.evaluation?.score || 0}%
                </div>
                {dayData?.evaluation?.top3?.filter(Boolean).length > 0 && (
                  <div style={{ fontSize: 11, color: "#5c5230" }}>
                    Top 3: {dayData.evaluation.top3.filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { PinLock } from "./components/PinLock";
import WeeklySchedule from "./components/WeeklySchedule";
import HabitTracker from "./components/HabitTracker";
import DebtPaper from "./components/DebtPaper";
import BrainDump from "./components/BrainDump";
import Statistics from "./components/Statistics";
import Dashboard from "./pages/Dashboard";
import Roadmaps from "./pages/Roadmaps";
import Money from "./pages/Money";
import Gym from "./pages/Gym";
import Health from "./pages/Health";
import Knowledge from "./pages/Knowledge";
import MyRules from "./pages/MyRules";
import DailyNotes from "./pages/DailyNotes";
import Movies from "./pages/Movies";
import Podcasts from "./pages/Podcasts";
import Plans from "./pages/Plans";
import People from "./pages/People";
import WallBoard from "./pages/WallBoard";
import Settings from "./pages/Settings";
import IeltsPlan from "./components/IeltsPlan";
import {
  useSchedule,
  useHabits,
  useCollection,
  useDocument,
} from "./hooks/useFirestore";
import {
  getWeekDateRange,
  getCurrentWeekNumber,
  DEFAULT_HABITS,
} from "./data/defaults";
import YearlyReview from "./pages/YearlyReview";

// ── Sidebar tabs ──────────────────────────────────────────────
const TABS = [
  { id: "dashboard", icon: "🏠", label: "Home" },
  { id: "schedule", icon: "📅", label: "Week" },
  { id: "habits", icon: "✓", label: "Habits" },
  { id: "debt", icon: "💳", label: "Debt" },
  { id: "brain", icon: "🧠", label: "Brain" },
  { id: "stats", icon: "📊", label: "Stats" },
  { id: "roadmaps", icon: "🗺️", label: "Plans" },
  { id: "money", icon: "💰", label: "Money" },
  { id: "gym", icon: "🏋️", label: "Gym" },
  { id: "health", icon: "🍎", label: "Health" },
  { id: "knowledge", icon: "📚", label: "Books" },
  { id: "rules", icon: "⚖️", label: "Rules" },
  { id: "notes", icon: "📓", label: "Notes" },
  { id: "ielts", icon: "🎯", label: "IELTS" },
  { id: "movies", icon: "🎬", label: "Movies" },
  { id: "podcasts", icon: "🎙️", label: "Pods" },
  { id: "plans", icon: "🗺️", label: "Plans" },
  { id: "people", icon: "👤", label: "People" },
  { id: "wall", icon: "📌", label: "Wall" },
  { id: "yearly", icon: "📅", label: "Year" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

// ── localStorage helper ───────────────────────────────────────
function ls(k, fb) {
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

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [weekNum, setWeekNum] = useState(getCurrentWeekNumber);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scheduleRef = useRef(null);

  // ── Anonymous Firebase auth (no Google needed, just for sync) ─
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        // Store UID so we can access same data across devices with same PIN
        localStorage.setItem("said_os_uid", user.uid);
      } else {
        // Sign in anonymously — creates persistent anonymous account
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.warn("Firebase auth failed — running in offline mode", e);
          // Use stored UID or generate local one
          const stored = localStorage.getItem("said_os_uid");
          if (stored) setUserId(stored);
          else {
            const uid = "local_" + Date.now();
            localStorage.setItem("said_os_uid", uid);
            setUserId(uid);
          }
        }
      }
    });
    return unsub;
  }, []);

  const weekKey = `2026-W${String(weekNum).padStart(2, "0")}`;

  // ── Data hooks ────────────────────────────────────────────────
  const { cells, save: saveCell } = useSchedule(userId, weekKey);
  const { habits, habitList, toggleHabit, addHabit, removeHabit, renameHabit } =
    useHabits(userId, weekKey);
  const {
    items: debts,
    add: addDebt,
    update: updateDebt,
    remove: deleteDebt,
  } = useCollection(userId, "debts", "crm_debts");
  const {
    items: brainEntries,
    add: addEntry,
    update: updateEntry,
    remove: deleteEntry,
  } = useCollection(userId, "brainDumps", "crm_brain");
  const {
    items: dailyNotes,
    add: addNote,
    update: updateNote,
    remove: deleteNote,
  } = useCollection(userId, "dailyNotes", "crm_notes");
  const {
    items: roadmaps,
    add: addRoadmap,
    update: updateRoadmap,
    remove: deleteRoadmap,
  } = useCollection(userId, "roadmaps", "crm_roadmaps");
  const {
    items: transactions,
    add: addTx,
    update: updateTx,
    remove: deleteTx,
  } = useCollection(userId, "transactions", "crm_money");
  const {
    items: gymSessions,
    add: addGym,
    update: updateGym,
    remove: deleteGym,
  } = useCollection(userId, "gym", "crm_gym");
  const {
    items: healthLogs,
    add: addHealth,
    update: updateHealth,
    remove: deleteHealth,
  } = useCollection(userId, "health", "crm_health");
  const {
    items: knowledge,
    add: addKnow,
    update: updateKnow,
    remove: deleteKnow,
  } = useCollection(userId, "knowledge", "crm_knowledge");
  const { data: rules, save: saveRules } = useDocument(
    userId,
    "settings",
    "rules",
    "crm_rules",
    { rules: [], limits: [] },
  );
  const {
    items: movies,
    add: addMovie,
    update: updateMovie,
    remove: deleteMovie,
  } = useCollection(userId, "movies", "crm_movies");
  const {
    items: podcasts,
    add: addPodcast,
    update: updatePodcast,
    remove: deletePodcast,
  } = useCollection(userId, "podcasts", "crm_podcasts");
  const {
    items: plans,
    add: addPlan,
    update: updatePlan,
    remove: deletePlan,
  } = useCollection(userId, "plans", "crm_plans");
  const { data: settings, save: saveSettings } = useDocument(
    userId,
    "settings",
    "main",
    "crm_settings",
    { theme: "yellow", currency: "GBP", monthlyBudget: 800 },
  );
  // IELTS Battle Plan — one document holds every checkbox/note/score,
  // same "flat key" pattern as Rules/Settings above. save() does a
  // Firestore merge, so toggling one task never overwrites the rest.
  const { data: ielts, save: saveIelts } = useDocument(
    userId,
    "settings",
    "ielts",
    "crm_ielts",
    {},
  );

  // ── Weekly score ──────────────────────────────────────────────
  const list = habitList.length ? habitList : DEFAULT_HABITS;
  const weekScore = (() => {
    let done = 0,
      total = 0;
    list.forEach((h) =>
      [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ].forEach((d) => {
        total++;
        if (habits[`${h}__${d}`] === "done") done++;
      }),
    );
    const s = total ? Math.round((done / total) * 100) : 0;
    // Save to trend
    if (s > 0) {
      const t = ls("crm_trend", {});
      t[`W${weekNum}`] = s;
      lsSave("crm_trend", t);
    }
    return s;
  })();

  function getWeekTrend(wn, score) {
    const stored = ls("crm_trend", {});
    const weeks = [];
    for (let i = 5; i >= 1; i--) {
      const k = `W${wn - i}`;
      weeks.push({ week: k, score: stored[k] ?? 0 });
    }
    weeks.push({ week: `W${wn}`, score });
    return weeks;
  }

  function handleCellChange(day, colId, value) {
    setSaving(true);
    saveCell(day, colId, value);
    setTimeout(() => setSaving(false), 900);
  }

  function toggleDebt(id, current) {
    updateDebt(id, {
      done: !current,
      doneDate: !current ? new Date().toISOString() : null,
    });
  }

  const SW = sidebarOpen ? 54 : 0;

  return (
    <PinLock>
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "Inter,system-ui,sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <nav
          style={{
            width: 54,
            background: "white",
            borderRight: "0.5px solid #e0d800",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "6px 0",
            gap: 1,
            flexShrink: 0,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div style={{ fontSize: 20, margin: "4px 0 8px" }}>📋</div>
          {TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              title={label}
              style={{
                width: 44,
                height: 40,
                border: "none",
                cursor: "pointer",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                background: tab === id ? "#ffe600" : "transparent",
                transition: "background 0.12s",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 600,
                  color: tab === id ? "#5a4a00" : "#bbb",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </button>
          ))}
          {/* Lock button */}
          <button
            onClick={() => window.__lockApp?.()}
            title="Lock"
            style={{
              marginTop: "auto",
              width: 44,
              height: 40,
              border: "none",
              cursor: "pointer",
              borderRadius: 8,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🔒
          </button>
        </nav>

        {/* Main */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Topbar */}
          <div
            style={{
              height: 42,
              background: "white",
              borderBottom: "0.5px solid #e0d800",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#5a4a00" }}>
              Said's Life OS
            </span>
            {tab === "schedule" && (
              <span style={{ fontSize: 10, color: "#bbb" }}>
                {getWeekDateRange(weekNum)}
              </span>
            )}
            {tab === "schedule" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginLeft: "auto",
                }}
              >
                <button
                  onClick={() => setWeekNum((w) => w - 1)}
                  style={NAV_BTN}
                >
                  ‹
                </button>
                <span
                  style={{
                    fontSize: 10,
                    color: "#888",
                    minWidth: 36,
                    textAlign: "center",
                  }}
                >
                  W{weekNum}
                </span>
                <button
                  onClick={() => setWeekNum((w) => w + 1)}
                  style={NAV_BTN}
                >
                  ›
                </button>
                {/* Empty this week's boxes — lives right next to the week
                    switcher since it acts on "the week currently shown". */}
                <button
                  onClick={() => scheduleRef.current?.clearAllBoxes()}
                  title="Empty all boxes for this week (titles/times stay)"
                  style={{
                    ...NAV_BTN,
                    width: "auto",
                    padding: "0 8px",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#8a4a00",
                  }}
                >
                  Empty week
                </button>
              </div>
            )}
            <span
              style={{
                marginLeft: tab === "schedule" ? "4px" : "auto",
                padding: "2px 8px",
                borderRadius: 16,
                fontSize: 10,
                fontWeight: 700,
                background: "#ffe600",
                color: "#5a4a00",
              }}
            >
              {weekScore}%
            </span>
            <span
              style={{ fontSize: 9, color: saving ? "#b8860b" : "#228b22" }}
            >
              {saving ? "● Saving…" : "● Saved"}
            </span>
            {userId && (
              <span style={{ fontSize: 9, color: "#c8b400" }}>☁ Synced</span>
            )}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflow: tab === "ielts" ? "hidden" : "auto",
              background: tab === "schedule" ? "#fffde0" : tab === "ielts" ? "#080810" : "#f8f3c0",
            }}
          >
            {tab === "dashboard" && (
              <Dashboard
                habits={habits}
                habitList={list}
                weekScore={weekScore}
                dailyNotes={dailyNotes}
                onAddNote={addNote}
                rules={rules}
                transactions={transactions}
                settings={settings}
              />
            )}
            {tab === "schedule" && (
              <WeeklySchedule
                ref={scheduleRef}
                cells={cells}
                onCellChange={handleCellChange}
                weekKey={weekKey}
              />
            )}
            {tab === "habits" && (
              <HabitTracker
                habits={habits}
                habitList={list}
                onToggle={toggleHabit}
                onAdd={addHabit}
                onRemove={removeHabit}
                onRename={renameHabit}
              />
            )}
            {tab === "debt" && (
              <DebtPaper
                debts={debts}
                onAdd={addDebt}
                onToggle={toggleDebt}
                onDelete={deleteDebt}
                onEdit={updateDebt}
              />
            )}
            {tab === "brain" && (
              <BrainDump
                entries={brainEntries}
                onAdd={addEntry}
                onDelete={deleteEntry}
                onEdit={(id, text) => updateEntry(id, { text })}
              />
            )}
            {tab === "stats" && (
              <Statistics
                habits={habits}
                habitList={list}
                debts={debts}
                brainEntries={brainEntries}
                weekNum={weekNum}
                weekScore={weekScore}
                weekTrend={getWeekTrend(weekNum, weekScore)}
              />
            )}
            {tab === "roadmaps" && (
              <Roadmaps
                roadmaps={roadmaps}
                onAdd={addRoadmap}
                onUpdate={updateRoadmap}
                onDelete={deleteRoadmap}
              />
            )}
            {tab === "money" && (
              <Money
                transactions={transactions}
                onAdd={addTx}
                onUpdate={updateTx}
                onDelete={deleteTx}
                settings={settings}
              />
            )}
            {tab === "gym" && (
              <Gym
                sessions={gymSessions}
                onAdd={addGym}
                onUpdate={updateGym}
                onDelete={deleteGym}
              />
            )}
            {tab === "health" && (
              <Health
                logs={healthLogs}
                onAdd={addHealth}
                onUpdate={updateHealth}
                onDelete={deleteHealth}
                rules={rules}
              />
            )}
            {tab === "knowledge" && (
              <Knowledge
                items={knowledge}
                onAdd={addKnow}
                onUpdate={updateKnow}
                onDelete={deleteKnow}
              />
            )}

            {tab === "rules" && <MyRules rules={rules} onSave={saveRules} />}
            {tab === "notes" && (
              <DailyNotes
                notes={dailyNotes}
                onAdd={addNote}
                onUpdate={updateNote}
                onDelete={deleteNote}
              />
            )}
            {tab === "ielts" && <IeltsPlan data={ielts} onSave={saveIelts} />}
            {tab === "movies" && (
              <Movies
                items={movies}
                onAdd={addMovie}
                onUpdate={updateMovie}
                onDelete={deleteMovie}
              />
            )}
            {tab === "podcasts" && (
              <Podcasts
                items={podcasts}
                onAdd={addPodcast}
                onUpdate={updatePodcast}
                onDelete={deletePodcast}
              />
            )}
            {tab === "plans" && (
              <Plans
                items={plans}
                onAdd={addPlan}
                onUpdate={updatePlan}
                onDelete={deletePlan}
              />
            )}
            {tab === "people" && <People />}
            {tab === "wall" && <WallBoard />}
            {tab === "yearly" && <YearlyReview />}
            {tab === "settings" && (
              <Settings
                settings={settings}
                onSave={saveSettings}
                userId={userId}
              />
            )}
          </div>
        </div>
      </div>
    </PinLock>
  );
}

const NAV_BTN = {
  width: 22,
  height: 22,
  border: "0.5px solid #e0d800",
  background: "transparent",
  borderRadius: 5,
  cursor: "pointer",
  color: "#888",
  fontSize: 14,
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
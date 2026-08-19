import { useState, useMemo, useRef, useEffect } from "react";
import {
  DAILY_HABITS,
  SKELETON,
  WEAKNESSES,
  MONTHS,
  fmtDate,
  dayDiff,
  buildIeltsSchedule,
  IELTS_EXAM1,
  IELTS_EXAM2,
} from "../data/ieltsData";

// Schedule is deterministic (pure function of fixed calendar
// constants) — build it once, outside the component, instead of on
// every render.
const SCHEDULE = buildIeltsSchedule();

const tagLabel = { r: "READING", l: "LISTENING", w: "WRITING", sp: "SPEAKING", p: "HABITS/PASSIVE", mock: "MOCK", rev: "REVIEW" };
const badgeLabel = { r: "R", l: "L", w: "W", sp: "S", p: "HABITS", mock: "MOCK", exam: "EXAM" };

function Tag({ t }) {
  return <span className={`ip-tag ip-tag-${t || "p"}`}>{tagLabel[t] || (t || "").toUpperCase()}</span>;
}
function Badge({ t }) {
  return <span className={`ip-badge ip-badge-${t || "p"}`}>{badgeLabel[t] || (t || "").toUpperCase()}</span>;
}

// ── Debounced text input — local buffer so typing doesn't get
// interrupted by the round-trip through the parent/Firestore. ──
function DebouncedField({ as = "input", value, onCommit, delay = 500, ...rest }) {
  const [local, setLocal] = useState(value || "");
  const timer = useRef(null);
  const lastEmitted = useRef(value || "");

  useEffect(() => {
    if (value !== lastEmitted.current) {
      setLocal(value || "");
      lastEmitted.current = value || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function flush(v) {
    clearTimeout(timer.current);
    lastEmitted.current = v;
    onCommit(v);
  }
  function handleChange(e) {
    const v = e.target.value;
    setLocal(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(v), delay);
  }

  const Tag = as;
  return <Tag {...rest} value={local} onChange={handleChange} onBlur={() => flush(local)} />;
}

export default function IeltsPlan({ data, onSave }) {
  const ST = data || {};
  const [curDay, setCurDay] = useState(1);
  const [sbOpen, setSbOpen] = useState(false);
  // Block open/closed is purely a UI convenience — keep it local so
  // we're not writing to Firestore on every expand/collapse click.
  const [openBlocks, setOpenBlocks] = useState({});

  function tk(bid, ti) {
    return `${bid}_t${ti}`;
  }
  function blkDone(bid, tasks) {
    return tasks.every((_, i) => !!ST[tk(bid, i)]);
  }
  function dayPct(day) {
    let tot = 0,
      dn = 0;
    day.blocks.forEach((b) =>
      b.tasks.forEach((_, i) => {
        tot++;
        if (ST[tk(b.id, i)]) dn++;
      }),
    );
    return tot ? Math.round((dn / tot) * 100) : 0;
  }
  function isBlkOpen(bid) {
    return openBlocks[bid] !== false;
  }
  function toggleBlk(bid) {
    setOpenBlocks((p) => ({ ...p, [bid]: !isBlkOpen(bid) }));
  }
  function toggleTask(bid, i) {
    onSave({ [tk(bid, i)]: !ST[tk(bid, i)] });
  }
  function toggleTgt(did, i) {
    onSave({ [`tg_${did}_${i}`]: !ST[`tg_${did}_${i}`] });
  }
  function toggleStrat(si, i) {
    onSave({ [`str_${si}_${i}`]: !ST[`str_${si}_${i}`] });
  }
  function markAll(day) {
    const p = dayPct(day);
    const mark = p < 100;
    const updates = {};
    day.blocks.forEach((b) => b.tasks.forEach((_, i) => (updates[tk(b.id, i)] = mark)));
    onSave(updates);
  }

  const overallPct = useMemo(() => {
    let tot = 0,
      dn = 0;
    SCHEDULE.forEach((d) => {
      tot += 100;
      dn += dayPct(d);
    });
    return tot ? Math.round(dn / tot) : 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ST]);

  const daysToExam = Math.max(0, dayDiff(new Date(), IELTS_EXAM1));
  const activeDay = SCHEDULE.find((x) => x.day === curDay) || SCHEDULE[0];

  return (
    <div className="ielts-plan">
      <IeltsStyles />
      <button className="ip-menu-btn" onClick={() => setSbOpen((v) => !v)}>
        ☰
      </button>
      <div className="ip-app">
        <div className={`ip-sb${sbOpen ? " open" : ""}`}>
          <div className="ip-sb-head">
            <div className="ip-sb-logo">
              <em>IELTS</em> BATTLE PLAN
            </div>
            <div className="ip-sb-sub">08 Aug → 06 Oct 2026 · 59 days · Salford intake</div>
            <div className="ip-sb-cd">
              <div>
                <div className="ip-cd-days">{daysToExam}</div>
                <div className="ip-cd-label">days to test 1</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="ip-cd-label">Oct 6</span>
                <span className="ip-cd-label" style={{ color: "var(--ip-m1)" }}>
                  2nd test: Oct 27
                </span>
              </div>
            </div>
          </div>
          <div className="ip-sb-overall">
            <div className="ip-ov-label">
              <span>OVERALL PROGRESS</span>
              <span>{overallPct}%</span>
            </div>
            <div className="ip-ov-track">
              <div className="ip-ov-fill" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
          <div className="ip-day-list">
            <DayList
              curDay={curDay}
              onGoDay={(n) => {
                setCurDay(n);
                setSbOpen(false);
              }}
              dayPct={dayPct}
            />
          </div>
        </div>
        <div className="ip-main">
          {activeDay.kind === "exam" ? (
            <ExamDay
              d={activeDay}
              pct={dayPct(activeDay)}
              ST={ST}
              onToggleTask={toggleTask}
              onToggleTgt={toggleTgt}
              onToggleStrat={toggleStrat}
              onSave={onSave}
              isBlkOpen={isBlkOpen}
              onToggleBlk={toggleBlk}
              blkDone={blkDone}
            />
          ) : (
            <StudyDay
              d={activeDay}
              pct={dayPct(activeDay)}
              ST={ST}
              onToggleTask={toggleTask}
              onToggleTgt={toggleTgt}
              onSave={onSave}
              isBlkOpen={isBlkOpen}
              onToggleBlk={toggleBlk}
              blkDone={blkDone}
              onMarkAll={() => markAll(activeDay)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DayList({ curDay, onGoDay, dayPct }) {
  let lastMonth = -1;
  const rows = [];
  SCHEDULE.forEach((d) => {
    const m = d.date.getMonth();
    if (m !== lastMonth) {
      rows.push(
        <div className="ip-wk-label" key={`m${m}-${d.date.getFullYear()}`}>
          {MONTHS[m]} {d.date.getFullYear()}
        </div>,
      );
      lastMonth = m;
    }
    const pct = dayPct(d);
    const C = 2 * Math.PI * 8;
    const off = C - (pct / 100) * C;
    const color = d.kind === "exam" ? "var(--ip-r)" : pct === 100 ? "var(--ip-sp)" : "var(--ip-acc)";
    let cls = "";
    if (d.kind === "exam") cls = "exam-btn";
    else if (d.kind === "friday") cls = "fri-btn";
    else if (d.kind === "taper1" || d.kind === "taper2" || d.kind === "eve") cls = "taper-btn";
    rows.push(
      <button key={d.day} className={`ip-day-btn ${cls}${d.day === curDay ? " act" : ""}`} onClick={() => onGoDay(d.day)}>
        <div className="ip-db-n">{d.kind === "exam" ? "🎯" : `D${d.day}`}</div>
        <div className="ip-db-info">
          <div className="ip-db-title">{d.label}</div>
          <div className="ip-db-sub">{fmtDate(d.date)}</div>
        </div>
        <svg className="ip-db-ring" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={C.toFixed(2)}
            strokeDashoffset={off.toFixed(2)}
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
        </svg>
      </button>,
    );
  });
  return <>{rows}</>;
}

function ScoreRow({ label, scores, day, ST, onSave }) {
  if (!scores.length) return null;
  return (
    <div className="ip-score-row">
      <span className="ip-score-lbl">{label}</span>
      {scores.map((s) => (
        <div className="ip-score-box" key={s.k}>
          <label>{s.l}</label>
          <DebouncedField
            value={ST[`s_${day}_${s.k}`] || ""}
            onCommit={(v) => onSave({ [`s_${day}_${s.k}`]: v })}
            placeholder="—"
          />
        </div>
      ))}
    </div>
  );
}

function Blocks({ blocks, ST, onToggleTask, isBlkOpen, onToggleBlk, blkDone, onSave }) {
  return (
    <div className="ip-blocks">
      {blocks.map((b) => {
        const allDone = blkDone(b.id, b.tasks);
        const open = isBlkOpen(b.id);
        const doneCnt = b.tasks.filter((_, i) => ST[`${b.id}_t${i}`]).length;
        return (
          <div className={`ip-blk${allDone ? " complete" : ""}${open ? " open" : ""}`} key={b.id}>
            <div className="ip-blk-head" onClick={() => onToggleBlk(b.id)}>
              <div className="ip-blk-title">
                {b.title}
                <Tag t={b.tag} />
              </div>
              <div className="ip-blk-right">
                {allDone && <span className="ip-blk-check">✓</span>}
                <span className="ip-blk-pct">
                  {doneCnt}/{b.tasks.length}
                </span>
                <span className="ip-chev">▾</span>
              </div>
            </div>
            {open && (
              <div className="ip-blk-body">
                {b.tasks.map((t, i) => {
                  const done = !!ST[`${b.id}_t${i}`];
                  return (
                    <div className={`ip-task${done ? " done" : ""}`} key={i} onClick={() => onToggleTask(b.id, i)}>
                      <div className="ip-task-cb">{done ? "✓" : ""}</div>
                      <div className="ip-task-body">
                        <div className="ip-task-txt">{t.t}</div>
                      </div>
                    </div>
                  );
                })}
                <div className="ip-blk-notes">
                  <div className="ip-notes-lbl">NOTES</div>
                  <DebouncedField
                    as="textarea"
                    className="ip-notes-ta"
                    placeholder="Scores, observations…"
                    value={ST[`n_${b.id}`] || ""}
                    onCommit={(v) => onSave({ [`n_${b.id}`]: v })}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Targets({ title, targets, day, ST, onToggleTgt }) {
  return (
    <div className="ip-targets">
      <div className="ip-tgt-title">{title}</div>
      {targets.map((t, i) => {
        const done = !!ST[`tg_${day}_${i}`];
        return (
          <div className={`ip-tgt-item${done ? " done" : ""}`} key={i} onClick={() => onToggleTgt(day, i)}>
            <div className="ip-tgt-cb">{done ? "✓" : ""}</div>
            <span>{t}</span>
          </div>
        );
      })}
    </div>
  );
}

function StudyDay({ d, pct, ST, onToggleTask, onToggleTgt, onSave, isBlkOpen, onToggleBlk, blkDone, onMarkAll }) {
  let intro = null;
  if (d.kind === "study" && d.day === 1) {
    intro = (
      <div className="ip-intro-box">
        <b>Priority #1 — Text understanding.</b> {WEAKNESSES.meta}
        <br />
        <br />
        <b>Reading:</b> {WEAKNESSES.reading.join(" ")}
        <br />
        <b>Listening:</b> {WEAKNESSES.listening.join(" ")}
        <br />
        <b>Writing:</b> {WEAKNESSES.writing.join(" ")}
        <br />
        <b>Speaking:</b> {WEAKNESSES.speaking.join(" ")}
      </div>
    );
  } else if (d.kind === "friday") {
    intro = (
      <div className="ip-intro-box">
        <b>Friday is your flex day.</b> If you missed anything Tue–Thu, catch it up here. If you're fully caught up,
        this is your rest day — walk, sleep, recover.
      </div>
    );
  } else if (d.kind === "taper1" || d.kind === "taper2" || d.kind === "eve") {
    intro = (
      <div className="ip-intro-box">
        <b>Countdown to Test 1: {dayDiff(d.date, IELTS_EXAM1)} day(s).</b> This is a light/taper day — do not
        overtrain now. Second IELTS test is booked for {fmtDate(IELTS_EXAM2)}, {IELTS_EXAM2.getFullYear()} (25-day
        gap after Test 1).
      </div>
    );
  }

  return (
    <>
      <ScoreRow label="Scores" scores={d.scores} day={d.day} ST={ST} onSave={onSave} />
      <div className="ip-day-hero">
        <div className="ip-dh-row">
          <div>
            <div className="ip-dh-meta">
              DAY {d.day} of 59 · {fmtDate(d.date)}, {d.date.getFullYear()}
            </div>
            <div className="ip-dh-title">{d.label}</div>
            <div className="ip-dh-sub">{pct}% complete</div>
            <div className="ip-dh-badges">
              {d.badges.map((b, i) => (
                <Badge t={b} key={i} />
              ))}
            </div>
          </div>
          <button className={`ip-btn-all${pct === 100 ? " all-done" : ""}`} onClick={onMarkAll}>
            {pct === 100 ? "✓ Done" : "Mark all done"}
          </button>
        </div>
        <div className="ip-dh-prog">
          <div className="ip-prog-track">
            <div className="ip-prog-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ip-prog-pct">{pct}%</div>
        </div>
        <div className="ip-dh-skeleton">{SKELETON}</div>
      </div>
      <div className="ip-content">
        {intro}
        <Blocks
          blocks={d.blocks}
          ST={ST}
          onToggleTask={onToggleTask}
          isBlkOpen={isBlkOpen}
          onToggleBlk={onToggleBlk}
          blkDone={blkDone}
          onSave={onSave}
        />
        <Targets title={`DAY ${d.day} TARGETS`} targets={d.targets} day={d.day} ST={ST} onToggleTgt={onToggleTgt} />
      </div>
    </>
  );
}

function ExamDay({ d, pct, ST, onToggleTask, onToggleTgt, onToggleStrat, onSave, isBlkOpen, onToggleBlk, blkDone }) {
  const colors = { READING: "var(--ip-r)", LISTENING: "var(--ip-l)", WRITING: "var(--ip-w)", SPEAKING: "var(--ip-sp)" };
  const entries = Object.entries(d.stratRules || {});
  return (
    <>
      <ScoreRow label="Results" scores={d.scores} day={d.day} ST={ST} onSave={onSave} />
      <div className="ip-day-hero">
        <div className="ip-dh-row">
          <div>
            <div className="ip-dh-meta">
              EXAM DAY · {fmtDate(d.date)}, {d.date.getFullYear()}
            </div>
            <div className="ip-dh-title">{d.label}</div>
            <div className="ip-dh-sub">{pct}% ready</div>
            <div className="ip-dh-badges">
              {d.badges.map((b, i) => (
                <Badge t={b} key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="ip-dh-prog">
          <div className="ip-prog-track">
            <div className="ip-prog-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ip-prog-pct">{pct}%</div>
        </div>
      </div>
      <div className="ip-content">
        <div className="ip-exam-hero">
          <h2>⚡ This is your revenge.</h2>
          <p>
            Execute the system. Trust the training. Second test booked for {fmtDate(IELTS_EXAM2)},{" "}
            {IELTS_EXAM2.getFullYear()} if you need it — but you won't.
          </p>
        </div>
        <div className="ip-strat-grid">
          {entries.map(([name, rules], si) => (
            <div className="ip-strat-box" key={name}>
              <div className="ip-strat-name" style={{ color: colors[name] }}>
                📋 {name}
              </div>
              {rules.map((r, ri) => {
                const checked = !!ST[`str_${si}_${ri}`];
                return (
                  <div
                    className={`ip-strat-rule${checked ? " checked" : ""}`}
                    key={ri}
                    onClick={() => onToggleStrat(si, ri)}
                  >
                    {r}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <Blocks
          blocks={d.blocks}
          ST={ST}
          onToggleTask={onToggleTask}
          isBlkOpen={isBlkOpen}
          onToggleBlk={onToggleBlk}
          blkDone={blkDone}
          onSave={onSave}
        />
        <Targets title="TARGET SCORES" targets={d.targets} day={d.day} ST={ST} onToggleTgt={onToggleTgt} />
      </div>
    </>
  );
}

// ── Scoped styles — dark theme lives only inside .ielts-plan so the
// rest of the (yellow-themed) CRM is untouched. ──
function IeltsStyles() {
  return (
    <style>{`
.ielts-plan{
  --ip-bg:#080810;--ip-s1:#0f0f1a;--ip-s2:#151522;--ip-s3:#1c1c2e;
  --ip-br:rgba(255,255,255,0.06);--ip-br2:rgba(255,255,255,0.1);--ip-br3:rgba(255,255,255,0.16);
  --ip-tx:#e8e6ff;--ip-m1:#6b6888;--ip-m2:#9896b8;
  --ip-r:#ff5d78;--ip-rd:rgba(255,61,92,0.13);
  --ip-l:#00cfff;--ip-ld:rgba(0,207,255,0.13);
  --ip-w:#ffbe3d;--ip-wd:rgba(255,190,61,0.13);
  --ip-sp:#3dffa0;--ip-spd:rgba(61,255,160,0.13);
  --ip-acc:#7c6fff;--ip-acc2:#b8b0ff;
  font-family:'Inter',system-ui,sans-serif;font-size:14px;
  background:var(--ip-bg);color:var(--ip-tx);
  height:100%;position:relative;overflow:hidden;
}
.ielts-plan *{box-sizing:border-box}
.ip-app{display:grid;grid-template-columns:260px 1fr;height:100%;overflow:hidden}
.ip-sb{background:var(--ip-s1);border-right:1px solid var(--ip-br2);display:flex;flex-direction:column;overflow:hidden}
.ip-sb-head{padding:16px 16px 12px;border-bottom:1px solid var(--ip-br)}
.ip-sb-logo{font-family:'Space Mono',monospace;font-size:13px;font-weight:700;letter-spacing:-0.3px}
.ip-sb-logo em{color:var(--ip-r);font-style:normal}
.ip-sb-sub{margin-top:4px;font-size:10px;color:var(--ip-m1);font-family:'Space Mono',monospace}
.ip-sb-cd{margin-top:10px;display:flex;align-items:center;justify-content:space-between;padding:8px 11px;background:var(--ip-s2);border-radius:8px;border:1px solid var(--ip-br2)}
.ip-cd-days{font-family:'Space Mono',monospace;font-size:24px;font-weight:700;color:var(--ip-r);line-height:1}
.ip-cd-label{font-size:9px;color:var(--ip-m1);font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:0.08em;display:block}
.ip-sb-overall{padding:10px 16px 8px;border-bottom:1px solid var(--ip-br)}
.ip-ov-label{font-size:9px;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Mono',monospace;color:var(--ip-m1);display:flex;justify-content:space-between;margin-bottom:5px}
.ip-ov-track{height:3px;background:var(--ip-s3);border-radius:2px;overflow:hidden}
.ip-ov-fill{height:100%;background:linear-gradient(90deg,var(--ip-r),var(--ip-acc));border-radius:2px;transition:width .5s}
.ip-day-list{flex:1;overflow-y:auto;padding:6px 0}
.ip-wk-label{padding:8px 16px 3px;font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:var(--ip-m1);font-family:'Space Mono',monospace;position:sticky;top:0;background:var(--ip-s1)}
.ip-day-btn{width:100%;padding:6px 16px;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:8px;color:var(--ip-tx);border-left:2px solid transparent;transition:all .12s;text-align:left}
.ip-day-btn:hover{background:var(--ip-s2)}
.ip-day-btn.act{background:var(--ip-s3);border-left-color:var(--ip-acc)}
.ip-db-n{font-family:'Space Mono',monospace;font-size:9px;color:var(--ip-m1);width:26px;flex-shrink:0}
.ip-day-btn.act .ip-db-n{color:var(--ip-acc)}
.ip-db-info{flex:1;min-width:0}
.ip-db-title{font-size:11.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ip-db-sub{font-size:9px;color:var(--ip-m1);font-family:'Space Mono',monospace}
.ip-db-ring{flex-shrink:0;width:18px;height:18px}
.ip-day-btn.fri-btn .ip-db-title{color:var(--ip-acc2)}
.ip-day-btn.taper-btn .ip-db-title{color:var(--ip-w)}
.ip-day-btn.exam-btn{border-left-color:var(--ip-r)}
.ip-day-btn.exam-btn .ip-db-n,.ip-day-btn.exam-btn .ip-db-title{color:var(--ip-r)}
.ip-main{overflow-y:auto;background:var(--ip-bg);display:flex;flex-direction:column}
.ip-day-hero{padding:20px 26px 16px;background:var(--ip-s1);border-bottom:1px solid var(--ip-br);position:sticky;top:0;z-index:10;backdrop-filter:blur(20px)}
.ip-dh-row{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;gap:10px}
.ip-dh-meta{font-family:'Space Mono',monospace;font-size:10px;color:var(--ip-m1);margin-bottom:4px}
.ip-dh-title{font-size:22px;font-weight:800;letter-spacing:-0.6px;line-height:1.15}
.ip-dh-sub{font-size:11px;color:var(--ip-m2);margin-top:3px}
.ip-dh-badges{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}
.ip-badge{font-size:9px;padding:3px 8px;border-radius:4px;font-family:'Space Mono',monospace;font-weight:700;text-transform:uppercase;letter-spacing:0.05em}
.ip-badge-r{background:var(--ip-rd);color:var(--ip-r);border:1px solid rgba(255,61,92,0.2)}
.ip-badge-l{background:var(--ip-ld);color:var(--ip-l);border:1px solid rgba(0,207,255,0.2)}
.ip-badge-w{background:var(--ip-wd);color:var(--ip-w);border:1px solid rgba(255,190,61,0.2)}
.ip-badge-sp{background:var(--ip-spd);color:var(--ip-sp);border:1px solid rgba(61,255,160,0.2)}
.ip-badge-p{background:rgba(255,255,255,0.05);color:var(--ip-m1);border:1px solid var(--ip-br2)}
.ip-badge-mock{background:rgba(255,61,92,0.1);color:var(--ip-r);border:1px solid rgba(255,61,92,0.25)}
.ip-badge-exam{background:linear-gradient(135deg,rgba(255,61,92,0.1),rgba(124,111,255,0.1));color:var(--ip-acc2);border:1px solid rgba(124,111,255,0.2)}
.ip-btn-all{padding:6px 13px;border-radius:7px;border:1px solid var(--ip-br3);background:transparent;color:var(--ip-tx);font-family:inherit;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;flex-shrink:0}
.ip-btn-all:hover{background:var(--ip-s3)}
.ip-btn-all.all-done{background:var(--ip-spd);border-color:var(--ip-sp);color:var(--ip-sp)}
.ip-dh-prog{display:flex;align-items:center;gap:10px}
.ip-prog-track{flex:1;height:3px;background:var(--ip-s3);border-radius:2px;overflow:hidden}
.ip-prog-fill{height:100%;background:linear-gradient(90deg,var(--ip-r),var(--ip-acc));border-radius:2px;transition:width .4s}
.ip-prog-pct{font-family:'Space Mono',monospace;font-size:11px;color:var(--ip-m2);width:32px;text-align:right}
.ip-dh-skeleton{margin-top:10px;padding:8px 12px;background:var(--ip-s2);border-radius:7px;border-left:3px solid var(--ip-acc);font-size:11px;color:var(--ip-m2);line-height:1.7;font-family:'Space Mono',monospace}
.ip-score-row{display:flex;gap:8px;flex-wrap:wrap;padding:12px 26px;background:var(--ip-s1);border-bottom:1px solid var(--ip-br)}
.ip-score-lbl{font-family:'Space Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:var(--ip-m1);margin-right:2px;align-self:center}
.ip-score-box{display:flex;align-items:center;gap:6px;background:var(--ip-s2);border:1px solid var(--ip-br2);border-radius:6px;padding:5px 10px}
.ip-score-box label{font-family:'Space Mono',monospace;font-size:9px;color:var(--ip-m1)}
.ip-score-box input{width:44px;background:transparent;border:none;outline:none;font-family:'Space Mono',monospace;font-size:12px;color:var(--ip-acc2);text-align:right}
.ip-content{padding:18px 26px;flex:1}
.ip-blocks{display:flex;flex-direction:column;gap:9px}
.ip-blk{border:1px solid var(--ip-br);border-radius:10px;overflow:hidden;transition:border-color .2s}
.ip-blk.complete{border-color:rgba(61,255,160,0.2);background:rgba(61,255,160,0.015)}
.ip-blk-head{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--ip-s1);cursor:pointer;user-select:none;transition:background .12s}
.ip-blk-head:hover{background:var(--ip-s2)}
.ip-blk-title{flex:1;font-size:13px;font-weight:600;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.ip-blk-right{display:flex;align-items:center;gap:7px;flex-shrink:0}
.ip-blk-pct{font-family:'Space Mono',monospace;font-size:9px;color:var(--ip-m1)}
.ip-blk-check{font-size:12px;color:var(--ip-sp)}
.ip-chev{color:var(--ip-m1);font-size:10px;transition:transform .2s}
.ip-blk.open .ip-chev{transform:rotate(180deg)}
.ip-blk-body{border-top:1px solid var(--ip-br)}
.ip-task{display:flex;align-items:flex-start;gap:10px;padding:8px 14px;border-bottom:1px solid rgba(255,255,255,0.03);cursor:pointer;transition:background .1s}
.ip-task:last-child{border-bottom:none}
.ip-task:hover{background:rgba(255,255,255,0.02)}
.ip-task.done{opacity:.38}
.ip-task-cb{width:13px;height:13px;border:1.5px solid var(--ip-br3);border-radius:4px;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;font-size:9px;transition:all .15s}
.ip-task.done .ip-task-cb{background:var(--ip-sp);border-color:var(--ip-sp);color:#060810}
.ip-task-body{flex:1}
.ip-task-txt{font-size:12.5px;line-height:1.55}
.ip-task.done .ip-task-txt{text-decoration:line-through}
.ip-blk-notes{padding:9px 14px;border-top:1px solid var(--ip-br);background:var(--ip-s2)}
.ip-notes-lbl{font-size:9px;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Mono',monospace;color:var(--ip-m1);margin-bottom:5px}
.ip-notes-ta{width:100%;background:var(--ip-s3);border:1px solid var(--ip-br);border-radius:6px;padding:7px 10px;font-family:inherit;font-size:12px;color:var(--ip-m2);resize:vertical;min-height:44px;outline:none;transition:border-color .15s}
.ip-notes-ta:focus{border-color:var(--ip-acc)}
.ip-targets{padding:13px 15px;background:rgba(124,111,255,0.04);border:1px solid rgba(124,111,255,0.14);border-radius:9px;margin-top:14px}
.ip-tgt-title{font-family:'Space Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:var(--ip-acc);margin-bottom:9px}
.ip-tgt-item{display:flex;align-items:flex-start;gap:8px;padding:5px 0;cursor:pointer;font-size:12.5px;color:var(--ip-m2);border-bottom:1px solid rgba(255,255,255,0.03)}
.ip-tgt-item:last-child{border-bottom:none}
.ip-tgt-cb{width:13px;height:13px;border:1.5px solid rgba(124,111,255,0.4);border-radius:3px;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;font-size:8px;transition:all .15s}
.ip-tgt-item.done .ip-tgt-cb{background:var(--ip-acc);border-color:var(--ip-acc);color:white}
.ip-tgt-item.done span{text-decoration:line-through;color:var(--ip-m1)}
.ip-exam-hero{padding:20px;background:linear-gradient(135deg,rgba(255,61,92,0.08),rgba(124,111,255,0.08));border:1px solid rgba(124,111,255,0.2);border-radius:11px;margin-bottom:16px;text-align:center}
.ip-exam-hero h2{font-size:26px;font-weight:900;letter-spacing:-0.7px;margin-bottom:6px}
.ip-exam-hero p{color:var(--ip-m2);font-size:12px}
.ip-strat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.ip-strat-box{background:var(--ip-s1);border:1px solid var(--ip-br2);border-radius:9px;padding:13px 15px}
.ip-strat-name{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;font-family:'Space Mono',monospace;margin-bottom:9px;padding-bottom:7px;border-bottom:1px solid var(--ip-br)}
.ip-strat-rule{font-size:12px;color:var(--ip-m2);padding:4px 0;display:flex;gap:7px;border-bottom:1px solid rgba(255,255,255,0.03);cursor:pointer}
.ip-strat-rule:last-child{border-bottom:none}
.ip-strat-rule::before{content:'→';color:var(--ip-m1);flex-shrink:0}
.ip-strat-rule.checked{color:var(--ip-m1);text-decoration:line-through}
.ip-strat-rule.checked::before{color:var(--ip-sp);content:'✓'}
.ip-intro-box{padding:14px 16px;background:var(--ip-s2);border:1px solid var(--ip-br2);border-left:3px solid var(--ip-r);border-radius:8px;margin-bottom:14px;font-size:12px;color:var(--ip-m2);line-height:1.7}
.ip-intro-box b{color:var(--ip-tx)}
.ip-tag{font-size:9px;padding:2px 7px;border-radius:3px;font-family:'Space Mono',monospace;font-weight:700;text-transform:uppercase;letter-spacing:0.04em}
.ip-tag-r{background:var(--ip-rd);color:var(--ip-r)}
.ip-tag-l{background:var(--ip-ld);color:var(--ip-l)}
.ip-tag-w{background:var(--ip-wd);color:var(--ip-w)}
.ip-tag-sp{background:var(--ip-spd);color:var(--ip-sp)}
.ip-tag-p{background:rgba(255,255,255,0.05);color:var(--ip-m1)}
.ip-tag-mock{background:rgba(255,61,92,0.12);color:var(--ip-r)}
.ip-tag-rev{background:var(--ip-spd);color:var(--ip-sp)}
.ip-menu-btn{display:none;position:absolute;top:10px;left:10px;z-index:101;width:34px;height:34px;background:var(--ip-s2);border:1px solid var(--ip-br2);border-radius:7px;color:var(--ip-tx);align-items:center;justify-content:center;font-size:16px;cursor:pointer}
@media(max-width:760px){
  .ip-app{grid-template-columns:1fr}
  .ip-sb{position:absolute;left:-280px;top:0;bottom:0;width:260px;z-index:100;transition:left .2s}
  .ip-sb.open{left:0}
  .ip-strat-grid{grid-template-columns:1fr}
  .ip-menu-btn{display:flex}
}
`}</style>
  );
}

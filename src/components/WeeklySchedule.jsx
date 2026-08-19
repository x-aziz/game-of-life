import {
  useState,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { DAYS, DEFAULT_COLUMNS, getCellDefault } from "../data/defaults";

function lsGet(k, fb) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
}
function lsSet(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}

function cellKey(day, colId) {
  return `${day}__${colId}`;
}

// Build a fresh set of columns from the defaults, giving every day
// the same starting title/time (per-day overrides happen later).
function buildDefaultColumns() {
  return DEFAULT_COLUMNS.map((c) => ({
    id: c.id,
    color: c.color,
    wide: c.wide,
    titles: Object.fromEntries(DAYS.map((d) => [d, c.title])),
    times: Object.fromEntries(DAYS.map((d) => [d, c.time])),
  }));
}
function defaultColWidths() {
  return Object.fromEntries(DEFAULT_COLUMNS.map((c) => [c.id, c.wide ? 175 : 95]));
}

// ── Debounced textarea ──────────────────────────────────────
// Keeps a local buffer so the DOM owns the cursor while typing.
// Only pushes the value upstream (and re-syncs from props) when
// the field isn't actively focused, or after a short debounce.
function DebouncedTextarea({ value, onChange, style, delay = 300 }) {
  const [local, setLocal] = useState(value);
  const ref = useRef(null);
  const timer = useRef(null);
  const lastEmitted = useRef(value);

  useEffect(() => {
    if (document.activeElement !== ref.current && value !== lastEmitted.current) {
      setLocal(value);
      lastEmitted.current = value;
    }
  }, [value]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  function flush(v) {
    clearTimeout(timer.current);
    lastEmitted.current = v;
    onChange(v);
  }

  function handleChange(e) {
    const v = e.target.value;
    setLocal(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(v), delay);
  }

  return (
    <textarea
      ref={ref}
      value={local}
      onChange={handleChange}
      onBlur={() => flush(local)}
      style={style}
    />
  );
}

// ── Column resize handle ──────────────────────────────────────
function ColHandle({ colId, onResize }) {
  const ref = useRef(null);
  function onMouseDown(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = ref.current.parentElement.offsetWidth;
    const onMove = (mv) => {
      onResize(colId, Math.max(60, startW + mv.clientX - startX));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }
  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        right: -3,
        top: 0,
        bottom: 0,
        width: 6,
        cursor: "col-resize",
        zIndex: 20,
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 2,
          height: "100%",
          margin: "0 auto",
          background: "transparent",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#c8b400")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      />
    </div>
  );
}

// ── Row resize handle ─────────────────────────────────────────
function RowHandle({ day, onResize, getHeight }) {
  function onMouseDown(e) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = getHeight();
    const onMove = (mv) => {
      onResize(day, Math.max(56, startH + mv.clientY - startY));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }
  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -3,
        height: 6,
        cursor: "row-resize",
        zIndex: 20,
        userSelect: "none",
      }}
    >
      <div
        style={{
          height: 2,
          width: "100%",
          background: "transparent",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#c8b400")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      />
    </div>
  );
}

// ── Small inline popover to name + time a column before inserting ──
function InsertPopover({ position, onConfirm, onCancel }) {
  const [title, setTitle] = useState("New column");
  const [time, setTime] = useState("00:00→00:00");
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: 4,
        background: "#fffef0",
        border: "1px solid #c8b400",
        borderRadius: 6,
        padding: 8,
        zIndex: 40,
        width: 170,
        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, color: "#5a4a00", marginBottom: 5 }}>
        Add column {position}
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        autoFocus
        style={{
          width: "100%",
          fontSize: 11,
          padding: "3px 5px",
          marginBottom: 4,
          border: "1px solid #ddd0a0",
          borderRadius: 4,
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time range"
        style={{
          width: "100%",
          fontSize: 11,
          padding: "3px 5px",
          marginBottom: 6,
          border: "1px solid #ddd0a0",
          borderRadius: 4,
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{
            fontSize: 10,
            padding: "3px 8px",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(title.trim() || "New column", time.trim() || "00:00→00:00")}
          style={{
            fontSize: 10,
            padding: "3px 8px",
            border: "none",
            borderRadius: 4,
            background: "#ffe600",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add column
        </button>
      </div>
    </div>
  );
}

// ── Column header — structural controls (insert + delete + resize).
// Title/time live per-day inside each cell (see CellTitleTime below).
function ColHeader({
  col,
  width,
  onDelete,
  onResize,
  onOpenInsertMenu,
  insertState,
  onChooseBefore,
  onChooseAfter,
  onConfirmInsert,
  onCancelInsert,
}) {
  return (
    <th
      style={{
        border: "0.5px solid #c8b400",
        padding: "3px 6px",
        position: "sticky",
        top: 0,
        zIndex: 5,
        background: "#ffe600",
        width,
        minWidth: width,
        maxWidth: width,
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onOpenInsertMenu}
          title="Insert a column before/after this one"
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "1px solid #c8b400",
            background: "#fff8d0",
            color: "#8a7000",
            fontSize: 11,
            fontWeight: 700,
            lineHeight: "14px",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            if (window.confirm(`Delete this column for every day this week?`)) {
              onDelete(col.id);
            }
          }}
          title="Delete column"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#8a7000",
            fontSize: 13,
            fontWeight: "bold",
            padding: "0 2px",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      <ColHandle colId={col.id} onResize={onResize} />

      {insertState?.stage === "choose" && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            background: "#fffef0",
            border: "1px solid #c8b400",
            borderRadius: 6,
            zIndex: 40,
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
          }}
        >
          <button
            onClick={onChooseBefore}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "6px 10px",
              fontSize: 11,
              border: "none",
              background: "#fffef0",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Add column before
          </button>
          <button
            onClick={onChooseAfter}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "6px 10px",
              fontSize: 11,
              border: "none",
              borderTop: "1px solid #eee0a0",
              background: "#fffef0",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Add column after
          </button>
        </div>
      )}

      {insertState?.stage === "form" && (
        <InsertPopover
          position={insertState.position}
          onConfirm={onConfirmInsert}
          onCancel={onCancelInsert}
        />
      )}
    </th>
  );
}

// ── Per-day, per-column title + time editor ─────────────────────
function CellTitleTime({ title, time, onTitleChange, onTimeChange }) {
  const [tv, setTv] = useState(title);
  const [tmv, setTmv] = useState(time);

  useEffect(() => setTv(title), [title]);
  useEffect(() => setTmv(time), [time]);

  return (
    <div
      style={{
        padding: "4px 6px 3px",
        borderBottom: "0.5px solid rgba(200,180,0,0.35)",
        flexShrink: 0,
      }}
    >
      <input
        value={tv}
        onChange={(e) => setTv(e.target.value)}
        onBlur={() => onTitleChange(tv)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onTitleChange(tv);
            e.target.blur();
          }
        }}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          fontSize: 10,
          fontWeight: 600,
          color: "#5a4a00",
          outline: "none",
          fontFamily: "inherit",
          padding: 0,
        }}
      />
      <input
        value={tmv}
        onChange={(e) => setTmv(e.target.value)}
        onBlur={() => onTimeChange(tmv)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onTimeChange(tmv);
            e.target.blur();
          }
        }}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          fontSize: 9,
          color: "#8a7000",
          outline: "none",
          fontFamily: "inherit",
          marginTop: 1,
          padding: 0,
        }}
      />
    </div>
  );
}

// ── Click-catching overlay used while in "select cells to merge" mode.
// Sits above the textarea/inputs so a click selects the cell instead
// of focusing the text field underneath.
function SelectionOverlay({ selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        inset: 0,
        cursor: "pointer",
        background: selected ? "rgba(26,115,232,0.15)" : "transparent",
        border: selected ? "2px solid #1a73e8" : "2px solid transparent",
        boxSizing: "border-box",
        zIndex: 30,
      }}
    />
  );
}

// ── MAIN ──────────────────────────────────────────────────────
// NOTE: `weekKey` must be passed in by the parent (e.g. the result
// of getWeekKey(weekNumber, year) from data/defaults.js) so that
// column layout is scoped to that specific week instead of being
// shared across the whole year.
const WeeklySchedule = forwardRef(function WeeklySchedule(
  { cells, onCellChange, weekKey = "default" },
  ref,
) {
  const [columns, setColumns] = useState(() =>
    lsGet(`crm_columns_${weekKey}`, buildDefaultColumns()),
  );
  const [colWidths, setColWidths] = useState(() =>
    lsGet(`crm_colWidths_${weekKey}`, defaultColWidths()),
  );
  const [rowHeights, setRowHeights] = useState(() =>
    lsGet("crm_rowHeights", Object.fromEntries(DAYS.map((d) => [d, 96]))),
  );
  // Merged cell blocks for this week: [{ id, days: [...contiguous days],
  // colIds: [...contiguous column ids] }]. The first (day, colId) pair
  // in a merge is its "anchor" — that's where the merged block's
  // content/title/time actually live; the rest of the block is just
  // hidden via colSpan/rowSpan.
  const [merges, setMerges] = useState(() => lsGet(`crm_merges_${weekKey}`, []));
  const rowRefs = useRef({});

  // Re-load everything whenever the active week changes, so switching
  // weeks doesn't carry over another week's columns/merges.
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setColumns(lsGet(`crm_columns_${weekKey}`, buildDefaultColumns()));
    setColWidths(lsGet(`crm_colWidths_${weekKey}`, defaultColWidths()));
    setMerges(lsGet(`crm_merges_${weekKey}`, []));
    setSelectMode(false);
    setSelectedKeys(new Set());
  }, [weekKey]);

  function saveColumns(cols) {
    setColumns(cols);
    lsSet(`crm_columns_${weekKey}`, cols);
  }
  function saveMerges(next) {
    setMerges(next);
    lsSet(`crm_merges_${weekKey}`, next);
  }

  // Update a single day's title or time for one column.
  function updateColumnDayField(colId, day, field, value) {
    saveColumns(
      columns.map((c) =>
        c.id === colId ? { ...c, [field]: { ...c[field], [day]: value } } : c,
      ),
    );
  }

  function deleteColumn(id) {
    saveColumns(columns.filter((c) => c.id !== id));
    // Any merge that touched this column no longer makes sense — drop it.
    saveMerges(merges.filter((m) => !m.colIds.includes(id)));
  }

  // ── Insert-column popover state ───────────────────────────────
  const [insertUI, setInsertUI] = useState(null);

  function openInsertMenu(idx) {
    setInsertUI({ anchorIndex: idx, stage: "choose" });
  }
  function chooseInsertBefore(idx) {
    setInsertUI({ anchorIndex: idx, stage: "form", insertAt: idx, position: "before" });
  }
  function chooseInsertAfter(idx) {
    setInsertUI({ anchorIndex: idx, stage: "form", insertAt: idx + 1, position: "after" });
  }
  function openInsertAtEnd() {
    setInsertUI({
      anchorIndex: "end",
      stage: "form",
      insertAt: columns.length,
      position: "at the end",
    });
  }
  function cancelInsert() {
    setInsertUI(null);
  }
  function insertColumnAt(insertAt, title, time) {
    const id = `col_${Date.now()}`;
    const titles = Object.fromEntries(DAYS.map((d) => [d, title]));
    const times = Object.fromEntries(DAYS.map((d) => [d, time]));
    const newCol = { id, titles, times, color: "#fffde0" };
    const newCols = [...columns];
    newCols.splice(insertAt, 0, newCol);
    saveColumns(newCols);
    setColWidths((p) => {
      const u = { ...p, [id]: 100 };
      lsSet(`crm_colWidths_${weekKey}`, u);
      return u;
    });
  }
  function confirmInsert(title, time) {
    if (!insertUI) return;
    insertColumnAt(insertUI.insertAt, title, time);
    setInsertUI(null);
  }

  function handleColResize(colId, newW) {
    setColWidths((p) => {
      const u = { ...p, [colId]: newW };
      lsSet(`crm_colWidths_${weekKey}`, u);
      return u;
    });
  }
  function handleRowResize(day, newH) {
    setRowHeights((p) => {
      const u = { ...p, [day]: newH };
      lsSet("crm_rowHeights", u);
      return u;
    });
  }

  // Empty every box's content for the current week — titles/times
  // and columns are left untouched. Exposed to the parent via ref
  // so it can live in the app's own top bar next to the week nav.
  function clearAllBoxes() {
    if (
      !window.confirm(
        "Empty all boxes for this week? Titles and times will stay as they are.",
      )
    )
      return;
    for (const day of DAYS) {
      for (const col of columns) {
        onCellChange(day, col.id, "");
      }
    }
  }

  useImperativeHandle(ref, () => ({ clearAllBoxes }));

  // ── Merge cells ──────────────────────────────────────────────
  // coverage: every (day,colId) that's part of a merge maps to either
  // its merge's anchor ("anchor" — gets colSpan/rowSpan) or a cell
  // that should simply not be rendered ("skip" — covered by the anchor).
  const coverage = useMemo(() => {
    const map = new Map();
    for (const m of merges) {
      const anchorKey = cellKey(m.days[0], m.colIds[0]);
      map.set(anchorKey, { type: "anchor", merge: m });
      for (const day of m.days) {
        for (const colId of m.colIds) {
          const k = cellKey(day, colId);
          if (k === anchorKey) continue;
          map.set(k, { type: "skip", merge: m });
        }
      }
    }
    return map;
  }, [merges]);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  function toggleSelectMode() {
    setSelectMode((v) => !v);
    setSelectedKeys(new Set());
  }

  function toggleCellSelect(day, colId) {
    const key = cellKey(day, colId);
    const cov = coverage.get(key);
    // Clicking any part of an existing merge selects/deselects the
    // whole block together, so it can be recognised for "Unmerge".
    const keysToToggle = cov?.merge
      ? cov.merge.days.flatMap((d) => cov.merge.colIds.map((c) => cellKey(d, c)))
      : [key];
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      const allSelected = keysToToggle.every((k) => next.has(k));
      if (allSelected) keysToToggle.forEach((k) => next.delete(k));
      else keysToToggle.forEach((k) => next.add(k));
      return next;
    });
  }

  // Does a set of selected keys form a solid rectangle (contiguous
  // days × contiguous columns, no gaps)? Returns { days, colIds } or null.
  function computeRect(keys) {
    if (keys.length < 2) return null;
    const pairs = keys.map((k) => k.split("__"));
    const dayIdxs = [...new Set(pairs.map((p) => DAYS.indexOf(p[0])))].sort((a, b) => a - b);
    const colIdxs = [
      ...new Set(pairs.map((p) => columns.findIndex((c) => c.id === p[1]))),
    ].sort((a, b) => a - b);
    if (colIdxs.includes(-1)) return null;
    for (let i = 1; i < dayIdxs.length; i++) {
      if (dayIdxs[i] !== dayIdxs[i - 1] + 1) return null;
    }
    for (let i = 1; i < colIdxs.length; i++) {
      if (colIdxs[i] !== colIdxs[i - 1] + 1) return null;
    }
    if (keys.length !== dayIdxs.length * colIdxs.length) return null;
    return {
      days: dayIdxs.map((i) => DAYS[i]),
      colIds: colIdxs.map((i) => columns[i].id),
    };
  }

  const selectedKeysArr = [...selectedKeys];
  const selectionRect = computeRect(selectedKeysArr);
  const matchingMerge = merges.find((m) => {
    if (m.days.length * m.colIds.length !== selectedKeysArr.length) return false;
    return m.days.every((d) => m.colIds.every((c) => selectedKeys.has(cellKey(d, c))));
  });

  function handleMergeAction() {
    if (matchingMerge) {
      saveMerges(merges.filter((m) => m !== matchingMerge));
      setSelectedKeys(new Set());
      return;
    }
    if (!selectionRect) {
      alert("Select a rectangular block of cells (no gaps, no overlap) to merge.");
      return;
    }
    const overlapsExisting = selectedKeysArr.some((k) => coverage.has(k));
    if (overlapsExisting) {
      alert("That selection overlaps an already-merged block — unmerge it first.");
      return;
    }
    const id = `merge_${Date.now()}`;
    saveMerges([...merges, { id, days: selectionRect.days, colIds: selectionRect.colIds }]);
    setSelectedKeys(new Set());
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        background: "#fffde0",
      }}
    >
      {/* Merge-cells toolbar */}
      <div
        style={{
          position: "sticky",
          left: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 8px",
          width: "fit-content",
          minWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={toggleSelectMode}
          title="Select a block of cells to merge into one"
          style={{
            background: selectMode ? "#ffe600" : "#fff8f0",
            border: "1px solid #c8b400",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            color: "#5a4a00",
            padding: "5px 10px",
          }}
        >
          {selectMode ? "Cancel selection" : "Select cells to merge"}
        </button>
        {selectMode && (
          <>
            <span style={{ fontSize: 10, color: "#8a7000" }}>
              {selectedKeys.size === 0
                ? "Click cells to build a block"
                : `${selectedKeys.size} cell${selectedKeys.size > 1 ? "s" : ""} selected`}
            </span>
            <button
              onClick={handleMergeAction}
              disabled={selectedKeys.size < 2}
              style={{
                background: matchingMerge ? "#fff0e0" : "#e6f0ff",
                border: "1px solid " + (matchingMerge ? "#c88a00" : "#1a73e8"),
                borderRadius: 6,
                cursor: selectedKeys.size < 2 ? "default" : "pointer",
                opacity: selectedKeys.size < 2 ? 0.5 : 1,
                fontSize: 11,
                fontWeight: 600,
                color: matchingMerge ? "#8a4a00" : "#1a4fa0",
                padding: "5px 10px",
              }}
            >
              {matchingMerge ? "Unmerge" : "Merge cells"}
            </button>
          </>
        )}
      </div>

      <table
        style={{
          borderCollapse: "collapse",
          tableLayout: "fixed",
          fontSize: 11,
          fontFamily: "Inter,system-ui,sans-serif",
          width: "max-content",
          minWidth: "100%",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "0.5px solid #c8b400",
                padding: "5px 6px",
                position: "sticky",
                top: 0,
                left: 0,
                zIndex: 7,
                textAlign: "left",
                background: "#ffe600",
                fontWeight: 600,
                width: 54,
                minWidth: 54,
              }}
            >
              Day
            </th>
            {columns.map((col, idx) => (
              <ColHeader
                key={col.id}
                col={col}
                width={colWidths[col.id] || 95}
                onDelete={deleteColumn}
                onResize={handleColResize}
                onOpenInsertMenu={() => openInsertMenu(idx)}
                insertState={insertUI?.anchorIndex === idx ? insertUI : null}
                onChooseBefore={() => chooseInsertBefore(idx)}
                onChooseAfter={() => chooseInsertAfter(idx)}
                onConfirmInsert={confirmInsert}
                onCancelInsert={cancelInsert}
              />
            ))}
            <th
              style={{
                border: "0.5px solid #c8b400",
                padding: "4px",
                position: "sticky",
                top: 0,
                zIndex: 5,
                background: "#ffe600",
                width: 40,
                minWidth: 40,
              }}
            >
              <button
                onClick={openInsertAtEnd}
                style={{
                  background: "#ffe600",
                  border: "1px solid #c8b400",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 16,
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  margin: "0 auto",
                }}
              >
                +
              </button>
              {insertUI?.anchorIndex === "end" && insertUI.stage === "form" && (
                <InsertPopover
                  position={insertUI.position}
                  onConfirm={confirmInsert}
                  onCancel={cancelInsert}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day) => {
            const h = rowHeights[day] || 96;
            return (
              <tr key={day} ref={(el) => (rowRefs.current[day] = el)}>
                {/* ── Day label cell — sticky left, position:sticky only ── */}
                <td
                  style={{
                    border: "0.5px solid #c8b400",
                    background: "#ffd600",
                    position: "sticky",
                    left: 0,
                    zIndex: 4,
                    width: 54,
                    minWidth: 54,
                    height: h,
                    verticalAlign: "middle",
                    boxSizing: "border-box",
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        fontWeight: 600,
                        fontSize: 11,
                        color: "#5a4a00",
                        padding: "8px 4px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {day}
                    </div>
                    <RowHandle
                      day={day}
                      onResize={handleRowResize}
                      getHeight={() => rowRefs.current[day]?.offsetHeight || h}
                    />
                  </div>
                </td>

                {columns.map((col) => {
                  const key = cellKey(day, col.id);
                  const cov = coverage.get(key);

                  // Covered by another cell's rowSpan/colSpan — render nothing here.
                  if (cov?.type === "skip") return null;

                  const isAnchor = cov?.type === "anchor";
                  const spanDays = isAnchor ? cov.merge.days.length : 1;
                  const spanCols = isAnchor ? cov.merge.colIds.length : 1;

                  const val =
                    cells[key] !== undefined ? cells[key] : getCellDefault(col.id, day);

                  // Under table-layout:fixed, column widths come from the
                  // header row; a spanned cell just needs colSpan/rowSpan
                  // and can skip explicit width/height so it naturally
                  // covers the underlying columns/rows.
                  const sizeStyle =
                    spanCols === 1 && spanDays === 1
                      ? {
                          width: colWidths[col.id] || 95,
                          minWidth: colWidths[col.id] || 95,
                          maxWidth: colWidths[col.id] || 95,
                          height: h,
                        }
                      : {};

                  return (
                    <td
                      key={col.id}
                      colSpan={spanCols}
                      rowSpan={spanDays}
                      style={{
                        border: "0.5px solid #c8b400",
                        background: col.color,
                        verticalAlign: "top",
                        padding: 0,
                        boxSizing: "border-box",
                        overflow: "hidden",
                        position: "relative",
                        ...sizeStyle,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <CellTitleTime
                          title={col.titles?.[day] ?? ""}
                          time={col.times?.[day] ?? ""}
                          onTitleChange={(v) =>
                            updateColumnDayField(col.id, day, "titles", v)
                          }
                          onTimeChange={(v) =>
                            updateColumnDayField(col.id, day, "times", v)
                          }
                        />
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <DebouncedTextarea
                            value={val}
                            onChange={(v) => onCellChange(day, col.id, v)}
                            style={{
                              width: "100%",
                              height: "100%",
                              padding: "5px 6px",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontSize: 11,
                              lineHeight: 1.55,
                              fontFamily: "inherit",
                              color: "#1a1a1a",
                              resize: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      {selectMode && (
                        <SelectionOverlay
                          selected={selectedKeys.has(key)}
                          onClick={() => toggleCellSelect(day, col.id)}
                        />
                      )}
                    </td>
                  );
                })}

                {/* Last cell — row resize handle */}
                <td
                  style={{
                    border: "0.5px solid #c8b400",
                    background: "#fffde0",
                    width: 40,
                    height: h,
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                >
                  <RowHandle
                    day={day}
                    onResize={handleRowResize}
                    getHeight={() => rowRefs.current[day]?.offsetHeight || h}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default WeeklySchedule;
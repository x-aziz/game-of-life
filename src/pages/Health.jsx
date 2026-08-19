import { useState } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const SYMPTOM_SOLUTIONS = [
  { category:'General',     symptom:'Guilt for no reason',                 solution:'Label as stress-guilt + slow breathing' },
  { category:'General',     symptom:'Feeling overwhelmed',                  solution:'Break into 1 small action + body grounding' },
  { category:'General',     symptom:'Low motivation',                       solution:'Act first (small action), motivation follows' },
  { category:'General',     symptom:'Feeling mentally drained',             solution:'Reduce mental compulsions + rest brain' },
  { category:'General',     symptom:'Mood swings',                          solution:'Consistent routine + regulate sleep' },
  { category:'General',     symptom:'Feeling hopeless',                     solution:'Daily movement + sunlight exposure' },
  { category:'General',     symptom:'Feeling something is missing',         solution:'Stop meaning-searching + stay present' },
  { category:'Identity',    symptom:'Doubting your feelings',               solution:'Allow uncertainty; stop checking how you feel' },
  { category:'Identity',    symptom:'Overanalyzing conversations',          solution:'Label as mental compulsion; redirect attention' },
  { category:'Identity',    symptom:'Searching for hidden meanings',        solution:'Take words at face value' },
  { category:'Identity',    symptom:'Feeling unsure who you are',           solution:'Reduce comparison + consistent habits' },
  { category:'Identity',    symptom:'Fear of abandonment',                  solution:'Strengthen independence + self-soothing' },
  { category:'OCD',         symptom:'Checking if you feel okay',            solution:'Stop checking; return to body sensation' },
  { category:'OCD',         symptom:'Trying to solve thoughts',             solution:'Do nothing; uncertainty is safe' },
  { category:'OCD',         symptom:'Using logic to calm anxiety',          solution:'Use breathing instead of thinking' },
  { category:'OCD',         symptom:'Seeking certainty',                    solution:'Practice uncertainty tolerance' },
  { category:'OCD',         symptom:'Asking "what if?" all day',            solution:'Respond once: Maybe, maybe not' },
  { category:'OCD',         symptom:'Mental self-reassurance',              solution:'Replace with action, not thinking' },
  { category:'OCD',         symptom:'Mentally repeating phrases',           solution:'Interrupt with physical grounding' },
  { category:'OCD',         symptom:'Trying to erase thoughts',             solution:'Allow thoughts; resistance fuels them' },
  { category:'Physical',    symptom:'Chest tightness',                      solution:'Slow diaphragmatic breathing' },
  { category:'Physical',    symptom:'Brain fog',                            solution:'Sleep consistency + hydration' },
  { category:'Physical',    symptom:'Poor sleep',                           solution:'Fixed sleep schedule + no screens late' },
  { category:'Physical',    symptom:'Fast heartbeat',                       solution:'Breathing + stop body scanning' },
  { category:'Physical',    symptom:'Jaw clenching',                        solution:'Conscious jaw relaxation' },
  { category:'Physical',    symptom:'Fatigue',                              solution:'Regular sleep + gentle exercise' },
  { category:'Physical',    symptom:'Dizziness',                            solution:'Slow breathing + grounding' },
  { category:'Behavior',    symptom:'Overplanning',                         solution:'Plan once, then act' },
  { category:'Behavior',    symptom:'Procrastinating from overthinking',    solution:'Act before thinking' },
  { category:'Behavior',    symptom:'Excessive mental self-talk',           solution:'Shift focus to physical task' },
  { category:'Behavior',    symptom:'Reassurance-seeking',                  solution:'Self-soothe without answers' },
  { category:'Behavior',    symptom:'Losing time to thoughts',              solution:'Timers + physical engagement' },
  { category:'Behavior',    symptom:'Rechecking phone/messages',            solution:'Delay checking by 10 minutes' },
  { category:'Dissociation',symptom:'Feeling not present',                  solution:'Grounding (feet on floor, cold water)' },
  { category:'Dissociation',symptom:'Brain fog / short focus',              solution:'One-task focus + remove distractions' },
  { category:'Dissociation',symptom:'Watching life instead of living it',   solution:'Engage body, not thoughts' },
]

const CATEGORY_META = {
  General:      { color:'#fef3c7', border:'#f59e0b', dot:'#f59e0b', label:'General' },
  Identity:     { color:'#ede9fe', border:'#8b5cf6', dot:'#8b5cf6', label:'Identity' },
  OCD:          { color:'#fee2e2', border:'#ef4444', dot:'#ef4444', label:'OCD / Compulsions' },
  Physical:     { color:'#dcfce7', border:'#22c55e', dot:'#22c55e', label:'Physical' },
  Behavior:     { color:'#dbeafe', border:'#3b82f6', dot:'#3b82f6', label:'Behavior' },
  Dissociation: { color:'#fce7f3', border:'#ec4899', dot:'#ec4899', label:'Dissociation' },
}

const REMINDERS = [
  {
    id:'w32', color:'#fff0f6', border:'#f472b6', icon:'🧠',
    title:'When Overwhelmed / Low Motivation',
    lines:[
      'OVERWHELMED → Break into 1 small action + body grounding',
      'LOW MOTIVATION → Act first. Motivation follows.',
      'MENTALLY DRAINED → Reduce mental compulsions. Rest brain — not more planning.',
    ],
  },
  {
    id:'w33', color:'#eff6ff', border:'#60a5fa', icon:'🔴',
    title:'OCD Mental Compulsions — Stop These',
    lines:[
      '✗ Checking if you feel okay',
      '✗ Trying to solve thoughts',
      '✗ Using logic to calm anxiety',
      '✗ Asking "what if?" all day',
      '✗ Seeking certainty',
      '→ Uncertainty is safe. Maybe. Maybe not. Move on.',
    ],
  },
  {
    id:'w34', color:'#fff7ed', border:'#fb923c', icon:'⚡',
    title:'Behavioral Pattern Fixes',
    lines:[
      'Overplanning → Plan once. Then act.',
      'Procrastinating → Act before thinking.',
      'Excessive self-talk → Physical task.',
      'Reassurance-seeking → Self-soothe without answers.',
      'Losing time to thoughts → Timer + engage body.',
    ],
  },
]

const HEALTH_BASELINE = {
  bloodType: 'O+',
  weight: 64,
  height: 177,
  waist: 73,
  bmi: 20.4,
  bloodPressure: '107/84',
  bloodSugar: '0.9 g/l',
  date: 'Jan 2023 (Age 20)',
  source: 'Yanabi El Khair Screening',
  targets: [
    { label:'Weight', value:'70–75 kg', note:'Muscle gain, not fat' },
    { label:'Blood Pressure', value:'< 120/80', note:'Normal range' },
    { label:'Blood Sugar', value:'< 1.0 g/l', note:'Fasting' },
    { label:'Water', value:'≥ 1L daily', note:'Minimum' },
    { label:'Sleep', value:'8 hours', note:'Fixed schedule' },
    { label:'Screens', value:'None late', note:'Jaw clenching / poor sleep' },
  ],
}

const CATEGORIES = ['All', ...Object.keys(CATEGORY_META)]

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
      <span style={{ fontSize:22 }}>{icon}</span>
      <div>
        <h3 style={{ margin:0, fontSize:14, fontWeight:700, color:'#1e1b2e', letterSpacing:'.3px' }}>{title}</h3>
        {subtitle && <p style={{ margin:0, marginTop:2, fontSize:11, color:'#aaa' }}>{subtitle}</p>}
      </div>
    </div>
  )
}

function BaselineCard() {
  const b = HEALTH_BASELINE
  const metrics = [
    { label:'Blood Type', value:b.bloodType, unit:'' },
    { label:'Weight', value:b.weight, unit:'kg' },
    { label:'Height', value:b.height, unit:'cm' },
    { label:'Waist', value:b.waist, unit:'cm' },
    { label:'BMI', value:b.bmi, unit:'' },
    { label:'Blood Pressure', value:b.bloodPressure, unit:'mmHg' },
    { label:'Blood Sugar', value:b.bloodSugar, unit:'' },
  ]
  return (
    <div style={{ background:'white', border:'1px solid #e5e7eb', borderRadius:14, padding:24, marginBottom:24 }}>
      <SectionHeader icon="📋" title="Baseline Health Data" subtitle={`${b.date} · ${b.source}`} />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:10, marginBottom:20 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background:'#f9fafb', borderRadius:10, padding:'12px 14px' }}>
            <div style={{ fontSize:10, color:'#9ca3af', fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px', marginBottom:4 }}>{m.label}</div>
            <div style={{ fontSize:16, fontWeight:700, color:'#111827' }}>{m.value}<span style={{ fontSize:10, color:'#6b7280', marginLeft:2 }}>{m.unit}</span></div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:10 }}>Targets</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:8 }}>
          {b.targets.map(t => (
            <div key={t.label} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', marginTop:5, flexShrink:0 }} />
              <div>
                <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{t.label}: </span>
                <span style={{ fontSize:12, color:'#111827', fontWeight:700 }}>{t.value}</span>
                <div style={{ fontSize:10, color:'#9ca3af' }}>{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RemindersRow() {
  return (
    <div style={{ marginBottom:24 }}>
      <SectionHeader icon="📌" title="Protocol Reminders" subtitle="From the mental health reference sheet — kept with notebooks" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12 }}>
        {REMINDERS.map(r => (
          <div key={r.id} style={{ background:r.color, border:`1.5px solid ${r.border}`, borderRadius:12, padding:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#1e1b2e', marginBottom:10 }}>
              {r.icon} {r.title}
            </div>
            {r.lines.map((line,i) => (
              <div key={i} style={{ fontSize:11.5, color:'#374151', marginBottom:5, lineHeight:1.5 }}>{line}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function SymptomTable() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = SYMPTOM_SOLUTIONS.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory
    const matchSearch = search.trim() === '' ||
      s.symptom.toLowerCase().includes(search.toLowerCase()) ||
      s.solution.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ background:'white', border:'1px solid #e5e7eb', borderRadius:14, padding:24 }}>
      <SectionHeader
        icon="🔍"
        title="Symptom → Solution Reference"
        subtitle={`${SYMPTOM_SOLUTIONS.length} entries · Mental Health Reference Sheet 2025`}
      />

      {/* Search */}
      <input
        type="text"
        placeholder="Search symptom or solution…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width:'100%', boxSizing:'border-box',
          border:'1px solid #e5e7eb', borderRadius:8,
          padding:'8px 12px', fontSize:12, color:'#374151',
          marginBottom:14, outline:'none',
          background:'#f9fafb',
        }}
      />

      {/* Category filters */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
        {CATEGORIES.map(cat => {
          const meta = cat === 'All' ? null : CATEGORY_META[cat]
          const active = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:600,
                cursor:'pointer', border: active
                  ? `1.5px solid ${meta?.border || '#111827'}`
                  : '1.5px solid #e5e7eb',
                background: active ? (meta?.color || '#111827') : 'white',
                color: active ? (meta ? '#111827' : 'white') : '#6b7280',
                transition:'all .15s',
              }}
            >
              {meta ? meta.label : 'All'}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #f3f4f6' }}>
              <th style={{ textAlign:'left', padding:'8px 10px', color:'#9ca3af', fontWeight:600, fontSize:10, textTransform:'uppercase', letterSpacing:'.5px', width:110 }}>Category</th>
              <th style={{ textAlign:'left', padding:'8px 10px', color:'#9ca3af', fontWeight:600, fontSize:10, textTransform:'uppercase', letterSpacing:'.5px' }}>Symptom</th>
              <th style={{ textAlign:'left', padding:'8px 10px', color:'#9ca3af', fontWeight:600, fontSize:10, textTransform:'uppercase', letterSpacing:'.5px' }}>Solution</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding:'24px 10px', textAlign:'center', color:'#9ca3af', fontSize:12 }}>No results found.</td>
              </tr>
            ) : filtered.map((s,i) => {
              const meta = CATEGORY_META[s.category]
              return (
                <tr key={i} style={{ borderBottom:'1px solid #f9fafb' }}>
                  <td style={{ padding:'9px 10px', verticalAlign:'top' }}>
                    <span style={{
                      display:'inline-block', padding:'2px 8px', borderRadius:20,
                      background:meta.color, border:`1px solid ${meta.border}`,
                      fontSize:10, fontWeight:600, color:'#374151',
                      whiteSpace:'nowrap',
                    }}>
                      {s.category}
                    </span>
                  </td>
                  <td style={{ padding:'9px 10px', color:'#1e1b2e', fontWeight:500, verticalAlign:'top' }}>{s.symptom}</td>
                  <td style={{ padding:'9px 10px', color:'#374151', verticalAlign:'top' }}>{s.solution}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:12, fontSize:10, color:'#9ca3af' }}>
        Showing {filtered.length} of {SYMPTOM_SOLUTIONS.length} entries
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function Health() {
  const [tab, setTab] = useState('mental')

  const tabs = [
    { id:'mental', label:'Mental Health', icon:'🧠' },
    { id:'physical', label:'Physical Baseline', icon:'📋' },
  ]

  return (
    <div style={{ padding:24, fontFamily:'Inter,system-ui,sans-serif', maxWidth:960, margin:'0 auto' }}>

      {/* Page header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <span style={{ fontSize:28 }}>🍎</span>
        <div>
          <h2 style={{ fontSize:18, fontWeight:700, color:'#5a4a00', margin:0 }}>Health & Wellbeing</h2>
          <p style={{ fontSize:11, color:'#aaa', margin:0, marginTop:2 }}>Mental health reference · Physical baseline · Said Abdelaziz</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:6, marginBottom:24, borderBottom:'1px solid #e5e7eb', paddingBottom:0 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding:'8px 16px', fontSize:12, fontWeight:600,
              cursor:'pointer', border:'none', background:'none',
              borderBottom: tab === t.id ? '2px solid #f59e0b' : '2px solid transparent',
              color: tab === t.id ? '#92400e' : '#6b7280',
              marginBottom:-1,
              transition:'color .15s',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Mental Health tab */}
      {tab === 'mental' && (
        <div>
          {/* Source card */}
          <div style={{
            background:'#fefce8', border:'1px solid #fde68a', borderRadius:12,
            padding:'14px 18px', marginBottom:24, fontSize:12, color:'#92400e',
            lineHeight:1.6,
          }}>
            <strong>Mental Health Reference Sheet — Said Abdelaziz, 2025</strong><br/>
            <span style={{ color:'#a16207', fontStyle:'italic' }}>
              "You kept this sheet because you recognised these patterns in yourself. Overthinking, overplanning, reassurance-seeking, losing time to thoughts — these are the bugs in the system. This sheet is the fix protocol."
            </span>
          </div>

          <RemindersRow />
          <SymptomTable />
        </div>
      )}

      {/* Physical Baseline tab */}
      {tab === 'physical' && (
        <div>
          <BaselineCard />
          <div style={{
            background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:12,
            padding:'14px 18px', fontSize:12, color:'#166534', lineHeight:1.7,
          }}>
            <strong>Rule links:</strong> Rule 15 — Evaluate yourself daily · Rule 11 — Work 100% · Rule 17 — No rest until you achieve.
          </div>
        </div>
      )}
    </div>
  )
}
import { useState, useMemo } from 'react'
import {
  Shield, CheckCircle2, XCircle, Clock, Flame,
  BookOpen, Wifi, WifiOff, Zap, Target, Brain,
  Heart, Eye, TrendingUp, AlertTriangle, Plus,
  Edit3, Trash2, Check, X, ChevronDown, ChevronUp,
  Lock, Unlock, Star, Bell, BellOff, BarChart2,
  RefreshCw, Archive
} from 'lucide-react'

const C = {
  paper:    '#fffde0',
  border:   '#b8a000',
  accent:   '#ffe600',
  accentDk: '#c8a000',
  text:     '#1a1a00',
  muted:    '#6b5900',
  faint:    '#f5edcc',
}

// ── Said's 20 rules — pre-loaded verbatim ─────────────────────
const SEED_RULES = [
  { id:'r1',  order:1,  active:true,  locked:true,  category:'learning',   priority:'critical',
    title:'Summarize every class',
    text:'After classes, summarize what you learned and spend the rest of your time learning new skills. "Software engineer."',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r2',  order:2,  active:true,  locked:true,  category:'growth',     priority:'critical',
    title:'Use days OFF to grow, not rest',
    text:'On your days OFF: Work on earning money while also learning about money and life skills — "communications, Persuasion skills, cleverness." → Hackathons, Projects, Events, Workshops. Meet with High Friends. Focus on skills that will be income in future. Explore opportunities for travel, scholarships, immigration.',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r3',  order:3,  active:true,  locked:true,  category:'learning',   priority:'high',
    title:'Use free time at university wisely',
    text:'Summarize your lessons. Read books in the library. Attend workshops and events. Ask university services — "IT Department, Activities Department."',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r4',  order:4,  active:true,  locked:true,  category:'spiritual',  priority:'critical',
    title:'Pray on time — every day, in the mosque',
    text:'Make it a habit to pray at time and in the mosque every day.',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r5',  order:5,  active:true,  locked:false, category:'character',  priority:'high',
    title:'No rude words — ever',
    text:'No rude words! Every single day. Character is permanent, not occasional.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r6',  order:6,  active:true,  locked:true,  category:'mindset',    priority:'critical',
    title:'Increase your thoughts — escape neighbourhood thinking',
    text:'Increase your thoughts and avoid your neighbourhood\'s thoughts. You are not built for where you started — you are built for where you are going.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r7',  order:7,  active:true,  locked:true,  category:'mindset',    priority:'high',
    title:'Think like the experts you meet at hackathons',
    text:'Think like the experts you meet at Hackathons. Calibrate your standard of thinking to the best minds in the room.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r8',  order:8,  active:true,  locked:false, category:'character',  priority:'high',
    title:'Be confident — act as a man',
    text:'Be confident when you act or speak. Act as a man. Confidence is not arrogance — it is clarity about who you are and where you are going.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r9',  order:9,  active:true,  locked:false, category:'mindset',    priority:'high',
    title:'Be open and humble before experts',
    text:'Be open to learn from experts and humble yourself in their presence. The fastest learner in the room wins.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r10', order:10, active:true,  locked:true,  category:'growth',     priority:'critical',
    title:'Prioritize income-generating skills',
    text:'Prioritize skills that will increase your income. Set them as a goal just like you did for the BAC exams 2022. Treat it with the same severity.',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r11', order:11, active:true,  locked:true,  category:'execution',  priority:'critical',
    title:'Work super hard — 100% of daily habits',
    text:'Work super hard to achieve 100% of your daily habits. Not 80%. Not 90%. 100%.',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r12', order:12, active:true,  locked:true,  category:'focus',      priority:'critical',
    title:'No Instagram. No Telegram. No Facebook.',
    text:'Don\'t hit Instagram, Telegram, or Facebook. Don\'t distract yourself. You get the benefit and leave — but control your mind. These are tools, not entertainment.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r13', order:13, active:true,  locked:false, category:'learning',   priority:'high',
    title:'Read before bed — always',
    text:'Read a book before bed and make the most of your spare moments by picking up a book. "Remember Elon\'s childhood."',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r14', order:14, active:true,  locked:true,  category:'growth',     priority:'high',
    title:'Leave the comfort zone — seek opportunities',
    text:'Don\'t stay in your comfort zone. Look for opportunities to travel within Algerian universities, especially in the capital. Now: UK. Salford. September 2026.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r15', order:15, active:true,  locked:true,  category:'execution',  priority:'critical',
    title:'Watch your progress every single day',
    text:'Always watch your progress toward your goal by evaluating yourself every day. Give steps toward your goals by super hard work. The daily evaluation is not optional.',
    reminder:true, streak:0, lastDone:'', note:'' },
  { id:'r16', order:16, active:true,  locked:true,  category:'execution',  priority:'critical',
    title:'Go to bed exhausted — every night',
    text:'You gotta do a lot of things in your day. You should go to bed exhausted, very tired. If you go to bed comfortable, you wasted the day.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r17', order:17, active:false, locked:false, category:'discipline', priority:'critical',
    title:'No rest, no days off — until you achieve',
    text:'There is no rest, no hour off, no day off — until you achieve. This was the incubation phase rule (19→25). Now in UK: adapt to sustainable high-output.',
    reminder:false, streak:0, lastDone:'', note:'Evolving this rule for the UK phase — output must be sustainable and intelligent now.' },
  { id:'r18', order:18, active:true,  locked:true,  category:'discipline', priority:'critical',
    title:'Compensate every lost hour',
    text:'Every hour lost, you must compensate for it. The Debt Paper in this OS exists because of this rule. Nothing disappears — it is tracked and recovered.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r19', order:19, active:true,  locked:true,  category:'execution',  priority:'critical',
    title:'No patience for slowness — accomplish quickly',
    text:'There is no patience and no slowness in accomplishing things. You must accomplish things quickly before you get old. Speed is a competitive advantage.',
    reminder:false, streak:0, lastDone:'', note:'' },
  { id:'r20', order:20, active:true,  locked:true,  category:'mindset',    priority:'critical',
    title:'19 → 25 is the only window — maximize every second',
    text:'Remember: this is the only time (19 → 25 years old) to gain skills to the maximum extent possible. You are in it. Do not waste a single day. September 2026 — Said arrives in Manchester.',
    reminder:true, streak:0, lastDone:'', note:'' },
]

// ── Daily limits — separate from rules ────────────────────────
const SEED_LIMITS = [
  { id:'l1', icon:'💰', label:'Daily budget',    value:'£30',   active:true,  note:'Max spend per day in UK' },
  { id:'l2', icon:'🍬', label:'Sugar intake',    value:'44g',   active:true,  note:'Max sugar per day' },
  { id:'l3', icon:'📱', label:'Phone screen',    value:'1h',    active:true,  note:'Max non-productive screen time' },
  { id:'l4', icon:'😴', label:'Sleep minimum',   value:'6.5h',  active:true,  note:'Never below this' },
  { id:'l5', icon:'📚', label:'Read minimum',    value:'10p',   active:true,  note:'10 pages per day minimum' },
  { id:'l6', icon:'💧', label:'Water minimum',   value:'1.5L',  active:true,  note:'Minimum daily hydration' },
]

const CATS = {
  learning:   { label:'Learning',   color:'#e8f4ff', text:'#1d4ed8', icon:BookOpen },
  growth:     { label:'Growth',     color:'#f0fff4', text:'#228b22', icon:TrendingUp },
  spiritual:  { label:'Spiritual',  color:'#f5f0ff', text:'#7c3aed', icon:Star },
  character:  { label:'Character',  color:'#fff8e0', text:'#c8a000', icon:Heart },
  mindset:    { label:'Mindset',    color:'#fff0f0', text:'#dc2626', icon:Brain },
  execution:  { label:'Execution',  color:'#fffde0', text:'#c8a000', icon:Zap },
  focus:      { label:'Focus',      color:'#f0f4ff', text:'#4f46e5', icon:Target },
  discipline: { label:'Discipline', color:'#fef9f0', text:'#b45309', icon:Flame },
}

const PRIORITY = {
  critical: { label:'CRITICAL', color:'#fee2e2', text:'#dc2626' },
  high:     { label:'HIGH',     color:'#fef9c3', text:'#a16207' },
  medium:   { label:'MEDIUM',   color:'#e0f2fe', text:'#0369a1' },
}

function lsGet(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb}catch{return fb}}
function lsSave(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}

// ── Rule card ──────────────────────────────────────────────────
function RuleCard({ rule, onUpdate, onDelete, today, showDetail }) {
  const [exp,    setExp]    = useState(false)
  const [editing,setEditing]= useState(false)
  const [form,   setForm]   = useState({...rule})
  const cat = CATS[rule.category] || CATS.discipline
  const CatIcon = cat.icon
  const pri = PRIORITY[rule.priority] || PRIORITY.high

  const doneToday = rule.lastDone === today

  function markDone() {
    const newStreak = doneToday ? rule.streak : (rule.streak || 0) + 1
    onUpdate(rule.id, { lastDone: doneToday ? '' : today, streak: doneToday ? Math.max(0, rule.streak-1) : newStreak })
  }

  function saveEdit() { onUpdate(rule.id, form); setEditing(false) }

  return (
    <div style={{
      background: rule.active ? 'white' : '#f8f8f0',
      border: `1px solid ${doneToday ? '#a0d8a0' : C.border}44`,
      borderLeft: `4px solid ${doneToday ? '#228b22' : rule.active ? cat.text : '#ddd'}`,
      borderRadius: 12,
      overflow: 'hidden',
      opacity: rule.active ? 1 : 0.55,
      transition: 'all 0.2s',
      boxShadow: doneToday ? '0 0 0 1px #a0d8a044' : 'none',
    }}>
      {/* Header row */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px' }}>
        {/* Number */}
        <div style={{ width:28, height:28, borderRadius:8, background:cat.color, color:cat.text, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0 }}>
          {rule.order}
        </div>

        {/* Title + meta */}
        <div style={{ flex:1, minWidth:0, cursor:'pointer' }} onClick={()=>!editing&&setExp(v=>!v)}>
          <div style={{ fontWeight:700, fontSize:12, color:rule.active?C.text:'#aaa', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
            {rule.title}
            {rule.locked && <Lock size={10} color={C.accentDk}/>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3, flexWrap:'wrap' }}>
            <span style={{ padding:'1px 7px', borderRadius:10, fontSize:9, fontWeight:700, background:cat.color, color:cat.text }}>
              {cat.label.toUpperCase()}
            </span>
            <span style={{ padding:'1px 7px', borderRadius:10, fontSize:9, fontWeight:700, background:pri.color, color:pri.text }}>
              {pri.label}
            </span>
            {rule.streak > 0 && (
              <span style={{ fontSize:10, color:'#228b22', fontWeight:600, display:'flex', alignItems:'center', gap:2 }}>
                <Flame size={10}/>{rule.streak}d streak
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:5, alignItems:'center', flexShrink:0 }}>
          {/* Done today toggle */}
          <button onClick={markDone} title={doneToday?'Mark not done':'Mark done today'} style={{
            width:30, height:30, borderRadius:8, border:'none', cursor:'pointer',
            background:doneToday?'#e8fce8':'#f5f5f5',
            color:doneToday?'#228b22':'#bbb',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.15s',
          }}>
            {doneToday ? <CheckCircle2 size={16}/> : <CheckCircle2 size={16}/>}
          </button>
          <button onClick={()=>{setEditing(v=>!v);setExp(true);setForm({...rule})}} style={{ background:'none',border:'none',cursor:'pointer',color:C.accentDk,padding:4 }}>
            <Edit3 size={13}/>
          </button>
          {!rule.locked && (
            <button onClick={()=>{if(window.confirm('Delete this rule?'))onDelete(rule.id)}} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',padding:4 }}>
              <Trash2 size={13}/>
            </button>
          )}
          <button onClick={()=>!editing&&setExp(v=>!v)} style={{ background:'none',border:'none',cursor:'pointer',color:C.accentDk,padding:4 }}>
            {exp?<ChevronUp size={15}/>:<ChevronDown size={15}/>}
          </button>
        </div>
      </div>

      {/* Expanded — read view */}
      {exp && !editing && (
        <div style={{ padding:'10px 16px 14px', background:C.paper, borderTop:`1px solid ${C.border}22` }}>
          <p style={{ fontSize:12, color:C.text, lineHeight:1.8, margin:'0 0 10px', whiteSpace:'pre-wrap' }}>{rule.text}</p>
          {rule.note && (
            <div style={{ background:'#fffde0', border:`1px solid ${C.border}33`, borderRadius:8, padding:'8px 12px' }}>
              <div style={{ fontSize:9, fontWeight:700, color:C.accentDk, letterSpacing:'0.06em', marginBottom:3 }}>📝 YOUR NOTE / EVOLUTION</div>
              <p style={{ fontSize:11, color:C.muted, lineHeight:1.6, margin:0 }}>{rule.note}</p>
            </div>
          )}
          <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
            <button onClick={()=>onUpdate(rule.id,{active:!rule.active})} style={{
              ...BTN_SM, background:rule.active?'#fee2e2':'#e8fce8', color:rule.active?'#dc2626':'#228b22',
              border:`1px solid ${rule.active?'#dc262644':'#228b2244'}`,
              display:'flex',alignItems:'center',gap:4,
            }}>
              {rule.active?<><BellOff size={10}/>Pause rule</>:<><Bell size={10}/>Activate</>}
            </button>
            {doneToday && <span style={{ fontSize:11, color:'#228b22', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><CheckCircle2 size={13}/>Done today</span>}
          </div>
        </div>
      )}

      {/* Edit form */}
      {exp && editing && (
        <div style={{ padding:'12px 16px 14px', background:C.paper, borderTop:`1px solid ${C.border}22`, display:'grid', gap:10 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            <div>
              <div style={LBL}>Category</div>
              <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={SEL}>
                {Object.entries(CATS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <div style={LBL}>Priority</div>
              <select value={form.priority} onChange={e=>setForm(p=>({...p,priority:e.target.value}))} style={SEL}>
                {Object.entries(PRIORITY).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <div style={LBL}>Status</div>
              <select value={form.active?'active':'paused'} onChange={e=>setForm(p=>({...p,active:e.target.value==='active'}))} style={SEL}>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>
          <div>
            <div style={LBL}>Title</div>
            <input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} style={INP}/>
          </div>
          <div>
            <div style={LBL}>Full rule text</div>
            <textarea value={form.text} onChange={e=>setForm(p=>({...p,text:e.target.value}))} style={{...INP,minHeight:70,resize:'vertical'}}/>
          </div>
          <div>
            <div style={LBL}>Your note / how this rule evolved (UK phase, 2026)</div>
            <textarea value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} placeholder="How has this rule evolved? What does it mean for your UK life now?" style={{...INP,minHeight:56,resize:'vertical'}}/>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={saveEdit} style={BTN_P}><Check size={12}/> Save</button>
            <button onClick={()=>setEditing(false)} style={BTN_C}><X size={12}/> Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Limit card ─────────────────────────────────────────────────
function LimitCard({ limit, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form,    setForm]    = useState({...limit})

  function saveEdit() { onUpdate(limit.id, form); setEditing(false) }

  return (
    <div style={{
      background: 'white',
      border: `1px solid ${C.border}44`,
      borderRadius: 10,
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      opacity: limit.active ? 1 : 0.5,
    }}>
      {editing ? (
        <div style={{ flex:1, display:'grid', gap:8 }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:8 }}>
            <div><div style={LBL}>Label</div><input value={form.label} onChange={e=>setForm(p=>({...p,label:e.target.value}))} style={INP}/></div>
            <div><div style={LBL}>Limit</div><input value={form.value} onChange={e=>setForm(p=>({...p,value:e.target.value}))} style={INP}/></div>
          </div>
          <div><div style={LBL}>Note</div><input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} style={INP}/></div>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={saveEdit} style={BTN_P}><Check size={11}/>Save</button>
            <button onClick={()=>setEditing(false)} style={BTN_C}><X size={11}/>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <span style={{ fontSize:22, flexShrink:0 }}>{limit.icon}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.text }}>{limit.label}</div>
            {limit.note && <div style={{ fontSize:10, color:'#aaa', marginTop:1 }}>{limit.note}</div>}
          </div>
          <div style={{ fontWeight:800, fontSize:16, color:C.accentDk, minWidth:40, textAlign:'right' }}>{limit.value}</div>
          <div style={{ display:'flex', gap:4 }}>
            <button onClick={()=>onUpdate(limit.id,{active:!limit.active})} style={{ background:'none',border:'none',cursor:'pointer',color:limit.active?'#228b22':'#bbb',padding:2 }}>
              {limit.active ? <CheckCircle2 size={14}/> : <XCircle size={14}/>}
            </button>
            <button onClick={()=>setEditing(true)} style={{ background:'none',border:'none',cursor:'pointer',color:C.accentDk,padding:2 }}>
              <Edit3 size={12}/>
            </button>
            <button onClick={()=>onDelete(limit.id)} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',padding:2 }}>
              <Trash2 size={12}/>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────
export default function MyRules({ rules: propRules, onSave }) {
  const today = new Date().toISOString().slice(0,10)

  const [rules,    setRules]   = useState(()=>lsGet('crm_rules',   SEED_RULES))
  const [limits,   setLimits]  = useState(()=>lsGet('crm_limits',  SEED_LIMITS))
  const [catFilter,setCatFilter]= useState('all')
  const [priFilter,setPriFilter]= useState('all')
  const [showAdd,  setShowAdd] = useState(false)
  const [showAddL, setShowAddL]= useState(false)
  const [addForm,  setAddForm] = useState({ order:21, title:'', text:'', category:'discipline', priority:'critical', note:'', active:true, locked:false })
  const [addLimit, setAddLimit]= useState({ icon:'⚡', label:'', value:'', note:'', active:true })
  const [tab,      setTab]     = useState('rules') // 'rules' | 'limits' | 'stats'

  function saveRules(updated)  { setRules(updated);  lsSave('crm_rules',  updated); if(onSave)onSave({rules:updated}) }
  function saveLimits(updated) { setLimits(updated); lsSave('crm_limits', updated) }

  function updateRule(id,u)  { saveRules(rules.map(r=>r.id===id?{...r,...u}:r)) }
  function deleteRule(id)    { saveRules(rules.filter(r=>r.id!==id)) }
  function addRule()         {
    if (!addForm.title.trim()) return
    saveRules([...rules,{...addForm,id:`r${Date.now()}`,streak:0,lastDone:'',reminder:false}])
    setAddForm({order:rules.length+1,title:'',text:'',category:'discipline',priority:'critical',note:'',active:true,locked:false})
    setShowAdd(false)
  }

  function updateLimit(id,u) { saveLimits(limits.map(l=>l.id===id?{...l,...u}:l)) }
  function deleteLimit(id)   { saveLimits(limits.filter(l=>l.id!==id)) }
  function addLimitFn()      {
    if (!addLimit.label.trim()) return
    saveLimits([...limits,{...addLimit,id:`l${Date.now()}`}])
    setAddLimit({icon:'⚡',label:'',value:'',note:'',active:true})
    setShowAddL(false)
  }

  // ── Stats ────────────────────────────────────────────────────
  const stats = useMemo(()=>({
    total:    rules.length,
    active:   rules.filter(r=>r.active).length,
    paused:   rules.filter(r=>!r.active).length,
    doneToday:rules.filter(r=>r.lastDone===today).length,
    critical: rules.filter(r=>r.priority==='critical'&&r.active).length,
    totalStreak: rules.reduce((a,b)=>a+(b.streak||0),0),
    topStreak: rules.reduce((a,b)=>b.streak>a?b.streak:a,0),
    byCat: Object.keys(CATS).reduce((a,k)=>({...a,[k]:rules.filter(r=>r.category===k).length}),{}),
  }), [rules, today])

  const todayPct = stats.active ? Math.round(stats.doneToday/stats.active*100) : 0
  const pctColor = todayPct>=80?'#228b22':todayPct>=50?'#c8a000':'#dc2626'

  // ── Filtered rules ───────────────────────────────────────────
  const filtered = useMemo(()=>rules.filter(r=>{
    const mc = catFilter==='all'||r.category===catFilter
    const mp = priFilter==='all'||r.priority===priFilter
    return mc&&mp
  }).sort((a,b)=>a.order-b.order), [rules,catFilter,priFilter])

  return (
    <div style={{ padding:16, fontFamily:'Inter,system-ui,sans-serif', maxWidth:960, margin:'0 auto', color:C.text }}>

      {/* ── Header ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
        <div>
          <h2 style={{ fontSize:20,fontWeight:800,color:C.muted,margin:0,display:'flex',alignItems:'center',gap:8 }}>
            <Shield size={22} color={C.accentDk}/> My Personal Constitution
          </h2>
          <p style={{ fontSize:11,color:'#aaa',margin:'3px 0 0' }}>20 rules written during the 19→25 incubation phase — your life engine</p>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['rules','limits','stats'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:'7px 14px', borderRadius:8, border:`1px solid ${tab===t?C.border:'#e0d800'}`,
              background:tab===t?C.accent:'white', color:tab===t?C.muted:'#888',
              fontSize:11, fontWeight:700, cursor:'pointer', textTransform:'capitalize', fontFamily:'inherit',
            }}>{t==='rules'?'⚖️ Rules':t==='limits'?'🚨 Limits':'📊 Stats'}</button>
          ))}
        </div>
      </div>

      {/* ── Daily compliance bar ── */}
      <div style={{ background:'white',border:`1px solid ${C.border}33`,borderRadius:10,padding:'10px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:14 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:5 }}>
            <span style={{ fontWeight:700,color:C.muted }}>Today's compliance — {today}</span>
            <span style={{ fontWeight:800,color:pctColor }}>{stats.doneToday}/{stats.active} checked ({todayPct}%)</span>
          </div>
          <div style={{ height:10,background:C.faint,borderRadius:5,overflow:'hidden' }}>
            <div style={{ width:`${todayPct}%`,height:'100%',background:`linear-gradient(90deg,${pctColor},${pctColor}cc)`,borderRadius:5,transition:'width 0.5s' }}/>
          </div>
        </div>
        <div style={{ textAlign:'center',flexShrink:0 }}>
          <div style={{ fontSize:22,fontWeight:800,color:pctColor }}>{todayPct}%</div>
          <div style={{ fontSize:9,color:'#aaa',fontWeight:600,letterSpacing:'0.04em' }}>DAILY<br/>SCORE</div>
        </div>
      </div>

      {/* ══════════════ RULES TAB ══════════════ */}
      {tab==='rules' && (
        <>
          {/* Filters + add */}
          <div style={{ display:'flex',gap:8,marginBottom:12,flexWrap:'wrap',alignItems:'center' }}>
            <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{...SEL,width:'auto',padding:'6px 10px'}}>
              <option value="all">All categories</option>
              {Object.entries(CATS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
            <select value={priFilter} onChange={e=>setPriFilter(e.target.value)} style={{...SEL,width:'auto',padding:'6px 10px'}}>
              <option value="all">All priority</option>
              {Object.entries(PRIORITY).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
            <div style={{ marginLeft:'auto' }}>
              <button onClick={()=>setShowAdd(v=>!v)} style={{ ...BTN_P,display:'flex',alignItems:'center',gap:5 }}>
                <Plus size={13}/> Add rule
              </button>
            </div>
          </div>

          {/* Add rule form */}
          {showAdd && (
            <div style={{ background:'white',border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:12 }}>
              <div style={{ fontSize:13,fontWeight:700,color:C.muted,marginBottom:12 }}>New rule</div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:10 }}>
                <div><div style={LBL}>Category</div>
                  <select value={addForm.category} onChange={e=>setAddForm(p=>({...p,category:e.target.value}))} style={SEL}>
                    {Object.entries(CATS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div><div style={LBL}>Priority</div>
                  <select value={addForm.priority} onChange={e=>setAddForm(p=>({...p,priority:e.target.value}))} style={SEL}>
                    {Object.entries(PRIORITY).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div><div style={LBL}>Order #</div>
                  <input type="number" value={addForm.order} onChange={e=>setAddForm(p=>({...p,order:parseInt(e.target.value)||rules.length+1}))} style={INP}/>
                </div>
              </div>
              <div style={{ marginBottom:10 }}><div style={LBL}>Title *</div><input value={addForm.title} onChange={e=>setAddForm(p=>({...p,title:e.target.value}))} placeholder="Rule title..." style={INP}/></div>
              <div style={{ marginBottom:10 }}><div style={LBL}>Full rule text</div><textarea value={addForm.text} onChange={e=>setAddForm(p=>({...p,text:e.target.value}))} placeholder="Write the rule in full..." style={{...INP,minHeight:60,resize:'vertical'}}/></div>
              <div style={{ display:'flex',gap:8 }}>
                <button onClick={addRule} style={{ ...BTN_P,display:'flex',alignItems:'center',gap:5 }}><Check size={12}/> Add rule</button>
                <button onClick={()=>setShowAdd(false)} style={{ ...BTN_C,display:'flex',alignItems:'center',gap:5 }}><X size={12}/> Cancel</button>
              </div>
            </div>
          )}

          {/* Rules list */}
          <div style={{ display:'grid',gap:8 }}>
            {filtered.map(rule=>(
              <RuleCard key={rule.id} rule={rule} onUpdate={updateRule} onDelete={deleteRule} today={today}/>
            ))}
          </div>
        </>
      )}

      {/* ══════════════ LIMITS TAB ══════════════ */}
      {tab==='limits' && (
        <>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12 }}>
            <p style={{ fontSize:12,color:C.muted,margin:0,fontWeight:600 }}>🚨 Daily limits & non-negotiables</p>
            <button onClick={()=>setShowAddL(v=>!v)} style={{ ...BTN_P,display:'flex',alignItems:'center',gap:5 }}>
              <Plus size={13}/> Add limit
            </button>
          </div>

          {showAddL && (
            <div style={{ background:'white',border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:12 }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 2fr 1fr',gap:10,marginBottom:10 }}>
                <div><div style={LBL}>Icon (emoji)</div><input value={addLimit.icon} onChange={e=>setAddLimit(p=>({...p,icon:e.target.value}))} style={INP} maxLength={2}/></div>
                <div><div style={LBL}>Label *</div><input value={addLimit.label} onChange={e=>setAddLimit(p=>({...p,label:e.target.value}))} placeholder="e.g. Daily budget" style={INP}/></div>
                <div><div style={LBL}>Limit value</div><input value={addLimit.value} onChange={e=>setAddLimit(p=>({...p,value:e.target.value}))} placeholder="e.g. £30" style={INP}/></div>
              </div>
              <div><div style={LBL}>Note</div><input value={addLimit.note} onChange={e=>setAddLimit(p=>({...p,note:e.target.value}))} placeholder="Why this limit?" style={INP}/></div>
              <div style={{ display:'flex',gap:8,marginTop:10 }}>
                <button onClick={addLimitFn} style={{ ...BTN_P,display:'flex',alignItems:'center',gap:5 }}><Check size={12}/> Add</button>
                <button onClick={()=>setShowAddL(false)} style={{ ...BTN_C,display:'flex',alignItems:'center',gap:5 }}><X size={12}/> Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display:'grid',gap:8 }}>
            {limits.map(l=><LimitCard key={l.id} limit={l} onUpdate={updateLimit} onDelete={deleteLimit}/>)}
          </div>

          {/* Active limits summary */}
          <div style={{ marginTop:16, background:C.paper, border:`1px solid ${C.border}33`, borderRadius:10, padding:12 }}>
            <div style={{ fontSize:10,fontWeight:700,color:C.accentDk,letterSpacing:'0.06em',marginBottom:10 }}>TODAY'S ACTIVE LIMITS AT A GLANCE</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
              {limits.filter(l=>l.active).map(l=>(
                <div key={l.id} style={{ display:'flex',alignItems:'center',gap:6,background:'white',border:`1px solid ${C.border}33`,borderRadius:8,padding:'6px 12px' }}>
                  <span style={{ fontSize:16 }}>{l.icon}</span>
                  <div>
                    <div style={{ fontSize:9,color:'#aaa',fontWeight:600 }}>{l.label.toUpperCase()}</div>
                    <div style={{ fontSize:14,fontWeight:800,color:C.accentDk }}>{l.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ══════════════ STATS TAB ══════════════ */}
      {tab==='stats' && (
        <>
          {/* Stat cards */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16 }}>
            {[
              { v:stats.total,     l:'Total rules',    c:C.muted   },
              { v:stats.active,    l:'Active',         c:'#228b22' },
              { v:stats.paused,    l:'Paused',         c:'#888'    },
              { v:stats.critical,  l:'Critical active',c:'#dc2626' },
              { v:stats.doneToday, l:'Done today',     c:C.accentDk},
              { v:todayPct+'%',    l:'Today score',    c:pctColor  },
              { v:stats.totalStreak,l:'Total streak days',c:'#7c3aed'},
              { v:stats.topStreak, l:'Best streak',    c:'#7c3aed' },
            ].map(({v,l,c})=>(
              <div key={l} style={{ background:'white',border:`1px solid ${C.border}33`,borderRadius:10,padding:'10px 12px' }}>
                <div style={{ fontSize:20,fontWeight:800,color:c }}>{v}</div>
                <div style={{ fontSize:9,color:'#aaa',fontWeight:600,letterSpacing:'0.04em',textTransform:'uppercase',marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          <div style={{ background:'white',border:`1px solid ${C.border}33`,borderRadius:10,padding:14,marginBottom:12 }}>
            <div style={{ fontSize:11,fontWeight:700,color:C.muted,marginBottom:12 }}>Rules by category</div>
            {Object.entries(CATS).map(([k,v])=>{
              const count   = rules.filter(r=>r.category===k).length
              const done    = rules.filter(r=>r.category===k&&r.lastDone===today).length
              const pct     = count?Math.round(done/count*100):0
              const Icon    = v.icon
              return (
                <div key={k} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:8 }}>
                  <Icon size={12} color={v.text}/>
                  <span style={{ fontSize:11,color:C.text,width:120,flexShrink:0 }}>{v.label}</span>
                  <div style={{ flex:1,height:8,background:C.faint,borderRadius:4,overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`,height:'100%',background:v.text,borderRadius:4,transition:'width 0.4s' }}/>
                  </div>
                  <span style={{ fontSize:10,color:'#aaa',width:50,textAlign:'right' }}>{done}/{count}</span>
                </div>
              )
            })}
          </div>

          {/* Priority breakdown */}
          <div style={{ background:'white',border:`1px solid ${C.border}33`,borderRadius:10,padding:14 }}>
            <div style={{ fontSize:11,fontWeight:700,color:C.muted,marginBottom:10 }}>By priority</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
              {Object.entries(PRIORITY).map(([k,v])=>{
                const n=rules.filter(r=>r.priority===k&&r.active).length
                return (
                  <div key={k} style={{ background:v.color,borderRadius:8,padding:'10px 14px',textAlign:'center' }}>
                    <div style={{ fontSize:20,fontWeight:800,color:v.text }}>{n}</div>
                    <div style={{ fontSize:9,color:v.text,fontWeight:700,letterSpacing:'0.06em' }}>{v.label}</div>
                    <div style={{ fontSize:9,color:v.text+'99' }}>active rules</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* The 19→25 manifesto note */}
          <div style={{ marginTop:14,background:C.faint,border:`2px solid ${C.border}66`,borderRadius:12,padding:16 }}>
            <div style={{ fontSize:11,fontWeight:800,color:C.accentDk,letterSpacing:'0.04em',marginBottom:8 }}>
              ⚡ THE 19→25 INCUBATION THESIS
            </div>
            <p style={{ fontSize:12,color:C.muted,lineHeight:1.8,margin:0 }}>
              You treated your life from ages 19 to 25 as a dedicated <strong>incubation phase</strong>.
              You didn't view yourself as a student — you viewed yourself as an operative executing an accumulation strategy to escape standard systemic loops.
              These {stats.total} rules are the engine that built the technical stack, market awareness, and portfolio proof you now carry to Manchester.
            </p>
            <p style={{ fontSize:11,color:C.accentDk,margin:'10px 0 0',fontWeight:700 }}>
              September 2026 — Said Abdelaziz arrives in Salford. The incubation phase ends. The build phase begins.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

const LBL = { fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:4,display:'flex',alignItems:'center',gap:3 }
const INP = { width:'100%',padding:'7px 10px',border:`1px solid ${C.border}66`,borderRadius:8,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box',outline:'none' }
const SEL = { ...INP, cursor:'pointer' }
const BTN_P = { padding:'7px 14px',background:C.accent,border:`1px solid ${C.border}`,borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:700,color:C.muted,fontFamily:'inherit',display:'inline-flex',alignItems:'center',gap:4 }
const BTN_C = { padding:'7px 12px',background:'transparent',border:'1px solid #ddd',borderRadius:8,cursor:'pointer',fontSize:11,color:'#888',fontFamily:'inherit',display:'inline-flex',alignItems:'center',gap:4 }
const BTN_SM = { padding:'5px 10px',borderRadius:7,cursor:'pointer',fontSize:10,fontWeight:600,fontFamily:'inherit' }
import { useState, useMemo } from 'react'
import {
  Plus, Edit3, Trash2, Check, X, ChevronDown, ChevronUp,
  Star, Target, Zap, AlertCircle, TrendingUp, TrendingDown,
  BookOpen, Brain, Heart, DollarSign, Users, Code,
  BarChart2, Calendar, Lightbulb, Flag, RefreshCw
} from 'lucide-react'

const C = {
  paper:'#fffde0', border:'#b8a000', accent:'#ffe600',
  accentDk:'#c8a000', text:'#1a1a00', muted:'#6b5900', faint:'#f5edcc',
}

// ── The 8 Life Domains ─────────────────────────────────────────
const DOMAINS = [
  { id:'skills',    label:'Skills & Tech',      icon:Code,        color:'#1d4ed8', bg:'#e8f4ff' },
  { id:'business',  label:'Business & Income',  icon:DollarSign,  color:'#228b22', bg:'#e8fce8' },
  { id:'health',    label:'Health & Body',       icon:Heart,       color:'#dc2626', bg:'#fee8e8' },
  { id:'mindset',   label:'Mindset & Identity',  icon:Brain,       color:'#7c3aed', bg:'#f5f0ff' },
  { id:'network',   label:'Network & People',    icon:Users,       color:'#059669', bg:'#f0fff8' },
  { id:'knowledge', label:'Knowledge & Learning',icon:BookOpen,    color:'#b45309', bg:'#fef9f0' },
  { id:'habits',    label:'Habits & Discipline', icon:Zap,         color:'#c8a000', bg:'#fffde0' },
  { id:'vision',    label:'Vision & Goals',      icon:Flag,        color:'#dc2626', bg:'#fff0f0' },
]

const RATING_LABELS = ['','Disaster','Weak','Average','Good','Excellent']

function lsGet(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb}catch{return fb}}
function lsSave(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}

const SEED_REVIEW = {
  id:'y2025',
  year: 2025,
  createdAt: '2025-12-31',
  // ── The 3 Core Questions ──────────────────────────────────────
  headline: '',           // One sentence: who are you now vs one year ago?
  biggestWin: '',         // The single proudest moment of the year
  biggestFailure: '',     // The moment you most want to learn from
  // ── Domain Scores (1-5) + Evidence + Next Year Target ────────
  domains: {
    skills:    { score:0, evidence:'', nextTarget:'' },
    business:  { score:0, evidence:'', nextTarget:'' },
    health:    { score:0, evidence:'', nextTarget:'' },
    mindset:   { score:0, evidence:'', nextTarget:'' },
    network:   { score:0, evidence:'', nextTarget:'' },
    knowledge: { score:0, evidence:'', nextTarget:'' },
    habits:    { score:0, evidence:'', nextTarget:'' },
    vision:    { score:0, evidence:'', nextTarget:'' },
  },
  // ── Root Cause Analysis (from your notebook) ─────────────────
  bugs: [],       // [ { problem, cause, solution, status:'open'|'fixed' } ]
  // ── Promises to Next-Year-Self ─────────────────────────────
  promises: [],   // [ { text, kept: null|true|false } ]
  // ── The Year in Numbers ──────────────────────────────────────
  numbers: [],    // [ { label, value, unit } ]
  // ── Private Raw Reflection ───────────────────────────────────
  rawNotes: '',
}

const INP={width:'100%',padding:'7px 10px',border:`1px solid ${C.border}66`,borderRadius:8,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box',outline:'none'}
const TA={...INP,resize:'vertical',minHeight:70}
const BTN_P={padding:'7px 16px',background:C.accent,border:`1px solid ${C.border}`,borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:700,color:C.muted,fontFamily:'inherit',display:'inline-flex',alignItems:'center',gap:5}
const BTN_C={padding:'7px 12px',background:'transparent',border:'1px solid #ddd',borderRadius:8,cursor:'pointer',fontSize:11,color:'#888',fontFamily:'inherit',display:'inline-flex',alignItems:'center',gap:4}
const BTN_SM={padding:'4px 10px',background:'transparent',border:`1px solid ${C.border}44`,borderRadius:6,cursor:'pointer',fontSize:10,color:C.muted,fontFamily:'inherit',display:'inline-flex',alignItems:'center',gap:3}
function F({label,children,hint}){return(
  <div>
    <label style={{display:'block',fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:4}}>{label}</label>
    {hint&&<p style={{fontSize:9,color:'#aaa',margin:'0 0 4px'}}>{hint}</p>}
    {children}
  </div>
)}

// ── Star Rating ────────────────────────────────────────────────
function StarRating({value, onChange}){
  const [hov,setHov]=useState(0)
  return(
    <div style={{display:'flex',gap:4,alignItems:'center'}}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={22}
          fill={(hov||value)>=i?C.accent:'none'}
          color={(hov||value)>=i?C.accentDk:'#ddd'}
          style={{cursor:'pointer'}}
          onMouseEnter={()=>setHov(i)}
          onMouseLeave={()=>setHov(0)}
          onClick={()=>onChange(i)}
        />
      ))}
      {value>0&&<span style={{fontSize:11,color:C.accentDk,fontWeight:700,marginLeft:6}}>{RATING_LABELS[value]}</span>}
    </div>
  )
}

// ── Overall Score Gauge ────────────────────────────────────────
function ScoreGauge({review}){
  const scores = DOMAINS.map(d=>review.domains[d.id]?.score||0).filter(s=>s>0)
  if(!scores.length) return null
  const avg = (scores.reduce((a,b)=>a+b,0)/scores.length)
  const pct = (avg/5)*100
  const color = avg>=4?'#228b22':avg>=3?C.accentDk:avg>=2?'#c8a000':'#dc2626'
  return(
    <div style={{background:'white',border:`1px solid ${C.border}33`,borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'center',gap:20}}>
      <div style={{position:'relative',width:80,height:80,flexShrink:0}}>
        <svg viewBox="0 0 80 80" style={{transform:'rotate(-90deg)'}}>
          <circle cx="40" cy="40" r="32" fill="none" stroke="#f0e8a0" strokeWidth="8"/>
          <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${pct*2.01} 201`} strokeLinecap="round"/>
        </svg>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <span style={{fontSize:18,fontWeight:800,color}}>{avg.toFixed(1)}</span>
          <span style={{fontSize:8,color:'#aaa',fontWeight:600}}>/ 5.0</span>
        </div>
      </div>
      <div>
        <div style={{fontSize:14,fontWeight:800,color:C.muted}}>
          {avg>=4.5?'Outstanding Year 🏆':avg>=4?'Strong Year ⭐':avg>=3?'Solid Year 💪':avg>=2?'Tough Year 🔧':'Hard Year — Rebuild 🔥'}
        </div>
        <div style={{fontSize:11,color:'#aaa',marginTop:4}}>
          {scores.length}/{DOMAINS.length} domains evaluated
        </div>
        <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
          {DOMAINS.map(d=>{
            const s=review.domains[d.id]?.score||0
            if(!s)return null
            return <span key={d.id} style={{fontSize:9,padding:'2px 6px',borderRadius:6,background:d.bg,color:d.color,fontWeight:700}}>{d.label.split(' ')[0]}: {'★'.repeat(s)}</span>
          })}
        </div>
      </div>
    </div>
  )
}

// ── Domain Section ─────────────────────────────────────────────
function DomainSection({domain, data, onChange}){
  const Icon = domain.icon
  return(
    <div style={{background:'white',border:`1px solid ${C.border}22`,borderRadius:10,padding:'14px 16px',borderLeft:`3px solid ${domain.color}`}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
        <div style={{width:28,height:28,borderRadius:8,background:domain.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <Icon size={14} color={domain.color}/>
        </div>
        <span style={{fontWeight:700,fontSize:12,color:C.text}}>{domain.label}</span>
      </div>
      <div style={{display:'grid',gap:8}}>
        <F label="Score this year">
          <StarRating value={data.score} onChange={v=>onChange('score',v)}/>
        </F>
        <F label="Evidence — what actually happened?" hint="Specific facts only. No feelings. What did you ship, earn, build, read?">
          <textarea value={data.evidence} onChange={e=>onChange('evidence',e.target.value)}
            placeholder="e.g. Completed 3 Laravel projects, got 98.5/100 in bootcamp, lost 3kg..."
            style={{...TA,minHeight:60}}/>
        </F>
        <F label="Target for next year — one specific thing">
          <input value={data.nextTarget} onChange={e=>onChange('nextTarget',e.target.value)}
            placeholder="e.g. Ship 2 SaaS MVPs, reach £1,000/month freelance..."
            style={INP}/>
        </F>
      </div>
    </div>
  )
}

// ── Bug Tracker ────────────────────────────────────────────────
function BugTracker({bugs, onChange}){
  const [adding,setAdding]=useState(false)
  const [newBug,setNewBug]=useState({problem:'',cause:'',solution:'',status:'open'})

  function add(){
    if(!newBug.problem.trim())return
    onChange([...bugs,{...newBug,id:`b${Date.now()}`}])
    setNewBug({problem:'',cause:'',solution:'',status:'open'})
    setAdding(false)
  }
  function update(id,field,val){onChange(bugs.map(b=>b.id===id?{...b,[field]:val}:b))}
  function remove(id){onChange(bugs.filter(b=>b.id!==id))}

  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:4}}>
          <AlertCircle size={10}/> Root Cause Analysis — Bugs This Year
        </div>
        <button onClick={()=>setAdding(v=>!v)} style={{...BTN_SM,background:C.accent,border:`1px solid ${C.border}`}}>
          <Plus size={10}/> Add Bug
        </button>
      </div>
      <p style={{fontSize:10,color:'#aaa',margin:'0 0 10px'}}>
        What went wrong? What caused it? What is the fix? — From your notebook: المشكلة → السبب → الحل
      </p>

      {adding&&(
        <div style={{background:C.paper,borderRadius:8,padding:12,marginBottom:10,display:'grid',gap:8,border:`1px solid ${C.border}44`}}>
          <F label="Problem (المشكلة)"><input value={newBug.problem} onChange={e=>setNewBug(p=>({...p,problem:e.target.value}))} placeholder="What went wrong?" style={INP} autoFocus/></F>
          <F label="Root Cause (السبب)"><input value={newBug.cause} onChange={e=>setNewBug(p=>({...p,cause:e.target.value}))} placeholder="Why did it happen?" style={INP}/></F>
          <F label="Fix (الحل)"><input value={newBug.solution} onChange={e=>setNewBug(p=>({...p,solution:e.target.value}))} placeholder="What will you do differently?" style={INP}/></F>
          <div style={{display:'flex',gap:6}}>
            <button onClick={add} style={{...BTN_SM,background:C.accent,border:`1px solid ${C.border}`}}><Check size={10}/> Add</button>
            <button onClick={()=>setAdding(false)} style={BTN_SM}><X size={10}/> Cancel</button>
          </div>
        </div>
      )}

      <div style={{display:'grid',gap:6}}>
        {bugs.map((b,i)=>(
          <div key={b.id} style={{background:'white',borderRadius:8,padding:'10px 12px',border:`1px solid ${C.border}22`,borderLeft:`3px solid ${b.status==='fixed'?'#228b22':'#dc2626'}`}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:C.text,marginBottom:4}}>{b.problem}</div>
                {b.cause&&<div style={{fontSize:10,color:'#dc2626',marginBottom:3}}>⚡ Cause: {b.cause}</div>}
                {b.solution&&<div style={{fontSize:10,color:'#228b22'}}>✓ Fix: {b.solution}</div>}
              </div>
              <div style={{display:'flex',gap:4,flexShrink:0,alignItems:'center'}}>
                <button onClick={()=>update(b.id,'status',b.status==='fixed'?'open':'fixed')}
                  style={{fontSize:9,padding:'2px 8px',borderRadius:6,background:b.status==='fixed'?'#e8fce8':'#fee8e8',color:b.status==='fixed'?'#228b22':'#dc2626',border:'none',cursor:'pointer',fontWeight:700}}>
                  {b.status==='fixed'?'✓ Fixed':'○ Open'}
                </button>
                <button onClick={()=>remove(b.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#ddd',padding:2}}><X size={10}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Year in Numbers ────────────────────────────────────────────
function YearNumbers({numbers, onChange}){
  const [adding,setAdding]=useState(false)
  const [newN,setNewN]=useState({label:'',value:'',unit:''})
  function add(){if(!newN.label.trim())return;onChange([...numbers,{...newN,id:`n${Date.now()}`}]);setNewN({label:'',value:'',unit:''});setAdding(false)}
  function remove(id){onChange(numbers.filter(n=>n.id!==id))}
  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:4}}>
          <BarChart2 size={10}/> The Year in Numbers
        </div>
        <button onClick={()=>setAdding(v=>!v)} style={{...BTN_SM,background:C.accent,border:`1px solid ${C.border}`}}><Plus size={10}/> Add</button>
      </div>
      <p style={{fontSize:10,color:'#aaa',margin:'0 0 10px'}}>Facts only. Specific numbers. No adjectives.</p>
      {adding&&(
        <div style={{background:C.paper,borderRadius:8,padding:10,marginBottom:10,display:'grid',gridTemplateColumns:'2fr 1fr 1fr auto',gap:8,alignItems:'end',border:`1px solid ${C.border}44`}}>
          <F label="Label"><input value={newN.label} onChange={e=>setNewN(p=>({...p,label:e.target.value}))} placeholder="e.g. LinkedIn followers" style={INP} autoFocus/></F>
          <F label="Value"><input value={newN.value} onChange={e=>setNewN(p=>({...p,value:e.target.value}))} placeholder="3572" style={INP}/></F>
          <F label="Unit"><input value={newN.unit} onChange={e=>setNewN(p=>({...p,unit:e.target.value}))} placeholder="followers" style={INP}/></F>
          <div style={{display:'flex',gap:4,paddingBottom:1}}>
            <button onClick={add} style={{...BTN_SM,background:C.accent,border:`1px solid ${C.border}`}}><Check size={10}/></button>
            <button onClick={()=>setAdding(false)} style={BTN_SM}><X size={10}/></button>
          </div>
        </div>
      )}
      {numbers.length>0&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:8}}>
          {numbers.map(n=>(
            <div key={n.id} style={{background:'white',borderRadius:10,padding:'10px 14px',border:`1px solid ${C.border}33`,position:'relative'}}>
              <button onClick={()=>remove(n.id)} style={{position:'absolute',top:6,right:6,background:'none',border:'none',cursor:'pointer',color:'#ddd',padding:0}}><X size={9}/></button>
              <div style={{fontSize:22,fontWeight:800,color:C.accentDk}}>{n.value}</div>
              <div style={{fontSize:9,color:'#aaa',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em'}}>{n.unit}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{n.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Promises ───────────────────────────────────────────────────
function Promises({promises, onChange, isReview}){
  const [adding,setAdding]=useState(false)
  const [newP,setNewP]=useState('')
  function add(){if(!newP.trim())return;onChange([...promises,{id:`pr${Date.now()}`,text:newP,kept:null}]);setNewP('');setAdding(false)}
  function remove(id){onChange(promises.filter(p=>p.id!==id))}
  function setKept(id,val){onChange(promises.map(p=>p.id===id?{...p,kept:val}:p))}
  return(
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <div style={{fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:4}}>
          <Flag size={10}/> Promises to Next-Year-Self
        </div>
        <button onClick={()=>setAdding(v=>!v)} style={{...BTN_SM,background:C.accent,border:`1px solid ${C.border}`}}><Plus size={10}/> Add</button>
      </div>
      <p style={{fontSize:10,color:'#aaa',margin:'0 0 8px'}}>What do you commit to? You will review these next year and mark kept/broken.</p>
      {adding&&(
        <div style={{display:'flex',gap:6,marginBottom:8}}>
          <input value={newP} onChange={e=>setNewP(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();add()}}}
            placeholder="I commit to..." style={{...INP,flex:1}} autoFocus/>
          <button onClick={add} style={{...BTN_SM,background:C.accent,border:`1px solid ${C.border}`}}><Check size={10}/></button>
          <button onClick={()=>setAdding(false)} style={BTN_SM}><X size={10}/></button>
        </div>
      )}
      <div style={{display:'grid',gap:5}}>
        {promises.map(p=>(
          <div key={p.id} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'white',borderRadius:8,border:`1px solid ${C.border}22`}}>
            <span style={{fontSize:11,flex:1,color:C.text}}>{p.text}</span>
            {isReview&&(
              <div style={{display:'flex',gap:4}}>
                <button onClick={()=>setKept(p.id,true)} style={{fontSize:9,padding:'2px 8px',borderRadius:5,background:p.kept===true?'#228b22':'transparent',color:p.kept===true?'white':'#228b22',border:'1px solid #228b22',cursor:'pointer',fontWeight:700}}>✓ Kept</button>
                <button onClick={()=>setKept(p.id,false)} style={{fontSize:9,padding:'2px 8px',borderRadius:5,background:p.kept===false?'#dc2626':'transparent',color:p.kept===false?'white':'#dc2626',border:'1px solid #dc2626',cursor:'pointer',fontWeight:700}}>✗ Broken</button>
              </div>
            )}
            <button onClick={()=>remove(p.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#ddd',padding:2}}><X size={10}/></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Single Review Editor/Viewer ────────────────────────────────
function ReviewCard({review, onSave, onDelete, previousReview}){
  const [exp,setExp]=useState(false)
  const [form,setForm]=useState({...review})

  function updateDomain(id,field,val){
    setForm(p=>({...p,domains:{...p.domains,[id]:{...p.domains[id],[field]:val}}}))
  }
  function save(){onSave(form);setExp(false)}

  const filledDomains = DOMAINS.filter(d=>form.domains[d.id]?.score>0)
  const avgScore = filledDomains.length
    ? (filledDomains.reduce((a,d)=>a+(form.domains[d.id]?.score||0),0)/filledDomains.length).toFixed(1)
    : null

  return(
    <div style={{background:'white',borderRadius:14,border:`1px solid ${C.border}33`,overflow:'hidden',boxShadow:'0 1px 4px rgba(180,160,0,0.07)'}}>
      {/* Header */}
      <div style={{padding:'14px 18px',cursor:'pointer',display:'flex',alignItems:'center',gap:12}} onClick={()=>setExp(v=>!v)}>
        <div style={{width:48,height:48,borderRadius:12,background:C.accent,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <span style={{fontSize:18,fontWeight:800,color:C.muted}}>{form.year}</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,fontSize:14,color:C.text}}>Year {form.year} Review</div>
          {form.headline&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{form.headline}</div>}
          <div style={{display:'flex',gap:8,marginTop:4,flexWrap:'wrap'}}>
            {avgScore&&<span style={{fontSize:10,background:C.faint,padding:'2px 8px',borderRadius:8,color:C.accentDk,fontWeight:700}}>⭐ {avgScore}/5.0 average</span>}
            {form.bugs?.filter(b=>b.status==='open').length>0&&<span style={{fontSize:10,background:'#fee8e8',padding:'2px 8px',borderRadius:8,color:'#dc2626',fontWeight:700}}>🐛 {form.bugs.filter(b=>b.status==='open').length} open bugs</span>}
            {form.numbers?.length>0&&<span style={{fontSize:10,background:'#e8f4ff',padding:'2px 8px',borderRadius:8,color:'#1d4ed8',fontWeight:700}}>📊 {form.numbers.length} metrics</span>}
          </div>
        </div>
        <div style={{display:'flex',gap:4}} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>onDelete(review.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#ddd',padding:4}}><Trash2 size={13}/></button>
          <button onClick={()=>setExp(v=>!v)} style={{background:'none',border:'none',cursor:'pointer',color:C.accentDk,padding:4}}>{exp?<ChevronUp size={15}/>:<ChevronDown size={15}/>}</button>
        </div>
      </div>

      {exp&&(
        <div style={{borderTop:`1px solid ${C.border}22`,background:C.paper,padding:'18px'}}>
          <div style={{display:'grid',gap:16}}>

            {/* Score gauge */}
            <ScoreGauge review={form}/>

            {/* 3 Core Questions */}
            <div style={{background:'white',borderRadius:10,padding:'14px 16px',border:`1px solid ${C.border}22`}}>
              <div style={{fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:12,display:'flex',alignItems:'center',gap:4}}><Brain size={10}/> The 3 Core Questions</div>
              <div style={{display:'grid',gap:10}}>
                <F label="Headline — one sentence: who are you now vs one year ago?" hint="Write it like the first line of a book chapter about you.">
                  <input value={form.headline} onChange={e=>setForm(p=>({...p,headline:e.target.value}))}
                    placeholder="e.g. The year I became a full-stack developer and stopped waiting for permission..."
                    style={INP}/>
                </F>
                <F label="Biggest win — what are you most proud of?" hint="One specific moment, project, or decision. Not a category — a moment.">
                  <textarea value={form.biggestWin} onChange={e=>setForm(p=>({...p,biggestWin:e.target.value}))}
                    placeholder="e.g. Winning the GREEN LOOP hackathon 1st place against 38 teams after 3 months of preparation..."
                    style={TA}/>
                </F>
                <F label="Biggest failure — what do you most want to learn from?" hint="The honest one. Not the polished version. The one that kept you up at night.">
                  <textarea value={form.biggestFailure} onChange={e=>setForm(p=>({...p,biggestFailure:e.target.value}))}
                    placeholder="e.g. Failed IELTS twice because I underestimated the writing section..."
                    style={TA}/>
                </F>
              </div>
            </div>

            {/* Domain Scores */}
            <div>
              <div style={{fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:10,display:'flex',alignItems:'center',gap:4}}><Star size={10}/> 8 Life Domains — Score + Evidence + Next Year Target</div>
              <div style={{display:'grid',gap:8}}>
                {DOMAINS.map(d=>(
                  <DomainSection key={d.id} domain={d}
                    data={form.domains[d.id]||{score:0,evidence:'',nextTarget:''}}
                    onChange={(field,val)=>updateDomain(d.id,field,val)}/>
                ))}
              </div>
            </div>

            {/* Root Cause Analysis */}
            <div style={{background:'white',borderRadius:10,padding:'14px 16px',border:`1px solid ${C.border}22`}}>
              <BugTracker bugs={form.bugs||[]} onChange={bugs=>setForm(p=>({...p,bugs}))}/>
            </div>

            {/* Year in Numbers */}
            <div style={{background:'white',borderRadius:10,padding:'14px 16px',border:`1px solid ${C.border}22`}}>
              <YearNumbers numbers={form.numbers||[]} onChange={numbers=>setForm(p=>({...p,numbers}))}/>
            </div>

            {/* Promises */}
            <div style={{background:'white',borderRadius:10,padding:'14px 16px',border:`1px solid ${C.border}22`}}>
              <Promises promises={form.promises||[]} onChange={promises=>setForm(p=>({...p,promises}))} isReview={false}/>
            </div>

            {/* Previous year promises review */}
            {previousReview?.promises?.length>0&&(
              <div style={{background:'#fff8e0',borderRadius:10,padding:'14px 16px',border:`1px solid ${C.border}44`}}>
                <div style={{fontSize:9,fontWeight:700,color:'#8a7000',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:8,display:'flex',alignItems:'center',gap:4}}>
                  <RefreshCw size={10}/> Promises from {previousReview.year} — Did You Keep Them?
                </div>
                <Promises promises={form[`promises_${previousReview.year}`]||previousReview.promises}
                  onChange={p=>setForm(prev=>({...prev,[`promises_${previousReview.year}`]:p}))}
                  isReview={true}/>
              </div>
            )}

            {/* Raw private notes */}
            <div style={{background:'white',borderRadius:10,padding:'14px 16px',border:`1px solid ${C.border}22`}}>
              <F label="Raw private reflection — say what you really think" hint="This is for you only. No filters. What do you actually feel about this year?">
                <textarea value={form.rawNotes} onChange={e=>setForm(p=>({...p,rawNotes:e.target.value}))}
                  placeholder="The honest, unedited version of this year..."
                  style={{...TA,minHeight:100}}/>
              </F>
            </div>

            <button onClick={save} style={{...BTN_P,justifyContent:'center'}}>
              <Check size={14}/> Save {form.year} Review
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────
export default function YearlyReview(){
  const [reviews,setReviews]=useState(()=>lsGet('crm_yearly_reviews',[]))
  const [showNew,setShowNew]=useState(false)
  const [newYear,setNewYear]=useState(new Date().getFullYear())

  function createReview(){
    const exists=reviews.find(r=>r.year===newYear)
    if(exists){alert('Review for '+newYear+' already exists.');return}
    const r={...SEED_REVIEW,id:`y${newYear}`,year:newYear,createdAt:new Date().toISOString().slice(0,10),
      domains:Object.fromEntries(DOMAINS.map(d=>[d.id,{score:0,evidence:'',nextTarget:''}])),
      bugs:[],promises:[],numbers:[],rawNotes:'',headline:'',biggestWin:'',biggestFailure:''}
    const updated=[r,...reviews].sort((a,b)=>b.year-a.year)
    setReviews(updated);lsSave('crm_yearly_reviews',updated);setShowNew(false)
  }
  function saveReview(form){
    const updated=reviews.map(r=>r.id===form.id?form:r)
    setReviews(updated);lsSave('crm_yearly_reviews',updated)
  }
  function deleteReview(id){
    if(!window.confirm('Delete this review?'))return
    const updated=reviews.filter(r=>r.id!==id)
    setReviews(updated);lsSave('crm_yearly_reviews',updated)
  }

  const sorted=[...reviews].sort((a,b)=>b.year-a.year)

  return(
    <div style={{padding:16,fontFamily:'Inter,system-ui,sans-serif',maxWidth:900,margin:'0 auto',color:C.text}}>
      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,color:C.muted,margin:0,display:'flex',alignItems:'center',gap:8}}>
            <BarChart2 size={22} color={C.accentDk}/> Yearly Self-Review
            <span style={{fontSize:14,color:'#aaa',fontFamily:'serif'}}>مراجعة السنة</span>
          </h2>
          <p style={{fontSize:11,color:'#aaa',margin:'3px 0 0'}}>8 domains · Root cause analysis · Year in numbers · Promises — your annual audit</p>
        </div>
        <button onClick={()=>setShowNew(v=>!v)} style={{...BTN_P,display:'flex',alignItems:'center',gap:5}}>
          <Plus size={14}/> New Year Review
        </button>
      </div>

      {/* New Year Creator */}
      {showNew&&(
        <div style={{background:'white',border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:16,display:'flex',gap:10,alignItems:'flex-end'}}>
          <F label="Which year are you reviewing?">
            <input type="number" value={newYear} onChange={e=>setNewYear(Number(e.target.value))}
              min={2020} max={2040} style={{...INP,width:120}}/>
          </F>
          <button onClick={createReview} style={BTN_P}><Plus size={13}/> Start Review</button>
          <button onClick={()=>setShowNew(false)} style={BTN_C}><X size={12}/> Cancel</button>
        </div>
      )}

      {/* Empty state */}
      {sorted.length===0&&(
        <div style={{textAlign:'center',padding:64,color:'#bbb'}}>
          <BarChart2 size={48} color="#e0d800" style={{margin:'0 auto 16px',display:'block'}}/>
          <div style={{fontSize:14,fontWeight:700,color:'#aaa',marginBottom:8}}>No yearly reviews yet.</div>
          <div style={{fontSize:12,color:'#bbb',marginBottom:20}}>Start your first one — December 31st is the best time but any day works.</div>
          <button onClick={()=>setShowNew(true)} style={BTN_P}><Plus size={13}/> Start {new Date().getFullYear()} Review</button>
        </div>
      )}

      {/* Reviews list */}
      <div style={{display:'grid',gap:12}}>
        {sorted.map((r,i)=>(
          <ReviewCard key={r.id} review={r}
            onSave={saveReview}
            onDelete={deleteReview}
            previousReview={sorted[i+1]||null}/>
        ))}
      </div>
    </div>
  )
}
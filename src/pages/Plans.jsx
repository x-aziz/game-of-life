import { useState } from 'react'

// ── Plans = Visual Timeline Roadmaps ──────────────────────────
// Each plan has: title + category + a list of milestones on a timeline

const PLAN_CATS = ['life','career','business','education','financial','health','uk','other']
const CAT_COLOR = { life:'#f5f0ff',career:'#e8f4ff',business:'#fff8e0',education:'#f0fff4',financial:'#fff8e0',health:'#f0fff4',uk:'#e8f4ff',other:'#f5f5f5' }
const CAT_ICON  = { life:'🌍',career:'💼',business:'🚀',education:'🎓',financial:'💰',health:'🏋️',uk:'🇬🇧',other:'📋' }
const MS_STATUS = ['upcoming','in-progress','done','blocked']
const MS_COLORS = { upcoming:'#e8f4ff',  'in-progress':'#fff8e0', done:'#e8fce8', blocked:'#fee8e8' }
const MS_ICONS  = { upcoming:'○', 'in-progress':'◐', done:'✓', blocked:'✕' }
const MS_DOT    = { upcoming:'#2980b9', 'in-progress':'#c8b400', done:'#228b22', blocked:'#cc3333' }

const EMPTY_PLAN = { title:'', category:'career', description:'', milestones:[] }
const EMPTY_MS   = { title:'', date:'', status:'upcoming', note:'' }

function MilestoneTimeline({ milestones, onUpdate, planId }) {
  const [editIdx, setEditIdx] = useState(null)
  const [form, setForm] = useState({...EMPTY_MS})

  function saveMs() {
    if (!form.title.trim()) return
    const updated = [...milestones]
    if (editIdx !== null) updated[editIdx] = form
    else updated.push({ ...form, id: Date.now() })
    onUpdate(planId, { milestones: updated })
    setEditIdx(null); setForm({...EMPTY_MS})
  }

  function deleteMs(i) {
    const updated = milestones.filter((_,j)=>j!==i)
    onUpdate(planId, { milestones: updated })
  }

  function startEditMs(ms, i) {
    setForm({ title:ms.title, date:ms.date||'', status:ms.status, note:ms.note||'' })
    setEditIdx(i)
  }

  function cycleStatus(i) {
    const updated = [...milestones]
    const cur = updated[i].status
    const next = { upcoming:'in-progress', 'in-progress':'done', done:'blocked', blocked:'upcoming' }
    updated[i] = { ...updated[i], status: next[cur] }
    onUpdate(planId, { milestones: updated })
  }

  const done   = milestones.filter(m=>m.status==='done').length
  const total  = milestones.length
  const pct    = total ? Math.round(done/total*100) : 0

  return (
    <div>
      {/* Progress bar */}
      {total>0&&(
        <div style={{ marginBottom:12 }}>
          <div style={{ display:'flex',justifyContent:'space-between',fontSize:10,color:'#888',marginBottom:4 }}>
            <span>{done}/{total} milestones done</span>
            <span style={{ fontWeight:600, color:pct>=80?'#228b22':pct>=50?'#b8860b':'#c8b400' }}>{pct}%</span>
          </div>
          <div style={{ height:6, background:'#f0e800', borderRadius:3, overflow:'hidden' }}>
            <div style={{ width:`${pct}%`, height:'100%', background:pct>=80?'#228b22':pct>=50?'#b8860b':'#c8b400', borderRadius:3, transition:'width 0.4s' }}/>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div style={{ position:'relative', paddingLeft:24 }}>
        {total>0&&<div style={{ position:'absolute', left:7, top:8, bottom:8, width:2, background:'#e0d800', borderRadius:1 }}/>}
        {milestones.map((ms,i)=>(
          <div key={ms.id||i} style={{ position:'relative', marginBottom:10, paddingLeft:16 }}>
            {/* Dot */}
            <div onClick={()=>cycleStatus(i)} style={{
              position:'absolute', left:-17, top:3, width:14, height:14, borderRadius:'50%',
              background:MS_DOT[ms.status], border:'2px solid white',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:8, color:'white', fontWeight:700, cursor:'pointer',
              boxShadow:'0 0 0 2px '+MS_DOT[ms.status]+'40',
              transition:'transform 0.1s',
            }} title="Click to change status">{MS_ICONS[ms.status]}</div>

            {/* Content */}
            <div style={{
              background:MS_COLORS[ms.status], border:'0.5px solid #e0d800',
              borderRadius:8, padding:'7px 10px',
              opacity:ms.status==='blocked'?0.7:1,
            }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:12, fontWeight:600, color:'#1a1a1a', textDecoration:ms.status==='done'?'line-through':'none', opacity:ms.status==='done'?0.6:1 }}>
                  {ms.title}
                </span>
                <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                  {ms.date&&<span style={{ fontSize:9, color:'#aaa' }}>{ms.date}</span>}
                  <button onClick={()=>startEditMs(ms,i)} style={{ background:'none',border:'none',cursor:'pointer',color:'#c8b400',fontSize:11,padding:'0 2px' }}>✏️</button>
                  <button onClick={()=>deleteMs(i)} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',fontSize:13,padding:'0 2px' }}>×</button>
                </div>
              </div>
              {ms.note&&<div style={{ fontSize:10, color:'#666', marginTop:3, lineHeight:1.5 }}>{ms.note}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Add/edit milestone form */}
      <div style={{ background:'#fffde0', border:'0.5px dashed #c8b400', borderRadius:8, padding:10, marginTop:8 }}>
        <div style={{ fontSize:10, fontWeight:600, color:'#8a7000', marginBottom:6 }}>{editIdx!==null?'Edit milestone':'+ Add milestone'}</div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:8, marginBottom:8 }}>
          <input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Milestone title..." style={INP_SM}
            onKeyDown={e=>{if(e.key==='Enter')saveMs()}}/>
          <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={INP_SM}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:8, marginBottom:8 }}>
          <select value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))} style={INP_SM}>
            {MS_STATUS.map(s=><option key={s} value={s}>{MS_ICONS[s]} {s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
          <input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} placeholder="Note (optional)..." style={INP_SM}/>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={saveMs} style={BTN_SM}>{editIdx!==null?'Save':'Add'}</button>
          {editIdx!==null&&<button onClick={()=>{setEditIdx(null);setForm({...EMPTY_MS})}} style={BTN_SM_C}>Cancel</button>}
        </div>
      </div>
    </div>
  )
}

function PlanCard({ plan, onUpdate, onDelete }) {
  const [exp, setExp] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(plan.title)
  const [desc,  setDesc]  = useState(plan.description||'')

  const done  = plan.milestones?.filter(m=>m.status==='done').length||0
  const total = plan.milestones?.length||0
  const pct   = total?Math.round(done/total*100):0

  return (
    <div style={{ background:'white', border:'0.5px solid #e0d800', borderRadius:14, overflow:'hidden', boxShadow:'0 2px 8px rgba(200,180,0,0.08)' }}>
      {/* Plan header */}
      <div style={{ padding:'12px 16px', cursor:'pointer', display:'flex', alignItems:'center', gap:12 }} onClick={()=>setExp(v=>!v)}>
        <div style={{ fontSize:28, flexShrink:0 }}>{CAT_ICON[plan.category]||'📋'}</div>
        <div style={{ flex:1, minWidth:0 }}>
          {editing ? (
            <input autoFocus value={title} onChange={e=>setTitle(e.target.value)}
              onBlur={()=>{onUpdate(plan.id,{title,description:desc});setEditing(false)}}
              onKeyDown={e=>{if(e.key==='Enter'){onUpdate(plan.id,{title,description:desc});setEditing(false)}}}
              style={{ width:'100%',border:'none',background:'transparent',fontSize:14,fontWeight:700,color:'#5a4a00',outline:'none',fontFamily:'inherit' }}
              onClick={e=>e.stopPropagation()}/>
          ) : (
            <div style={{ fontWeight:700, fontSize:14, color:'#5a4a00' }} onDoubleClick={e=>{e.stopPropagation();setEditing(true)}} title="Double-click to rename">
              {plan.title}
            </div>
          )}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:3 }}>
            <span style={{ padding:'1px 8px',borderRadius:10,fontSize:9,fontWeight:600,background:CAT_COLOR[plan.category]||'#f5f5f5',color:'#5a4a00' }}>{plan.category}</span>
            {total>0&&<span style={{ fontSize:10, color:pct>=80?'#228b22':pct>=50?'#b8860b':'#c8b400', fontWeight:600 }}>{pct}% complete</span>}
            <span style={{ fontSize:10, color:'#aaa' }}>{total} milestones</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <button onClick={e=>{e.stopPropagation();if(window.confirm('Delete this plan?'))onDelete(plan.id)}} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',fontSize:15 }}>×</button>
          <span style={{ color:'#c8b400', fontSize:14, fontWeight:700 }}>{exp?'▲':'▼'}</span>
        </div>
      </div>

      {/* Mini progress bar */}
      {total>0&&(
        <div style={{ height:3, background:'#f5f0c0', margin:'0 16px' }}>
          <div style={{ width:`${pct}%`,height:'100%',background:pct>=80?'#228b22':pct>=50?'#c8b400':'#b8860b',borderRadius:2,transition:'width 0.4s' }}/>
        </div>
      )}

      {/* Expanded */}
      {exp&&(
        <div style={{ padding:'14px 16px', borderTop:'0.5px solid #f0e800', background:'#fffdf5' }}>
          {/* Description */}
          <textarea
            value={desc}
            onChange={e=>setDesc(e.target.value)}
            onBlur={()=>onUpdate(plan.id,{description:desc})}
            placeholder="Describe this plan — what's the big goal, why it matters to you..."
            style={{ width:'100%',border:'0.5px solid #e0d800',borderRadius:8,padding:'8px 10px',fontSize:11,fontFamily:'inherit',background:'#fffde0',resize:'none',minHeight:50,boxSizing:'border-box',lineHeight:1.5,marginBottom:12 }}
          />
          {/* Timeline */}
          <MilestoneTimeline milestones={plan.milestones||[]} onUpdate={onUpdate} planId={plan.id}/>
        </div>
      )}
    </div>
  )
}

export default function Plans({items=[],onAdd,onUpdate,onDelete}){
  const [showForm,setShowForm]=useState(false)
  const [form,setForm]=useState({...EMPTY_PLAN})
  const [filter,setFilter]=useState('all')

  function submit(){
    if(!form.title.trim())return
    onAdd({...form,milestones:[]})
    setForm({...EMPTY_PLAN});setShowForm(false)
  }

  const filtered=filter==='all'?items:items.filter(i=>i.category===filter)

  const totalMs=items.reduce((a,p)=>a+(p.milestones?.length||0),0)
  const doneMs=items.reduce((a,p)=>a+(p.milestones?.filter(m=>m.status==='done').length||0),0)

  return (
    <div style={{padding:16,fontFamily:'Inter,system-ui,sans-serif',maxWidth:900,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:700,color:'#5a4a00',margin:0}}>🗺️ Plans & Roadmaps</h2>
          <p style={{fontSize:11,color:'#aaa',margin:'2px 0 0'}}>Visual timelines for your goals</p>
        </div>
        <button onClick={()=>setShowForm(v=>!v)} style={BTN_ADD}>+ New plan</button>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
        {[
          {v:items.length,l:'Active plans',c:'#5a4a00'},
          {v:totalMs,l:'Total milestones',c:'#2980b9'},
          {v:doneMs,l:'Completed',c:'#228b22'},
          {v:totalMs?Math.round(doneMs/totalMs*100)+'%':'0%',l:'Overall progress',c:'#c8b400'},
        ].map(({v,l,c})=>(
          <div key={l} style={{background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:'8px 12px'}}>
            <div style={{fontSize:18,fontWeight:700,color:c}}>{v}</div>
            <div style={{fontSize:10,color:'#aaa'}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showForm&&(
        <div style={{background:'white',border:'0.5px solid #c8b400',borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:600,color:'#5a4a00',marginBottom:12}}>New plan</div>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:10,marginBottom:10}}>
            <F label="Plan title *"><input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="e.g. UK Life Plan, Career Roadmap..." style={INP}/></F>
            <F label="Category">
              <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={INP}>
                {PLAN_CATS.map(c=><option key={c}>{c}</option>)}
              </select>
            </F>
          </div>
          <F label="Description"><textarea value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="What is this plan about?" style={{...INP,minHeight:60,resize:'vertical'}}/></F>
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button onClick={submit} style={BTN_ADD}>Create plan</button>
            <button onClick={()=>setShowForm(false)} style={BTN_C}>Cancel</button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div style={{display:'flex',gap:6,marginBottom:12,flexWrap:'wrap'}}>
        {['all',...PLAN_CATS].map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{
            padding:'4px 10px',borderRadius:10,fontSize:10,cursor:'pointer',fontWeight:500,
            background:filter===c?'#ffe600':'white',
            border:`0.5px solid ${filter===c?'#c8b400':'#e0d800'}`,
            color:filter===c?'#5a4a00':'#888',
          }}>{c==='all'?'All':`${CAT_ICON[c]||''} ${c}`}</button>
        ))}
      </div>

      {/* Plans */}
      {filtered.length===0&&(
        <div style={{textAlign:'center',padding:40,color:'#bbb',fontSize:12}}>
          {items.length===0?'No plans yet — create your first roadmap!':'No plans in this category.'}
        </div>
      )}
      <div style={{display:'grid',gap:12}}>
        {filtered.map(plan=>(
          <PlanCard key={plan.id} plan={plan} onUpdate={onUpdate} onDelete={onDelete}/>
        ))}
      </div>
    </div>
  )
}

function F({label,children}){return <div><label style={{display:'block',fontSize:10,color:'#888',marginBottom:3}}>{label}</label>{children}</div>}
const INP={width:'100%',padding:'7px 9px',border:'0.5px solid #c8b400',borderRadius:8,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box'}
const INP_SM={width:'100%',padding:'5px 8px',border:'0.5px solid #c8b400',borderRadius:7,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box'}
const BTN_ADD={padding:'7px 16px',background:'#ffe600',border:'none',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00'}
const BTN_C={padding:'7px 14px',background:'transparent',border:'0.5px solid #ddd',borderRadius:8,cursor:'pointer',fontSize:11,color:'#888'}
const BTN_SM={padding:'5px 12px',background:'#ffe600',border:'none',borderRadius:7,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00'}
const BTN_SM_C={padding:'5px 10px',background:'transparent',border:'0.5px solid #ddd',borderRadius:7,cursor:'pointer',fontSize:11,color:'#888'}

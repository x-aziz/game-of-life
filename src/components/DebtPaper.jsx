import { useState } from 'react'
import { DAYS, DEBT_CATEGORIES } from '../data/defaults'

const TODAY = new Date().toISOString().slice(0,10)
const EMPTY = { date:TODAY, day:'Saturday', from:'04:30', to:'07:30', hours:3, category:'Skill', what:'' }

function daysSince(d) { return Math.floor((Date.now()-new Date(d))/86400000) }
function rowBg(debt) { if(debt.done)return'#f0fff0'; if(daysSince(debt.date)>3)return'#fff0f0'; return'#fffbe0' }
function pctColor(p) { return p>=70?'#228b22':p>=40?'#b8860b':'#cc3333' }

export default function DebtPaper({ debts, onAdd, onToggle, onDelete, onEdit }) {
  const [form,     setForm]     = useState(EMPTY)
  const [showForm, setShowForm] = useState(false)
  const [editId,   setEditId]   = useState(null)

  const pending   = debts.filter(d=>!d.done)
  const recovered = debts.filter(d=>d.done)
  const hoursOwed = pending.reduce((a,b)=>a+(b.hours||0),0)
  const hoursRec  = recovered.reduce((a,b)=>a+(b.hours||0),0)
  const total     = debts.reduce((a,b)=>a+(b.hours||0),0)
  const recPct    = total?Math.round(hoursRec/total*100):0

  const cats = {}
  debts.forEach(d=>{
    if(!cats[d.category])cats[d.category]={sessions:0,hours:0,done:0}
    cats[d.category].sessions++; cats[d.category].hours+=d.hours||0
    if(d.done)cats[d.category].done++
  })

  function submit() {
    if (!form.what.trim()) return
    if (editId) { onEdit(editId,{...form,hours:parseInt(form.hours)||3}); setEditId(null) }
    else { onAdd({...form,hours:parseInt(form.hours)||3}) }
    setForm(EMPTY); setShowForm(false)
  }

  function startEdit(debt) {
    setForm({ date:debt.date, day:debt.day, from:debt.from, to:debt.to, hours:debt.hours, category:debt.category, what:debt.what })
    setEditId(debt.id); setShowForm(true)
  }

  const f = field => e => setForm(p=>({...p,[field]:e.target.value}))

  return (
    <div style={{ padding:12, fontFamily:'Inter, system-ui, sans-serif' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:12 }}>
        {[{v:pending.length,l:'Debts pending',c:'#cc3333'},{v:`${hoursOwed}h`,l:'Hours owed',c:'#cc3333'},{v:`${hoursRec}h`,l:'Hours recovered',c:'#228b22'},{v:`${recPct}%`,l:'Recovery rate',c:pctColor(recPct)}].map(({v,l,c})=>(
          <div key={l} style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:'10px 14px' }}>
            <div style={{ fontSize:22,fontWeight:600,color:c }}>{v}</div>
            <div style={{ fontSize:10,color:'#999',marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ fontSize:12,fontWeight:600,color:'#5a4a00' }}>Debt paper</span>
        <button onClick={()=>{setShowForm(v=>!v);setEditId(null);setForm(EMPTY)}} style={BTN_ADD}>+ Add debt</button>
      </div>

      {showForm && (
        <div style={{ background:'#fffbe0',border:'0.5px solid #c8b400',borderRadius:10,padding:12,marginBottom:12 }}>
          <div style={{ fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:8 }}>{editId?'Edit debt':'New debt'}</div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:8,marginBottom:8 }}>
            <F label="Date"><input type="date" value={form.date} onChange={f('date')} style={INP}/></F>
            <F label="Day"><select value={form.day} onChange={f('day')} style={INP}>{DAYS.map(d=><option key={d}>{d}</option>)}</select></F>
            <F label="From"><input type="time" value={form.from} onChange={f('from')} style={INP}/></F>
            <F label="To"><input type="time" value={form.to} onChange={f('to')} style={INP}/></F>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8 }}>
            <F label="Hours"><input type="number" min="1" max="12" value={form.hours} onChange={f('hours')} style={INP}/></F>
            <F label="Category"><select value={form.category} onChange={f('category')} style={INP}>{DEBT_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></F>
          </div>
          <F label="What I owe myself"><textarea value={form.what} onChange={f('what')} placeholder="Describe the missed task..." style={{ ...INP,minHeight:56,resize:'vertical' }}/></F>
          <div style={{ display:'flex',gap:8,marginTop:8 }}>
            <button onClick={submit} style={BTN_ADD}>{editId?'Save changes':'Add debt'}</button>
            <button onClick={()=>{setShowForm(false);setEditId(null);setForm(EMPTY)}} style={BTN_C}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ overflowX:'auto',marginBottom:16 }}>
        <table style={{ width:'100%',borderCollapse:'collapse',minWidth:700,fontSize:11 }}>
          <thead>
            <tr>{['✓','Date','Day','Session','Hrs','Category','What I owe','✏️',''].map(h=><th key={h} style={TH}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {debts.length===0&&<tr><td colSpan={9} style={{ textAlign:'center',padding:24,color:'#bbb',fontSize:12 }}>No debts yet — excellent! 💪</td></tr>}
            {debts.map(debt=>(
              <tr key={debt.id} style={{ background:rowBg(debt),borderBottom:'0.5px solid #e0d800' }}>
                <td style={TD}><button onClick={()=>onToggle(debt.id,debt.done)} style={{ width:22,height:22,borderRadius:5,border:'0.5px solid #ccc',background:debt.done?'#e8fce8':'white',color:debt.done?'#228b22':'#bbb',cursor:'pointer',fontSize:13,display:'inline-flex',alignItems:'center',justifyContent:'center' }}>{debt.done?'✓':'○'}</button></td>
                <td style={TD}>{debt.date}</td>
                <td style={TD}>{debt.day}</td>
                <td style={TD}>{debt.from}→{debt.to}</td>
                <td style={{ ...TD,fontWeight:600 }}>{debt.hours}h</td>
                <td style={TD}><span style={{ padding:'2px 7px',borderRadius:12,background:'#ffe600',color:'#5a4a00',fontSize:10,fontWeight:600 }}>{debt.category}</span></td>
                <td style={{ ...TD,maxWidth:200,color:debt.done?'#aaa':'#1a1a1a',textDecoration:debt.done?'line-through':'none' }}>{debt.what}</td>
                <td style={TD}><button onClick={()=>startEdit(debt)} style={{ background:'none',border:'none',cursor:'pointer',color:'#c8b400',fontSize:12 }}>✏️</button></td>
                <td style={TD}><button onClick={()=>{if(window.confirm('Delete this debt?'))onDelete(debt.id)}} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',fontSize:14 }}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Object.keys(cats).length>0&&(
        <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:12 }}>
          <div style={{ fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:8 }}>Category breakdown</div>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:11 }}>
            <thead><tr>{['Subject','Sessions','Hours','Recovered','Rate'].map(h=><th key={h} style={{ ...TH,background:'#fffde0' }}>{h}</th>)}</tr></thead>
            <tbody>
              {Object.entries(cats).map(([cat,v])=>{
                const rate=v.sessions?Math.round(v.done/v.sessions*100):0
                return (
                  <tr key={cat} style={{ borderBottom:'0.5px solid #f5f0c0' }}>
                    <td style={TD}><span style={{ padding:'2px 7px',borderRadius:12,background:'#ffe600',color:'#5a4a00',fontSize:10,fontWeight:600 }}>{cat}</span></td>
                    <td style={{ ...TD,textAlign:'center' }}>{v.sessions}</td>
                    <td style={{ ...TD,textAlign:'center' }}>{v.hours}h</td>
                    <td style={{ ...TD,textAlign:'center' }}>{v.done}</td>
                    <td style={{ ...TD,textAlign:'center',fontWeight:600,color:pctColor(rate) }}>{rate}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function F({ label, children }) { return <div><label style={{ display:'block',fontSize:10,color:'#888',marginBottom:3 }}>{label}</label>{children}</div> }

const TH = { background:'#ffe600',border:'0.5px solid #c8b400',padding:'5px 8px',fontSize:10,fontWeight:600,color:'#5a4a00',textAlign:'left' }
const TD = { border:'0.5px solid #f0e800',padding:'5px 8px',fontSize:11,verticalAlign:'middle' }
const INP = { width:'100%',padding:'6px 8px',border:'1px solid #c8b400',borderRadius:7,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box' }
const BTN_ADD = { padding:'7px 14px',background:'#ffe600',border:'none',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00' }
const BTN_C = { padding:'7px 14px',background:'transparent',border:'1px solid #ccc',borderRadius:8,cursor:'pointer',fontSize:11,color:'#888' }

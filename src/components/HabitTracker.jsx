import { useState } from 'react'
import { DAYS, DAYS_SHORT } from '../data/defaults'

const ICON  = { '':'·', done:'✓', partial:'/', miss:'✗' }
const STYLE = {
  '':      { bg:'transparent', color:'#ccc',     border:'#e0d800' },
  done:    { bg:'#e8fce8',     color:'#228b22',  border:'#a0d8a0' },
  partial: { bg:'#fff8e0',     color:'#b8860b',  border:'#e0c840' },
  miss:    { bg:'#fee8e8',     color:'#cc3333',  border:'#e0a0a0' },
}
function pct(arr) { return arr.length?Math.round(arr.filter(v=>v==='done').length/arr.length*100):0 }
function pctColor(p) { return p>=80?'#228b22':p>=50?'#b8860b':'#cc3333' }

export default function HabitTracker({ habits, habitList, onToggle, onAdd, onRemove, onRename }) {
  const [adding,    setAdding]    = useState(false)
  const [newName,   setNewName]   = useState('')
  const [editing,   setEditing]   = useState(null) // habit name being renamed
  const [editVal,   setEditVal]   = useState('')

  const dayPcts = DAYS.map(day => pct(habitList.map(h=>habits[`${h}__${day}`]||'')))
  const weekPct = Math.round(dayPcts.reduce((a,b)=>a+b,0)/dayPcts.length)

  function handleAdd() {
    if (newName.trim()) { onAdd(newName.trim()); setNewName(''); setAdding(false) }
  }
  function startEdit(h) { setEditing(h); setEditVal(h) }
  function confirmEdit() { if(editVal.trim()&&editVal!==editing){onRename(editing,editVal.trim())} setEditing(null) }

  return (
    <div style={{ padding:12, fontFamily:'Inter, system-ui, sans-serif' }}>
      <div style={{ overflowX:'auto' }}>
        <table style={{ borderCollapse:'collapse', width:'100%', minWidth:640, background:'white', borderRadius:10, overflow:'hidden', border:'0.5px solid #e0d800' }}>
          <thead>
            <tr>
              <th style={{ ...TH, textAlign:'left', minWidth:195 }}>Habit <span style={{fontWeight:400,fontSize:9,color:'#aaa'}}>(click name to rename)</span></th>
              {DAYS_SHORT.map(d=><th key={d} style={TH}>{d}</th>)}
              <th style={TH}>%</th>
              <th style={{ ...TH, width:28 }}></th>
            </tr>
          </thead>
          <tbody>
            {habitList.map(habit => {
              const vals = DAYS.map(d=>habits[`${habit}__${d}`]||'')
              const p = pct(vals)
              return (
                <tr key={habit} style={{ borderBottom:'0.5px solid #f5f0c0' }}>
                  <td style={{ padding:'4px 10px', fontSize:11, color:'#1a1a1a', borderRight:'0.5px solid #f0e800' }}>
                    {editing===habit ? (
                      <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)}
                        onBlur={confirmEdit}
                        onKeyDown={e=>{if(e.key==='Enter')confirmEdit();if(e.key==='Escape')setEditing(null)}}
                        style={{ width:'100%', border:'0.5px solid #c8b400', borderRadius:6, padding:'3px 6px', fontSize:11, fontFamily:'inherit' }}/>
                    ) : (
                      <span onClick={()=>startEdit(habit)} style={{ cursor:'text', display:'block', padding:'2px 0' }} title="Click to rename">{habit}</span>
                    )}
                  </td>
                  {DAYS.map(day=>{
                    const v=habits[`${habit}__${day}`]||''
                    const s=STYLE[v]
                    return (
                      <td key={day} style={{ textAlign:'center', padding:3, border:'0.5px solid #f5f0c0' }}>
                        <button onClick={()=>onToggle(habit,day)} title={`${habit} — ${day}`} style={{
                          width:28,height:28,borderRadius:6,cursor:'pointer',
                          border:`0.5px solid ${s.border}`,background:s.bg,color:s.color,
                          fontSize:13,fontWeight:700,display:'inline-flex',alignItems:'center',justifyContent:'center',
                        }}>{ICON[v]}</button>
                      </td>
                    )
                  })}
                  <td style={{ textAlign:'center', padding:'6px 8px', fontSize:11, fontWeight:600, color:pctColor(p) }}>{p}%</td>
                  <td style={{ textAlign:'center', padding:4 }}>
                    <button onClick={()=>{if(window.confirm(`Remove "${habit}"?`))onRemove(habit)}} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',fontSize:14 }}>×</button>
                  </td>
                </tr>
              )
            })}
            <tr style={{ background:'#ffe600' }}>
              <td style={{ padding:'6px 10px', fontSize:11, fontWeight:700, color:'#5a4a00' }}>Day score</td>
              {dayPcts.map((p,i)=>(
                <td key={i} style={{ textAlign:'center', fontSize:11, fontWeight:700, color:pctColor(p), padding:'6px 3px' }}>{p}%</td>
              ))}
              <td style={{ textAlign:'center', fontSize:12, fontWeight:700, color:'#5a4a00', background:'#ffe000', padding:'6px 8px' }}>{weekPct}%</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop:10 }}>
        {adding ? (
          <div style={{ display:'flex', gap:8 }}>
            <input autoFocus value={newName} onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter')handleAdd();if(e.key==='Escape')setAdding(false)}}
              placeholder="New habit name..."
              style={{ flex:1, padding:'7px 10px', border:'1px solid #c8b400', borderRadius:8, fontSize:12, fontFamily:'inherit' }}/>
            <button onClick={handleAdd} style={BTN_P}>Add</button>
            <button onClick={()=>setAdding(false)} style={BTN_C}>Cancel</button>
          </div>
        ) : (
          <button onClick={()=>setAdding(true)} style={{ width:'100%', padding:'8px', border:'1px dashed #c8b400', background:'transparent', borderRadius:8, cursor:'pointer', fontSize:11, color:'#8a7000' }}>+ Add habit</button>
        )}
      </div>
    </div>
  )
}

const TH = { background:'#ffe600', border:'0.5px solid #c8b400', padding:'6px 8px', fontSize:10, fontWeight:600, color:'#5a4a00', textAlign:'center' }
const BTN_P = { padding:'7px 16px', background:'#ffe600', border:'none', borderRadius:8, cursor:'pointer', fontSize:11, fontWeight:600, color:'#5a4a00' }
const BTN_C = { padding:'7px 14px', background:'transparent', border:'1px solid #ccc', borderRadius:8, cursor:'pointer', fontSize:11, color:'#888' }

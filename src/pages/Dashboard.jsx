import { useState } from 'react'
import { DAYS } from '../data/defaults'

const TODAY = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
const TODAY_DAY = new Date().toLocaleDateString('en-GB',{weekday:'long'}).split(',')[0]

function pctColor(p){return p>=80?'#228b22':p>=50?'#b8860b':'#cc3333'}

export default function Dashboard({ habits, habitList, weekScore, dailyNotes, onAddNote, rules, transactions, settings }) {
  const [quickNote, setQuickNote] = useState('')

  // Today's habit completion
  const todayHabits = habitList.map(h=>({
    name:h, done: habits[`${h}__${TODAY_DAY}`]==='done'
  }))
  const todayDone  = todayHabits.filter(h=>h.done).length
  const todayTotal = todayHabits.length
  const todayPct   = todayTotal ? Math.round(todayDone/todayTotal*100) : 0

  // Today's spending
  const todayStr = new Date().toISOString().slice(0,10)
  const todaySpent = (transactions||[])
    .filter(t=>t.date===todayStr&&t.type==='expense')
    .reduce((a,b)=>a+(b.amount||0),0)
  const dailyBudget = settings?.dailyBudget || 30
  const remaining = dailyBudget - todaySpent

  // Active rules / limits
  const activeLimits = (rules?.limits||[]).filter(l=>l.active)

  // Recent notes
  const recentNotes = (dailyNotes||[]).slice(0,3)

  function saveQuickNote() {
    if (!quickNote.trim()) return
    onAddNote({ type:'quick', date:todayStr, text:quickNote.trim(), mood:'' })
    setQuickNote('')
  }

  return (
    <div style={{ padding:16, fontFamily:'Inter,system-ui,sans-serif', maxWidth:1000, margin:'0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11,color:'#aaa' }}>{TODAY}</div>
        <h2 style={{ fontSize:20,fontWeight:700,color:'#5a4a00',margin:'2px 0' }}>Good morning, Said 🌅</h2>
      </div>

      {/* Top stat cards */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16 }}>
        {[
          { icon:'✓', label:"Today's habits", value:`${todayDone}/${todayTotal}`, sub:`${todayPct}% done`, color:pctColor(todayPct) },
          { icon:'📅', label:'Week score',   value:`${weekScore}%`,             sub:'this week',        color:pctColor(weekScore) },
          { icon:'💰', label:'Remaining today', value:`£${remaining.toFixed(0)}`, sub:`of £${dailyBudget} budget`, color:remaining>0?'#228b22':'#cc3333' },
          { icon:'📓', label:'Notes today',  value:(dailyNotes||[]).filter(n=>n.date===todayStr).length, sub:'entries', color:'#5a4a00' },
        ].map(({icon,label,value,sub,color})=>(
          <div key={label} style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:'10px 14px' }}>
            <div style={{ fontSize:18,marginBottom:4 }}>{icon}</div>
            <div style={{ fontSize:20,fontWeight:700,color }}>{value}</div>
            <div style={{ fontSize:10,color:'#aaa',marginTop:1 }}>{label}</div>
            <div style={{ fontSize:9,color:'#bbb' }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>

        {/* Today's habits checklist */}
        <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:12 }}>
          <div style={{ fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:10,paddingBottom:4,borderBottom:'0.5px solid #f0e800' }}>
            ✓ Today's habits — {TODAY_DAY}
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:4 }}>
            {todayHabits.map(h=>(
              <div key={h.name} style={{ display:'flex',alignItems:'center',gap:6,padding:'3px 0' }}>
                <div style={{ width:16,height:16,borderRadius:4,background:h.done?'#e8fce8':'white',border:`1px solid ${h.done?'#a0d8a0':'#e0d800'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,flexShrink:0,color:'#228b22' }}>
                  {h.done?'✓':''}
                </div>
                <span style={{ fontSize:10,color:h.done?'#888':'#1a1a1a',textDecoration:h.done?'line-through':'none',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                  {h.name}
                </span>
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div style={{ marginTop:10,background:'#f5f0c0',borderRadius:6,height:8,overflow:'hidden' }}>
            <div style={{ width:`${todayPct}%`,height:'100%',background:pctColor(todayPct),borderRadius:6,transition:'width 0.4s' }}/>
          </div>
          <div style={{ fontSize:10,color:pctColor(todayPct),textAlign:'right',marginTop:4,fontWeight:600 }}>{todayPct}%</div>
        </div>

        {/* Quick note */}
        <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:12 }}>
          <div style={{ fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:10,paddingBottom:4,borderBottom:'0.5px solid #f0e800' }}>
            📓 Quick note for today
          </div>
          <textarea
            value={quickNote} onChange={e=>setQuickNote(e.target.value)}
            placeholder="Write anything — a thought, a reminder, a decision..."
            style={{ width:'100%',minHeight:80,border:'0.5px solid #e0d800',borderRadius:8,padding:8,fontSize:11,fontFamily:'inherit',background:'#fffde0',resize:'none',boxSizing:'border-box',lineHeight:1.5 }}
          />
          <button onClick={saveQuickNote} style={{ marginTop:6,padding:'6px 14px',background:'#ffe600',border:'none',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00' }}>Save note</button>

          {/* Recent notes */}
          <div style={{ marginTop:10 }}>
            {recentNotes.map(n=>(
              <div key={n.id} style={{ padding:'5px 8px',background:'#fffde0',borderRadius:6,marginBottom:4,fontSize:10,color:'#555',lineHeight:1.4 }}>
                <span style={{ color:'#bbb',fontSize:9 }}>{n.date} · </span>{n.text}
              </div>
            ))}
          </div>
        </div>

        {/* Active rules/limits */}
        {activeLimits.length>0&&(
          <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:12 }}>
            <div style={{ fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:10,paddingBottom:4,borderBottom:'0.5px solid #f0e800' }}>
              ⚖️ Today's rules & limits
            </div>
            {activeLimits.map((l,i)=>(
              <div key={i} style={{ display:'flex',alignItems:'center',gap:8,padding:'5px 0',borderBottom:'0.5px solid #f5f0c0' }}>
                <span style={{ fontSize:14 }}>{l.icon||'⚠️'}</span>
                <span style={{ fontSize:11,color:'#1a1a1a',flex:1 }}>{l.text}</span>
                {l.limit&&<span style={{ fontSize:10,fontWeight:600,color:'#c8b400' }}>{l.limit}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Today's spending */}
        {(transactions||[]).filter(t=>t.date===todayStr).length>0&&(
          <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:12 }}>
            <div style={{ fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:10,paddingBottom:4,borderBottom:'0.5px solid #f0e800' }}>
              💰 Today's spending
            </div>
            {(transactions||[]).filter(t=>t.date===todayStr).slice(0,5).map(t=>(
              <div key={t.id} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 0',borderBottom:'0.5px solid #f5f0c0',fontSize:11 }}>
                <span style={{ color:'#1a1a1a' }}>{t.description}</span>
                <span style={{ fontWeight:600,color:t.type==='expense'?'#cc3333':'#228b22' }}>
                  {t.type==='expense'?'-':'+'}{settings?.currency||'£'}{t.amount}
                </span>
              </div>
            ))}
            <div style={{ marginTop:8,display:'flex',justifyContent:'space-between',fontSize:11,fontWeight:600 }}>
              <span style={{ color:'#888' }}>Remaining today</span>
              <span style={{ color:remaining>=0?'#228b22':'#cc3333' }}>{settings?.currency||'£'}{remaining.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

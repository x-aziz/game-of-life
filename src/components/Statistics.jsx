import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { DAYS } from '../data/defaults'

function getPct(habits, h) {
  const done = DAYS.filter(d=>habits[`${h}__${d}`]==='done').length
  return Math.round(done/7*100)
}
function pctColor(p) { return p>=80?'#228b22':p>=50?'#b8860b':'#cc3333' }

// ── Custom tooltip for charts ─────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active||!payload||!payload.length) return null
  return (
    <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:8,padding:'6px 12px',fontSize:11 }}>
      <div style={{ fontWeight:600,color:'#5a4a00' }}>{label}</div>
      <div style={{ color:pctColor(payload[0].value) }}>{payload[0].value}%</div>
    </div>
  )
}

export default function Statistics({ habits, habitList, debts, brainEntries, weekNum, weekScore, weekTrend }) {
  const scores = habitList.map(h=>({ name:h.length>22?h.slice(0,22)+'…':h, full:h, pct:getPct(habits,h) })).sort((a,b)=>b.pct-a.pct)

  const catStats = {}
  debts.forEach(d=>{
    if(!catStats[d.category])catStats[d.category]={hours:0,rec:0,sessions:0,done:0}
    catStats[d.category].hours+=d.hours||0; catStats[d.category].sessions++
    if(d.done){catStats[d.category].rec+=d.hours||0; catStats[d.category].done++}
  })

  const hoursOwed = debts.filter(d=>!d.done).reduce((a,b)=>a+(b.hours||0),0)
  const totalDebtHours = debts.reduce((a,b)=>a+(b.hours||0),0)
  const recHours = debts.filter(d=>d.done).reduce((a,b)=>a+(b.hours||0),0)
  const overallRecovery = totalDebtHours?Math.round(recHours/totalDebtHours*100):0

  // Habit bar chart data
  const habitChartData = habitList.map(h=>({
    name: h.length>14?h.slice(0,14)+'…':h,
    pct: getPct(habits,h),
  }))

  // Days completion data
  const dayData = DAYS.map(day=>({
    day: day.slice(0,3),
    pct: habitList.length ? Math.round(habitList.filter(h=>habits[`${h}__${day}`]==='done').length/habitList.length*100) : 0
  }))

  return (
    <div style={{ padding:12, fontFamily:'Inter, system-ui, sans-serif' }}>

      {/* Top cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, marginBottom:14 }}>
        {[
          { v:`${weekScore}%`,         l:'Week score',       c:pctColor(weekScore) },
          { v:debts.filter(d=>!d.done).length, l:'Debts pending', c:'#cc3333' },
          { v:`${hoursOwed}h`,         l:'Hours owed',       c:'#b8860b' },
          { v:`${overallRecovery}%`,   l:'Debt recovered',   c:pctColor(overallRecovery) },
          { v:brainEntries.length,     l:'Brain entries',    c:'#228b22' },
        ].map(({v,l,c})=>(
          <div key={l} style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:'10px 14px' }}>
            <div style={{ fontSize:22,fontWeight:600,color:c }}>{v}</div>
            <div style={{ fontSize:10,color:'#aaa',marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>

        {/* Week score trend — REAL data */}
        <div style={CARD}>
          <div style={CARD_TITLE}>📈 Week score trend (real data)</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weekTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e800"/>
              <XAxis dataKey="week" tick={{ fontSize:10, fill:'#888' }}/>
              <YAxis domain={[0,100]} tick={{ fontSize:10, fill:'#888' }} tickFormatter={v=>`${v}%`}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Line type="monotone" dataKey="score" stroke="#b8a000" strokeWidth={2} dot={{ fill:'#ffe600',stroke:'#b8a000',r:4 }} activeDot={{ r:6 }}/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{ fontSize:10,color:'#aaa',marginTop:4,textAlign:'center' }}>Scores save automatically each week you use the app</div>
        </div>

        {/* Day completion this week */}
        <div style={CARD}>
          <div style={CARD_TITLE}>📅 Daily completion this week</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dayData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e800"/>
              <XAxis dataKey="day" tick={{ fontSize:10, fill:'#888' }}/>
              <YAxis domain={[0,100]} tick={{ fontSize:10, fill:'#888' }} tickFormatter={v=>`${v}%`}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="pct" radius={[4,4,0,0]}>
                {dayData.map((entry,i)=>(
                  <Cell key={i} fill={pctColor(entry.pct)}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Habit completion bars */}
        <div style={CARD}>
          <div style={CARD_TITLE}>✅ Habit completion this week</div>
          {scores.map(h=>(
            <div key={h.full} style={{ display:'flex',alignItems:'center',gap:8,marginBottom:5 }}>
              <span style={{ fontSize:10,width:150,color:'#666',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flexShrink:0 }} title={h.full}>{h.name}</span>
              <div style={{ flex:1,height:9,background:'#f5f0c0',borderRadius:5,overflow:'hidden' }}>
                <div style={{ width:`${h.pct}%`,height:'100%',background:pctColor(h.pct),borderRadius:5,transition:'width 0.4s' }}/>
              </div>
              <span style={{ fontSize:10,width:32,textAlign:'right',fontWeight:600,color:pctColor(h.pct),flexShrink:0 }}>{h.pct}%</span>
            </div>
          ))}
        </div>

        {/* Debt recovery */}
        <div style={CARD}>
          <div style={CARD_TITLE}>💳 Debt by category</div>
          {Object.keys(catStats).length===0&&<div style={{ fontSize:11,color:'#bbb',padding:'20px 0',textAlign:'center' }}>No debts recorded yet</div>}
          {Object.entries(catStats).map(([cat,v])=>{
            const p=v.hours?Math.round(v.rec/v.hours*100):0
            return (
              <div key={cat} style={{ display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
                <span style={{ fontSize:10,width:80,color:'#666',flexShrink:0 }}>{cat}</span>
                <div style={{ flex:1,height:9,background:'#f5f0c0',borderRadius:5,overflow:'hidden' }}>
                  <div style={{ width:`${p}%`,height:'100%',background:pctColor(p),borderRadius:5 }}/>
                </div>
                <span style={{ fontSize:10,width:64,textAlign:'right',color:'#888',flexShrink:0 }}>{v.rec}h/{v.hours}h ({p}%)</span>
              </div>
            )
          })}

          {/* Best/worst summary */}
          <div style={{ marginTop:12,paddingTop:10,borderTop:'0.5px solid #f0e800' }}>
            <div style={{ fontSize:11,color:'#228b22',fontWeight:600,marginBottom:4 }}>✅ Best habits</div>
            {scores.slice(0,3).map(h=><div key={h.full} style={{ fontSize:11,color:'#333',marginBottom:2 }}>• {h.full} — {h.pct}%</div>)}
            <div style={{ fontSize:11,color:'#cc3333',fontWeight:600,margin:'8px 0 4px' }}>⚠️ Needs work</div>
            {[...scores].reverse().slice(0,3).map(h=><div key={h.full} style={{ fontSize:11,color:'#333',marginBottom:2 }}>• {h.full} — {h.pct}%</div>)}
          </div>
        </div>

      </div>

      {/* Streak / summary */}
      <div style={{ ...CARD, marginTop:12 }}>
        <div style={CARD_TITLE}>📊 This week summary</div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8 }}>
          {DAYS.map(day=>{
            const p=habitList.length?Math.round(habitList.filter(h=>habits[`${h}__${day}`]==='done').length/habitList.length*100):0
            return (
              <div key={day} style={{ textAlign:'center' }}>
                <div style={{ fontSize:9,color:'#888',marginBottom:4 }}>{day.slice(0,3)}</div>
                <div style={{ width:36,height:36,borderRadius:'50%',background:p>=80?'#e8fce8':p>=50?'#fff8e0':'#fee8e8',border:`2px solid ${pctColor(p)}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',fontSize:11,fontWeight:700,color:pctColor(p) }}>{p}%</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const CARD = { background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:12 }
const CARD_TITLE = { fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:10,paddingBottom:4,borderBottom:'0.5px solid #f0e800' }

import { useState } from 'react'

const PODCASTS = ['DA7I7','Lex Fridman','My First Million','How I Built This','Tim Ferriss','Gary Vee','Alex Hormozi','Diary of a CEO','Other']
const TOPICS   = ['entrepreneurship','tech','mindset','business','career','english','life','uk','other']
const TOPIC_COLOR = { entrepreneurship:'#fff8e0',tech:'#e8f4ff',mindset:'#f5f0ff',business:'#fff8e0',career:'#f0fff4',english:'#f0f8ff',life:'#fffde0',uk:'#e8f4ff',other:'#f5f5f5' }
const TOPIC_BADGE = { entrepreneurship:'#c8b400',tech:'#2980b9',mindset:'#8e44ad',business:'#e67e22',career:'#228b22',english:'#1abc9c',life:'#e67e22',uk:'#cc3333',other:'#888' }

const EMPTY = { episode:'', podcast:'DA7I7', date:'', topic:'entrepreneurship', lessons:'', action:'', quote:'', speaker:'', impact:3 }
const today = new Date().toISOString().slice(0,10)

function ImpactDots({value,onChange}){
  return (
    <div style={{display:'flex',gap:4,alignItems:'center'}}>
      {[1,2,3,4,5].map(i=>(
        <div key={i} onClick={()=>onChange(i)} style={{
          width:12,height:12,borderRadius:'50%',cursor:'pointer',
          background:i<=value?'#c8b400':'#e0d800',
          transition:'background 0.1s',
        }}/>
      ))}
      <span style={{fontSize:10,color:'#aaa',marginLeft:4}}>Impact</span>
    </div>
  )
}

function EpisodeCard({item,onDelete,onEdit}){
  const [exp,setExp]=useState(false)
  return (
    <div style={{background:'white',border:'0.5px solid #e0d800',borderRadius:12,overflow:'hidden'}}>
      <div style={{padding:'10px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:10}} onClick={()=>setExp(v=>!v)}>
        <div style={{width:36,height:36,borderRadius:8,background:'#fffde0',border:'0.5px solid #e0d800',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🎙️</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
            <span style={{fontWeight:600,fontSize:12,color:'#1a1a1a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:240}}>{item.episode}</span>
            <span style={{padding:'1px 8px',borderRadius:10,fontSize:9,fontWeight:600,background:'#ffe600',color:'#5a4a00',flexShrink:0}}>{item.podcast}</span>
            <span style={{padding:'1px 8px',borderRadius:10,fontSize:9,fontWeight:600,background:TOPIC_COLOR[item.topic]||'#f5f5f5',color:TOPIC_BADGE[item.topic]||'#888',flexShrink:0}}>{item.topic}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10,marginTop:3}}>
            {item.date&&<span style={{fontSize:10,color:'#aaa'}}>{item.date}</span>}
            {item.speaker&&<span style={{fontSize:10,color:'#888'}}>with {item.speaker}</span>}
            <div style={{display:'flex',gap:2}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:8,height:8,borderRadius:'50%',background:i<=(item.impact||3)?'#c8b400':'#e0d800'}}/>)}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:6}}>
          <button onClick={e=>{e.stopPropagation();onEdit(item)}} style={{background:'none',border:'none',cursor:'pointer',color:'#c8b400',fontSize:13}}>✏️</button>
          <button onClick={e=>{e.stopPropagation();if(window.confirm('Delete?'))onDelete(item.id)}} style={{background:'none',border:'none',cursor:'pointer',color:'#ddd',fontSize:15}}>×</button>
          <span style={{color:'#c8b400',fontSize:12}}>{exp?'▲':'▼'}</span>
        </div>
      </div>
      {exp&&(
        <div style={{borderTop:'0.5px solid #f0e800',padding:'12px 14px',background:'#fffdf5',display:'grid',gap:10}}>
          {item.lessons&&(
            <div>
              <div style={{fontSize:10,fontWeight:600,color:'#5a4a00',marginBottom:4}}>💡 Key lessons</div>
              <div style={{fontSize:11,color:'#333',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{item.lessons}</div>
            </div>
          )}
          {item.action&&(
            <div style={{background:'#e8fce8',borderRadius:8,padding:'8px 12px',borderLeft:'3px solid #228b22'}}>
              <div style={{fontSize:10,fontWeight:600,color:'#228b22',marginBottom:2}}>⚡ Action I will take</div>
              <div style={{fontSize:11,color:'#1a1a1a',lineHeight:1.6}}>{item.action}</div>
            </div>
          )}
          {item.quote&&(
            <div style={{borderLeft:'3px solid #e0d800',paddingLeft:10}}>
              <div style={{fontSize:10,fontWeight:600,color:'#8a7000',marginBottom:2}}>💬 Best quote</div>
              <div style={{fontSize:11,color:'#555',fontStyle:'italic',lineHeight:1.6}}>"{item.quote}"</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Podcasts({items=[],onAdd,onUpdate,onDelete}){
  const [showForm,setShowForm]=useState(false)
  const [form,setForm]=useState({...EMPTY,date:today})
  const [editId,setEditId]=useState(null)
  const [search,setSearch]=useState('')
  const [podFilter,setPodFilter]=useState('all')
  const [topicFilter,setTopicFilter]=useState('all')

  const ff=field=>e=>setForm(p=>({...p,[field]:e.target.value}))

  function submit(){
    if(!form.episode.trim())return
    if(editId){onUpdate(editId,form);setEditId(null)}
    else onAdd(form)
    setForm({...EMPTY,date:today});setShowForm(false)
  }

  function startEdit(item){
    setForm({episode:item.episode,podcast:item.podcast,date:item.date,topic:item.topic,lessons:item.lessons,action:item.action,quote:item.quote||'',speaker:item.speaker||'',impact:item.impact||3})
    setEditId(item.id);setShowForm(true)
  }

  const filtered=items.filter(i=>{
    const ms=!search||i.episode.toLowerCase().includes(search.toLowerCase())||(i.lessons||'').toLowerCase().includes(search.toLowerCase())
    const mp=podFilter==='all'||i.podcast===podFilter
    const mt=topicFilter==='all'||i.topic===topicFilter
    return ms&&mp&&mt
  })

  // Group by podcast for stats
  const podCounts=PODCASTS.reduce((a,p)=>({...a,[p]:items.filter(i=>i.podcast===p).length}),{})
  const topPod=Object.entries(podCounts).sort((a,b)=>b[1]-a[1])[0]

  return (
    <div style={{padding:16,fontFamily:'Inter,system-ui,sans-serif',maxWidth:900,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div>
          <h2 style={{fontSize:18,fontWeight:700,color:'#5a4a00',margin:0}}>🎙️ Podcasts</h2>
          <p style={{fontSize:11,color:'#aaa',margin:'2px 0 0'}}>Episode log — lessons & actions</p>
        </div>
        <button onClick={()=>{setShowForm(v=>!v);setEditId(null);setForm({...EMPTY,date:today})}} style={BTN_ADD}>
          + Add episode
        </button>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
        {[
          {v:items.length,l:'Episodes logged',c:'#5a4a00'},
          {v:items.filter(i=>i.action).length,l:'Actions set',c:'#228b22'},
          {v:topPod?topPod[0]:'—',l:'Most listened',c:'#c8b400'},
          {v:items.length?Math.round(items.reduce((a,b)=>a+(b.impact||3),0)/items.length*10)/10+'★':'0',l:'Avg impact',c:'#8e44ad'},
        ].map(({v,l,c})=>(
          <div key={l} style={{background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:'8px 12px'}}>
            <div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div>
            <div style={{fontSize:10,color:'#aaa'}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm&&(
        <div style={{background:'white',border:'0.5px solid #c8b400',borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:600,color:'#5a4a00',marginBottom:12}}>{editId?'Edit':'Log'} episode</div>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:10,marginBottom:10}}>
            <F label="Episode title *"><input value={form.episode} onChange={ff('episode')} placeholder="Episode name..." style={INP}/></F>
            <F label="Date listened"><input type="date" value={form.date} onChange={ff('date')} style={INP}/></F>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:10}}>
            <F label="Podcast">
              <select value={form.podcast} onChange={ff('podcast')} style={INP}>
                {PODCASTS.map(p=><option key={p}>{p}</option>)}
              </select>
            </F>
            <F label="Topic">
              <select value={form.topic} onChange={ff('topic')} style={INP}>
                {TOPICS.map(t=><option key={t}>{t}</option>)}
              </select>
            </F>
            <F label="Speaker / Guest"><input value={form.speaker} onChange={ff('speaker')} placeholder="Guest name..." style={INP}/></F>
          </div>
          <div style={{marginBottom:10}}>
            <F label="Impact level">
              <ImpactDots value={form.impact} onChange={v=>setForm(p=>({...p,impact:v}))}/>
            </F>
          </div>
          <div style={{display:'grid',gap:10,marginBottom:10}}>
            <F label="💡 Key lessons (one per line)">
              <textarea value={form.lessons} onChange={ff('lessons')} placeholder="• Lesson 1&#10;• Lesson 2&#10;• Lesson 3" style={{...INP,minHeight:80,resize:'vertical'}}/>
            </F>
            <F label="⚡ Action I will take because of this episode">
              <textarea value={form.action} onChange={ff('action')} placeholder="What specific action will you take this week?" style={{...INP,minHeight:56,resize:'vertical'}}/>
            </F>
            <F label="💬 Best quote (optional)">
              <input value={form.quote} onChange={ff('quote')} placeholder="The most powerful thing said..." style={INP}/>
            </F>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={submit} style={BTN_ADD}>{editId?'Save':'Log episode'}</button>
            <button onClick={()=>{setShowForm(false);setEditId(null)}} style={BTN_C}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search episodes..." style={{flex:1,minWidth:160,padding:'6px 10px',border:'0.5px solid #c8b400',borderRadius:8,fontSize:11,fontFamily:'inherit',background:'#fffde0'}}/>
        <select value={podFilter} onChange={e=>setPodFilter(e.target.value)} style={{...INP,width:'auto',padding:'6px 10px'}}>
          <option value="all">All podcasts</option>
          {PODCASTS.map(p=><option key={p}>{p}</option>)}
        </select>
        <select value={topicFilter} onChange={e=>setTopicFilter(e.target.value)} style={{...INP,width:'auto',padding:'6px 10px'}}>
          <option value="all">All topics</option>
          {TOPICS.map(t=><option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Episodes */}
      {filtered.length===0&&(
        <div style={{textAlign:'center',padding:40,color:'#bbb',fontSize:12}}>
          {items.length===0?'No episodes logged yet — add your first one!':'No results.'}
        </div>
      )}
      <div style={{display:'grid',gap:8}}>
        {filtered.map(item=><EpisodeCard key={item.id} item={item} onDelete={onDelete} onEdit={startEdit}/>)}
      </div>
    </div>
  )
}

function F({label,children}){return <div><label style={{display:'block',fontSize:10,color:'#888',marginBottom:3}}>{label}</label>{children}</div>}
const INP={width:'100%',padding:'7px 9px',border:'0.5px solid #c8b400',borderRadius:8,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box'}
const BTN_ADD={padding:'7px 16px',background:'#ffe600',border:'none',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00'}
const BTN_C={padding:'7px 14px',background:'transparent',border:'0.5px solid #ddd',borderRadius:8,cursor:'pointer',fontSize:11,color:'#888'}

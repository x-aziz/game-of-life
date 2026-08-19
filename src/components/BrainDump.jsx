import { useState } from 'react'

const TODAY = new Date().toISOString().slice(0,10)
const TAGS  = ['motivation','business','english','tech','life','family','ielts','uk','networking']

export default function BrainDump({ entries, onAdd, onDelete, onEdit }) {
  const [dumpText,   setDumpText]   = useState('')
  const [lessonText, setLessonText] = useState('')
  const [dumpTags,   setDumpTags]   = useState([])
  const [search,     setSearch]     = useState('')
  const [tagFilter,  setTagFilter]  = useState('all')
  const [editingId,  setEditingId]  = useState(null)
  const [editText,   setEditText]   = useState('')

  const dumps   = entries.filter(e=>e.type==='dump'||!e.type)
  const lessons = entries.filter(e=>e.type==='lesson')

  function filt(arr) {
    return arr.filter(e=>{
      const ms=!search||(e.text||'').toLowerCase().includes(search.toLowerCase())
      const mt=tagFilter==='all'||(e.tags||[]).includes(tagFilter)
      return ms&&mt
    })
  }

  function toggleTag(t) { setDumpTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]) }
  function saveDump()   { if(!dumpText.trim())return; onAdd({type:'dump',date:TODAY,text:dumpText.trim(),tags:dumpTags}); setDumpText('');setDumpTags([]) }
  function saveLesson() { if(!lessonText.trim())return; onAdd({type:'lesson',date:TODAY,text:lessonText.trim(),tags:[]}); setLessonText('') }

  function startEdit(e) { setEditingId(e.id); setEditText(e.text) }
  function confirmEdit(id) { onEdit(id,editText); setEditingId(null) }

  return (
    <div style={{ padding:12, fontFamily:'Inter, system-ui, sans-serif' }}>
      <div style={{ display:'flex',gap:8,marginBottom:12 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search entries..." style={{ flex:1,padding:'7px 12px',border:'1px solid #c8b400',borderRadius:8,fontSize:11,fontFamily:'inherit',background:'#fffde0' }}/>
        <select value={tagFilter} onChange={e=>setTagFilter(e.target.value)} style={{ padding:'7px 10px',border:'1px solid #c8b400',borderRadius:8,fontSize:11,fontFamily:'inherit',background:'#fffde0' }}>
          <option value="all">All tags</option>
          {TAGS.map(t=><option key={t} value={t}>#{t}</option>)}
        </select>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
        {/* Brain dump */}
        <div>
          <div style={COL_TITLE}>🧠 Brain dump</div>
          <textarea value={dumpText} onChange={e=>setDumpText(e.target.value)} placeholder="Empty your mind — write anything, no filter..." style={TA}/>
          <div style={{ display:'flex',flexWrap:'wrap',gap:4,margin:'6px 0' }}>
            {TAGS.map(t=><button key={t} onClick={()=>toggleTag(t)} style={{ padding:'2px 8px',borderRadius:12,fontSize:10,cursor:'pointer',background:dumpTags.includes(t)?'#ffe600':'transparent',border:`0.5px solid ${dumpTags.includes(t)?'#c8b400':'#ddd'}`,color:dumpTags.includes(t)?'#5a4a00':'#999' }}>#{t}</button>)}
          </div>
          <button onClick={saveDump} style={BTN}>Save entry</button>
          <div style={{ marginTop:12 }}>
            {filt(dumps).map(e=><Card key={e.id} entry={e} onDelete={onDelete} bg="#fffde0" editingId={editingId} editText={editText} setEditText={setEditText} onStartEdit={startEdit} onConfirmEdit={confirmEdit}/>)}
          </div>
        </div>

        {/* Lessons */}
        <div>
          <div style={COL_TITLE}>💡 Lessons of the day</div>
          <textarea value={lessonText} onChange={e=>setLessonText(e.target.value)} placeholder={'What did you learn today?\nWhat would you do differently?\nKey insight...'} style={TA}/>
          <button onClick={saveLesson} style={BTN}>Save lesson</button>
          <div style={{ marginTop:12 }}>
            {filt(lessons).map(e=><Card key={e.id} entry={e} onDelete={onDelete} bg="#f0fff4" editingId={editingId} editText={editText} setEditText={setEditText} onStartEdit={startEdit} onConfirmEdit={confirmEdit}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ entry, onDelete, bg, editingId, editText, setEditText, onStartEdit, onConfirmEdit }) {
  const isEditing = editingId===entry.id
  return (
    <div style={{ background:bg,border:'0.5px solid #e0d800',borderRadius:8,padding:10,marginBottom:8,fontSize:11 }}>
      <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
        <span style={{ fontSize:10,color:'#aaa' }}>{entry.date}</span>
        <div style={{ display:'flex',gap:6 }}>
          <button onClick={()=>isEditing?onConfirmEdit(entry.id):onStartEdit(entry)} style={{ background:'none',border:'none',cursor:'pointer',color:'#c8b400',fontSize:12 }}>{isEditing?'💾':'✏️'}</button>
          {isEditing&&<button onClick={()=>setEditText(x=>x)} onMouseDown={()=>{}} style={{ background:'none',border:'none',cursor:'pointer',color:'#aaa',fontSize:11 }}>✕</button>}
          <button onClick={()=>{if(window.confirm('Delete this entry?'))onDelete(entry.id)}} style={{ background:'none',border:'none',cursor:'pointer',color:'#ddd',fontSize:14 }}>×</button>
        </div>
      </div>
      {isEditing ? (
        <textarea value={editText} onChange={e=>setEditText(e.target.value)} autoFocus style={{ width:'100%',minHeight:80,border:'0.5px solid #c8b400',borderRadius:6,padding:6,fontSize:11,fontFamily:'inherit',resize:'vertical',boxSizing:'border-box' }}/>
      ) : (
        <div style={{ whiteSpace:'pre-wrap',lineHeight:1.6,color:'#1a1a1a' }}>{entry.text}</div>
      )}
      {!isEditing&&entry.tags&&entry.tags.length>0&&(
        <div style={{ marginTop:6,display:'flex',flexWrap:'wrap',gap:4 }}>
          {entry.tags.map(t=><span key={t} style={{ padding:'1px 7px',borderRadius:10,background:'#ffe600',color:'#5a4a00',fontSize:9,fontWeight:600 }}>#{t}</span>)}
        </div>
      )}
    </div>
  )
}

const COL_TITLE = { fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:8,paddingBottom:4,borderBottom:'0.5px solid #e0d800' }
const TA = { width:'100%',minHeight:88,border:'1px solid #c8b400',borderRadius:8,padding:8,fontSize:11,resize:'vertical',fontFamily:'inherit',background:'#fffde0',lineHeight:1.6,boxSizing:'border-box' }
const BTN = { padding:'6px 14px',background:'#ffe600',border:'none',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00',marginTop:6 }

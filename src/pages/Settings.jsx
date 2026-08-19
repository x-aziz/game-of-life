import { useState } from 'react'

const PIN_KEY = 'said_os_pin'

export default function Settings({ settings, onSave, userId }) {
  const [form, setForm] = useState({
    dailyBudget: settings?.dailyBudget || 30,
    currency:    settings?.currency    || 'GBP',
    monthlyBudget: settings?.monthlyBudget || 800,
  })
  const [pinForm, setPinForm] = useState({ old:'', new1:'', new2:'' })
  const [pinMsg,  setPinMsg]  = useState('')
  const [saved,   setSaved]   = useState(false)

  function saveSettings() {
    onSave(form)
    setSaved(true)
    setTimeout(()=>setSaved(false),2000)
  }

  function changePIN() {
    const stored = localStorage.getItem(PIN_KEY)
    if (pinForm.old !== stored) { setPinMsg('Wrong current PIN'); return }
    if (pinForm.new1.length !== 6) { setPinMsg('New PIN must be 6 digits'); return }
    if (pinForm.new1 !== pinForm.new2) { setPinMsg("PINs don't match"); return }
    localStorage.setItem(PIN_KEY, pinForm.new1)
    setPinMsg('✅ PIN changed successfully')
    setPinForm({old:'',new1:'',new2:''})
    setTimeout(()=>setPinMsg(''),3000)
  }

  function exportData() {
    const data = {}
    for (let i=0;i<localStorage.length;i++) {
      const k = localStorage.key(i)
      if (k.startsWith('crm_')||k.startsWith('said_')) {
        try { data[k]=JSON.parse(localStorage.getItem(k)) }
        catch { data[k]=localStorage.getItem(k) }
      }
    }
    const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=`said-life-os-backup-${new Date().toISOString().slice(0,10)}.json`; a.click()
    URL.revokeObjectURL(url)
  }

  function importData(e) {
    const file = e.target.files[0]; if(!file)return
    const reader = new FileReader()
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result)
        Object.entries(data).forEach(([k,v])=>localStorage.setItem(k,JSON.stringify(v)))
        alert('✅ Data imported successfully. Refresh the page.')
      } catch { alert('❌ Invalid backup file') }
    }
    reader.readAsText(file)
  }

  return (
    <div style={{ padding:20, fontFamily:'Inter,system-ui,sans-serif', maxWidth:600, margin:'0 auto' }}>
      <h2 style={{ fontSize:16,fontWeight:700,color:'#5a4a00',marginBottom:20 }}>⚙️ Settings</h2>

      {/* General settings */}
      <div style={CARD}>
        <div style={CARD_TITLE}>General</div>
        <div style={{ display:'grid',gap:12 }}>
          <Field label="Daily budget">
            <div style={{ display:'flex',gap:8,alignItems:'center' }}>
              <select value={form.currency} onChange={e=>setForm(p=>({...p,currency:e.target.value}))} style={INP}>
                <option value="GBP">£ GBP</option><option value="EUR">€ EUR</option><option value="DZD">DZD</option><option value="USD">$ USD</option>
              </select>
              <input type="number" value={form.dailyBudget} onChange={e=>setForm(p=>({...p,dailyBudget:parseFloat(e.target.value)||0}))} style={{...INP,width:100}} placeholder="30"/>
            </div>
          </Field>
          <Field label="Monthly budget">
            <input type="number" value={form.monthlyBudget} onChange={e=>setForm(p=>({...p,monthlyBudget:parseFloat(e.target.value)||0}))} style={INP} placeholder="800"/>
          </Field>
        </div>
        <button onClick={saveSettings} style={{...BTN,marginTop:12}}>{saved?'✅ Saved!':'Save settings'}</button>
      </div>

      {/* Change PIN */}
      <div style={CARD}>
        <div style={CARD_TITLE}>🔒 Change PIN</div>
        <div style={{ display:'grid',gap:8 }}>
          <Field label="Current PIN">
            <input type="password" maxLength={6} value={pinForm.old} onChange={e=>setPinForm(p=>({...p,old:e.target.value.replace(/\D/g,'')}))} style={INP} placeholder="••••••"/>
          </Field>
          <Field label="New PIN (6 digits)">
            <input type="password" maxLength={6} value={pinForm.new1} onChange={e=>setPinForm(p=>({...p,new1:e.target.value.replace(/\D/g,'')}))} style={INP} placeholder="••••••"/>
          </Field>
          <Field label="Confirm new PIN">
            <input type="password" maxLength={6} value={pinForm.new2} onChange={e=>setPinForm(p=>({...p,new2:e.target.value.replace(/\D/g,'')}))} style={INP} placeholder="••••••"/>
          </Field>
        </div>
        {pinMsg&&<div style={{ marginTop:8,fontSize:11,color:pinMsg.startsWith('✅')?'#228b22':'#cc3333' }}>{pinMsg}</div>}
        <button onClick={changePIN} style={{...BTN,marginTop:12}}>Change PIN</button>
      </div>

      {/* Data backup */}
      <div style={CARD}>
        <div style={CARD_TITLE}>💾 Data backup</div>
        <p style={{ fontSize:11,color:'#888',marginBottom:12 }}>Export all your data as a JSON file. Import to restore on another device.</p>
        <div style={{ display:'flex',gap:8 }}>
          <button onClick={exportData} style={BTN}>📥 Export backup</button>
          <label style={{...BTN,cursor:'pointer'}}>
            📤 Import backup
            <input type="file" accept=".json" onChange={importData} style={{ display:'none' }}/>
          </label>
        </div>
      </div>

      {/* Firebase info */}
      <div style={CARD}>
        <div style={CARD_TITLE}>☁️ Firebase sync</div>
        <p style={{ fontSize:11,color:'#888' }}>
          Status: {userId ? `✅ Connected (ID: ${userId.slice(0,12)}…)` : '⚠️ Offline mode'}
        </p>
        <p style={{ fontSize:10,color:'#bbb',marginTop:4 }}>
          Your data syncs automatically when connected. On your phone, open the same URL and enter your PIN.
        </p>
      </div>
    </div>
  )
}

function Field({label,children}){return <div><label style={{display:'block',fontSize:10,color:'#888',marginBottom:3}}>{label}</label>{children}</div>}

const CARD={background:'white',border:'0.5px solid #e0d800',borderRadius:10,padding:14,marginBottom:12}
const CARD_TITLE={fontSize:12,fontWeight:600,color:'#5a4a00',marginBottom:10,paddingBottom:4,borderBottom:'0.5px solid #f0e800'}
const INP={width:'100%',padding:'7px 10px',border:'0.5px solid #c8b400',borderRadius:8,fontSize:11,fontFamily:'inherit',background:'white',boxSizing:'border-box'}
const BTN={padding:'7px 16px',background:'#ffe600',border:'none',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,color:'#5a4a00'}

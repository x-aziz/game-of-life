import { useState, useEffect, useRef } from 'react'

const PIN_KEY = 'said_os_pin'

export function PinLock({ children }) {
  const [mode,     setMode]     = useState('check') // 'check' | 'setup' | 'unlocked'
  const [pin,      setPin]      = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [step,     setStep]     = useState(1)
  const [error,    setError]    = useState('')
  const [attempts, setAttempts] = useState(0)
  const [blocked,  setBlocked]  = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(PIN_KEY)
    setMode(stored ? 'check' : 'setup')
  }, [])

  // expose lock function globally so sidebar can call it
  useEffect(() => {
    window.__lockApp = () => { setMode('check'); setPin(''); setConfirm(''); setStep(1) }
  }, [])

  function digit(d) {
    if (blocked) return
    setError('')
    if (mode === 'setup') {
      if (step === 1) {
        const v = pin + d; setPin(v)
        if (v.length === 6) setStep(2)
      } else {
        const v = confirm + d; setConfirm(v)
        if (v.length === 6) finishSetup(pin, v)
      }
    } else {
      const v = pin + d; setPin(v)
      if (v.length === 6) checkPin(v)
    }
  }

  function del() {
    setError('')
    if (mode === 'setup') {
      if (step === 1) setPin(p=>p.slice(0,-1))
      else setConfirm(p=>p.slice(0,-1))
    } else setPin(p=>p.slice(0,-1))
  }

  function finishSetup(p1, p2) {
    if (p1 === p2) { localStorage.setItem(PIN_KEY, p1); setMode('unlocked') }
    else { setError("PINs don't match — try again"); setConfirm(''); setStep(1); setPin('') }
  }

  function checkPin(entered) {
    if (entered === localStorage.getItem(PIN_KEY)) {
      setAttempts(0); setMode('unlocked')
    } else {
      const a = attempts + 1; setAttempts(a); setPin('')
      if (a >= 5) {
        setBlocked(true); setError('Too many attempts. Wait 30s.')
        setTimeout(() => { setBlocked(false); setAttempts(0); setError('') }, 30000)
      } else {
        setError(`Wrong PIN — ${5-a} attempts left`)
      }
    }
  }

  if (mode === 'unlocked') return <>{children}</>

  const cur = mode === 'setup' ? (step === 1 ? pin : confirm) : pin
  const label = mode === 'setup'
    ? (step === 1 ? 'Create your 6-digit PIN' : 'Confirm your PIN')
    : 'Enter your PIN'

  return (
    <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#fffde0',fontFamily:'Inter,system-ui,sans-serif',userSelect:'none' }}>
      <div style={{ fontSize:48,marginBottom:10 }}>📋</div>
      <h1 style={{ fontSize:22,fontWeight:700,color:'#5a4a00',marginBottom:4 }}>Said's Life OS</h1>
      <p style={{ fontSize:12,color:'#aaa',marginBottom:32 }}>{label}</p>

      {/* PIN dots */}
      <div style={{ display:'flex',gap:14,marginBottom:24 }}>
        {[0,1,2,3,4,5].map(i=>(
          <div key={i} style={{
            width:16,height:16,borderRadius:'50%',
            background:i<cur.length?'#c8b400':'transparent',
            border:'2px solid '+(i<cur.length?'#c8b400':'#d4c800'),
            transition:'background 0.12s',
          }}/>
        ))}
      </div>

      {error && <div style={{ fontSize:12,color:'#cc3333',background:'#fee8e8',padding:'6px 16px',borderRadius:8,marginBottom:16 }}>{error}</div>}

      {/* Keypad */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,72px)',gap:10 }}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d,i)=>(
          <button key={i}
            onClick={()=>d==='⌫'?del():d!==''?digit(String(d)):null}
            disabled={blocked||d===''}
            style={{
              width:72,height:72,borderRadius:36,
              border:d===''?'none':'0.5px solid #e0d800',
              background:d==='⌫'?'#fff8e0':d===''?'transparent':'white',
              fontSize:d==='⌫'?20:22,fontWeight:600,
              color:d==='⌫'?'#c8b400':'#5a4a00',
              cursor:d===''||blocked?'default':'pointer',
              boxShadow:d!==''?'0 2px 8px rgba(200,180,0,0.12)':'none',
              transition:'transform 0.08s',
            }}
            onMouseDown={e=>{if(d!=='')e.currentTarget.style.transform='scale(0.9)'}}
            onMouseUp={e=>{e.currentTarget.style.transform='scale(1)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'}}
          >{d}</button>
        ))}
      </div>

      {mode==='check'&&(
        <button onClick={()=>{localStorage.removeItem(PIN_KEY);setMode('setup');setPin('');setConfirm('');setStep(1);setError('')}}
          style={{ marginTop:28,fontSize:11,color:'#c8b400',background:'none',border:'none',cursor:'pointer',textDecoration:'underline' }}>
          Forgot PIN? Reset
        </button>
      )}
    </div>
  )
}

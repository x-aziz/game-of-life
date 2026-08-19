import { useState } from 'react'

export default function Money() {
  return (
    <div style={{ padding:24, fontFamily:'Inter,system-ui,sans-serif', maxWidth:900, margin:'0 auto' }}>
      <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:24 }}>
        <span style={{ fontSize:28 }}>💰</span>
        <div>
          <h2 style={{ fontSize:18,fontWeight:700,color:'#5a4a00',margin:0 }}>Money & Cash Flow</h2>
          <p style={{ fontSize:11,color:'#aaa',margin:0,marginTop:2 }}>Coming soon — Said will fill this in</p>
        </div>
      </div>
      <div style={{ background:'white',border:'0.5px solid #e0d800',borderRadius:12,padding:32,textAlign:'center' }}>
        <div style={{ fontSize:48,marginBottom:12 }}>💰</div>
        <p style={{ fontSize:13,color:'#888',marginBottom:8 }}>This module is ready to be built.</p>
        <p style={{ fontSize:11,color:'#bbb' }}>Tell Claude what you want here and it will be built immediately.</p>
      </div>
    </div>
  )
}

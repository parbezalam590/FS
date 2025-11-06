
import React, {useEffect, useState} from 'react'

export default function App(){
  const [resp, setResp] = useState(null)

  useEffect(()=>{
    const backend = import.meta.env.VITE_BACKEND_URL || ''
    const url = backend ? `${backend}/api/hello` : '/api/hello'
    fetch(url).then(r=>r.json()).then(setResp).catch(err=>setResp({ error: String(err) }))
  },[])

  return (
    <div style={{fontFamily:'system-ui,Segoe UI, Roboto',padding:20}}>
      <h1>Simple Fullstack App</h1>
      <p>This frontend calls the backend and shows which backend instance served the request.</p>
      <pre style={{background:'#f6f8fa',padding:12}}>{JSON.stringify(resp, null, 2)}</pre>
      <p>Build with Vite. Set VITE_BACKEND_URL at build time to point to your ALB (e.g. https://my-alb-123.elb.amazonaws.com)</p>
    </div>
  )
}

import React, { useState } from 'react'
import Class from './components/Class'
<%= stylePathh %>


export default function App() {
  const [count, setCount] = useState<string>('')


  return (
    <div>
      <h2 className='box'>webpack5-react18-tsaaa</h2>
      <h2>{process.env.NODE_ENV}</h2>
      <Class />
      <input value={count} onChange={(e) => { setCount(e.target.value) }} />
      <input type="text" />
      {/* <img src={a} alt="" />
      <img src={b} alt="" /> */}
      <div className='abc'></div>
    </div>
  )
}

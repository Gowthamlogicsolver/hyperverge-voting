import { useState } from 'react'
import Voting from './Voting';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Voting />
    </>
  )
}

export default App

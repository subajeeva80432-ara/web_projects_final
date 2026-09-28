import { useState } from 'react'
import './App.css'

function Calculator() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState(null)

  const add = () => setResult(Number(num1) + Number(num2))
  const sub = () => setResult(Number(num1) - Number(num2))
  const mul = () => setResult(Number(num1) * Number(num2))
  const div = () => {
    if (Number(num2) === 0) {
      setResult('Cannot divide by zero')
    } else {
      setResult(Number(num1) / Number(num2))
    }
  }

  const clear = () => {
    setNum1('')
    setNum2('')
    setResult(null)
  }

  return (
    <div className="calculator">
      <h2>Calculator 1</h2>
      <div className="inputs">
        <input
          type="number"
          placeholder="First Number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          placeholder="Second Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={add}>+</button>
        <button onClick={sub}>-</button>
        <button onClick={mul}>*</button>
        <button onClick={div}>/</button>
        <button className="clear" onClick={clear}>Clear</button>
      </div>
      {result !== null && (
        <div className="result">
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  )
}

export default Calculator

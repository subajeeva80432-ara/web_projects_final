import { useState } from 'react'

function Calculator2() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [fresh, setFresh] = useState(false)

  const num = (v) => {
    if (fresh) {
      setDisplay(v)
      setFresh(false)
    } else {
      setDisplay(display === '0' ? v : display + v)
    }
  }

  const dot = () => {
    if (fresh) { setDisplay('0.'); setFresh(false); return }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const operator = (o) => {
    if (prev !== null && op && !fresh) calculate()
    setPrev(parseFloat(display))
    setOp(o)
    setFresh(true)
  }

  const calculate = () => {
    if (prev === null || !op) return
    const cur = parseFloat(display)
    let r
    switch (op) {
      case '+': r = prev + cur; break
      case '-': r = prev - cur; break
      case '*': r = prev * cur; break
      case '/': r = cur === 0 ? 'Error' : prev / cur; break
      default: r = cur
    }
    setDisplay(String(r))
    setPrev(null)
    setOp(null)
    setFresh(true)
  }

  const ac = () => { setDisplay('0'); setPrev(null); setOp(null); setFresh(false) }
  const c = () => { setDisplay('0'); setFresh(false) }

  return (
    <div className="calc">
      <h2>Calculator 2</h2>
      <div className="screen">{display}</div>
      <div className="grid">
        <button className="btn fn" onClick={ac}>AC</button>
        <button className="btn fn" onClick={c}>C</button>
        <button className="btn fn" onClick={() => setDisplay(String(-parseFloat(display)))}>+/-</button>
        <button className={`btn op ${op === '/' && fresh ? 'active' : ''}`} onClick={() => operator('/')}>/</button>

        <button className="btn" onClick={() => num('7')}>7</button>
        <button className="btn" onClick={() => num('8')}>8</button>
        <button className="btn" onClick={() => num('9')}>9</button>
        <button className={`btn op ${op === '*' && fresh ? 'active' : ''}`} onClick={() => operator('*')}>*</button>

        <button className="btn" onClick={() => num('4')}>4</button>
        <button className="btn" onClick={() => num('5')}>5</button>
        <button className="btn" onClick={() => num('6')}>6</button>
        <button className={`btn op ${op === '-' && fresh ? 'active' : ''}`} onClick={() => operator('-')}>-</button>

        <button className="btn" onClick={() => num('1')}>1</button>
        <button className="btn" onClick={() => num('2')}>2</button>
        <button className="btn" onClick={() => num('3')}>3</button>
        <button className={`btn op ${op === '+' && fresh ? 'active' : ''}`} onClick={() => operator('+')}>+</button>

        <button className="btn zero" onClick={() => num('0')}>0</button>
        <button className="btn" onClick={dot}>.</button>
        <button className="btn eq" onClick={calculate}>=</button>
      </div>
    </div>
  )
}

export default Calculator2

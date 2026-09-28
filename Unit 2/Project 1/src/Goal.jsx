import './Goal.css'

function Goal({ heading, goal }) {
  return (
    <section className="goal-card">
      <h2 className="goal-heading">{heading}</h2>
      <p className="goal-text">🎯 {goal}</p>
    </section>
  )
}

export default Goal

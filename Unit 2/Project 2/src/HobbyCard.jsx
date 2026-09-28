import './HobbyCard.css'

function HobbyCard({ icon, title, description, level, tag }) {
  return (
    <article className="hobby-card">
      <div className="hobby-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="hobby-title">{title}</h3>
      <p className="hobby-description">{description}</p>
      {tag && <span className="hobby-tag">{tag}</span>}
      <div className="hobby-footer">
        <span className="hobby-level">Level: {level}</span>
      </div>
    </article>
  )
}

export default HobbyCard

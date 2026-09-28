import './Profile.css'

function Profile({ name, role, location, email, languages }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <section className="profile-card">
      <div className="profile-avatar">{initials}</div>
      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        <span className="profile-role">{role}</span>
        <div className="profile-details">
          <span className="profile-detail">📍 {location}</span>
          <span className="profile-detail">✉️ {email}</span>
        </div>
        <div className="profile-languages">
          {languages.map((lang) => (
            <span key={lang} className="profile-language">
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Profile

import './Header.css'

function Header({ title, subtitle }) {
  return (
    <header className="intro-header">
      <h1 className="intro-title">{title}</h1>
      <p className="intro-subtitle">{subtitle}</p>
    </header>
  )
}

export default Header

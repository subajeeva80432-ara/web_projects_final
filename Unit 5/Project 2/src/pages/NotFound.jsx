import { Link } from 'react-router-dom'
import { ArrowLeft, Compass, Home as HomeIcon } from 'lucide-react'

const quickLinks = [
  { to: '/students', label: 'Student directory' },
  { to: '/report-card', label: 'Report card' },
  { to: '/grades', label: 'Grade analysis' },
]

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-code">404</span>
      <div className="notfound-icon"><Compass size={30} /></div>
      <h1>Page not found</h1>
      <p>
        The route you followed does not exist in this report card portal. It may have been
        moved or the link may be broken.
      </p>

      <div className="notfound-actions">
        <Link className="primary-button" to="/home"><HomeIcon size={17} /> Back to home</Link>
        <Link className="secondary-button" to="/students"><ArrowLeft size={16} /> All students</Link>
      </div>

      <div className="notfound-links">
        {quickLinks.map((link) => <Link key={link.to} className="ghost-link" to={link.to}>{link.label}</Link>)}
      </div>
    </div>
  )
}

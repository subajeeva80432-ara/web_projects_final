import { useState } from 'react'
import {
  BarChart3,
  Bell,
  ClipboardList,
  GraduationCap,
  House,
  Search,
  Users,
} from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getStudentById } from '../data/students.js'

const navItems = [
  { to: '/home', label: 'Home', icon: House },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/report-card', label: 'Report Card', icon: ClipboardList },
  { to: '/grades', label: 'Grades', icon: BarChart3 },
]

const routeLabels = {
  home: 'Home',
  students: 'Students',
  'report-card': 'Report Card',
  grades: 'Grades',
}

function useCrumbs() {
  const { pathname } = useLocation()
  const [root, param] = pathname.split('/').filter(Boolean)
  const crumbs = [{ label: routeLabels[root] ?? 'Not found', to: root ? `/${root}` : '/' }]

  if (root === 'report-card' && param) {
    const student = getStudentById(param)
    crumbs.push({ label: student ? student.name : 'Unknown student', to: pathname })
  }

  return crumbs
}

export default function Layout() {
  const crumbs = useCrumbs()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submitSearch = (event) => {
    event.preventDefault()
    navigate(`/students?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><GraduationCap size={17} /></span>
          <span>reportly</span>
        </div>

        <div className="term-card">
          <span className="term-label">Academic term</span>
          <strong>Term I · 2026</strong>
          <span>Session 2025 – 2026</span>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          <p className="nav-label">Pages</p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="router-note">
            <span className="router-note-icon">/</span>
            <strong>React Router</strong>
            <span>4 routed pages · nested layout</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            {crumbs.map((crumb, index) => (
              <span key={crumb.to} className="crumb">
                {index > 0 && <i>/</i>}
                {index === crumbs.length - 1 ? <strong>{crumb.label}</strong> : crumb.label}
              </span>
            ))}
          </div>

          <div className="topbar-actions">
            <form className="search-box" onSubmit={submitSearch} role="search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search students..."
                aria-label="Search students"
              />
            </form>
            <button className="icon-button light" aria-label="Notifications">
              <Bell size={17} />
            </button>
            <div className="mini-avatar">PR</div>
          </div>
        </header>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="content-wrap">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

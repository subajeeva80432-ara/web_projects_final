import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronDown, Search, SlidersHorizontal, Users, X } from 'lucide-react'
import { classSections, initials, students } from '../data/students.js'

const sortOptions = [
  { value: 'rank', label: 'Rank (high to low)' },
  { value: 'name', label: 'Name (A to Z)' },
  { value: 'class', label: 'Class' },
  { value: 'attendance', label: 'Attendance' },
]

export default function Students() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const className = searchParams.get('class') ?? 'all'
  const sort = searchParams.get('sort') ?? 'rank'

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all' || (key === 'sort' && value === 'rank')) next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  const clearFilters = () => setSearchParams({})

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    const filtered = students.filter((student) => {
      const matchesTerm = !term
        || `${student.name} ${student.className} ${student.email}`.toLowerCase().includes(term)
      const matchesClass = className === 'all' || student.className === className
      return matchesTerm && matchesClass
    })

    const sorted = [...filtered]
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'class') sorted.sort((a, b) => a.className.localeCompare(b.className) || b.percent - a.percent)
    else if (sort === 'attendance') sorted.sort((a, b) => b.attendancePercent - a.attendancePercent)
    else sorted.sort((a, b) => b.percent - a.percent)
    return sorted
  }, [className, query, sort])

  const hasFilters = Boolean(query) || className !== 'all' || sort !== 'rank'

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow"><span className="status-dot" /> Student directory</p>
          <h1>All students</h1>
          <p className="subtle">Search, filter and open a full report card for any student.</p>
        </div>
        <Link className="primary-button" to="/grades">
          <SlidersHorizontal size={17} /> Grade analysis
        </Link>
      </section>

      <section className="toolbar">
        <div className="search-box solid">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => updateParam('q', event.target.value)}
            placeholder="Search by name, class or email..."
            aria-label="Search students"
          />
        </div>

        <label className="select-wrap">
          <span className="sr-only">Filter by class</span>
          <select value={className} onChange={(event) => updateParam('class', event.target.value)}>
            <option value="all">All classes</option>
            {classSections.map((section) => <option key={section} value={section}>{section}</option>)}
          </select>
          <ChevronDown size={15} />
        </label>

        <label className="select-wrap">
          <span className="sr-only">Sort students</span>
          <select value={sort} onChange={(event) => updateParam('sort', event.target.value)}>
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <ChevronDown size={15} />
        </label>

        {hasFilters && (
          <button className="clear-button" onClick={clearFilters}>
            <X size={14} /> Clear
          </button>
        )}
      </section>

      <p className="result-count">
        Showing <strong>{visible.length}</strong> of {students.length} students
        {query && <> matching <strong>“{query}”</strong></>}
        {className !== 'all' && <> in <strong>{className}</strong></>}
      </p>

      {visible.length ? (
        <section className="student-grid">
          {visible.map((student, index) => (
            <Link key={student.id} className="student-card" to={`/report-card/${student.id}`}>
              <div className="student-card-top">
                <span className="avatar large" data-tone={index % 4}>{initials(student.name)}</span>
                <span className={`grade-pill ${student.grade.tone}`}>{student.grade.letter}</span>
              </div>
              <h3>{student.name}</h3>
              <p>{student.className} · Roll {student.roll}</p>

              <div className="student-metrics">
                <div>
                  <span>Overall</span>
                  <strong>{student.percent}%</strong>
                </div>
                <div>
                  <span>Attendance</span>
                  <strong>{student.attendancePercent}%</strong>
                </div>
              </div>

              <div className="progress-track">
                <span style={{ width: `${student.percent}%` }} />
              </div>

              <span className="card-link">View report card <ArrowRight size={14} /></span>
            </Link>
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <div><Users size={28} /></div>
          <h3>No students found</h3>
          <p>Try a different name, class or clear the filters.</p>
          <button className="secondary-button" onClick={clearFilters}>Reset filters</button>
        </div>
      )}
    </>
  )
}

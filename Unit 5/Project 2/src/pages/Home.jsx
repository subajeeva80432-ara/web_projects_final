import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  CalendarCheck,
  GraduationCap,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react'
import {
  classAverage,
  classBreakdown,
  initials,
  students,
  subjectStats,
  topperOf,
} from '../data/students.js'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const toppers = students.slice(0, 5)
const topper = topperOf()
const average = classAverage()
const averageAttendance = Math.round(
  students.reduce((sum, student) => sum + student.attendancePercent, 0) / students.length,
)

export default function Home() {
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow"><span className="status-dot" /> {today}</p>
          <h1>Good morning, Priya <span>✦</span></h1>
          <p className="subtle">Here is how the class is performing this term.</p>
        </div>
        <Link className="primary-button" to={`/report-card/${topper.id}`}>
          <Award size={18} /> Open report card
        </Link>
      </section>

      <section className="summary-grid">
        <div className="average-card">
          <div className="card-topline">
            <span className="icon-bubble gold"><TrendingUp size={20} /></span>
            <span className="muted-label">Overall class average</span>
          </div>
          <div className="points-number">{average}<small> %</small></div>
          <div className="points-foot">
            <span>across {students.length} students</span>
            <span className="positive">+4% vs last term</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue"><Users size={19} /></div>
          <span className="muted-label">Students enrolled</span>
          <strong>{students.length}</strong>
          <span className="stat-detail">4 classes · 10 to 12</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold"><Trophy size={19} /></div>
          <span className="muted-label">Term topper</span>
          <strong>{topper.percent}%</strong>
          <span className="stat-detail">{topper.name} · {topper.className}</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green"><CalendarCheck size={19} /></div>
          <span className="muted-label">Average attendance</span>
          <strong>{averageAttendance}%</strong>
          <span className="stat-detail">of 190 working days</span>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="section-heading">
            <div>
              <h2>Top performers</h2>
              <p>Ranked by overall percentage</p>
            </div>
            <Link className="text-link" to="/students">View all <ArrowRight size={14} /></Link>
          </div>

          <div className="rank-list">
            {toppers.map((student, index) => (
              <Link key={student.id} className="rank-row" to={`/report-card/${student.id}`}>
                <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span>
                <span className="avatar" data-tone={index % 4}>{initials(student.name)}</span>
                <span className="rank-copy">
                  <strong>{student.name}</strong>
                  <span>Roll {student.roll} · {student.className}</span>
                </span>
                <span className={`grade-pill ${student.grade.tone}`}>{student.grade.letter}</span>
                <span className="rank-percent">{student.percent}%</span>
                <ArrowRight size={15} className="row-arrow" />
              </Link>
            ))}
          </div>
        </section>

        <aside className="side-column">
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Subject performance</h2>
                <p>Class average per subject</p>
              </div>
            </div>
            <div className="bar-list">
              {subjectStats().map((subject) => (
                <div key={subject.name} className="bar-row">
                  <div className="bar-label">
                    <span>{subject.name}</span>
                    <strong>{subject.average}%</strong>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${subject.average}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Link className="secondary-button full" to="/grades">
              Open grade analysis <ArrowRight size={15} />
            </Link>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Class averages</h2>
                <p>Section wise performance</p>
              </div>
            </div>
            <div className="mini-table">
              {classBreakdown().map((row) => (
                <div key={row.section} className="mini-table-row">
                  <span className="class-tag">{row.section}</span>
                  <span className="mini-table-bar">
                    <span style={{ width: `${row.average}%` }} />
                  </span>
                  <strong>{row.average}%</strong>
                </div>
              ))}
            </div>
            <Link className="ghost-link" to="/students">
              <GraduationCap size={15} /> Browse student directory
            </Link>
          </section>
        </aside>
      </div>
    </>
  )
}

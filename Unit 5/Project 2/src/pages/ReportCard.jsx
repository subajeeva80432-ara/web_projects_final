import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarCheck,
  ChevronDown,
  Mail,
  Printer,
  Quote,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import { getStudentById, initials, prevNextStudent, students, subjectRows } from '../data/students.js'

function statusFor(marks) {
  if (marks >= 85) return { label: 'Excellent', tone: 'top' }
  if (marks >= 70) return { label: 'Good', tone: 'good' }
  if (marks >= 50) return { label: 'Average', tone: 'watch' }
  return { label: 'Needs work', tone: 'fail' }
}

export default function ReportCard() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const student = studentId ? getStudentById(studentId) : students[0]

  if (!student) {
    return (
      <div className="empty-state tall">
        <div><UserRound size={28} /></div>
        <h3>Report card not found</h3>
        <p>No student exists with the id “{studentId}”.</p>
        <Link className="primary-button" to="/students"><ArrowLeft size={16} /> Back to students</Link>
      </div>
    )
  }

  const rows = subjectRows(student)
  const { previous, next } = prevNextStudent(student.id)
  const best = rows.reduce((top, row) => (row.marks > top.marks ? row : top), rows[0])
  const weakest = rows.reduce((low, row) => (row.marks < low.marks ? row : low), rows[0])

  return (
    <>
      <section className="report-header">
        <div className="report-header-left">
          <Link className="back-link" to="/students"><ArrowLeft size={15} /> All students</Link>
          <div className="report-identity">
            <span className="avatar xlarge" data-tone={student.id.charCodeAt(student.id.length - 1) % 4}>
              {initials(student.name)}
            </span>
            <div>
              <h1>{student.name}</h1>
              <p className="subtle">{student.className} · Roll number {student.roll}</p>
              <div className="report-tags">
                <span className="tag"><Mail size={13} /> {student.email}</span>
                <span className="tag"><CalendarCheck size={13} /> {student.attendancePercent}% attendance</span>
                <span className="tag"><Award size={13} /> {student.grade.label}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-header-right">
          <div className="ring" style={{ '--value': `${student.percent * 3.6}deg` }}>
            <div className="ring-inner">
              <strong>{student.percent}%</strong>
              <span>overall</span>
            </div>
          </div>
          <div className="header-actions">
            <label className="select-wrap">
              <span className="sr-only">Switch student</span>
              <select
                value={student.id}
                onChange={(event) => navigate(`/report-card/${event.target.value}`)}
              >
                {students.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
            <button className="secondary-button" onClick={() => window.print()}>
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </section>

      <div className="report-grid">
        <section className="panel">
          <div className="section-heading">
            <div>
              <h2>Subject wise marks</h2>
              <p>Out of 100 for each subject</p>
            </div>
            <span className={`grade-pill ${student.grade.tone}`}>{student.grade.letter}</span>
          </div>

          <div className="marks-table" role="table">
            <div className="marks-row head" role="row">
              <span role="columnheader">Subject</span>
              <span role="columnheader">Marks</span>
              <span role="columnheader" className="score-cell">Score</span>
              <span role="columnheader">Grade</span>
              <span role="columnheader">Status</span>
            </div>
            {rows.map((row) => {
              const status = statusFor(row.marks)
              return (
                <div className="marks-row" role="row" key={row.name}>
                  <span role="cell" className="subject-name">{row.name}</span>
                  <span role="cell" className="marks-value">{row.marks}</span>
                  <span role="cell" className="score-cell">
                    <span className="progress-track">
                      <span style={{ width: `${row.marks}%` }} />
                    </span>
                  </span>
                  <span role="cell" className={`grade-pill ${row.grade.tone}`}>{row.grade.letter}</span>
                  <span role="cell"><span className={`status-pill ${status.tone}`}>{status.label}</span></span>
                </div>
              )
            })}
            <div className="marks-row total" role="row">
              <span role="cell" className="subject-name">Total</span>
              <span role="cell" className="marks-value">
                {rows.reduce((sum, row) => sum + row.marks, 0)} / {rows.length * 100}
              </span>
              <span role="cell" className="score-cell" />
              <span role="cell" colSpan={2}>Average {student.percent}% · {student.grade.label}</span>
            </div>
          </div>

          <div className="report-nav">
            {previous ? (
              <Link className="ghost-link" to={`/report-card/${previous.id}`}>
                <ArrowLeft size={15} /> {previous.name}
              </Link>
            ) : <span />}
            {next && (
              <Link className="ghost-link" to={`/report-card/${next.id}`}>
                {next.name} <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </section>

        <aside className="side-column">
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Attendance</h2>
                <p>Term I · 2026</p>
              </div>
              <CalendarCheck size={19} className="section-icon" />
            </div>
            <div className="attendance-value">
              <strong>{student.attendancePercent}%</strong>
              <span>{student.attendance.present} days present of {student.attendance.total}</span>
            </div>
            <div className="progress-track tall">
              <span style={{ width: `${student.attendancePercent}%` }} />
            </div>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Highlights</h2>
                <p>Strengths to build on</p>
              </div>
              <TrendingUp size={19} className="section-icon" />
            </div>
            <ul className="fact-list">
              <li><span>Strongest subject</span><strong>{best.name} · {best.marks}%</strong></li>
              <li><span>Needs focus</span><strong>{weakest.name} · {weakest.marks}%</strong></li>
              <li><span>Class position</span><strong>#{students.findIndex((item) => item.id === student.id) + 1} of {students.length}</strong></li>
            </ul>
          </section>

          <section className="panel remark-card">
            <Quote size={17} />
            <p>{student.remark}</p>
            <span>— Class teacher</span>
          </section>
        </aside>
      </div>
    </>
  )
}

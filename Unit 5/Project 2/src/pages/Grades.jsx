import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Medal, Target, TrendingUp, Trophy } from 'lucide-react'
import {
  classBreakdown,
  gradeCounts,
  initials,
  students,
  subjectStats,
} from '../data/students.js'

export default function Grades() {
  const subjects = subjectStats()
  const distribution = gradeCounts()
  const classes = classBreakdown()
  const podium = students.slice(0, 3)

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow"><span className="status-dot" /> Grade analysis</p>
          <h1>Grades &amp; analytics</h1>
          <p className="subtle">Subject averages, grade distribution and section comparison.</p>
        </div>
        <Link className="primary-button" to="/students">
          <BarChart3 size={17} /> Open directory
        </Link>
      </section>

      <section className="podium-grid">
        {podium.map((student, index) => (
          <Link key={student.id} className={`podium-card place-${index + 1}`} to={`/report-card/${student.id}`}>
            <span className="podium-rank">
              {index === 0 ? <Trophy size={17} /> : <Medal size={17} />} #{index + 1}
            </span>
            <span className="avatar xlarge" data-tone={index}>{initials(student.name)}</span>
            <strong>{student.name}</strong>
            <span className="podium-class">{student.className}</span>
            <span className="podium-score">{student.percent}%</span>
            <span className="card-link">Report card <ArrowRight size={14} /></span>
          </Link>
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="section-heading">
            <div>
              <h2>Subject performance</h2>
              <p>Average, best and weakest score per subject</p>
            </div>
            <TrendingUp size={19} className="section-icon" />
          </div>

          <div className="subject-grid">
            {subjects.map((subject) => (
              <div key={subject.name} className="subject-card">
                <div className="subject-card-head">
                  <strong>{subject.name}</strong>
                  <span>{subject.average}% avg</span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${subject.average}%` }} />
                </div>
                <div className="subject-card-foot">
                  <span>Highest <b>{subject.highest}</b></span>
                  <span>Lowest <b>{subject.lowest}</b></span>
                  <span>Pass <b>{subject.passRate}%</b></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-column">
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Grade distribution</h2>
                <p>Students per letter grade</p>
              </div>
            </div>
            <div className="dist-list">
              {distribution.map((band) => (
                <div key={band.letter} className="dist-row">
                  <span className={`grade-pill ${band.tone}`}>{band.letter}</span>
                  <span className="dist-bar">
                    <span style={{ width: `${(band.count / students.length) * 100}%` }} />
                  </span>
                  <strong>{band.count}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Section comparison</h2>
                <p>Average score per class</p>
              </div>
              <Target size={19} className="section-icon" />
            </div>
            <div className="mini-table">
              {classes.map((row) => (
                <div key={row.section} className="mini-table-row">
                  <span className="class-tag">{row.section}</span>
                  <span className="mini-table-bar">
                    <span style={{ width: `${row.average}%` }} />
                  </span>
                  <strong>{row.average}%</strong>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}

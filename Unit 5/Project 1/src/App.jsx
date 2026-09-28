import { useEffect, useMemo, useState } from 'react'
import {
  Award, BarChart3, CalendarDays, Check, ChevronDown, CircleHelp, Clock3,
  Flame, Gift, House, ListTodo, Menu, Pencil, Plus, Search, Settings,
  Sparkles, Star, Target, Trash2, Trophy, X,
} from 'lucide-react'

const today = new Date().toISOString().slice(0, 10)
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
const nextWeek = new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10)
const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

const starterTasks = [
  { id: 1, title: 'Plan the week ahead', description: 'Map out the three outcomes that will make this week count.', dueDate: today, cadence: 'weekly', priority: 'High', points: 25, completed: false, starred: true },
  { id: 2, title: 'Review project notes', description: 'Clean up the notes from the last design review.', dueDate: today, cadence: 'daily', priority: 'Medium', points: 15, completed: false, starred: false },
  { id: 3, title: 'Read 20 pages', description: 'Make a little space for the book on your nightstand.', dueDate: tomorrow, cadence: 'daily', priority: 'Low', points: 10, completed: true, starred: false },
  { id: 4, title: 'Send weekly update', description: 'Share a concise progress update with the team.', dueDate: nextWeek, cadence: 'weekly', priority: 'High', points: 20, completed: false, starred: true },
]

const emptyForm = { title: '', description: '', dueDate: today, cadence: 'daily', priority: 'Medium', points: 10, starred: false }

const navItems = [
  { id: 'home', label: 'Overview', icon: House },
  { id: 'daily', label: 'Daily Tasks', icon: CalendarDays },
  { id: 'weekly', label: 'Weekly Tasks', icon: ListTodo },
  { id: 'important', label: 'Important', icon: Star },
]

function formatDate(dateString) {
  if (!dateString) return 'No due date'
  const date = new Date(`${dateString}T12:00:00`)
  if (dateString === today) return 'Today'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function isThisWeek(dateString) {
  const date = new Date(`${dateString}T12:00:00`)
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 7)
  return date >= start && date < end
}

function getTaskCadence(task) {
  return task.cadence || (task.dueDate === today ? 'daily' : 'weekly')
}

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('focusboard-tasks')) || starterTasks)
  const [points, setPoints] = useState(() => Number(localStorage.getItem('focusboard-points')) || 150)
  const [activeView, setActiveView] = useState('home')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [celebratingId, setCelebratingId] = useState(null)

  useEffect(() => localStorage.setItem('focusboard-tasks', JSON.stringify(tasks)), [tasks])
  useEffect(() => localStorage.setItem('focusboard-points', String(points)), [points])

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
    today: tasks.filter((task) => task.dueDate === today && !task.completed).length,
  }), [tasks])

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesView = activeView === 'home'
      || (activeView === 'daily' && getTaskCadence(task) === 'daily')
      || (activeView === 'weekly' && getTaskCadence(task) === 'weekly' && isThisWeek(task.dueDate))
      || (activeView === 'important' && (task.priority === 'High' || task.starred))
    const searchable = `${task.title} ${task.description}`.toLowerCase()
    return matchesView && searchable.includes(query.toLowerCase())
  }), [activeView, query, tasks])

  const openCreateModal = () => {
    setEditingTask(null)
    setForm(emptyForm)
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setForm({ ...task })
    setIsModalOpen(true)
  }

  const saveTask = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return
    const normalized = { ...form, title: form.title.trim(), points: Math.max(0, Number(form.points) || 0) }
    if (editingTask) {
      setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...task, ...normalized } : task))
    } else {
      setTasks((current) => [{ ...normalized, id: Date.now(), completed: false }, ...current])
    }
    setIsModalOpen(false)
  }

  const toggleTask = (task) => {
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, completed: !item.completed } : item))
    if (!task.completed) {
      setPoints((current) => current + Number(task.points))
      setCelebratingId(task.id)
      window.setTimeout(() => setCelebratingId(null), 900)
    } else {
      setPoints((current) => Math.max(0, current - Number(task.points)))
    }
  }

  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id))
  const toggleStar = (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, starred: !task.starred } : task))
  const activeLabel = navItems.find((item) => item.id === activeView)?.label || 'Overview'

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isMobileNavOpen ? 'mobile-open' : ''}`}>
        <div className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>focusboard</span></div>
        <div className="profile"><div className="avatar">AR</div><div><strong>Alex Rivera</strong><span>Productive mind</span></div><ChevronDown size={16} /></div>
        <nav className="side-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${activeView === id ? 'active' : ''}`} onClick={() => { setActiveView(id); setIsMobileNavOpen(false) }}><Icon size={18} /><span>{label}</span>{id === 'daily' && stats.today > 0 && <em>{stats.today}</em>}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-item"><Settings size={18} /><span>Settings</span></button><button className="nav-item"><CircleHelp size={18} /><span>Help center</span></button><div className="upgrade-card"><div className="upgrade-icon"><Trophy size={17} /></div><strong>Keep your streak alive</strong><span>Small wins add up fast.</span><button onClick={() => setActiveView('home')}>View progress <span>→</span></button></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileNavOpen} onClick={() => setIsMobileNavOpen((open) => !open)}>{isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}</button><div className="breadcrumb">Workspace <span>/</span> <strong>{activeLabel}</strong></div><div className="topbar-actions"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." aria-label="Search tasks" /></div><div className="mini-avatar">AR</div></div></header>
        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow"><span className="status-dot" /> {todayLabel}</p><h1>Good morning, Alex <span>✦</span></h1><p className="subtle">A clear mind starts with a clear plan.</p></div><button className="primary-button" onClick={openCreateModal}><Plus size={18} /> Add new task</button></section>

          <section className="summary-grid">
            <div className="points-card"><div className="card-topline"><span className="icon-bubble gold"><Award size={20} /></span><span className="muted-label">Your rewards</span><button className="icon-button light" aria-label="View rewards"><BarChart3 size={17} /></button></div><div className="points-number">{points}<small> pts</small></div><div className="points-foot"><span><Flame size={15} /> 4 day streak</span><span className="positive">+12% this week</span></div></div>
            <div className="stat-card"><div className="stat-icon blue"><Target size={19} /></div><span className="muted-label">Tasks in progress</span><strong>{stats.pending}</strong><span className="stat-detail">Keep the momentum going</span></div>
            <div className="stat-card"><div className="stat-icon green"><Check size={19} /></div><span className="muted-label">Completed this week</span><strong>{stats.completed}</strong><span className="stat-detail">{stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}% of all tasks</span></div>
          </section>

          <div className="dashboard-grid">
            <section className="tasks-panel"><div className="section-heading"><div><h2>{activeLabel}</h2><p>{visibleTasks.length} {visibleTasks.length === 1 ? 'task' : 'tasks'} to focus on</p></div><div className="view-controls"><button className="filter-button"><CalendarDays size={16} /> This week <ChevronDown size={15} /></button></div></div><div className="task-list">{visibleTasks.length ? visibleTasks.map((task) => <TaskCard key={task.id} task={task} celebrating={celebratingId === task.id} onToggle={toggleTask} onEdit={openEditModal} onDelete={deleteTask} onStar={toggleStar} />) : <div className="empty-state"><div><ListTodo size={28} /></div><h3>No tasks here yet</h3><p>Make space for your next small win.</p><button className="secondary-button" onClick={openCreateModal}><Plus size={16} /> Create a task</button></div>}</div></section>
            <aside className="rewards-panel"><div className="section-heading"><div><h2>Rewards shop</h2><p>Spend your hard-earned points</p></div><Gift size={21} className="section-icon" /></div><div className="reward-list"><RewardItem icon="☕" title="15-min break" cost="50 pts" /><RewardItem icon="🎧" title="Music hour" cost="100 pts" /><RewardItem icon="🍰" title="Treat yourself" cost="200 pts" /></div><div className="progress-card"><div className="progress-heading"><span>Next reward</span><strong>150 / 200 pts</strong></div><div className="progress-track"><span style={{ width: `${Math.min((points / 200) * 100, 100)}%` }} /></div><p><Sparkles size={14} /> Only {Math.max(0, 200 - points)} points to go</p></div></aside>
          </div>
        </div>
      </main>
      {isMobileNavOpen && <button className="mobile-nav-backdrop" aria-label="Close navigation" onClick={() => setIsMobileNavOpen(false)} />}
      {isModalOpen && <TaskModal form={form} setForm={setForm} editingTask={editingTask} onClose={() => setIsModalOpen(false)} onSave={saveTask} />}
    </div>
  )
}

function TaskCard({ task, celebrating, onToggle, onEdit, onDelete, onStar }) {
  const cadence = getTaskCadence(task)
  return <article className={`task-card ${task.completed ? 'completed' : ''} ${celebrating ? 'celebrate' : ''}`}><button className={`check-button ${task.completed ? 'checked' : ''}`} onClick={() => onToggle(task)} aria-label={task.completed ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}>{task.completed && <Check size={15} strokeWidth={3} />}</button><div className="task-copy"><div className="task-title-row"><h3>{task.title}</h3>{task.starred && <Star size={14} className="star-filled" fill="currentColor" />}</div><p>{task.description}</p><div className="task-meta"><span className={`cadence ${cadence}`}><CalendarDays size={12} /> {cadence === 'daily' ? 'Daily' : 'Weekly'}</span><span className={`priority ${task.priority.toLowerCase()}`}><i /> {task.priority}</span><span><Clock3 size={13} /> {formatDate(task.dueDate)}</span><span className="task-points"><Award size={13} /> +{task.points} pts</span></div></div><div className="task-actions"><button className={`star-action ${task.starred ? 'selected' : ''}`} onClick={() => onStar(task.id)} aria-label="Toggle important"><Star size={17} fill={task.starred ? 'currentColor' : 'none'} /></button><button onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={16} /></button><button onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={16} /></button></div>{celebrating && <div className="confetti" aria-hidden="true">{['✦', '•', '✧', '•', '✦'].map((mark, index) => <span key={index} style={{ '--i': index }}>{mark}</span>)}</div>}</article>
}

function RewardItem({ icon, title, cost }) { return <div className="reward-item"><span className="reward-emoji">{icon}</span><div><strong>{title}</strong><span>Personal reset</span></div><b>{cost}</b></div> }

function TaskModal({ form, setForm, editingTask, onClose, onSave }) {
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="task-modal" onSubmit={onSave}><div className="modal-heading"><div><span className="eyebrow">{editingTask ? 'Refine your plan' : 'Make it happen'}</span><h2>{editingTask ? 'Edit task' : 'Create a task'}</h2></div><button type="button" className="close-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><label>Task title<input autoFocus required value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="e.g. Finish the presentation" /></label><label>Description<span className="optional">Optional</span><textarea value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="What does done look like?" rows="3" /></label><fieldset className="cadence-field"><legend>Task type</legend><div className="cadence-toggle"><button type="button" className={form.cadence === 'daily' ? 'selected' : ''} onClick={() => update('cadence', 'daily')}><CalendarDays size={16} /><span>Daily task</span><small>Today and repeatable</small></button><button type="button" className={form.cadence === 'weekly' ? 'selected' : ''} onClick={() => update('cadence', 'weekly')}><ListTodo size={16} /><span>Weekly task</span><small>Plan for the week</small></button></div></fieldset><div className="form-row"><label>Due date<input type="date" value={form.dueDate} onChange={(event) => update('dueDate', event.target.value)} /></label><label>Priority<select value={form.priority} onChange={(event) => update('priority', event.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label></div><div className="form-row"><label>Reward points<input type="number" min="0" max="999" value={form.points} onChange={(event) => update('points', event.target.value)} /></label><label className="star-toggle"><span>Mark important</span><button type="button" className={form.starred ? 'toggle on' : 'toggle'} onClick={() => update('starred', !form.starred)}><span /></button></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">{editingTask ? 'Save changes' : 'Add task'} <ArrowIcon /></button></div></form></div>
}

function ArrowIcon() { return <span aria-hidden="true">→</span> }

export default App

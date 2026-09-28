import { useState } from 'react'

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  city: '',
  linkedin: '',
  preferredTime: '',
  message: '',
  terms: false,
}

const FIELD_NAMES = [
  'fullName',
  'email',
  'phone',
  'company',
  'role',
  'city',
  'linkedin',
  'preferredTime',
  'message',
  'terms',
]

const ROLES = ['Student', 'Software Engineer', 'Web Developer', 'Designer', 'Recruiter', 'Other']

const PREFERRED_TIMES = ['Morning (9 am - 12 pm)', 'Afternoon (12 pm - 4 pm)', 'Evening (4 pm - 8 pm)', 'Anytime']

function validateField(name, value) {
  const v = typeof value === 'string' ? value.trim() : value
  switch (name) {
    case 'fullName':
      return v.length >= 3 ? '' : 'Please enter your full name (at least 3 characters).'
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.'
    case 'phone':
      return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v) ? '' : 'Enter a valid 10-digit phone number (e.g. 9876543210).'
    case 'role':
      return v ? '' : 'Please choose a role.'
    case 'city':
      return v ? '' : 'Please enter your city.'
    case 'preferredTime':
      return v ? '' : 'Please choose a preferred contact time.'
    case 'linkedin':
      return v === '' || /^https?:\/\/[^\s]+$/.test(v) ? '' : 'Enter a valid URL starting with http:// or https://'
    case 'message':
      return v.length >= 20 ? '' : 'Message must be at least 20 characters.'
    case 'terms':
      return value ? '' : 'You must accept the terms to continue.'
    default:
      return ''
  }
}

function Field({
  label,
  name,
  value,
  error,
  type,
  placeholder,
  required,
  onChange,
  onBlur,
  half,
  maxLength,
}) {
  const showError = Boolean(error)
  return (
    <div className={`field ${half ? 'half' : ''} ${showError ? 'has-error' : ''}`}>
      <span className="field-label">
        {label} {required && <em>*</em>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur(name)}
        aria-invalid={showError}
      />
      {showError && <span className="field-error">{error}</span>}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submittedOnce, setSubmittedOnce] = useState(false)
  const [success, setSuccess] = useState(null)

  const update = (name, value) => {
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (submittedOnce || touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const onBlur = (name) => (e) => {
    if (name === 'terms') return
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, e.target.value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedOnce(true)
    const nextErrors = {}
    FIELD_NAMES.forEach((n) => {
      nextErrors[n] = validateField(n, values[n])
    })
    setErrors(nextErrors)
    if (Object.values(nextErrors).every((msg) => !msg)) {
      setSuccess(values)
    }
  }

  const reset = () => {
    setValues(INITIAL)
    setErrors({})
    setTouched({})
    setSubmittedOnce(false)
    setSuccess(null)
  }

  if (success) {
    return (
      <div className="success-panel" role="status">
        <div className="success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
            <path d="M22 4 12 14l-3-3" />
          </svg>
        </div>
        <h2>Message sent successfully!</h2>
        <p>Thanks, <strong>{success.fullName}</strong>. Your details have been validated and recorded. I'll get back to you at <strong>{success.email}</strong> in the <strong>{success.preferredTime}</strong>.</p>
        <dl className="success-summary">
          <div><dt>Role</dt><dd>{success.role}</dd></div>
          <div><dt>City</dt><dd>{success.city}</dd></div>
          <div><dt>Company</dt><dd>{success.company || '—'}</dd></div>
          <div><dt>Phone</dt><dd>{success.phone}</dd></div>
          <div><dt>LinkedIn</dt><dd>{success.linkedin || '—'}</dd></div>
          <div><dt>Message</dt><dd className="summary-message">{success.message}</dd></div>
        </dl>
        <button className="btn btn-ghost" type="button" onClick={reset}>Send another message</button>
      </div>
    )
  }

  const msgLen = values.message.trim().length
  const showMsgError = Boolean(errors.message)

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <span className="step-pill">Contact form · 10 fields</span>
        <h2>Let's start a <span className="grad">conversation</span></h2>
        <p>Fill in your details below — every field is validated before you hit submit.</p>
      </div>

      <div className="form-grid">
        <Field
          label="Full Name"
          name="fullName"
          value={values.fullName}
          error={errors.fullName}
          type="text"
          placeholder="e.g. Arun Kumar"
          required
          half
          onChange={update}
          onBlur={onBlur}
          maxLength={60}
        />
        <Field
          label="Email Address"
          name="email"
          value={values.email}
          error={errors.email}
          type="email"
          placeholder="you@example.com"
          required
          half
          onChange={update}
          onBlur={onBlur}
          maxLength={80}
        />
        <Field
          label="Phone Number"
          name="phone"
          value={values.phone}
          error={errors.phone}
          type="tel"
          placeholder="+91 98765 43210"
          required
          half
          onChange={update}
          onBlur={onBlur}
          maxLength={16}
        />
        <Field
          label="Company / Organisation"
          name="company"
          value={values.company}
          error={errors.company}
          type="text"
          placeholder="Optional — where do you work?"
          half
          onChange={update}
          onBlur={onBlur}
          maxLength={80}
        />

        <div className={`field half ${errors.role ? 'has-error' : ''}`}>
          <span className="field-label">Job Role <em>*</em></span>
          <select
            name="role"
            value={values.role}
            onChange={(e) => update('role', e.target.value)}
            onBlur={onBlur('role')}
            aria-invalid={Boolean(errors.role)}
          >
            <option value="">Choose a role…</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.role && <span className="field-error">{errors.role}</span>}
        </div>

        <Field
          label="City"
          name="city"
          value={values.city}
          error={errors.city}
          type="text"
          placeholder="e.g. Chennai"
          required
          half
          onChange={update}
          onBlur={onBlur}
          maxLength={40}
        />

        <Field
          label="LinkedIn / Portfolio URL"
          name="linkedin"
          value={values.linkedin}
          error={errors.linkedin}
          type="url"
          placeholder="https://linkedin.com/in/you"
          half
          onChange={update}
          onBlur={onBlur}
          maxLength={120}
        />

        <div className={`field half ${errors.preferredTime ? 'has-error' : ''}`}>
          <span className="field-label">Preferred Contact Time <em>*</em></span>
          <select
            name="preferredTime"
            value={values.preferredTime}
            onChange={(e) => update('preferredTime', e.target.value)}
            onBlur={onBlur('preferredTime')}
            aria-invalid={Boolean(errors.preferredTime)}
          >
            <option value="">Select a time slot…</option>
            {PREFERRED_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.preferredTime && <span className="field-error">{errors.preferredTime}</span>}
        </div>

        <div className={`field wide ${showMsgError ? 'has-error' : ''}`}>
          <span className="field-label">Message <em>*</em></span>
          <textarea
            name="message"
            value={values.message}
            placeholder="Tell me a little about your project or opportunity…"
            maxLength={500}
            onChange={(e) => update('message', e.target.value)}
            onBlur={onBlur('message')}
            aria-invalid={showMsgError}
          />
          <div className="field-foot">
            {showMsgError ? (
              <span className="field-error">{errors.message}</span>
            ) : (
              <span className="field-hint">Minimum 20 characters.</span>
            )}
            <span className={`counter ${msgLen >= 450 ? 'counter-near' : ''}`}>{values.message.length}/500</span>
          </div>
        </div>

        <div className={`field terms ${errors.terms ? 'has-error' : ''}`}>
          <label className="terms-row">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={(e) => update('terms', e.target.checked)}
            />
            <span>
              I agree to be contacted about this enquiry and accept the <a href="#terms">terms &amp; privacy policy</a>. <em>*</em>
            </span>
          </label>
          {errors.terms && <span className="field-error">{errors.terms}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          Submit message
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
        <button className="btn btn-ghost" type="button" onClick={reset}>Clear form</button>
      </div>

      <p className="form-note">Only submit once — this form validates all 10 fields and previews your submission.</p>
    </form>
  )
}
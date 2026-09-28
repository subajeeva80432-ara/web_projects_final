export const classSections = ['10-A', '10-B', '11-A', '12-A']

export const subjectNames = [
  'English',
  'Mathematics',
  'Science',
  'Social Science',
  'Computer Science',
]

const studentSeed = [
  {
    id: 'stu-1001',
    roll: 1,
    name: 'Aarav Menon',
    className: '10-A',
    email: 'aarav.menon@school.edu',
    attendance: { present: 178, total: 190 },
    marks: { English: 92, Mathematics: 96, Science: 89, 'Social Science': 84, 'Computer Science': 94 },
    remark: 'Outstanding all-round performance. A role model for the class.',
  },
  {
    id: 'stu-1002',
    roll: 2,
    name: 'Bhavana Rao',
    className: '10-A',
    email: 'bhavana.rao@school.edu',
    attendance: { present: 181, total: 190 },
    marks: { English: 88, Mathematics: 91, Science: 93, 'Social Science': 87, 'Computer Science': 86 },
    remark: 'Consistent and well behaved. Keep the same effort in Science practicals.',
  },
  {
    id: 'stu-1003',
    roll: 3,
    name: 'Dhruv Kulkarni',
    className: '10-A',
    email: 'dhruv.kulkarni@school.edu',
    attendance: { present: 172, total: 190 },
    marks: { English: 74, Mathematics: 68, Science: 72, 'Social Science': 79, 'Computer Science': 83 },
    remark: 'Good improvement this term. Mathematics needs more practice.',
  },
  {
    id: 'stu-1004',
    roll: 4,
    name: 'Esha Nair',
    className: '10-B',
    email: 'esha.nair@school.edu',
    attendance: { present: 160, total: 190 },
    marks: { English: 81, Mathematics: 77, Science: 80, 'Social Science': 88, 'Computer Science': 90 },
    remark: 'Talented in Computer Science. Attendance must improve this term.',
  },
  {
    id: 'stu-1005',
    roll: 5,
    name: 'Farhan Iqbal',
    className: '10-B',
    email: 'farhan.iqbal@school.edu',
    attendance: { present: 168, total: 190 },
    marks: { English: 66, Mathematics: 59, Science: 63, 'Social Science': 71, 'Computer Science': 75 },
    remark: 'Needs to focus on revision. Regular doubt-clearing advised.',
  },
  {
    id: 'stu-1006',
    roll: 6,
    name: 'Gayathri Iyer',
    className: '11-A',
    email: 'gayathri.iyer@school.edu',
    attendance: { present: 186, total: 190 },
    marks: { English: 95, Mathematics: 90, Science: 94, 'Social Science': 88, 'Computer Science': 92 },
    remark: 'Excellent consistency and full attendance. Keep it up.',
  },
  {
    id: 'stu-1007',
    roll: 7,
    name: 'Harish Verma',
    className: '11-A',
    email: 'harish.verma@school.edu',
    attendance: { present: 149, total: 190 },
    marks: { English: 55, Mathematics: 48, Science: 58, 'Social Science': 62, 'Computer Science': 70 },
    remark: 'Effort must match potential. Mentoring session scheduled.',
  },
  {
    id: 'stu-1008',
    roll: 8,
    name: 'Ishita Sharma',
    className: '11-A',
    email: 'ishita.sharma@school.edu',
    attendance: { present: 179, total: 190 },
    marks: { English: 90, Mathematics: 85, Science: 91, 'Social Science': 83, 'Computer Science': 87 },
    remark: 'Balanced performer. Social Science answers need more detail.',
  },
  {
    id: 'stu-1009',
    roll: 9,
    name: 'Jaya Prakash',
    className: '12-A',
    email: 'jaya.prakash@school.edu',
    attendance: { present: 174, total: 190 },
    marks: { English: 78, Mathematics: 82, Science: 80, 'Social Science': 85, 'Computer Science': 79 },
    remark: 'Steady performer. Focus on Science to reach the merit list.',
  },
  {
    id: 'stu-1010',
    roll: 10,
    name: 'Kavya Suresh',
    className: '12-A',
    email: 'kavya.suresh@school.edu',
    attendance: { present: 183, total: 190 },
    marks: { English: 97, Mathematics: 94, Science: 96, 'Social Science': 91, 'Computer Science': 95 },
    remark: 'School topper. Best wishes for the entrance exams.',
  },
]

const gradeBands = [
  { min: 90, letter: 'A+', label: 'Outstanding', tone: 'top' },
  { min: 80, letter: 'A', label: 'Excellent', tone: 'high' },
  { min: 70, letter: 'B+', label: 'Very good', tone: 'good' },
  { min: 60, letter: 'B', label: 'Good', tone: 'fair' },
  { min: 50, letter: 'C', label: 'Average', tone: 'watch' },
  { min: 40, letter: 'D', label: 'Needs work', tone: 'low' },
  { min: 0, letter: 'F', label: 'Unsatisfactory', tone: 'fail' },
]

export function gradeFor(marks) {
  return gradeBands.find((band) => marks >= band.min) ?? gradeBands[gradeBands.length - 1]
}

export function subjectRows(student) {
  return subjectNames.map((name) => {
    const marks = student.marks[name]
    return { name, marks, grade: gradeFor(marks) }
  })
}

export function overallPercent(student) {
  const total = subjectNames.reduce((sum, name) => sum + student.marks[name], 0)
  return Math.round(total / subjectNames.length)
}

export function attendancePercent(student) {
  return Math.round((student.attendance.present / student.attendance.total) * 100)
}

export const students = studentSeed
  .map((student) => ({
    ...student,
    percent: overallPercent(student),
    attendancePercent: attendancePercent(student),
    grade: gradeFor(overallPercent(student)),
  }))
  .sort((a, b) => b.percent - a.percent)

export function getStudentById(id) {
  return students.find((student) => student.id === id)
}

export function classAverage(list = students) {
  if (!list.length) return 0
  return Math.round(list.reduce((sum, student) => sum + student.percent, 0) / list.length)
}

export function topperOf(list = students) {
  return list.reduce((best, student) => (best === null || student.percent > best.percent ? student : best), null)
}

export function subjectStats(list = students) {
  return subjectNames.map((name) => {
    const scores = list.map((student) => student.marks[name])
    const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    return {
      name,
      average,
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
      passRate: Math.round((scores.filter((score) => score >= 40).length / scores.length) * 100),
    }
  })
}

export function gradeCounts(list = students) {
  return gradeBands.map((band) => ({
    ...band,
    count: list.filter((student) => student.grade.letter === band.letter).length,
  }))
}

export function classBreakdown() {
  return classSections.map((section) => {
    const list = students.filter((student) => student.className === section)
    return { section, total: list.length, average: classAverage(list) }
  })
}

export function prevNextStudent(id) {
  const index = students.findIndex((student) => student.id === id)
  return {
    previous: index > 0 ? students[index - 1] : null,
    next: index >= 0 && index < students.length - 1 ? students[index + 1] : null,
  }
}

export function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

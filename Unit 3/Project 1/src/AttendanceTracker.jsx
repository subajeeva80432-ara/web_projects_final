import { useState } from "react";

const initialStudents = [
  { id: 1, name: "Ezhil" },
  { id: 2, name: "Mass" },
  { id: 3, name: "Sri" },
  { id: 4, name: "Suba" },
  { id: 5, name: "Rindu" },
  { id: 6, name: "Deva" },
  { id: 7, name: "Sree" },
  { id: 8, name: "Karthik" },
  { id: 9, name: "Roshini" },
  { id: 10, name: "alexa" },
  { id: 11, name: "Varsha" },
  { id: 12, name: "Priya" },
  { id: 13, name: "Anuja" },
  { id: 14, name: "jeeva" },
  { id: 15, name: "isai" },
];

function AttendanceTracker() {
  const [students, setStudents] = useState(initialStudents);

  const updateStatus = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const unmarkedCount = students.length - presentCount - absentCount;

  const getBadge = (status) => {
    if (status === "present") return <span className="badge badge-present">Present</span>;
    if (status === "absent") return <span className="badge badge-absent">Absent</span>;
    return <span className="badge badge-unmarked">Not marked</span>;
  };

  return (
    <div className="attendance">
      <div className="attendance-head">
        <h1>Student Attendance Tracker</h1>
        <p className="attendance-sub">Mark each student as present or absent</p>
      </div>

      <div className="attendance-list">
        {students.map((student) => (
          <div
            key={student.id}
            className={`attendance-student ${
              student.status ? `attendance-${student.status}` : ""
            }`}
          >
            <div className="attendance-left">
              <span className="attendance-avatar">
                {student.name.charAt(0)}
              </span>
              <div className="attendance-info">
                <span className="attendance-name">{student.name}</span>
                {getBadge(student.status)}
              </div>
            </div>

            <div className="attendance-options">
              <label className="option option-present">
                <input
                  type="radio"
                  name={`status-${student.id}`}
                  checked={student.status === "present"}
                  onChange={() => updateStatus(student.id, "present")}
                />
                <span>Present</span>
              </label>
              <label className="option option-absent">
                <input
                  type="radio"
                  name={`status-${student.id}`}
                  checked={student.status === "absent"}
                  onChange={() => updateStatus(student.id, "absent")}
                />
                <span>Absent</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="attendance-summary">
        <div className="summary-card summary-total">
          <span className="summary-num">{students.length}</span>
          <span className="summary-label">Total</span>
        </div>
        <div className="summary-card summary-present">
          <span className="summary-num">{presentCount}</span>
          <span className="summary-label">Present</span>
        </div>
        <div className="summary-card summary-absent">
          <span className="summary-num">{absentCount}</span>
          <span className="summary-label">Absent</span>
        </div>
        <div className="summary-card summary-unmarked">
          <span className="summary-num">{unmarkedCount}</span>
          <span className="summary-label">Not Marked</span>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTracker;

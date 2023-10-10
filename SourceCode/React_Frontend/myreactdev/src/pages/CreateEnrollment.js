import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateEnrollment() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ StudentID: "", CourseID: "", Grade: "" });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of students and courses
    axios.get("http://127.0.0.1:5000/listusers").then((response) => {
      setStudents(response.data);
    });

    axios.get("http://127.0.0.1:5000/listcourses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://127.0.0.1:5000/enrollmentadd", inputs).then((response) => {
      navigate("/enrollments");
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Create Enrollment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Student ID</label>
            <select
              name="StudentID"
              value={inputs.StudentID}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.StudentID} value={student.StudentID}>
                  {student.StudentID} - {student.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Course ID</label>
            <select
              name="CourseID"
              value={inputs.CourseID}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.CourseID} value={course.CourseID}>
                  {course.CourseID} - {course.CourseTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Grade</label>
            <input
              type="text"
              className="form-control"
              name="Grade"
              value={inputs.Grade}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

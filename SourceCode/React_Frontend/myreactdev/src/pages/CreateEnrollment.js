// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the CreateEnrollment component
export default function CreateEnrollment() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ StudentID: "", CourseID: "", Grade: "" });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // Use the useEffect hook to fetch the list of students and courses when the component mounts
  useEffect(() => {
    // Fetch the list of students
    axios.get("http://127.0.0.1:5000/listusers").then((response) => {
      setStudents(response.data);
    });

    // Fetch the list of courses
    axios.get("http://127.0.0.1:5000/listcourses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://127.0.0.1:5000/enrollmentadd", inputs).then((response) => {
      // Redirect to the enrollments page after adding an enrollment
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
              {/* Map student options for the select element */}
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
              {/* Map course options for the select element */}
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


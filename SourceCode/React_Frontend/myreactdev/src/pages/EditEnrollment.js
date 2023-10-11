// Import necessary modules and components
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Define the EditEnrollment component
export default function EditEnrollment() {
  const navigate = useNavigate();
  const { EnrollmentID } = useParams();

  // Define a function to fetch enrollment details
  const getEnrollment = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/enrollmentdetails/${EnrollmentID}`).then((response) => {
      setInputs(response.data);
    });
  }, [EnrollmentID]);

  // Define states for enrollment details, students, and courses
  const [inputs, setInputs] = useState({ StudentID: "", CourseID: "", Grade: "" });
  const [students, setStudents] = useState([]); // To store the list of students
  const [courses, setCourses] = useState([]); // To store the list of courses

  // Fetch enrollment details, list of students, and list of courses when the component mounts
  useEffect(() => {
    getEnrollment(); // Fetch enrollment details
    fetchStudents(); // Fetch the list of students
    fetchCourses(); // Fetch the list of courses
  }, [getEnrollment]);

  // Handle input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission to update the enrollment
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5000/enrollmentupdate/${EnrollmentID}`, inputs).then((response) => {
      navigate("/enrollments"); // Redirect to the enrollment list page after updating the enrollment
    });
  };

  // Function to fetch the list of students
  const fetchStudents = () => {
    axios.get("http://127.0.0.1:5000/listusers").then((response) => {
      setStudents(response.data);
    });
  };

  // Function to fetch the list of courses
  const fetchCourses = () => {
    axios.get("http://127.0.0.1:5000/listcourses").then((response) => {
      setCourses(response.data);
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Edit Enrollment</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Student ID</label>
            <select
              className="form-control"
              name="StudentID"
              value={inputs.StudentID}
              onChange={handleChange}
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
              className="form-control"
              name="CourseID"
              value={inputs.CourseID}
              onChange={handleChange}
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

// Import necessary modules and components
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Define the EditCourse component
const EditCourse = () => {
  const navigate = useNavigate();
  const { CourseID } = useParams();

  // Define a function to fetch course details
  const getCourse = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/coursedetails/${CourseID}`).then((response) => {
      setCourse(response.data);
    });
  }, [CourseID]);

  // Define states for course details and instructors
  const [course, setCourse] = useState({ CourseID: "", CourseTitle: "", InstructorID: "" });
  const [instructors, setInstructors] = useState([]);

  // Fetch course details and list of instructors when the component mounts
  useEffect(() => {
    getCourse(); // Fetch course details
    axios.get("http://127.0.0.1:5000/listinstructors").then((response) => {
      setInstructors(response.data); // Fetch the list of instructors
    });
  }, [getCourse]);

  // Handle input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCourse((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission to update the course
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5000/courseupdate/${CourseID}`, course).then((response) => {
      navigate("/courses"); // Redirect to the course list page after updating the course
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Edit Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Course ID</label>
            <input
              type="text"
              className="form-control"
              name="CourseID"
              value={course.CourseID}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Course Title</label>
            <input
              type="text"
              className="form-control"
              name="CourseTitle"
              value={course.CourseTitle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Instructor</label>
            <select
              className="form-select"
              name="InstructorID"
              value={course.InstructorID}
              onChange={handleChange}
            >
              {instructors.map((instructor) => (
                <option key={instructor.InstructorID} value={instructor.InstructorID}>
                  {instructor.InstructorID}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;


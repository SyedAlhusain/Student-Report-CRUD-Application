// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the CreateCourse component
export default function CreateCourse() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ CourseID: "", CourseTitle: "", InstructorID: "" });
  const [instructorOptions, setInstructorOptions] = useState([]);

  // Use the useEffect hook to fetch available Instructors when the component mounts
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/listinstructors").then((response) => {
      // Combine InstructorID and Name to display in the options
      const options = response.data.map((instructor) => ({
        value: instructor.InstructorID,
        label: `${instructor.InstructorID} - ${instructor.Name}`,
      }));
      setInstructorOptions(options);
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
    axios.post("http://127.0.0.1:5000/courseadd", inputs).then((response) => {
      // Redirect to the courses page after adding a course
      navigate("/courses");
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Create Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Course ID</label>
            <input
              type="text"
              className="form-control"
              name="CourseID"
              value={inputs.CourseID}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Course Title</label>
            <input
              type="text"
              className="form-control"
              name="CourseTitle"
              value={inputs.CourseTitle}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Instructor</label>
            <select
              className="form-select"
              name="InstructorID"
              value={inputs.InstructorID}
              onChange={handleChange}
            >
              <option value="">Select an Instructor</option>
              {/* Map instructor options for the select element */}
              {instructorOptions.map((instructorOption) => (
                <option key={instructorOption.value} value={instructorOption.value}>
                  {instructorOption.label}
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
}


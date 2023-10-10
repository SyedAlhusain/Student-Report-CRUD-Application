import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const navigate = useNavigate();
  const { CourseID } = useParams();

  const getCourse = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/coursedetails/${CourseID}`).then((response) => {
      setCourse(response.data);
    });
  }, [CourseID]);

  const [course, setCourse] = useState({ CourseID: "", CourseTitle: "", InstructorID: "" });
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    getCourse();
    axios.get("http://127.0.0.1:5000/listinstructors").then((response) => {
      setInstructors(response.data);
    });
  }, [getCourse]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCourse((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5000/courseupdate/${CourseID}`, course).then((response) => {
      navigate("/courses");
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

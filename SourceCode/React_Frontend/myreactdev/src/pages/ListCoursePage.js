import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListCoursePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  function getCourses() {
    axios.get("http://127.0.0.1:5000/listcourses").then((response) => {
      setCourses(response.data);
    });
  }

  const deleteCourse = (CourseID) => {
    axios.delete(`http://127.0.0.1:5000/coursedelete/${CourseID}`).then((response) => {
      getCourses(); // Refresh the list of courses after deletion
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Courses</h1>
        <Link to="/addnewcourse" className="btn btn-success">
          Add New Course
        </Link>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>CourseID</th>
              <th>Course Title</th>
              <th>Instructor ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.CourseID}>
                <td>{course.CourseID}</td>
                <td>{course.CourseTitle}</td>
                <td>{course.InstructorID}</td>
                <td>
                  <Link
                    to={`/course/${course.CourseID}/edit`}
                    className="btn btn-success"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCourse(course.CourseID)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

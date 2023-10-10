import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListEnrollmentPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    getEnrollments();
  }, []);

  function getEnrollments() {
    axios.get("http://127.0.0.1:5000/enrollments").then((response) => {
      setEnrollments(response.data);
    });
  }

  const handleDelete = (enrollmentID) => {
    axios
      .delete(`http://127.0.0.1:5000/enrollmentdelete/${enrollmentID}`)
      .then(() => {
        // After deletion, refresh the list of enrollments
        getEnrollments();
      });
  };

  return (
    <div>
      <div className="container">
        <h1>Enrollments</h1>
        <Link to="/addnewenrollment" className="btn btn-success">
          Add New Enrollment
        </Link>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.EnrollmentID}>
                <td>{enrollment.EnrollmentID}</td>
                <td>{enrollment.StudentID}</td>
                <td>{enrollment.CourseID}</td>
                <td>{enrollment.Grade}</td>
                <td>
                  <Link
                    to={`/enrollment/${enrollment.EnrollmentID}/edit`}
                    className="btn btn-success"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(enrollment.EnrollmentID)}
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

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the ListInstructorPage component
export default function ListInstructorPage() {
  const [instructors, setInstructors] = useState([]);

  // Fetch the list of instructors when the component mounts
  useEffect(() => {
    getInstructors();
  }, []);

  // Function to fetch the list of instructors
  function getInstructors() {
    axios.get("http://127.0.0.1:5000/listinstructors").then(function (response) {
      console.log(response.data);
      setInstructors(response.data);
    });
  }

  // Function to handle instructor deletion
  const deleteInstructor = (id) => {
    axios.delete(`http://127.0.0.1:5000/instructordelete/${id}`).then(function (response) {
      console.log(response.data);
      getInstructors(); // Refresh the list of instructors after deletion
    });
    alert("Successfully Deleted");
  }

  return (
    <div>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12">
            <p>
              <Link to="/addnewinstructor" className="btn btn-success">
                Add New Instructor
              </Link>{" "}
            </p>
            <h1>Instructors</h1>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>InstructorID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((instructor, key) => (
                  <tr key={key}>
                    <td>{instructor.InstructorID}</td>
                    <td>{instructor.Name}</td>
                    <td>{instructor.Department}</td>
                    <td>
                      <Link
                        to={`instructor/${instructor.InstructorID}/edit`}
                        className="btn btn-success"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteInstructor(instructor.InstructorID)}
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
      </div>
    </div>
  );
}


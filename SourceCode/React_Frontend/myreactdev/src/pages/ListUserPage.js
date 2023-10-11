// Import necessary modules and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the ListUserPage component
export default function ListUserPage() {
  const [Students, setUsers] = useState([]);

  // Fetch the list of users (students) when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  // Function to fetch the list of users
  function getUsers() {
    axios.get("http://127.0.0.1:5000/listusers").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  // Function to handle user (student) deletion
  const deleteUser = (id) => {
    axios.delete(`http://127.0.0.1:5000/userdelete/${id}`).then(function (response) {
      console.log(response.data);
      getUsers(); // Refresh the list of users after deletion
    });
    alert("Successfully Deleted");
  }

  return (
    <div>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12">
            <p>
              <Link to="/addnewuser" className="btn btn-success">
                Add New Student
              </Link>{" "}
            </p>
            <h1>Students</h1>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>StudentID</th>
                  <th>Name</th>
                  <th>CreditsEarned</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Students.map((Student, key) => (
                  <tr key={key}>
                    <td>{Student.StudentID}</td>
                    <td>{Student.Name}</td>
                    <td>{Student.CreditsEarned}</td>
                    <td>
                      <Link
                        to={`user/${Student.StudentID}/edit`}
                        className="btn btn-success"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(Student.StudentID)}
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


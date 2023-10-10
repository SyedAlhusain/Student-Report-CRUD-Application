import React, { useEffect, useState } from "react";
import axios from "axios"; // npm install axios --save
import { Link } from "react-router-dom";

export default function ListUserPage() {
  const [Students, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://127.0.0.1:5000/listusers").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios.delete(`http://127.0.0.1:5000/userdelete/${id}`).then(function (response) {
      console.log(response.data);
      getUsers();
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


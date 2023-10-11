// Import necessary modules and components
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the CreateUser component
export default function CreateUser() {
  const navigate = useNavigate();

  // Define the state for input fields
  const [inputs, setInputs] = useState({ StudentID: "", Name: "", CreditsEarned: "" });

  // Handle input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to add a new user (student)
    axios.post("http://127.0.0.1:5000/useradd", inputs).then(function (response) {
      console.log(response.data); // Log the response data
      navigate("/"); // Redirect to the home page after adding a new user
    });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>StudentID</label>
                <input
                  type="text"
                  className="form-control"
                  name="StudentID"
                  value={inputs.StudentID}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  value={inputs.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Credits Earned</label>
                <input
                  type="text"
                  className="form-control"
                  name="CreditsEarned"
                  value={inputs.CreditsEarned}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" name="add" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}


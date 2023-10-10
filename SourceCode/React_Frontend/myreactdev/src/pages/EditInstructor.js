import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditInstructor() {
  const navigate = useNavigate();
  const { InstructorID } = useParams();

  const getInstructor = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/instructordetails/${InstructorID}`).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }, [InstructorID]);

  const [inputs, setInputs] = useState({
    InstructorID: "",
    Name: "",
    Department: "",
  });

  useEffect(() => {
    getInstructor();
  }, [getInstructor]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/instructorupdate/${InstructorID}`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/instructor"); // Redirect to the instructor list page after updating an instructor
      });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit Instructor</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Instructor ID</label>
                <input
                  type="text"
                  value={inputs.InstructorID}
                  className="form-control"
                  name="InstructorID"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  value={inputs.Name}
                  className="form-control"
                  name="Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Department</label>
                <input
                  type="text"
                  value={inputs.Department}
                  className="form-control"
                  name="Department"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" name="update" className="btn btn-primary">
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

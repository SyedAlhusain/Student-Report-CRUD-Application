import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { StudentID } = useParams();

  // Define getUser inside a useCallback hook
  const getUser = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/userdetails/${StudentID}`).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }, [StudentID]);

  const [inputs, setInputs] = useState({
    StudentID: "",
    Name: "",
    CreditsEarned: "",
  });

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/userupdate/${StudentID}`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Student ID</label>
                <input
                  type="text"
                  value={inputs.StudentID}
                  className="form-control"
                  name="StudentID"
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
                <label>Credits Earned</label>
                <input
                  type="text"
                  value={inputs.CreditsEarned}
                  className="form-control"
                  name="CreditsEarned"
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

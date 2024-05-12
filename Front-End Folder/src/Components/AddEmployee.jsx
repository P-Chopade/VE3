import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee= () => {
  const [task, settask] = useState({
    name: "",

  });
  const navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', task.name);
   
  
    console.log(Object.fromEntries(formData)); // Log form data
  
    axios.post('http://localhost:3000/auth/add_employee', formData)
      .then(result => {
          if(result.data.Status) {
              navigate('/dashboard/Task')
          } else {
              alert(result.data.Error)
          }
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add task</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                settask({ ...task, name: e.target.value })
              }
            />
          </div>              
       
     
     
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
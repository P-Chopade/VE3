import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee  = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
      });
      const navigate = useNavigate()

      useEffect(()=> {
        
        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,

            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/Task')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Task</h3>
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
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>      
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee 
import React,{useState} from 'react'
import axios from 'axios'
function ShowInfo({setShowlp}) {
    const [employees,setEmployees]=useState([])
    const getInfo=async ()=>{
    const token=localStorage.getItem('jwtoken') 
      try{    
       await axios.get("http://localhost:9000/api/getInfo", {
          headers: {
            Authorization: `Bearer ${token}`  // Send token in Authorization header
          }
        })
        .then(response=>{
          setEmployees(response.data)
        })
        .catch(err=>{
          setEmployees([])  
          setShowlp(true)
          alert(err)
        })
      }catch(err){
        if(err.response && err.response.status === 403)
          alert("Access Denied...")    
      }
}  
    return (
    <div>ShowInfo
    <button className='btn btn-primary m-1 w-25' onClick={getInfo}>GetInfo</button>
    {employees.map(employee=><li>{employee.eid}-{employee.ename}-{employee.email}</li>)}
    </div>
  )
}

export default ShowInfo
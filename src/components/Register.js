import React,{useRef} from 'react'
import axios from 'axios'
function Register({setRegister}) {
  const username=useRef("")
  const pwd=useRef("")
  const emailid=useRef("")
  const registeruser=()=>{
   const uname=username.current.value 
   const password=pwd.current.value
   const email=emailid.current.value

    const payload={
        username:uname,
        password:password,
        emailid:email
    }

    axios.post("http://localhost:9000/api/register",payload)
    .then(response=>{
        console.log(response.data)
        localStorage.setItem('jwtoken',response.data.token)
        alert(response.data.message)
        setRegister(false)
    })
    .catch(err=>{
        console.log(err)
    })

  }
  
  return (
    <div>
    <div style={{display:'flex',flexDirection:'column', width:'600px',height:'auto', borderStyle:'solid',borderColor:'red',margin:'30px',padding:'20px'}} >
    <h1>Register</h1>
    <input className='form-control m-1 w-25' ref={username} type="text" placeholder='Username'></input>
    <input className='form-control m-1 w-25' ref={pwd} type="password" placeholder='password'></input>
    <input className='form-control m-1 w-25' ref={emailid} type="email" placeholder="Enter email ID"></input>
    <button className='btn btn-warning m-1 w-25' onClick={registeruser}>Sign Up</button>
    </div>
    </div>
  )
}

export default Register

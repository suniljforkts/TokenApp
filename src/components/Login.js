import React,{useRef,useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import Register from './Register'
import ShowInfo from './ShowInfo'
function Login() {
  const [showlp,setShowlp]=useState(true) 
  const [register,setRegister]=useState(false)
  const [showinfo,setshowInfo]=useState(false)
  const login=useRef("")
  const pwd=useRef("")

  const signup=()=>{
    setRegister(true)
  }

  const authenticate=async ()=>{
        const lg=login.current.value 
        const pw=pwd.current.value
        alert(lg+"  "+pw)
        const payLoad={login:lg,password:pw}
        await axios.post("http://localhost:9000/api/authenticate_user",payLoad)
        .then(response=>{
            alert("Welcome User")
            localStorage.setItem('jwtoken',response.data.token)
            setshowInfo(true)
            setShowlp(false)            
        })
        .catch(err=>{
              alert(err)
              setShowlp(true)
              
        })
  }

 
  return (
    
    <div style={{display:'flex',flexDirection:'column', width:'700px',height:'auto', borderStyle:'solid',borderColor:'red',margin:'30px',padding:'20px'}} >
    {showlp?<div>
      <h1>Login</h1> 
    <input className='form-control m-1 w-25' ref={login} type="text" placeholder='Login'></input>
    <input className='form-control m-1 w-25' ref={pwd} type="password" placeholder="Password"></input>
    <div style={{display:'flex',flexDirection:'row',gap:'20px'}}>
    <button className='btn btn-warning m-1 w-25' onClick={authenticate}>Login</button>
    <button className='btn btn-warning m-1 w-25' onClick={signup}>SignUp</button>
    </div>
    </div>
    :""}
    {register?<Register  setRegister={setRegister}/>:""}
    {showinfo?<ShowInfo setShowlp={setShowlp} />:""}
    </div>
  )
}

export default Login
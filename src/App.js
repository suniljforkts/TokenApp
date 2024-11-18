import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [login,setLogin]=useState(false)
  return (
    <div className="App">
    {!login?<Login setLogin={setLogin}></Login>:""}
      
    </div>
  );
}

export default App;

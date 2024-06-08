import React from 'react'
import "./Login.css"
import { useState } from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase-config"
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({setIsAuth}) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e)=> {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setIsAuth(true);
    localStorage.setItem("isAdmin", true);
    navigate("/admin");
  })
  .catch((error) => {
    setError(true)
  });
  }

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <input type='email' placeholder='email' onChange={e=>setEmail(e.target.value)}/>
        <input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <button>Login</button>
        {error && <span>wrong email or password</span>}
      </form>
    </div>
  )
}

export default AdminLogin
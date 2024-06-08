import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import AllLessons from "./pages/CoursesHome"
import CreateLesson from "./pages/CreateLesson"
import AdminLogin from "./pages/AdminLogin"
import { auth } from './firebase-config';
import { signOut } from "firebase/auth";
import { useState } from 'react';


function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () =>{
    signOut(auth).then(() => {
      setIsAuth(false);
      window.location.pathname = "/";
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <>
      <nav>
        <Link to="/" > Home</Link>
        {localStorage.getItem("isAdmin") && <Link to="./createpost" > Create Lesson</Link>}
        {!localStorage.getItem("isAdmin") ? (<Link to="./login" > Login as Admin</Link>) : (<button id='logout' onClick={signUserOut}>Log Out</button>) }
      </nav>
      <Routes>
        {/* <Route path="/" element= {<AllLessons isAuth={isAuth}/>}></Route> */}
        <Route path="/createpost" element= {<CreateLesson />}></Route>
        <Route path="/login" element= {<AdminLogin setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </>
  );
}

export default AdminPage;

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import CreatePost from './createpost';
import Login from './login';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import "../App.css"

function BlogPage({ setIsAuth }) {
  const [isAuth, setIsAuthLocal] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuthLocal(false);
      setIsAuth(false); // Set isAuth in App.js
      window.location.pathname = '/blog/login';
    });
  };

  return (
    <div>
      <nav>
        <Link to="/blog"> Home </Link>
        {!localStorage.getItem('isAuth') ? (
          <Link to="/blog/login"> Login </Link>
        ) : (
          <>
            <Link to="/blog/createpost"> Create Post </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </div>
  );
}

export default BlogPage;

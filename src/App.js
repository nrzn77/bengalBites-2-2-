import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import BlogPage from './pages/BlogPage.js';
import CourseSelectPage from './pages/CourseSelectPage.jsx';
// import LessonSelectPage from './pages/LessonSelectPage.jsx';
import Navbar from './components/Navbar.jsx';
import Quiz from './components/quiz/quiz.jsx';
import AdminPage from './AdminPage.js';
import AllLessons from './pages/CoursesHome.js';
import "./BengaBitesLessons.css"

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    // Your sign out logic
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/*" element={<BlogPage setIsAuth={setIsAuth} />} />
        <Route path="/admin/*" element={<AdminPage isAuth={isAuth}/>} />
        <Route path="/courses" element={<CourseSelectPage />} />
        <Route path="/lessons" element={<AllLessons />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* Redirect all other routes to /courses */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

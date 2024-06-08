import React from 'react';
import { useState } from 'react';
import "../Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [navbarOn, setNavbarOn] = useState(false);

    return (
        <div className={navbarOn ? "topnav responsive" : "topnav" }>
            <Link to="/" onClick={()=> setNavbarOn(false)}>Home</Link>
            <Link to="/courses" onClick={()=> setNavbarOn(false)}>Courses</Link>
            <Link to="/quiz" onClick={()=> setNavbarOn(false)}>Quiz</Link>
            <Link to="/blog" onClick={()=> setNavbarOn(false)}s>Blog</Link>
            <a href="javascript:void(0);" className="icon" onClick={()=> setNavbarOn(!navbarOn)}>
                {/* <i className="fa fa-bars"></i> */}
                &#8801;
            </a>
        </div>
    );
};

export default Navbar;


import course_plan from "../assets/course_structure.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CourseSelectPage() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let crs = [];
    for (let c in course_plan) {
      crs.push(c);
      console.log(encodeURIComponent(c));
    }
    crs.sort();
    setCourses(crs);
  }, [])

  return (
    <>
      <div className="coursesContainer">
        {courses.map((Crs) => <Link to={"../lessons?course=" + encodeURIComponent(Crs)} className="course-select" key={Crs} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(https://source.unsplash.com/random/300x300/?${encodeURIComponent(Crs)})` }}>{Crs} </Link>)}
      </div>
    </>
  )
}

export default CourseSelectPage;

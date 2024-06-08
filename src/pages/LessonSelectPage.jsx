import { useSearchParams } from "react-router-dom";
import course_plan from "../assets/course_structure.json";
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "../BengaBitesLessons.css"

// Function to check if the lessonId is valid
const isValidCourse = (course) => {
    // Add your validation logic here
    // For example, checking if lessonId is a number
    // console.log("---------" + course)
    if (course && course_plan[decodeURIComponent(course)]) {
        return true;
    }
    else {
        return false;
    }

};
const LessonSelectPage = () => {
    // Extracting query parameter from location object
    const [searchParams, setSearchParams] = useSearchParams();
    const [lessons, setLessons] = useState([]);
    const [current, setCurrent] = useState(0);
    const course = searchParams.get('course'); // Removed unnecessary decoding

    useEffect(() => {
        if(!isValidCourse(course)) return;
        let crs = [];
        for (let c of course_plan[decodeURIComponent(course)]) {
            crs.push(c)
            console.log(c);
        }
        setLessons(crs);
    }, [])


    // If course is present and valid, render the Lessons component
    // Otherwise, redirect to /courses
    if (isValidCourse(course) && lessons) {
        return <>
            <div className="lessonListContainer">
                <table><tbody>
                    <tr>
                        <td><h4 className="course-title">{course.toUpperCase()}</h4></td>
                        {lessons.map((lesson, index) =>
                            <td key={index} className={index === current ? "selected" : ""}>
                                <a onClick={() => setCurrent(index)}>
                                    {"Lesson " + (index + 1)}
                                </a>
                            </td>
                        )}

                    </tr>
                    </tbody></table>
            </div>
            {lessons.length &&
                <iframe name="lessonFrame" id="lessonFrame" src={"./courses/" + course + "/" + lessons[current]}></iframe>
            }
        </>;
    } else {
        return <Navigate to="/courses" replace />;
    }
};

export default LessonSelectPage;


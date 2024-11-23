import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [grade, setGrade] = useState("");

    // Load saved courses from local storage on initial render
    useEffect(() => {
        const savedCourses = JSON.parse(localStorage.getItem("courses"));
        if (savedCourses) {
            setCourses(savedCourses);
        }
    }, []);

    // Save courses to local storage whenever they are updated
    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses]);

    const addCourse = () => {
        if (!courseName || !grade) return; // Prevent adding empty fields
        const newCourse = { id: uuidv4(), name: courseName, grade: grade };
        setCourses([...courses, newCourse]);
        setCourseName("");
        setGrade("");
    };

    const deleteCourse = (id) => {
        const filteredCourses = courses.filter((course) => course.id !== id);
        setCourses(filteredCourses);
    };

    return (
        <div style={{ margin: "2rem auto", maxWidth: "600px", textAlign: "center" }}>
            <h1>Kurssilista</h1>
            <div>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    style={{ padding: "0.5rem", marginRight: "0.5rem" }}
                />
                <input
                    type="text"
                    placeholder="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    style={{ padding: "0.5rem", marginRight: "0.5rem" }}
                />
                <button onClick={addCourse} style={{ padding: "0.5rem" }}>
                    Add Course
                </button>
            </div>
            <ul style={{ listStyleType: "none", padding: 0, marginTop: "2rem" }}>
                {courses.map((course) => (
                    <li
                        key={course.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0.5rem",
                            margin: "0.5rem 0",
                            background: "#f4f4f4",
                            borderRadius: "4px",
                        }}
                    >
                        <span>
                            {course.name} - {course.grade}
                        </span>
                        <button
                            onClick={() => deleteCourse(course.id)}
                            style={{ color: "red", border: "none", background: "none" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;


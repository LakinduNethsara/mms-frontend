import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function CCMarksApproval() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({
        course_id: "",
        department: ""
    });
    const [approvalLevel, setApprovalLevel] = useState("");
    const history = useHistory();
    const storedData = localStorage.getItem('user');
    const [email, setEmail] = useState();

    useEffect(() => {
        if (storedData) {
            const userEmail = JSON.parse(storedData).email;
            setEmail(userEmail);
            fetchData(userEmail);
            lecturerCertify(userEmail);
        } else {
            setEmail(null);
        }
    }, []);

    const fetchData = async (userEmail) => {
        try {
            console.log(userEmail);

            const response = await axios.get(`http://localhost:9090/api/courses/getcourseforcc/${userEmail}`);
            if (response.data.code !== '00') {
                throw new Error('Network response was not ok');
            }
            const data = response.data.content;
            setCourses(data);
            console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
        }
    };

    const lecturerCertify = async (userEmail) => {
        try {
            console.log(userEmail);

            const response = await axios.get(`http://localhost:9090/api/courses/getCoursesforLectCertify/${userEmail}`);
            if (response.data.code !== '00') {
                throw new Error('Network response was not ok');
            }
            const data = response.data.content;
            setCourses(data);
            console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
        }
    };

    const fetchApprovalLevel = async (courseId,department) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/approvalLevel/getApprovedLevel/${courseId}/${department}`);
            const data = response.data;
            setApprovalLevel(data);
            console.log("Approval Level:", data);
            return data;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
            return null;
        }
    };

    const handleCourseClick = async (courseId, courseName,department) => {
        setSelectedCourse(courseId,department);
        const approvalLevel = await fetchApprovalLevel(courseId,department); // Fetch approval level and wait for it to complete

        if (approvalLevel === "finalized") {
            history.push(`/ccMarksReturnSheet/${courseId}/${courseName}/${department}`);
        } else if (approvalLevel === "course_coordinator") {
            history.push(`/lMarksReturnSheet/${courseId}/${courseName}/${department}`);
        } else {
            console.error("Unknown approval level:", approvalLevel);
            // Handle any unexpected approval levels if necessary
        }
    };

    return (
        <div>
            <div className='container' style={{ marginTop: "70px" }}>
                <ToastContainer />
                <div className='h2 mx-2'>Mark Approval</div>
                <div className='row g-3 my-4'>
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div className="card shadow m-4" style={{ width: "18rem" }} key={index}>
                                <div className="card-body">
                                    <h5 className="card-title py-2">{course.course_id}</h5>
                                    <h6 className='card-title py-1'>{course.course_name}</h6>
                                    <a className="btn btn-primary btn-sm mt-2"
                                        onClick={() => handleCourseClick(course.course_id, course.course_name,course.department_id)}>
                                        To Give Approval
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mx-auto mt-4">
                            <h5>No Marks Return Sheets for Approval</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

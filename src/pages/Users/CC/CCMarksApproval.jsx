import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

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
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        if (storedData) {
            const userEmail = JSON.parse(storedData).email;
            setEmail(userEmail);
            fetchData(userEmail);
            lecturerCertify(userEmail);
        } else {
            setEmail(null);
            setError('User data not found in local storage.');
        }
    }, [email]);

    const fetchData = async (userEmail) => {
        try {

            setLoading(true); // Start loading
            
            const response = await axios.get(`http://192.248.50.155:9090/api/courses/getcourseforcc/${userEmail}`);
            if (response.data.code == '00') 
            {

                const data = response.data.content.map(course => ({
                    course_id: course[0],
                    course_name: course[1],
                    department_id: course[2],
                    academicYear: course[3]
                }));
                setCourses(data);
            } else {
                setCourses([]);
              
            }
        } catch (error) {
            console.error(error);
         
            // toast.error('Error fetching courses.'); // Display toast notification
        } finally {
            setLoading(false); // End loading
        }
    };

    const lecturerCertify = async (userEmail) => {
        try {

            setLoading(true); // Start loading
  



            const response = await axios.get(`http://192.248.50.155:9090/api/courses/getCoursesforLectCertify/${userEmail}`);
            if (response.data.code == '00') {
             

                const data = response.data.content.map(course => ({
                    course_id: course[0],
                    course_name: course[1],
                    department_id: course[2],
                    academicYear: course[3]
                }));
                setCourses(data);
            } else {
                setCourses([]);
               
            }
        } catch (error) {
            
            
            // toast.error('Error fetching lecturer certification courses.'); // Display toast notification
        } finally {
            setLoading(false); // End loading
        }
    };

    const fetchApprovalLevel = async (courseId, department) => {
        try {
            const response = await axios.get(`http://192.248.50.155:9090/api/approvalLevel/getApprovedLevel/${courseId}/${department}`);
            const data = response.data;
            setApprovalLevel(data);
            return data;
        } catch (error) {
            console.error(error);
            setError('Failed to fetch approval level. Please try again later.');
            toast.error('Error fetching approval level.'); // Display toast notification
            return null;
        }
    };

    const handleCourseClick = async (courseId, courseName, department, academic_year) => {
        setSelectedCourse({ course_id: courseId, department });
        const approvalLevel = await fetchApprovalLevel(courseId, department);

        if (approvalLevel === "finalized") {
            history.push(`/ccMarksReturnSheet/${courseId}/${courseName}/${department}/${academic_year}`);
        } else if (approvalLevel === "course_coordinator") {
            history.push(`/lMarksReturnSheet/${courseId}/${courseName}/${department}/${academic_year}`);
        } else {
            setError('Course cannot be approved at this time.');
            toast.error('Course cannot be approved at this time.'); // Display toast notification
        }
    };

    return (
        <div>
            <div className='container' style={{ marginTop: "70px" }}>
                <ToastContainer />
                <div className='h2 mx-2'>Mark Approval</div>
                <div className='row g-3 my-4'>
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="mx-auto mt-4">
                            <h5>{error}</h5>
                        </div>
                    ) : courses.length > 0 ? (
                        courses.map((course, index) => (
                            <div className="card shadow m-4" style={{ width: "18rem" }} key={index}>
                                <div className="card-body">
                                    <h5 className="card-title py-2">{course.course_id}</h5>
                                    <h6 className='card-title py-1'>{course.course_name}</h6>
                                    <h6 className='card-title py-1'>Department :{course.department_id}</h6>
                                    <h6 className='card-title py-1'>Academic Year : {course.academicYear}</h6>
                                    <a className="btn btn-primary btn-sm mt-2"
                                        onClick={() => handleCourseClick(course.course_id, course.course_name, course.department_id, course.academicYear)}>
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

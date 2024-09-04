import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageCourseModule() {
    const [course_name, setCourseName] = useState('');
    const [course_id, setCourseId] = useState('');
    const [type, setType] = useState('');
    const [department_id, setDepartment] = useState('');
    // const [credit, setCourseCredit] = useState('');
    const [hours, setCourseHours] = useState('');
    const [level, setLevel] = useState('');
    const [semester, setSemester] = useState('');
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.248.50.155:9090/api/courses/getallcourses');
            setCourseData(response.data.content);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    };

    const validateForm = () => {
        // Example validation: check if course_name is not empty
        if (!course_name) {
            toast.error("Course name is required.");
            return false;
        }
        if (!course_id) {
            toast.error("Course ID is required.");
            return false;
        }
        if (!type) {
            toast.error("Module type is required.");
            return false;
        }
        if (!department_id) {
            toast.error("Department is required.");
            return false;
        }
        // if (!credit) {
        //     toast.error("Course credit is required.");
        //     return false;
        // }
        if (!hours) {
            toast.error("Course hours is required.");
            return false;
        }
        if (!level) {
            toast.error("Level is required.");
            return false;
        }
        if (!semester) {
            toast.error("Semester is required.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return; // Exit if validation fails
    }

    const courseData = {
        course_name,
        course_id,
        type,
        department_id,
        // credit,
        hours,
        level,
        semester,
    };

    try {
        const response = await axios.post('http://192.248.50.155:9090/api/courses/insertacourse', courseData);
        console.log(response.data.content);
        toast.success('Course added successfully!');
      // Optionally, clear the form fields after successful submission
        setCourseName('');
        setCourseId('');
        setType('');
        setDepartment('');
        // setCourseCredit('');
        setCourseHours('');
        setLevel('');
        setSemester('');
        fetchData();
    } catch (error) {
        // console.error('Error adding course:', error);
        toast.error('This course already exists!');
        // window.location.reload();
        setCourseName('');
        setCourseId('');
        setType('');
        setDepartment('');
        // setCourseCredit('');
        setCourseHours('');
        setLevel('');
        setSemester('');
        fetchData();
    }
    };

    return (
    <div className='container' style={{marginTop:"70px"}}>
        <ToastContainer/>
        <div className=' mt-2 mb-5'>
        <div className='h2 mt-lg-2'>Manage Course Module</div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="row g-3">
            <div className="col-md">
            <div className="form-floating">
                <input type="text" className="form-control" id="course_name" placeholder="Enter course name" value={course_name} onChange={(e) => setCourseName(e.target.value)} />
                <label htmlFor="course_name">Course Name</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <input type="text" className="form-control" id="course_id" placeholder="Enter course id" value={course_id} onChange={(e) => setCourseId(e.target.value)} />
                <label htmlFor="course_id">Course Code</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option selected>Select Type</option>
                    <option value="ICT">Theory</option>
                    <option value="ET">Practical</option>
                </select>
                <label htmlFor="type">Module Type</label>
            </div>
            </div>
        </div>
        <div className="row g-3 my-1">
            <div className="col-md">
            <div className="form-floating">
                <select className="form-select" id="department_id" value={department_id} onChange={(e) => setDepartment(e.target.value)}>
                <option selected>Select Department</option>
                <option value="ICT">ICT</option>
                <option value="ET">ET</option>
                <option value="BST">BST</option>
                <option value="Multi_Disciplinary">Multi_Disciplinary</option>
                </select>
                <label htmlFor="department_id">Department</label>
            </div>
            </div>
            {/* <div className="col-md">
            <div className="form-floating">
                <input type="number" className="form-control" id="credit" placeholder="Enter course Credit" value={credit} onChange={(e) => setCourseCredit(e.target.value)} />
                <label htmlFor="credit">Course Credit</label>
            </div>
            </div> */}
            <div className="col-md">
            <div className="form-floating">
                <input type="number" className="form-control" id="hours" placeholder="Enter course hours" value={hours} onChange={(e) => setCourseHours(e.target.value)} />
                <label htmlFor="hours">Hours</label>
            </div>
            </div>
        </div>
        <div className="row g-3 my-1">
            <div className="col-md">
            <div className="form-floating">
                <input type="number" max="4" min="1" className="form-control" id="level" placeholder="Enter Level" value={level} onChange={(e) => setLevel(e.target.value)} />
                <label htmlFor="level">Level</label>
            </div>
            </div>
            <div className="col-md">
            <div className="form-floating">
                <input type="number" max="2" min="1" className="form-control" id="semester" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
                <label htmlFor="semester">Semester</label>
            </div>
            </div>
        </div>
        <div className=' my-3'>
            <button type="submit" className="btn btn-outline-dark btn-sm" style={{width:"100px"}}>Submit</button>
            <button type="button" className="btn btn-outline-danger mx-2 btn-sm" style={{width:"100px"}} onClick={() => {
            setCourseName('');
            setCourseId('');
            setType('');
            setDepartment('');
            // setCourseCredit('');
            setCourseHours('');
            setLevel('');
            setSemester('');
            }}>Clear</button>
        </div>
        </form>
        <div>
            <div className="h3 mt-lg-5" style={{color:"maroon"}}>Existing Courses</div>
            {courseData.length > 0 && (
                <table className='table'>
                <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Course ID</th>
                    <th>Type</th>
                    <th>Department</th>
                    <th>Hours</th>
                    <th>Level</th>
                    <th>Semester</th>
                </tr>
                </thead>
                <tbody>
                {courseData.map((row, index) => (
                    <tr key={index}>
                    <td>{row.course_name}</td>
                    <td>{row.course_id}</td>
                    <td>{row.type}</td>
                    <td>{row.department_id}</td>
                    <td>{row.hours}</td>
                    <td>{row.level}</td>
                    <td>{row.semester}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
    </div>
    )
}

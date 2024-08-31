import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddRelatedDept() {
    const [courses, setCourses] = useState([]);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get('http://192.248.50.155:9090/api/courses/getallcousrenotregto_crdept')
            .then(response => {
                setCourses(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleInputChange = (courseId, field, value) => {
        console.log(courseId, field, value);
        setSelectedData(prevState => ({
            ...prevState,
            [courseId]: {
                ...prevState[courseId],
                [field]: value
            }
        }));
    };

    const handleSubmit = (courseId) => {
        const courseData = selectedData[courseId];
        
        if (courseData) {
            const departmentDataList = [];

            // Check and add ICT department data if selected
            if (courseData.ICT) {
                departmentDataList.push({
                    course_id: courseId,
                    department_id: 'ICT',
                    credit: courseData.credits_ICT ? parseFloat(courseData.credits_ICT) : null,
                    gpa_ngpa: courseData.gpa_ngpa_ICT ? courseData.gpa_ngpa_ICT : null
                });
            }

            // Check and add ET department data if selected
            if (courseData.ET) {
                departmentDataList.push({
                    course_id: courseId,
                    department_id: 'ET',
                    credit: courseData.credits_ET ? parseFloat(courseData.credits_ET) : null,
                    gpa_ngpa: courseData.gpa_ngpa_ET ? courseData.gpa_ngpa_ET : null
                });
            }

            // Check and add BST department data if selected
            if (courseData.department_id) {
                departmentDataList.push({
                    course_id: courseId,
                    department_id: 'BST',
                    credit: courseData.credit ? parseFloat(courseData.credit) : null,
                    gpa_ngpa: courseData.gpa_ngpa ? courseData.gpa_ngpa : null
                });
            }

            if (departmentDataList.length > 0) {
                axios.post('http://192.248.50.155:9090/api/coursedept/insertacoursetocrdept', departmentDataList)
                .then(response => {
                    alert('Data saved successfully');
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
            } else {
                alert('Please select at least one department.');
            }
        } else {
            alert('Please fill out all required fields.');
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='h3 mt-lg-5' style={{ color: "maroon" }}>Add Course to Related Departments</div>
                <div className='h6 mt-lg-5 text-danger'>*Please Try To Use Only One Course At One Time</div>

                <div className='col-md-12 p-5'>
                    {courses.map(course => (
                        <div className="card shadow mb-3" key={course.id}>
                            <h5 className="card-header">{course.course_name}</h5>
                            <div className="card-body">
                                <h5 className="card-title">{course.course_id} - {course.course_name}</h5>
                                <p className="card-text" style={{ color: "maroon" }}>Select Only This Course Related Departments</p>

                                <div style={{ display: "flex" }}>
                                    <div className="form-check form-switch mx-5">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            role="switch" 
                                            id="ICT"
                                            onChange={(e) => handleInputChange(course.course_id, 'ICT', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="ICT">ICT</label>
                                    </div>

                                    <div className="col-md-6" style={{ width: "200px" }}>
                                        <label className="form-label">Credits</label>
                                        <input 
                                            type="number" 
                                            max="10" 
                                            min="1" 
                                            className="form-control"
                                            onChange={(e) => handleInputChange(course.course_id, 'credits_ICT', e.target.value)} 
                                        />
                                    </div>

                                    <div className="col-md-6 mx-5" style={{ width: "200px" }}>
                                        <label className="form-label">GPA or NGPA</label>
                                        <select 
                                            className="form-select" 
                                            required
                                            onChange={(e) => handleInputChange(course.course_id, 'gpa_ngpa_ICT', e.target.value)}
                                        >
                                            <option value="" disabled selected>Choose...</option>
                                            <option value="gpa">GPA</option>
                                            <option value="ngpa">NGPA</option>
                                        </select>
                                    </div>
                                </div>

                                <hr />
                                <div style={{ display: "flex", marginTop: "20px" }}>
                                    <div className="form-check form-switch mx-5">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            role="switch" 
                                            id="ET"
                                            onChange={(e) => handleInputChange(course.course_id, 'ET', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="ET">ET</label>
                                    </div>

                                    <div className="col-md-6" style={{ width: "200px" }}>
                                        <label className="form-label">Credits</label>
                                        <input 
                                            type="number" 
                                            max="10" 
                                            min="1" 
                                            className="form-control"
                                            onChange={(e) => handleInputChange(course.course_id, 'credits_ET', e.target.value)} 
                                        />
                                    </div>

                                    <div className="col-md-6 mx-5" style={{ width: "200px" }}>
                                        <label className="form-label">GPA or NGPA</label>
                                        <select 
                                            className="form-select" 
                                            required
                                            onChange={(e) => handleInputChange(course.course_id, 'gpa_ngpa_ET', e.target.value)}
                                        >
                                            <option value="" disabled selected>Choose...</option>
                                            <option value="gpa">GPA</option>
                                            <option value="ngpa">NGPA</option>
                                        </select>
                                    </div>
                                </div>

                                <hr />
                                <div style={{ display: "flex", marginTop: "20px" }}>
                                    <div className="form-check form-switch mx-5">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            role="switch" 
                                            id="BST"
                                            onChange={(e) => handleInputChange(course.course_id, 'department_id', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="BST">BST</label>
                                    </div>

                                    <div className="col-md-6" style={{ width: "200px" }}>
                                        <label className="form-label">Credits</label>
                                        <input 
                                            type="number" 
                                            max="10" 
                                            min="1" 
                                            className="form-control"
                                            onChange={(e) => handleInputChange(course.course_id, 'credit', e.target.value)} 
                                        />
                                    </div>

                                    <div className="col-md-6 mx-5" style={{ width: "200px" }}>
                                        <label className="form-label">GPA or NGPA</label>
                                        <select 
                                            className="form-select" 
                                            required
                                            onChange={(e) => handleInputChange(course.course_id, 'gpa_ngpa', e.target.value)}
                                        >
                                            <option value="" disabled selected>Choose...</option>
                                            <option value="gpa">GPA</option>
                                            <option value="ngpa">NGPA</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <hr />
                                <button 
                                    type='submit' 
                                    className='btn btn-success btn-sm mx-5 my-3' 
                                    style={{ width: "100px" }} 
                                    onClick={() => handleSubmit(course.course_id)}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

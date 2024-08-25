import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddRelatedDept() {
    const [courses, setCourses] = useState([]);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get('http://localhost:9090/api/courses/getallcousrenotregto_crdept')
            .then(response => {
                setCourses(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleInputChange = (courseId, field, value) => {
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
            axios.post('http://localhost:9090/api/coursedept/insertacoursetocrdept', {
                course_id: courseId,
                ...courseData
            })
            .then(response => {
                alert('Data saved successfully');
                // toastr.success('Data saved successfully');
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
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
                                            value={"ICT"}
                                            onChange={(e) => handleInputChange(course.id, 'ICT', e.target.checked)}
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
                                            onChange={(e) => handleInputChange(course.id, 'credits_ICT', e.target.value)} 
                                        />
                                    </div>

                                    <div className="col-md-6 mx-5" style={{ width: "200px" }}>
                                        <label className="form-label">GPA or NGPA</label>
                                        <select 
                                            className="form-select" 
                                            required
                                            onChange={(e) => handleInputChange(course.id, 'gpa_ngpa_ICT', e.target.value)}
                                        >
                                            <option selected disabled value="">Choose...</option>
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
                                            value={"BST"}
                                            onChange={(e) => handleInputChange(course.id, 'ET', e.target.checked)}
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
                                            onChange={(e) => handleInputChange(course.id, 'credits_ET', e.target.value)} 
                                        />
                                    </div>

                                    <div className="col-md-6 mx-5" style={{ width: "200px" }}>
                                        <label className="form-label">GPA or NGPA</label>
                                        <select 
                                            className="form-select" 
                                            required
                                            onChange={(e) => handleInputChange(course.id, 'gpa_ngpa_ET', e.target.value)}
                                        >
                                            <option selected disabled value="">Choose...</option>
                                            <option value="gpa">GPA</option>
                                            <option value="ngpa">NGPA</option>
                                        </select>
                                    </div>
                                </div>

                                <hr />
                                {/* Repeat similar blocks for other department (BST)  */}
                                <div style={{ display: "flex", marginTop: "20px" }}>
                                    <div className="form-check form-switch mx-5">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            role="switch" 
                                            id="BST"
                                            value={"BST"}
                                            onChange={(e) => handleInputChange(course.id, 'department_id', e.target.checked)}
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
                                            onChange={(e) => handleInputChange(course.id, 'credit', e.target.value)} 
                                        />
                                    </div>

                                    <div className="col-md-6 mx-5" style={{ width: "200px" }}>
                                        <label className="form-label">GPA or NGPA</label>
                                        <select 
                                            className="form-select" 
                                            required
                                            onChange={(e) => handleInputChange(course.id, 'gpa_ngpa', e.target.value)}
                                        >
                                            <option selected disabled value="">Choose...</option>
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
                                    onClick={() => handleSubmit(course.id)}
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

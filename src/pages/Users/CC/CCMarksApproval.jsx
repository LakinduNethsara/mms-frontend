import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function CCMarksApproval() {
    const [courses, setCourses] = useState([]);
    const history = useHistory();
    const storedData = localStorage.getItem('user');
    const [email, setEmail] = useState();

    useEffect(() => {
        if(storedData){
            
            setEmail(JSON.parse(storedData).email);
        }else{
            
            setEmail(null);
        }
        fetchData();
    }, [email]);

    const fetchData = async () => {
        try {
            console.log(email);

            const response = await axios.get(`http://localhost:9090/api/courses/getcourseforcc/${email}`);
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

    return (
        <div>
            <div className='container' style={{ marginTop: "70px" }}>
                <div className=' h2 mx-2'>Mark Approvel</div>
                <div className='row g-3 my-4'>
                    {courses.map((course, index) => (
                        <div className="card shadow m-4" style={{ width: "18rem" }} key={index}>
                            <div className="card-body">
                                <h5 className="card-title py-2">{course.course_id}</h5>
                                <h6 className='card-title py-1'>{course.course_name}</h6>
                                <a className="btn btn-primary btn-sm mt-2" onClick={() => history.push(`/ccMarksReturnSheet/${course.course_id}/${course.course_name}/ICT`)}>To Give Approvel</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function CAEligibility() {
    const { course_id, course_name } = useParams();
    const [allStEli, setAllStEli] = useState([]);
    console.log(course_id);

    useEffect(() => {
    results();
    }, [course_id]);

    const results = async () => {
    try {
            const response = await axios.get(`http://192.248.50.155:9090/api/CAEligibility/ofstudents/${course_id}`);
            if (response.data.code !== '00') {
            throw new Error('Network response was not ok');
            }
            const data = response.data.content;
            setAllStEli(data);
            console.log(data)
    } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
    }
    };
  return (
    <div>
        <div className=' container mt-5' >
            <div style={{marginTop:"90px"}}>
                    <div className=' h2 mx-2' >Students CA Eligibile of <span style={{color:"maroon"}}>{course_name}</span></div>
                    <div className=' mt-5' style={{overflow:"auto", width:"100%", height:"600px"}}>
                            <table className=' table'>
                                    <thead>
                                            <tr>
                                                    <th>Student ID</th>
                                                    <th>CA Marks</th>
                                                    <th>Eligibility</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {allStEli.map((student) => (
                                                    <tr key={student.id}>
                                                            <td>{student.student_id}</td>
                                                            <td>{student.total_ca_mark}</td>
                                                            <td>{student.ca_eligibility}</td>
                                                    </tr>
                                            ))}
                                    </tbody>
                            </table>
                    </div>
            </div>
        </div>

    </div>
  )
}

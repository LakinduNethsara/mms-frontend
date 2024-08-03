import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function AddCAMarksByLec() {
    const {course_id, course_name} = useParams();
    const [evaluationCriteria, setEvaluationCriteria] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchEvaluationCriteria();
        fetchStudents();
    }
    , [course_id])

    const fetchEvaluationCriteria = async () => {
        try {
            const res = await axios.get(`http://localhost:9090/api/evaluationCriteriaName/getAssessmentType/${course_id}/CA`)
            if (res.data.content !== null) throw new Error('Network response was not ok');

            setEvaluationCriteria(res.data.content);
            
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
        }
        
    }

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`http://localhost:9090/api/student/getStudents/${course_id}`) //methanata API eka danna oni hadala 
            if (res.data.content !== null) throw new Error('Network response was not ok');

            setStudents(res.data.content);
            
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
        }
    }

    const handleCancle = () => {
        setEvaluationCriteria([]);
    }


  return (
    <div>
        <div className='container' style={{marginTop:"70px"}}>
            <h2>CA Marks Entry</h2>
            <h4>Course ID: {course_id}</h4>
            <h4>Course Name: {course_name}</h4>
        </div>
        <div className=' row mt-3'>
            <div className=' col-8'>
                <form>
                    <label for="exampleDataList" className="form-label">Student ID List</label>
                    <input className="form-control mx-4" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."/>
                    <datalist id="datalistOptions">
                        {
                            students.map((student, index) => (
                                <option value={student.student_id}/>
                            ))
                        }
                        
                    </datalist>
                    {
                        evaluationCriteria.map((criteria, index) => (
                            <div className="mb-3" key={index}>
                                <label htmlFor="exampleFormControlInput1" className="form-label">{criteria.assignment_name}</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" />
                            </div>
                        ))
                    }                    
                    <button type="submit" className="btn btn-outline-dark btn-sm" style={{width:"100PX"}}>SAVE</button>
                    <button type="submit" className="btn btn-outline-danger btn-sm mx-3" style={{width:"100PX"}} onClick={handleCancle}>CLEAR</button>
                </ form>

            </div>
            <div className=' col-7'>
                <label class="form-label">CA Marks Table</label>

            </div>
        </div>

    </div>
  )
}

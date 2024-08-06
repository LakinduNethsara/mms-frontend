import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './studentViewCourseCriteria.css';
import axios from 'axios';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';



export default function StudentViewCourseCriteria() {

    const location = useLocation(); //Get the location details from the URL
    
    const course = location.state; //Get the course details from the location state

    const [courseCriteriaList, setCourseCriteriaList] = useState([]);         //Use state to store course criteria list
    const [errorMessage, setErrorMessage] = useState(null);                   //Use state to store error message

    
    const loadCourseCriteriaList = async () => {
      try{
        const courseCriteriaResponse = await axios.get(`http://localhost:9090/api/Student/getEvaluationCriteriaByCourseId/${course.course_id}`)
        setCourseCriteriaList(courseCriteriaResponse.data);
      }catch(err){
          console.log(err);
      }
    }


    useEffect(() => {
      loadCourseCriteriaList();
    },[])


    


  return (
    <div className='student-view-course-criteria-main-div' style={{marginTop:"10px",minWidth:"100%",paddingRight:"2%",paddingLeft:"2%",height:"100%"}}>

        <div className='view-criteria-main-body-div'>

            <div className='row' style={{textAlign:"center",paddingBottom:"15px"}}><h5>{course.course_name}</h5></div>
            
            <div className='row course-row-1'>
                <div className='col course-col-1'><label>Department - {course.department_id}</label></div>
                <div className='col course-col-1'><label>Level - {course.level}</label></div>
                <div className='col course-col-1'><label>Semester - {course.semester}</label></div>
            {/* </div>

            <div className='row course-row-1'> */}
                <div className='col course-col-1'><label>Lecture Hours - {course.hours}</label></div>
                <div className='col course-col-1'><label>Course Credit - {course.credit}</label></div>
                <div className='col course-col-1'><label>Course Type - {course.type}</label></div>
            </div>

            <hr/>

            <div className='row'>
              <h5 style={{textAlign:"center"}}>Course Criteria</h5>
              {
                courseCriteriaList.length>0? (
                    <>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Assessment Type</th>
                            <th>No. of Conducted</th>
                            <th>No. of Taken</th>
                            <th>Percentage (%)</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            courseCriteriaList.map((criteria) => (
                              <tr key={criteria.id}>
                                <td>{criteria.assessment_type}</td>
                                <td>{criteria.no_of_conducted}</td>
                                <td>{criteria.no_of_taken}</td>
                                <td>{criteria.percentage}</td>
                                <td>{criteria.description}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      
                    </>
                ):(
                  <>
                    <h6 style={{textAlign:"center",color:"red"}}>No course criteria available</h6>
                  </>
                )
              }
              <div className='right-aligned-div back-button-div'>
                <br/><BackButton/> <br/>&nbsp;
              </div>
            </div>

            

        </div>

    </div>
    
    
  )
}

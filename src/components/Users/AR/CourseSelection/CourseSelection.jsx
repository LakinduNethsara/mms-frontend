import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./courseSelection.css";
import { Redirect, useHistory } from 'react-router-dom';
import { Button } from 'bootstrap';





export default function CourseSelection(props) {

    const history = useHistory();        // Initialize useHistory hook to navigate to different pages

    const { level, semester, department_id } = props;       // Destructuring props
    const [courseData, setCourseData] = useState([]);   // State to store course data
    const [coursesAvailability, setCoursesAvailability] = useState(true);   // State to store courses availability
    const previousRole = "HOD";     // Role of the previous user

    const loadCourseData = async()=>{       // Function to fetch course data
        try{
          const result=await axios.get(`http://localhost:9090/api/AssistantRegistrar/getViewMarksCourseList/${level}/${semester}/${department_id}`);     // API call to fetch course data

          if(result.data.length>0){
            setCoursesAvailability(true);       // Setting the availability of courses to true
            setCourseData(result.data);       // Setting the fetched data to the state

          }else{

            setCoursesAvailability(false);      // Setting the availability of courses to false
          
          }


          
          
        }catch(error){
          console.error('Error fetching data:', error);     // Logging error
        }
    }

    useEffect(() => {       // UseEffect to fetch course data
        loadCourseData();
    }, []);


    

  return (
    <div>

      {
        coursesAvailability ? (
          <table className="table">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Type</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
              {
                courseData.map((course, index) => (
                  <tr className="clickable-row" key={index} onClick={()=>{history.push(`/viewMarks/${course.course_id}/${course.course_name}`)}}>
                    <th scope="row" key={index}>{index+1}</th>
                    <td>{course.course_id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.type}</td>
                    <td><button className="btn btn-primary btn-sm"  role="button" aria-disabled="true">View Marks</button></td>  
                </tr>
                ))
              }
                
            </tbody>
          </table>
        ):(
          <div className="alert alert-danger" role="alert" style={{marginTop:"70px",textAlign:"center"}}>
            <h5>No courses Registered for this semester</h5>
          </div>
        )
      }
        <div className='row'>
          <div className='col'>

            {<br/>}
            &nbsp; Level {level}{<br/>}
            &nbsp; Semester {semester}{<br/>}
            &nbsp; department - {department_id}  

          </div>
          
      </div>
            
    </div>
  )
}

import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './studentViewCourseDetails.css';
import { useHistory } from 'react-router-dom';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';

export default function StudentViewCourseDetails() {
  



  const history = useHistory();


  const [studentId, setStudentId] = useState(null);  
  const [studentName, setStudentName] =useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
  const [studentDepartmentId, setStudentDepartmentId] = useState(null);


  const [courseList, setCourseList] = useState([]);         //Use state to store student medical list
  const [errorMessage, setErrorMessage] = useState(null);                   //Use state to store error message






  const loadStudentDetails = async () => {
    if(studentEmail != null){

        const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)
        setStudentId(studentDetailsResult.data.user_id);
        setStudentName(studentDetailsResult.data.name_with_initials);
        setStudentRegisteredYear(studentDetailsResult.data.registered_year);
        setStudentDepartmentId(studentDetailsResult.data.department_id);

    }
  }

  

  const loadCourseList = async () => {
      try{
        const courseListResponse = await axios.get(`http://localhost:9090/api/Student/getAllCourses`)
        if(!courseListResponse.data.length>0){
          setErrorMessage("No courses available")
        }else {
          setCourseList(courseListResponse.data);
        }
        
      }catch(err){
        console.log(err);
      }
    

  }

  const [user, setUser] = useState({});   //Use state to store user data
  const storedData = localStorage.getItem('user');    //Get user data from local storage



  useEffect(() => {

    if(storedData){   //Check if user is logged in
      setUser(JSON.parse(storedData));      //Set user data
      
      if(JSON.parse(storedData).role != "student"){     //Check if user is not a valid type one
        localStorage.removeItem('user');        //Remove user data and re direct to login page
      }
      
    }else{                          //If user is not logged in
      history.push('/login');       //Redirect to login page
    }


  
    setStudentEmail(user.email);



    loadStudentDetails();
    loadCourseList();
  }, [studentEmail]);



  return (
    <div>
      <div className='view-course-details-main-div' style={{marginTop:"10px",minWidth:"100%",paddingRight:"2%",paddingLeft:"2%",height:"100%"}}>
        
        <table className="table table-striped">
          
        <thead className='student-course-table-head'>
          <tr>
            <th colSpan={7} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
              <h5>View Course Details</h5> 
            </th>
          </tr>

          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Type</th>
            <th>Level</th>
            <th>Semester</th>
            <th></th>
          </tr>
          
        </thead>

        <tbody>
          {
            courseList.length > 0 ? (

              courseList.map((course,index) => {
                return(
                  <tr key={index} className='clickable-row' onClick={()=>{
                    history.push({pathname:`/studentViewCourseCriteria`,state:course})
                  }}>
                    <td>{course.course_id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.department_id}</td>
                    <td>{course.type}</td>
                    <td>{course.level}</td>
                    <td>{course.semester}</td>
                    <td><button className='btn btn-primary btn-sm'>Criteria</button></td>
                  </tr>
                  
                )
              })
            ):(
              <tr>
                <td colSpan={7} style={{textAlign:"center"}}>{errorMessage}</td>
              </tr>
            
            )
          }

        </tbody>

        </table>
        <div className='right-aligned-div back-button-div'>
            <br/><BackButton/> <br/>&nbsp;
        </div>
      </div>
    </div>
  )
}

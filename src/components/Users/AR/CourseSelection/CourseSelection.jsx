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
    const [academicYearList, setAcademicYearList] = useState([]);
    const [academicYear, setAcademicYear] = useState(0);       //store selected academic year
    const [loading, setLoading] = useState(false);


    const loadCourseData = async(academic_year)=>{       // Function to fetch course data
        try{
          setLoading(true);       // Setting the loading state to true
          const result=await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getViewMarksCourseList/${level}/${semester}/${department_id}/${academic_year}`);     // API call to fetch course data

          if(result.data.length>0){
            setCoursesAvailability(true);       // Setting the availability of courses to true
            setCourseData(result.data);       // Setting the fetched data to the state

          }else{

            setCoursesAvailability(false);      // Setting the availability of courses to false
          
          }


          setLoading(false);    // Setting the loading state to false after data is loaded
          
          
        }catch(error){
          console.error('Error fetching data:', error);     // Logging error
        }
    }

    const loadAcademicYear = async () => {                  // Load academic years list

      try{
        setLoading(true);       // Setting the loading state to true  
        const academicYearDetails= await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getAllAcademicYearList`)          //Api to get academic year list
        setAcademicYearList([]);
        setAcademicYearList(academicYearDetails.data);
        setAcademicYear(academicYearDetails.data[0]);
        loadCourseData(academicYearDetails.data[0]);

        setLoading(false);    // Setting the loading state to false after data is loaded

      }catch(error){
        console.log(error); // Logging error
      }

    }


    const handleAcademicYear = async (academicYear) => {          // handle the academic year selection
      setAcademicYear(academicYear.target.value);        // set the selected academic year
      loadCourseData(academicYear.target.value); 
      
  }

  const [user, setUser] = useState({});   //Use state to store user data
  const storedData = localStorage.getItem('user');    //Get user data from local storage


    useEffect(() => {       // UseEffect to fetch course data

      if(storedData){   //Check if user is logged in
        setUser(JSON.parse(storedData));      //Set user data
        
        if(JSON.parse(storedData).role != "ar"){     //Check if user is not a valid type one
          localStorage.removeItem('user');        //Remove user data and re direct to login page
        }
        
      }else{                          //If user is not logged in
        history.push('/login');       //Redirect to login page
      }

        loadCourseData(academicYear);
        loadAcademicYear();
    }, []);


    

    


    

  return (
    <div>

      {

        loading ? (
          <div className="d-flex justify-content-center" style={{marginTop:"20%"}}>
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
              <label style={{marginLeft:"10px"}}> Loading data</label>
            </div>
        ):(

          <>

            <div className="d-flex justify-content-between">
              <div></div> {/* This empty div takes up the left space */}



              <select className='selection' style={{width:"200px",height:"35px",borderRadius:"5px",fontSize:"15px",textAlign:"center",lineHeight:"50px",marginTop:"0px",marginRight:"50px"}}  value={academicYear} onChange={handleAcademicYear}>                   {/* selection for semester */}
                <option value='0' disabled>Academic Year</option>
                {
                  academicYearList.map((element, index)=>(
                    <option key={index} value={element}>{element}</option>
                  ))
                }
              </select>

              
            </div>

            {
              coursesAvailability ? (
                <>

                  


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
                        <tr className="clickable-row" key={index} onClick={()=>{history.push(`/viewMarks/${course.course_id}/${course.course_name}/${department_id}/${academicYear}`)}}>
                          <th scope="row" key={index}>{index+1}</th>
                          <td>{course.course_id}</td>
                          <td>{course.course_name}</td>
                          <td>{course.type}</td>
                          <td>
                            {/* <button className="btn btn-primary btn-sm"  role="button" aria-disabled="true">View Marks</button> */}
                          </td>  
                      </tr>
                      ))
                    }
                      
                  </tbody>
                </table>
                </>
              ):(
                <div className="alert alert-danger" role="alert" style={{marginTop:"70px",textAlign:"center"}}>
                  <h5>No courses found </h5>
                </div>
              )
            }


          </>

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

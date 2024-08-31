import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./viewMarksTableValidations.css";
import { Redirect } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';


export default function ViewMarksTableValidations() {

    const course_variables = useParams();   // get the course variables from the url
    const [interrupt, setInterrupt] = useState(false);      // state to store the interrupt status
    const [loading,setLoading]= useState(false);
    const history = useHistory();    // get the history object
    const requiredApprovedLevel1 = "HOD";
    const requiredApprovedLevel2 = "RB";
    const requiredApprovedLevel3 = "AR";
    const requiredApprovedLevel4 = "Dean";
    const requiredApprovedLevel5 = "VC";

    

    const fetchData = async ()=>{
      try{
        setLoading(true);
        const academicYear = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getAcademicYearDetails`);      // get the academic year details
        setLoading(false);
        setInterrupt(false);   // set the interrupt state to false

        try{
          setLoading(true);
          const approvedLevel= await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getMarksApprovalLevelBySelectedCourseAndAcademicYear/${course_variables.course_id}/${course_variables.academicYear}`);    // get the approved level for the course
          setLoading(false);

          setInterrupt(false);   // set the interrupt state to false
          
          if(approvedLevel.data.length>0){      // check whether there are approved levels

            setInterrupt(false);   // set the interrupt state to false

            if((approvedLevel.data[0]["approval_level"]===requiredApprovedLevel1) || (approvedLevel.data[0]["approval_level"]===requiredApprovedLevel2) || (approvedLevel.data[0]["approval_level"]===requiredApprovedLevel3) || (approvedLevel.data[0]["approval_level"]===requiredApprovedLevel4) || (approvedLevel.data[0]["approval_level"]===requiredApprovedLevel5)){    // check whether the course is under the approval level HOD

              setInterrupt(false);   // set the interrupt state to false

              try{

                setLoading(true);
                const ABStudents = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getABDetailsByCourseId/${course_variables.course_id}/${course_variables.academicYear}`);    // get the students having AB for relevent exams
                setLoading(false);

                setInterrupt(false);   // set the interrupt state to false

                if(ABStudents.data.length>0){       //if there are student having AB scores

                  setInterrupt("There are students who were absent for the exams, please check the medicals and update their states");   // set the interrupt state to "There are students who were absent for the exams, plese check the medicals and update their states"
                }
                else{
                  setInterrupt(false);

                  try{
                    setLoading(true);
                    const allStudents = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/findAllStudentsGrade/${course_variables.course_id}`);   // get all the students grades for the course
                    setLoading(false);
                    if(allStudents.data.length>0){     // check whether there are students

                      setInterrupt(false);   // set the interrupt state to false
                      
                      history.push(`/ARMarksReturnSheet/${course_variables.course_id}/${course_variables.course_name}/${course_variables.department_id}/${course_variables.academicYear}`);    // redirect to the marks return sheet page
                    }
                    else{
                      setInterrupt("No students marks for this course");   // set the interrupt state to "No students data found"
                    }
                  }
                  catch{
                    setInterrupt("Error fetching all students data");   // set the interrupt state to "Error fetching all students data
                  }
                  
                }

              }
              catch{
                setInterrupt("Error fetching AB students data");   // set the interrupt state to "Error fetching AB students data"
              }

            
            }
            else{
              setInterrupt("This mark sheet is not submitted for Assistant Registrar");  // set the interrupt state to "This course in not under your approval"
            }

          }
          else{
            setInterrupt("No approval level found related to this course");   // set the interrupt state to "No approval level related to this course"
          }
        }
        catch{
          setInterrupt("Error fetching approved level data");   // set the interrupt state to "Error fetching academic data
        }

      }
      catch(error){
        setInterrupt("Error fetching academic data");   // set the interrupt state to "Error fetching academic data
      }



    }

    const [user, setUser] = useState({});   //Use state to store user data
    const storedData = localStorage.getItem('user');    //Get user data from local storage
  


    useEffect(()=>{

      if(storedData){   //Check if user is logged in
        setUser(JSON.parse(storedData));      //Set user data
        
        if(JSON.parse(storedData).role != "ar"){     //Check if user is not a valid type one
          localStorage.removeItem('user');        //Remove user data and re direct to login page
        }
        
      }else{                          //If user is not logged in
        history.push('/login');       //Redirect to login page
      }

      
        fetchData();
    },[])




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
          interrupt===false ? (
            null
          ) : (
            <>
            <div className='alert alert-danger error-message' role='alert' style={{marginTop:"10%",textAlign:"center",height:"100px",width:"70%",marginLeft:"auto",marginRight:"auto",paddingTop:"30px"}}>
                <h5>{interrupt}</h5>
                
            </div>
            <div style={{textAlign:"right",paddingRight:"30px"}}>
              <BackButton/>
            </div>
            </>
          )
        )

        
      }
      
          

    </div>
  )
}

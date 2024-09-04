import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './studentWithHeldSubjects.css';
import { useHistory } from 'react-router-dom';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';

export default function StudentWithHeldSubjects() {

    const history = useHistory();        //Use history to redirect


    const grade='WH';       //Grade 'WH' stands for 'With Held


    const [studentId, setStudentId] = useState(null);  
    const [studentName, setStudentName] =useState(null);
    const [studentEmail, setStudentEmail] = useState(null);
    const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
    const [studentDepartmentId, setStudentDepartmentId] = useState(null);


    const [withHeldSubjects, setWithHeldSubjects] = useState([]);         //Use state to store with held subjects

    const loadStudentDetails = async () => {                            //Load student details
        if(studentEmail != null){

            try{
                const studentDetailsResult = await axios.get(`http://192.248.50.155:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)      //API to get student details by email
                setStudentId(studentDetailsResult.data.user_id);
                setStudentName(studentDetailsResult.data.name_with_initials);
                setStudentRegisteredYear(studentDetailsResult.data.registered_year);
                setStudentDepartmentId(studentDetailsResult.data.department_id);
    
                getWithHeldSubjects(studentDetailsResult.data.user_id);          //Get with held subjects
            }
            catch(error){
                console.error(`Error - ${error}`);
                toast.error("Error occured while loading student details");
            }
            

        }
    }

    

    const getWithHeldSubjects = async (StuID) => {                            //Get with held subjects
        try{

            const gradeListResponse = await axios.get(`http://192.248.50.155:9090/api/Student/getGradeBySelectedStudentSelectedGrade/${StuID}/${grade}`)             //API to get WH course list
            setWithHeldSubjects(gradeListResponse.data);

        }catch(error){
            console.error(`Error - ${error}`);
            toast.error("Error occured while loading with held subjects");
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
    }, [studentEmail])


    
  return (
    <div >
        <div className='student-with-held-view-main-div' style={{marginTop:"10px",minWidth:"100%",marginInline:"2%",paddingLeft:"2%",height:"100%"}}>

            <table className="table table-striped">

                <thead className='student-WH-table-head' style={{backgroundColor:"#ffffff",position:"sticky",top:"0px",zIndex:"1"}}>
                    <tr>
                        <th colSpan={3} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                            <h5>With-held Subjects</h5> 
                        </th>
                    </tr>

                    <tr>
                        <th scope="col">Course ID</th>
                        <th scope="col">CA Eligibility</th>
                        <th scope="col">Grade</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        withHeldSubjects.length>0?(
                            <>
                            {
                                withHeldSubjects.map((subject,index)=>(
                                    <tr key={index} className='wh-table-row'>
                                        <td>{subject.course_id}</td>
                                        <td>{subject.ca_eligibility}</td>
                                        <td>{subject.grade}</td>
                                    </tr>
                                ))
                            }
                            </>
                        ):(
                            <>
                            <tr className='wh-table-row'>
                                <td colSpan={4} style={{textAlign:"center",color:"red"}}>No with held courses available</td>
                            </tr>
                            </>
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

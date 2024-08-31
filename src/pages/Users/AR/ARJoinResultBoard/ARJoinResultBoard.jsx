import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './arJoinResultBoard.css';
import axios from 'axios';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';


export default function ARJoinResultBoard() {
    const location = useLocation(); //Get the location details from the URL

    const selectedResultBoard=location.state;      //Access the object that passed with the URL

    const [studentGrades, setStudentGrades] = React.useState([]);       // state to store the student grades
    const [uniqueStudents, setUniqueStudents] = React.useState(null);         // state to store the unique students
    const [uniqueCourses, setUniqueCourses] = React.useState(null);         // state to store the unique courses
    const [studentGpa, setStudentGpa] = React.useState([]);         // state to store the student gpa
    const [courseDetails, setCourseDetails] = React.useState([]);         // state to store the course details


    const getStudentGrade = async ()=>{
        try{
            const gradeResponse =await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getGradesForResultBoard/${selectedResultBoard.level}/${selectedResultBoard.semester}/${selectedResultBoard.department}/${selectedResultBoard.academic_year}`);
            
            setStudentGrades(gradeResponse.data);
            const uniqueStudentArr = [...new Set(gradeResponse.data.map((item)=>item.student_id))].sort();                                     // get unique academic years
            setUniqueStudents(uniqueStudentArr); 

            const uniqueCourseArr = [...new Set(gradeResponse.data.map((item)=>item.course_id))].sort();                                     // get unique academic years
            setUniqueCourses(uniqueCourseArr);

            //call api to get studentGPA
            const gpaResponse = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getGpaListForResultBoard/${selectedResultBoard.department}/${selectedResultBoard.academic_year}/${selectedResultBoard.level}/${selectedResultBoard.semester}`);
            
            setStudentGpa(gpaResponse.data);

            const courseDetailsResponse = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getCourseDetailsForMarkSheet/${selectedResultBoard.level}/${selectedResultBoard.semester}/${selectedResultBoard.department}/${selectedResultBoard.academic_year}`);
            setCourseDetails(courseDetailsResponse.data);
            
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        getStudentGrade();
    }, [])





  return (
    <div className='join-rb-main-div' style={{marginTop:"20px",minWidth:"100%",paddingRight:"50px",paddingLeft:"50px",height:"100%"}}>
        <h5 style={{color:"blue",textAlign:"center"}}>
            University of Ruhuna - Faculty of Technology
        </h5>
        <h5 style={{color:"blue",textAlign:"center"}}>
            {selectedResultBoard.department.toLowerCase() == "ICT".toLowerCase()? "Bachelor of Information and Communication Technology Honours Degree": selectedResultBoard.department.toLowerCase() =="ET".toLowerCase() ? "Bachelor of Engineering Technology Honours Degree": selectedResultBoard.department.toLowerCase() =="BST".toLowerCase()? "Bachelor of Bio-Systems Technology Honours Defree":null}
        </h5>
        <h6 style={{color:"blue",textAlign:"center"}}>Level {selectedResultBoard.level} Semester {selectedResultBoard.semester} (Academic year {selectedResultBoard.academic_year})</h6>
        
        
        {
            
            uniqueCourses != null ? (
                <>
                    <hr/>

                    <div className='row'>
                        

                        <div className='col-md-6'>
                            <table >
                                <tbody>
                                    <tr><td style={{fontWeight:"bold"}}>Key to Gradings</td></tr>
                                    <tr><td>A+</td><td>4.00</td><td>A</td><td>4.00</td></tr>
                                    <tr><td>A-</td><td>3.70</td><td>B+</td><td>3.30</td></tr>
                                    <tr><td>AB</td><td>3.00</td><td>B-</td><td>2.70</td></tr>
                                    <tr><td>C+</td><td>2.30</td><td>C</td><td>2.00</td></tr>
                                    <tr><td>C-</td><td>1.70</td><td>D+</td><td>1.30</td></tr>
                                    <tr><td>D</td><td>1.00</td><td>E</td><td>0.00</td></tr>
                                    <tr><td>F</td><td colSpan={100}>CA Fail</td></tr>
                                    <tr><td>MC</td><td colSpan={100}>Accepted Medical Certificate</td></tr>
                                    <tr><td>AC</td><td colSpan={100}>Accepted Academic Concession</td></tr>
                                    <tr><td>WH</td><td colSpan={100}>Results Withheld</td></tr>
                                    <tr><td>E*</td><td colSpan={100}>Not Eligible/ Not Applied/ Absent Without Medical</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='col-md-6'>
                            <table style={{marginTop:'20px'}}>
                                <tbody>
                                    <tr><td style={{fontWeight:"bold"}}>Course Details</td></tr>
                                    {
                                        courseDetails.map((course,index)=>(
                                            <tr key={index}>
                                                <td>{course.course_id} - </td>
                                                <td>{course.course_name}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>


                </>
            ):null
        }
        
        <hr/>




        {
            uniqueCourses != null ? (
                <>
                    <div>

                        <table className='table table-striped join-rb-table'>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    {
                                        uniqueCourses.map((course)=>(
                                            <>
                                            <th className='course-id-th' style={{backgroundColor:"rgba(32, 225, 138, 0.2)"}}>{course}</th>
                                            <th className='course-grade-th' style={{backgroundColor:"rgba(137, 43, 226, 0.2)"}}>Grade</th>
                                            
                                            </>
                                        ))
                                    }
                                    <th>SGPA</th>
                                    <th style={{backgroundColor:"rgba(225, 32, 51, 0.15)"}}>CGPA</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    uniqueStudents.map((student,index)=>(
                                        <tr key={index}>
                                            <td>
                                                {student}
                                            </td>
                                            {
                                                uniqueCourses.map((course)=>(
                                                    <>
                                                        <td style={{backgroundColor:"rgba(32, 225, 138, 0.2)"}}>

                                                        {studentGrades.map((Grade)=>(
                                                            Grade.student_id===student && Grade.course_id===course?<> {Grade.total_rounded_mark}</>:null
                                                        ))}
                                                        </td>

                                                        <td style={{backgroundColor:"rgba(137, 43, 226, 0.2)"}}>

                                                        {studentGrades.map((Grade)=>(
                                                            Grade.student_id===student && Grade.course_id===course?<> {Grade.grade}</>:null
                                                        ))}
                                                        </td>
                                                    </>

                                                ))
                                            }
                                            
                                            {
                                                <>

                                                <td>
                                                    {
                                                        studentGpa.map((gpa)=>(
                                                            gpa.student_id===student?<>{gpa.sgpa}</>:null
                                                        ))
                                                    }
                                                </td>

                                                <td style={{backgroundColor:"rgba(225, 32, 51, 0.15)"}}>
                                                    {
                                                        studentGpa.map((gpa)=>(
                                                            gpa.student_id===student?<>{gpa.cgpa}</>:null
                                                        ))
                                                    }
                                                </td>

                                                </>
                                                
                                                   
                                            }


                                            

                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>

                    </div>
                </>
            ):(
                <>
                    <div> <label color='Red'>No Marks Available</label> </div>
                </>
            )
        }

        


        <div className='right-aligned-div back-button-div'>
            <br/><BackButton/> <br/>&nbsp;
        </div>
    </div>
   
  )
}

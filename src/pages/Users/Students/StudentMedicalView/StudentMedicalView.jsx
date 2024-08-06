import './studentMedicalView.css';
import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';
export default function StudentmedicalView() {


    const [studentId, setStudentId] = useState(null);  
    const [studentName, setStudentName] =useState(null);
    const [studentEmail, setStudentEmail] = useState(null);
    const [studentRegisteredYear, setStudentRegisteredYear] = useState(null);
    const [studentDepartmentId, setStudentDepartmentId] = useState(null);

    const [studentMedicalList, setStudentMedicalList] = useState([]);         //Use state to store student medical list

    const [errorMessage, setErrorMessage] = useState(null);                   //Use state to store error message
    const [selectedOption, setSelectedOption] = useState("All Years");        //Use state to store selected option
    const [uniqueYears, setUniqueYears] = useState(null);                   //Use state to store selected year


    const loadStudentDetails = async () => {
        if(studentEmail != null){

            const studentDetailsResult = await axios.get(`http://localhost:9090/api/Student/getStudentDetailsByEmail/${studentEmail}`)
            setStudentId(studentDetailsResult.data.user_id);
            setStudentName(studentDetailsResult.data.name_with_initials);
            setStudentRegisteredYear(studentDetailsResult.data.registered_year);
            setStudentDepartmentId(studentDetailsResult.data.department_id);

        }
    }


    const handleSelectedValue = (value) => {            // handle the selected value from the select box
        getAllMedicalSubmissions(value);                                     // fetch the data according to the selected value
      };


    const getAllMedicalSubmissions = async (year) => {          //get all medical submissions for the student


        

            try{

                const allYearResponse = await axios.get(`http://localhost:9090/api/Student/getStudentMedicalList/${studentId}`)             //Call api to get all medical submissions
                if(!allYearResponse.data.length>0){                     //Check if the response is empty
                    setErrorMessage("No medical submissions available")         //Set error message
                }else {                                            //If response is not empty
                    const uniqueArr = [...new Set(allYearResponse.data.map((item)=>item.academic_year))];               //Get unique years from the response
                    setUniqueYears(uniqueArr);            //Set unique years to the state

                    if(year=="All Years"){              //Check if the selected year is all years
                        setStudentMedicalList(allYearResponse.data);                    //Set all medical submissions to the state
                    }else{                              //If another year is selected

                        //Call api to get selected year medical submissions
                        const selectedYearResponse = await axios.get(`http://localhost:9090/api/Student/getStudentMedicalListBySelectedYear/${studentId}/${year}`)              //Api call to get medicals of selected year
                        setStudentMedicalList(selectedYearResponse.data);               //Set selected year medical submissions to the state
                    }
                }

            }catch(err){
                toast.error("Error fetching medical data",{autoClose:3000});
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
      

        setUniqueYears(null);
        setErrorMessage(null);

        
        setStudentEmail(user.email);
        loadStudentDetails();
        getAllMedicalSubmissions(selectedOption);       //get medicals for all years

    }, [studentEmail,studentId])



  return (
    <div>
        <div className='student-medical-view-main-div' style={{marginTop:20,minWidth:"100%",paddingRight:"2%",paddingLeft:"2%",height:"100%"}}>
            
            {
                studentMedicalList!=null && studentMedicalList.length>0 ? (

                    <table className="table table-striped ">

                        <thead className='student-medical-table-head' style={{backgroundColor:" #ffffff",position:"sticky",top:"65px",zIndex:"1"}}>
                            <tr>
                                <th style={{textAlign:"center",backgroundColor:'#ebe8e8',width:"250px"}}>
                                    <select className="form-select w-100 mx-lg-1  medical-year-selection" aria-label="Default select example" onChange={(e)=>{handleSelectedValue(e.target.value)}}>    {/* select box to select the acedemic year */} 
                                        <option className='selectionOptions' >All Years</option>
                                        
                                        {
                                            uniqueYears!=null ? (
                                                uniqueYears.map((year,index)=>(
                                                    <option className='selectionOptions' key={index}>
                                                        {year}
                                                    </option>
                                                ))
                                            ):(
                                                null
                                            )

                                            
                                        }

                                    </select>
                                </th>

                                <th colSpan={4} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                                    <h5>View Medicals</h5> 
                                </th>

                            </tr>

                            <tr>
                                <th scope="col">Course ID</th>
                                <th scope="col">Academic Year</th>
                                <th scope="col">Exam Type</th>
                                <th>Medical State</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                studentMedicalList.map((submission,index)=>(
                                    <tr className='clickable-row' key={index}>
                                        <td>{submission.course_id}</td>
                                        <td>{submission.academic_year}</td>
                                        <td>{submission.exam_type}</td>
                                        <td>{submission.medical_state}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                     </table>
                ):(
                    <div className="alert " role="alert" style={{marginTop:'100px',textAlign:'center',width:'80%',marginLeft:'auto',marginRight:'auto'}}>
                        <h5>{errorMessage}</h5>
                    </div>
                )
            }
            <ToastContainer/>
            <div className='right-aligned-div back-button-div'>
                <br/><BackButton/> <br/>&nbsp;
            </div>
        </div>
        
            
        
    </div>
  )
}

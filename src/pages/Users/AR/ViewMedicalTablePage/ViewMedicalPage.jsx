import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import './viewMedicalPage.css';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';
import { useHistory } from 'react-router-dom';

export default function ViewMedicalPage() {

  const history = useHistory();        // history object to navigate to different pages

  const [medicalAvailability,setMedicalAvailability] = useState(true);        // state to check the availability of medical submissions
  const [medicalSubmissions,setMedicalSubmissions] = useState([]);            // state to store the medical submissions
  const [uniqueYears,setUniqueYears] = useState([]);                          // state to store the unique academic years
  const selectedOption = "All Years";    
  const [loading,setLoading] = useState(false);                                     // default selected option


  const handleSelectedValue = (value) => {            // handle the selected value from the select box
    fetchData(value);                                     // fetch the data according to the selected value
  };

    const fetchData = async (value)=>{                                // function to fetch the data according to the selected value

      setLoading(true);                                     // set loading to true before fetching data

      if(value==='All Years'){                                        // if the selected value is 'All Years'

        try{                                                        // get all medical submissions

          const response = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllMedicalSubmissions`);       // get all medical submissions

          if(response.data.length>0){                  // if medical submissions are available

            setMedicalAvailability(true);               // set medical availability to true
            setMedicalSubmissions(response.data);       // set medical submissions
            const uniqueArr = [...new Set(response.data.map((item)=>item.academic_year))];      // get unique academic years
            setUniqueYears(uniqueArr);                 // set unique academic years
            
          }else{                    // if medical submissions are not available
            
            setMedicalAvailability(false);          // set medical availability to false
          }
          
          
          setLoading(false);         // set loading to false after fetching data

        }catch(err){
          toast.error("Error fetching data",{autoClose:3000});
        }
      }else{                        // if the selected value is not 'All Years'

        try{                    // get medical submissions by the selected year
          const encodedValue = encodeURIComponent(value);       // encode the selected value
          const response = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllMedicalSubmissionsByYear/${value}`);       // get medical submissions by the selected year

          if(response.data.length>0){       // if medical submissions are available

            setMedicalAvailability(true);       // set medical availability to true
            setMedicalSubmissions(response.data);       // set medical submissions

            const allResponse = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAllMedicalSubmissions`);       // get all medical submissions go get unique years
            const uniqueArr = [...new Set(allResponse.data.map((item)=>item.academic_year))];                                     // get unique academic years
            setUniqueYears(uniqueArr);                                                                                // set unique academic years
            
          }else{            // if medical submissions are not available
            
            setMedicalAvailability(false);      // set medical availability to false
          }

          setLoading(false);         // set loading to false after fetching data
        }catch(err){
          toast.error("Error fetching data",{autoClose:3000});      // show error message
        }

      }
      


    };

    const [user, setUser] = useState({});   //Use state to store user data
    const storedData = localStorage.getItem('user');    //Get user data from local storage
  
    
    useEffect(()=>{                 // fetch data when the page is loaded

      if(storedData){   //Check if user is logged in
        setUser(JSON.parse(storedData));      //Set user data
        
        if(JSON.parse(storedData).role != "ar"){     //Check if user is not a valid type one
          localStorage.removeItem('user');        //Remove user data and re direct to login page
        }
        
      }else{                          //If user is not logged in
        history.push('/login');       //Redirect to login page
      }
  
        setUniqueYears([]);         // set unique years to empty array
        fetchData(selectedOption);    // fetch data according to the selected option
      },[]);




  return (
    <div>
      
        <div style={{width:"97%",marginLeft:"auto",marginRight:"auto",marginTop:"10px"}}>

          {loading ? (
            <div className="d-flex justify-content-center" style={{marginTop:"20%"}}>
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
              <label style={{marginLeft:"10px"}}> Loading data</label>
            </div>
          ):(
            
            medicalAvailability ? (


              <table className="table table-striped dataTable" style={{textAlign:"center"}}>


                <thead className='ar-medical-table-head' style={{backgroundColor:"#ffffff",position:"sticky",top:"60px",zIndex:"1"}}>


                  <tr>

                    <th style={{textAlign:"center",backgroundColor:'#ebe8e8',width:"250px"}}>
                      
                      <select className="form-select w-100 mx-lg-1  yearSelection" aria-label="Default select example" onChange={(e)=>{handleSelectedValue(e.target.value)}}>    {/* select box to select the acedemic year */} 
                          
                          <option className='selectionOptions' >All Years</option>

                          {

                            uniqueYears.map((year,index)=>(
                              <option className='selectionOptions' key={index}>
                                {year}
                              </option>
                            ))
                          }
                          
                        </select>

                    </th>

                    <th colSpan={4} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                      View Students Medical Approvals
                    </th>

                  </tr> 

                  <tr>
                    <th scope="col">Student ID</th>
                    <th scope="col">Course ID</th>
                    <th scope="col">Academic Year</th>
                    <th scope="col">Exam Type</th>
                    <th>Medical State</th>
                  </tr>

                </thead>



                <tbody>
                  
                  {
                    medicalSubmissions.map((submission,index)=>(
                      <tr key={index} >
                        <td>{submission.student_id}</td>
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
              toast.error("No medical submissions available",{autoClose:3000})
            )

          )
          
        }


          
           
          
          <div className='right-aligned-div back-button-div' style={{textAlign:"right",marginBottom:"10px",position:"sticky"}}>
            <br/><BackButton/> <br/>&nbsp;
          </div>
            
            <ToastContainer />
        </div>
    </div>
  )
}

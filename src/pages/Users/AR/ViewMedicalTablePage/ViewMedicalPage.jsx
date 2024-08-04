import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import './viewMedicalPage.css';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';

export default function ViewMedicalPage() {

  const [medicalAvailability,setMedicalAvailability] = useState(true);        // state to check the availability of medical submissions
  const [medicalSubmissions,setMedicalSubmissions] = useState([]);            // state to store the medical submissions
  const [uniqueYears,setUniqueYears] = useState([]);                          // state to store the unique academic years
  const selectedOption = "All Years";                                         // default selected option


  const handleSelectedValue = (value) => {            // handle the selected value from the select box
    fetchData(value);                                     // fetch the data according to the selected value
  };

    const fetchData = async (value)=>{                                // function to fetch the data according to the selected value

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
        }catch(err){
          toast.error("Error fetching data",{autoClose:3000});      // show error message
        }

      }
      


    };
    
    useEffect(()=>{                 // fetch data when the page is loaded
        setUniqueYears([]);         // set unique years to empty array
        fetchData(selectedOption);    // fetch data according to the selected option
      },[]);




  return (
    <div>
      
        <div style={{width:"97%",marginLeft:"auto",marginRight:"auto",marginTop:"65px"}}>

          {
            medicalAvailability ? (


              <table className="table table-striped dataTable">


                <thead className='ar-medical-table-head'>


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
          }
          <div className='right-aligned-div back-button-div'>
            <br/><BackButton/> <br/>&nbsp;
          </div>
            
            <ToastContainer />
        </div>
    </div>
  )
}

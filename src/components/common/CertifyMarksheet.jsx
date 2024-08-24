import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function CertifyMarksheet(props) {     



    const history = useHistory();               // for routing
    const {approved_level}=props;     // Approved level for result board conducted courses

   
   const [finalMarksheetList, setFinalMarksheetList] = useState([]);          // to store available final mark sheets
   const status = "Ended";                                  // status of the result board

   useEffect(() => {
    loadAvailableResultSheets();          // load available final mark sheets
  }, [approved_level]);


    const loadAvailableResultSheets = async () => {                   // load available final mark sheets
      try {
        const response = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCertifyPendingResultBoards/${approved_level}/${status}`);        // get available final mark sheets (Latest one matching with the student level)
        
        setFinalMarksheetList(response.data);           // set available final mark sheets to the state
      } catch (e) {
        console.log(e);
      }
    }


    

    console.log(approved_level,finalMarksheetList)

   
   

    return (
      <>
        <div className='certify-div-1'>
          <div className='certify-div-2'>
            <table className='table table-striped certify-table'>
              
              <thead className='certify-table-head'>
                <tr>
                  <th className='certify-table-heading' colSpan={100} style={{textAlign: 'center', backgroundColor: '#ebe8e8', textAlignLast: 'center'}}>
                    Marks Sheets Available to Certify <br/>
                  </th>
                </tr>
                <tr>
                  <th colSpan={100}></th>
                </tr>
              </thead>
              
              <tbody>
                {
                  !finalMarksheetList.length >0 ? (
                    <tr>
                      <td colSpan={100} style={{textAlign: 'center',color:"red"}}>No Marks Sheets Available to Certify</td>
                    </tr>
                  ):(
                    finalMarksheetList.map((item, index) =>(
                      <tr key={index} className='clickable-row' onClick={()=>{approved_level=="AR"?history.push(`/deanFinalMarkSheet/${item.level}/${item.semester}/${item.department}/${item.academic_year}`):approved_level=="Dean"?history.push(`/vcFinalMarkSheet/${item.level}/${item.semester}/${item.department}/${item.academic_year}`):null}}>
                        <td>level {item.level}</td>
                        <td>semester {item.semester}</td>
                        <td>Dep. of {item.department}</td>
                      </tr>
                    ))
                  )
                }




                  
              
              </tbody>

            </table>
            <div className='right-aligned-div back-button-div'>
          {/* <BackButton/>&nbsp; */}
        </div>
          </div>
        </div>
      </>

    )

  }

import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import './certifyMarksPage.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';

export default function CertifyMarksPage(props) {

    const department_id = props.department_id;      // get department id from props
    const history = useHistory();               // for routing
    const approvedLevel="RB";          // Approved level for result board conducted courses




   const [finalMarksheetList, setFinalMarksheetList] = useState([]);          // to store available final mark sheets
   const status = "Ended";                                  // status of the result board


    const loadAvailableResultSheets = async () => {                   // load available final mark sheets
      try {
        const response = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getCertifyPendingResultBoards/${approvedLevel}/${status}`);        // get available final mark sheets (Latest one matching with the student level)
        
        setFinalMarksheetList(response.data);           // set available final mark sheets to the state
      } catch (e) {
        console.log(e);
      }
    }


    const [user, setUser] = useState({});   //Use state to store user data
    const storedData = localStorage.getItem('user');    //Get user data from local storage
  

    useEffect(() => {
      if(storedData){   //Check if user is logged in
        setUser(JSON.parse(storedData));      //Set user data
        
        if(JSON.parse(storedData).role != "ar"){     //Check if user is not a valid type one
          localStorage.removeItem('user');        //Remove user data and re direct to login page
        }
        
      }else{                          //If user is not logged in
        history.push('/login');       //Redirect to login page
      }

      
      loadAvailableResultSheets();          // load available final mark sheets
    }, []);



    return (
      <>
        <div className='certify-div-1' style={{marginTop:"80px",width:"100%"}}>
          <div className='certify-div-2' style={{width:"70%",minWidth:"450px",minHeight:"80px",boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.7)",borderRadius:"5px",overflowX:"auto",overflowY:"auto",marginLeft:"auto",marginRight:"auto"}}>
            <table className='table table-striped certify-table' style={{width:"100%"}}>
              
              <thead className='certify-table-head'style={{backgroundColor:"#ffffff",position:"sticky",top:"1px",zIndex:"1"}}>
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
                      <tr key={index} className='clickable-row' onClick={()=>{history.push(`/arFinalMarkSheet/${item.level}/${item.semester}/${item.department}/${item.academic_year}`)}}>
                        <td>level {item.level}</td>
                        <td>semester {item.semester}</td>
                        <td>Dep. of {item.department}</td>
                        <td>academic year ({item.academic_year})</td>
                      </tr>
                    ))
                  )
                }




                  
              
              </tbody>

            </table>
            <div className='right-aligned-div back-button-div'>
          <BackButton/>&nbsp;
        </div>
          </div>
        </div>
      </>

    )

  }

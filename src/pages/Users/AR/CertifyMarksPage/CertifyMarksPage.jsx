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

/*    const checkCertifyAvailability = async (level,semester) => {          // check whether HOD approved all courses for the given level and semester
       let approvedYear = new Date().getFullYear();                       // get current year

       try{
          const academicYearDetails= await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`);    // get academic year details
          
          try{                                                                // get 'not approved courses' by level, semester, approved level and year     
            const response = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getNotApprovedCoursesByLevelSemester/${level}/${semester}/${approvedLevel}/${academicYearDetails.data[0]["current_academic_year"]}/${department_id}`);     // get not approved courses by level, semester, approved level and year
            
            if(response.data.length>0){                                       // if 'not approved courses' are available
              toast.error("Result board is not conducted for all the courses",{autoClose:3000});      // show error message
              
            }else{                                                // if 'not approved courses' are not available

              try{                                                // check whether there are students who were absent for the exams
                const abList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/isABStudentAvailable/${academicYearDetails.data[0]["current_academic_year"]}/${semester}/${level}/${department_id}`);    //Call api to check the AB student availability

                if(abList.data){

                  toast.error("There are students who were absent for the exams, please check the medicals and update their states",{autoClose:6000});    //Display error message if there are students who were absent for the exams
                
                }else{

                  history.push(`/arFinalMarkSheet/${level}/${semester}/${department_id}`);       // redirect to final mark sheet page

                }

              }catch(e){
                toast.error("Error with getting absent student details",{autoClose:3000});      // show error message
              }

            }
          }
          catch(e){
            
            toast.error("Error with getting not approved course details",{autoClose:3000});      // show error message
          }
       }
       catch(e){
          toast.error("Could not find academic year details",{autoClose:3000});      // show error message
       }
       
      
      
    };

    // if (authState?.accessToken?.claims.userType !== 'ar') {
    //   return <Redirect to="/ar" />;
    // }
  return (
    <div>
        
        <div style={{width:"98%",marginLeft:"auto",marginRight:"auto",marginTop:"85px",alignContent:'center'}}>

            
            <table className="table table-striped">

              <thead>
                <tr>
                  <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                    Certify Student Marks <br/>
                  </th>
                </tr>         
              </thead>

            
            </table>
            <div className="container">
                <div className="row">
                    <div className="col-sm">

                        

                        <div className="d-grid gap-3 level-set" style={{marginTop:"50px",marginRight:"30px"}}>
                            <label className="semesterLabel " >Semester 1</label>                                                                       
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(1,1) }}>Level 1</button>
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(2,1) }}>Level 2</button>
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(3,1) }}>Level 3</button>
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(4,1) }}>Level 4</button>
                            
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="d-grid gap-3 level-set" style={{marginTop:"50px",marginLeft:"30px"}}>
                            <label className="semesterLabel">Semester 2</label>                                                                    
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(1,2) }}>Level 1</button>
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(2,2) }}>Level 2</button>
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(3,2) }}>Level 3</button>
                            <button className="btn btn-primary level-button" type="button" onClick={()=>{ checkCertifyAvailability(4,2) }}>Level 4</button>
                        </div>
                    </div>
                </div>
                <div className='right-aligned-div'>
                  <br/><BackButton/> <br/>&nbsp;
                </div>
            </div>
            <ToastContainer />        
            
        </div>
    </div>
  )*/


   const [finalMarksheetList, setFinalMarksheetList] = useState([]);          // to store available final mark sheets
   const status = "Ended";                                  // status of the result board


    const loadAvailableResultSheets = async () => {                   // load available final mark sheets
      try {
        const response = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCertifyPendingResultBoards/${approvedLevel}/${status}`);        // get available final mark sheets (Latest one matching with the student level)
        
        setFinalMarksheetList(response.data);           // set available final mark sheets to the state
      } catch (e) {
        console.log(e);
      }
    }


    useEffect(() => {
      loadAvailableResultSheets();          // load available final mark sheets
    }, []);



    return (
      <>
        <div className='certify-div-1' style={{marginTop:"20px",width:"100%"}}>
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
                      <tr key={index} className='clickable-row' onClick={()=>{history.push(`/arFinalMarkSheet/${item.level}/${item.semester}/${item.department}`)}}>
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

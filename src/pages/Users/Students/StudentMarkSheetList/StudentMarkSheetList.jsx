import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './studentMarkSheetList.css';
import { useHistory } from 'react-router-dom';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';


export default function StudentMarkSheetList() {

    const history = useHistory();

    const approvedLevel="VC";          // Approved level for result board conducted courses
    const resultBoardState ="Ended";   // State of the result board to publish marks
    const [publishedMarkSheetsList, setPublishedMarkSheetsList] = useState([]);         //Use state to store published mark sheets list



    const getPublishedMarkSheets = async () => {         // load the published mark sheets
        try{
          const result = await axios.get(`http://192.248.50.155:9090/api/Student/getPublishedMarksSheetList/${approvedLevel}/${resultBoardState}`);
          setPublishedMarkSheetsList(result.data);
        }catch(error){
          console.error(`Error - ${error}`);
        }
    }


    const [user, setUser] = useState({});   //Use state to store user data
  const storedData = localStorage.getItem('user');    //Get user data from local storage

    useEffect(() => {
      if(storedData){   //Check if user is logged in
        setUser(JSON.parse(storedData));      //Set user data
        
        if (!(JSON.parse(storedData).role == "student" || JSON.parse(storedData).role =='ar')){     //Check if user is not a valid type one
          localStorage.removeItem('user');        //Remove user data and re direct to login page
        }
        
      }else{                          //If user is not logged in
        history.push('/login');       //Redirect to login page
      }
      
        getPublishedMarkSheets();
      }, [])





  return (


    <div className='student-published-marksheet-list-main-div' style={{marginTop:"10px",maxWidth:"100%"}}>

      <div className='row published-mark-sheet-list-main-row'>

        
        <table className="table table-striped student-home-page-table" >

          <thead className='marks-sheet-list-table-head' style={{backgroundColor:"#ffffff",position:"sticky",top:"0px",zIndex:"1"}}>
            <tr>
              <th className='home-page-table-heading' colSpan={100} style={{textAlign: 'center', backgroundColor: '#ebe8e8', textAlignLast: 'center'}}>
                Published Marks Sheets <br/>
              </th>
            </tr>
            <tr>
              <th colSpan={100}></th>
            </tr>
            <tr>
              <th>Level</th>
              <th>Semester</th>
              <th>Department</th>
              <th>Academic Year</th>
            </tr>
          </thead>

          <tbody>
            {
              publishedMarkSheetsList.length <1 ? (
                <tr>
                  <td colSpan={100} style={{textAlign: 'center'}}>No Published Marks Sheets Available</td>
                </tr>
              ):
              (
                publishedMarkSheetsList.map((item, index) =>(
                  <tr key={index} className='clickable-row' onClick={()=>{history.push({pathname:`/viewPublishedMarksSheet`,state:item})}}>
                    <td>level {item.level}</td>
                    <td>semester {item.semester}</td>
                    <td>Dep. of {item.department}</td>
                    <td>academic year ({item.academic_year})</td>
                  </tr>))
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

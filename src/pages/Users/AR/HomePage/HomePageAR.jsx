import './homePageAR.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


export default function HomePageAR() {

  const history = useHistory();
  const [department, setDepartment] = React.useState("");


const handleChange = (link) => {
  setDepartment(link);
  history.push(link);
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

  }, []);
  
  return (
    <div>
      {/* horizontall cards*/ }
      <div className="container functionCardContainer">

        <div className="row">

        <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title">Upload Medical </h5><br/>
                <a href="/aruploadmedicals" className="btn btn-primary home-page-class-button">Upload</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title"> Medical List</h5><br/>
                <a href="/viewMedicals" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Exam Absentees </h5><br/>
                <a href="/viewablist" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Marks Return Sheets </h5><br/>
                
                <select className="form-select home-page-class-button marksheet-select-box-button" style={{backgroundColor:"#0d6efd",color:"white",marginLeft:"auto",marginRight:"auto",textAlign:"center",width:"max-content"}} value={department} onChange={(e)=>{handleChange(e.target.value)}}>

                  <option value={""} disabled style={{color:"rgb(100, 100, 100)"}}>
                    Select department
                  </option>

                  <option value='/arviewictmarks'>
                    Dep. of ICT
                  </option>

                  <option value='/arviewetmarks'>
                    Dep. of ET
                  </option>

                  <option value='/arviewbstmarks'>
                    Dep. of BST
                  </option>

                  
                
                </select>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                  <br/><h5 className="card-title">Manage Results Boards</h5><br/>
                <a href="/createResultsBoard" className="btn btn-primary home-page-class-button">Manage</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Certify Marks Sheets</h5><br/>
                <a href="/arCertifyMarks" className="btn btn-primary home-page-class-button">Certify</a>
              </div>
            </div>
          </div>

          {/* <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Published Marks Sheets</h5><br/>
                <a href="/arPublishedMarkSheets" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div> */}

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <br/><h5 className="card-title">Download  Marks Sheets</h5><br/>
                <a href="/pendingVCCertifyMarksheet" className="btn btn-primary home-page-class-button">View</a>
              </div>
            </div>
          </div>

          
          
        </div>

      </div>

    </div>
  )
}

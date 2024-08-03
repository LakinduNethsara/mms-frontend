import './homePageAR.css';
import React from 'react';
import { useHistory } from 'react-router-dom';


export default function HomePageAR() {

  const history = useHistory();
  const [department, setDepartment] = React.useState("");


const handleChange = (link) => {
  setDepartment(link);
  history.push(link);
}
  

  
  return (
    <div>
      {/* horizontall cards*/ }
      <div className="container functionCardContainer" >

        <div className="row">



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
                
                <select className="form-select home-page-class-button marksheet-select-box-button" value={department} onChange={(e)=>{handleChange(e.target.value)}}>

                  <option value={""} disabled style={{color:"rgb(100, 100, 100)"}}>
                    Select department
                  </option>

                  <option value='/arviewictmarks'>
                    ICT
                  </option>

                  <option value='/arviewetmarks'>
                    ET
                  </option>

                  <option value='/arviewbstmarks'>
                    BST
                  </option>

                  <option value='/arviewmtdmarks'>
                   Multi Disciplinary
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

          
          
        </div>

      </div>

    </div>
  )
}

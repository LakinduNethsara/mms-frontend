import React, { useEffect, useState } from 'react'
import CourseSelection from '../CourseSelection/CourseSelection';

export default function SemesterSelection(props) {
  var level=props.level;
  var department_id=props.department_id;
  
  const [selectedSemester, setSelectedSemester] = useState(1);

  const [button1BgColor, setButton1BgColor] = useState("#0d6efd");
  const [button2BgColor, setButton2BgColor] = useState("");

  const [button1FontColor, setButton1FontColor] = useState("white");
  const [button2FontColor, setButton2FontColor] = useState("0d6efd");

  function callCourse(semester){
    setSelectedSemester(semester);

    if(semester === 1){
      setButton1BgColor("#0d6efd");
      setButton2BgColor("");

      setButton1FontColor("white");
      setButton2FontColor("#0d6efd");
    }else if(semester === 2){
      setButton1BgColor("");
      setButton2BgColor("#0d6efd");

      setButton1FontColor("#0d6efd");
      setButton2FontColor("white");
    }


  }





  return (
    
    <div style={{marginTop:8,marginLeft:0,marginRight:0}}>
      
        <ul className="nav nav-pills mb-3" id="semesterSelectionTab" role="tablist">
      
            <li className="nav-item" role="presentation">
                <button className="nav-link " style={{backgroundColor:button1BgColor,color:button1FontColor}} id="semester1" data-bs-toggle="pill" data-bs-target="#sem1" type="button" role="tab" aria-controls="semester 1" aria-selected="true"  onClick={() => callCourse(1)}>SEMESTER I</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link " style={{backgroundColor:button2BgColor,color:button2FontColor}} id="semester2" data-bs-toggle="pill" data-bs-target="#sem2" type="button" role="tab" aria-controls="semester 2" aria-selected="false" onClick={() => callCourse(2)}>SEMESTER II</button>
            </li>
           
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div className={`tab-pane fade ${selectedSemester === 1 ? "show active" : ""}`} id="sem1" role="tabpanel" aria-labelledby="semester1">
            
            {selectedSemester === 1 && <CourseSelection level={level} semester={1} department_id={department_id}/>}
          </div>
          <div className={`tab-pane fade ${selectedSemester === 2 ? "show active" : ""}`} id="sem2" role="tabpanel" aria-labelledby="semester2">     
            
            {selectedSemester === 2 && <CourseSelection level={level} semester={2} department_id={department_id}/>} 
          </div>
        </div>
    </div>

    
  )
}

import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';

import "./levelSelection.css";
import SemesterSelection from '../SemesterSelection/SemesterSelection';

export default function LevelSelection(props) {

  var department_id = props.department_id;
  var level_selection_tpe = props.level_selection_tpe;

  const [selectedLevel, setSelectedLevel] = useState(1);

  const [button1BgColor, setButton1BgColor] = useState("#0d6efd");
  const [button2BgColor, setButton2BgColor] = useState("");
  const [button3BgColor, setButton3BgColor] = useState("");
  const [button4BgColor, setButton4BgColor] = useState("");
  
  const [button1FontColor, setButton1FontColor] = useState("white");
  const [button2FontColor, setButton2FontColor] = useState("0d6efd");
  const [button3FontColor, setButton3FontColor] = useState("0d6efd");
  const [button4FontColor, setButton4FontColor] = useState("0d6efd");

  function callSemester(level) {
    
    setSelectedLevel(level);
    
    if(level === 1){
      setButton1BgColor("#0d6efd");
      setButton2BgColor("");
      setButton3BgColor("");
      setButton4BgColor("");

      setButton1FontColor("white");
      setButton2FontColor("#0d6efd");
      setButton3FontColor("#0d6efd");
      setButton4FontColor("#0d6efd");



    }else if(level === 2){
      setButton1BgColor("");
      setButton2BgColor("#0d6efd");
      setButton3BgColor("");
      setButton4BgColor("");

      setButton1FontColor("#0d6efd");
      setButton2FontColor("white");
      setButton3FontColor("#0d6efd");
      setButton4FontColor("#0d6efd");

      

    }else if(level === 3){
      setButton1BgColor("");
      setButton2BgColor("");
      setButton3BgColor("#0d6efd");
      setButton4BgColor("");

      setButton1FontColor("#0d6efd");
      setButton2FontColor("#0d6efd");
      setButton3FontColor("white");
      setButton4FontColor("#0d6efd");



    }else if(level === 4){
      setButton1BgColor("");
      setButton2BgColor("");
      setButton3BgColor("");
      setButton4BgColor("#0d6efd");

      setButton1FontColor("#0d6efd");
      setButton2FontColor("#0d6efd");
      setButton3FontColor("#0d6efd");
      setButton4FontColor("white");



    }
  }


  
  return (
    <form>

    <div className="shadow" style={{marginTop:60,marginLeft:20,marginRight:20,}}>
        <nav >
            <div className="nav nav-tabs" id="level-selection-tab" role="tablist" style={{backgroundColor:"rgba(0, 0, 0, 0.1)"}}>
                <button className="nav-link levels " style={{width:"auto",height:"auto",fontSize:"14px",backgroundColor:button1BgColor,color:button1FontColor}} id="nav-level1-tab" data-bs-toggle="tab" data-bs-target="#nav-level1" type="button" role="tab" aria-controls="nav-level1" aria-selected="true" onClick={() => callSemester(1)}> LEVEL 1</button>
                <button className="nav-link levels " style={{width:"auto",height:"auto",fontSize:"14px",backgroundColor:button2BgColor,color:button2FontColor}} id="nav-level2-tab" data-bs-toggle="tab" data-bs-target="#nav-level2" type="button" role="tab" aria-controls="nav-level2" aria-selected="false" onClick={() => callSemester(2)}>LEVEL 2</button>
                <button className="nav-link levels " style={{width:"auto",height:"auto",fontSize:"14px",backgroundColor:button3BgColor,color:button3FontColor}} id="nav-level3-tab" data-bs-toggle="tab" data-bs-target="#nav-level3" type="button" role="tab" aria-controls="nav-level3" aria-selected="false" onClick={() => callSemester(3)}>LEVEL 3</button>
                <button className="nav-link levels " style={{width:"auto",height:"auto",fontSize:"14px",backgroundColor:button4BgColor,color:button4FontColor}} id="nav-level4-tab" data-bs-toggle="tab" data-bs-target="#nav-level4" type="button" role="tab" aria-controls="nav-level3" aria-selected="false" onClick={() => callSemester(4)}>LEVEL 4</button>
                    <label style={{paddingTop:"7px",paddingLeft:"200px",fontSize:"18px"}}><b>{level_selection_tpe}  - Department of {department_id}</b></label>
            </div>

        </nav>
        <div className="tab-content" id="level-selection-tabContent" >
          <div className={`tab-pane fade ${selectedLevel === 1 ? "show active" : ""}`} id="nav-level1" role="tabpanel" aria-labelledby="nav-level1-tab">
            {selectedLevel === 1 && <SemesterSelection level={1} department_id={department_id} />}
            
          </div>
          <div className={`tab-pane fade ${selectedLevel === 2 ? "show active" : ""}`} id="nav-level2" role="tabpanel" aria-labelledby="nav-level2-tab">
            {selectedLevel === 2 && <SemesterSelection level={2} department_id={department_id}/>}
          
          </div>
          <div className={`tab-pane fade ${selectedLevel === 3 ? "show active" : ""}`} id="nav-level3" role="tabpanel" aria-labelledby="nav-level3-tab">
            {selectedLevel === 3 && <SemesterSelection level={3} department_id={department_id}/>}
          </div>
          <div className={`tab-pane fade ${selectedLevel === 4 ? "show active" : ""}`} id="nav-level4" role="tabpanel" aria-labelledby="nav-level4-tab">
            {selectedLevel === 4 && <SemesterSelection level={4} department_id={department_id}/>}
            
          </div>
        </div>
      
    </div>
    
    </form>
  )
}

import BackButton from "../../../../components/Users/AR/BackButton/BackButton";
import LevelSelection from "../../../../components/Users/AR/LevelSelection/LevelSelection";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import React from 'react';


export default function ViewMarks(props) {

  const history = useHistory();    //Used for redirection
  
  var department_id = props.department_id;

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
       
        
        {/* <NavebarAR/> */}
        <LevelSelection department_id={department_id} level_selection_tpe={"View Marks Return Sheets"}/>

        <div className='col'>
            <div className='right-aligned-div back-button-div' style={{marginRight:'20px',marginTop:"10px"}}>
              <BackButton/> <br/>&nbsp;
            </div>
        </div>
    </div>
  )
}

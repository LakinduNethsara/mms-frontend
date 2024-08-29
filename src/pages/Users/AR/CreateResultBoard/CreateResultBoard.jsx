import React, { useEffect } from 'react'
import { useState } from 'react'
import './createResultBoard.css'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import BackButton from '../../../../components/Users/AR/BackButton/BackButton';




export default function CreateResultBoard() {
    const history = useHistory();

    const [department, setDepartment] =useState(0);            //store selected department
    const [level, setLevel] = useState(0);                    //store selected level
    const [semester, setSemester] =useState(0);               //store selected semester
    const [academicYear, setAcademicYear] = useState(0);       //store selected academic year
    const [createdResultBoardList, setCreatedResultBoardList] = useState([]);    //store created result board list
    

    const [academicYearList, setAcademicYearList] = useState([]);              //store all academic year list

    const [buttonAvailability, setButtonAvailability] = useState(false);    //store the button availability status
    const [errorMessage, setErrorMessage] = useState('');    //store the error message
    const [errorMessageColor, setErrorMessageColor] = useState('');    //store the error message color
    const [buttonClicked, setButtonClicked] = useState(false);    //store the button clicked status
    const [buttonColour, setButtonColour] = useState('gray');    //store the button colour
    

    let newResultBoard = {                  // Object to store the new result board details
        department:department,
        level:level,
        semester:semester,
        academic_year:academicYear,
        status:"Not started",
        created_date_time:null,
        conducted_date_time:null
    }

    const selectedResultBoard ={                //Object to store the selected result board details
        id:"",
        department:"",
        level:"",
        semester:"",
        academic_year:"",
        status:"",
        created_date_time:null,
        conducted_date_time:null
    }

    


    const handleDepartment = async (department) => {              // handle the department selection
        setDepartment(department.target.value);         // set the selected department
        checkResultBoardAvailability(department.target.value,level,semester,academicYear);          // check the result board availability to enable or disable the button

        
        
    }

    const handleLevel = async (level) => {                        // handle the level selection
        setLevel(level.target.value);                   // set the selected level
        checkResultBoardAvailability(department,level.target.value,semester,academicYear);          // check the result board availability to enable or disable the button

        
    }

    const handleSemester = async (semester) => {                  // handle the semester selection
        setSemester(semester.target.value);             // set the selected semester
        checkResultBoardAvailability(department,level,semester.target.value,academicYear);         // check the result board availability to enable or disable the button

        
    }

    const handleAcademicYear = async (academicYear) => {          // handle the academic year selection
        setAcademicYear(academicYear.target.value);        // set the selected academic year
        checkResultBoardAvailability(department,level,semester,academicYear.target.value);          // check the result board availability to enable or disable the button
        
    }


    const loadAcademicYear = async () => {                  // load the current academic year
        const academicYearDetails =await axios.get(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`);      // get the academic year details
        setAcademicYearList([]);                                                                                                // clear the academic year list
        setAcademicYearList(academicYearList=>[...academicYearList,academicYearDetails.data[0].previous_academic_year]);          // set previous academic year to the list
        setAcademicYearList(academicYearList=>[...academicYearList,academicYearDetails.data[0].current_academic_year]);        // set current academic year to the list
    }   


    const checkResultBoardAvailability = async (selectedDepartment,selectedLevel,selectedSemester,selectedAcademicYear) =>{             // function to check the new creating result board is available or not

        if(selectedDepartment == 0 || selectedLevel == 0 || selectedSemester == 0 || selectedAcademicYear == 0){            // check any field is not selected
            setButtonAvailability(false);                       // disable the button if any field not selected
            setButtonColour('gray');                            // set the button colour to gray
            setErrorMessageColor('red');                        // set the error message color to red
            setErrorMessage("Select all the fields to create the result board");        //set error message to notify it

        }
        else if (selectedDepartment !== 0 && selectedLevel !== 0 && selectedSemester !== 0 && selectedAcademicYear !== 0){      //check all fields are selected
            

            try{
                const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/isResultBoardAvailable/${selectedDepartment}/${selectedLevel}/${selectedSemester}/${selectedAcademicYear}`)    //Call api to check the result board availability
                
                if(result.data){
                    toast.error("Selected Result Board is existing! ",{autoClose:2000});   //Display error message if result board is already created
                    setErrorMessageColor('red');                                                //set the error message color to red
                    setErrorMessage("Selected Result Board is existing!");               //set error message to notify if the result board is already created
                    setButtonAvailability(false);                                               //Disable the button
                    setButtonColour('gray');                                                    //Set the button colour to gray
                }
                else{
                    setErrorMessageColor('red');                //Set the error message colour to red
                    setErrorMessage("");                        //Clear the error message
                    setButtonAvailability(true);                //Enable the button
                    setButtonColour();                    //Set the button colour to blue
                }

            }catch(e){
                toast.error("Error in checking the result board availability",{autoClose:2000});   //Display error message if there is an error in checking the result board availability
                setErrorMessageColor('red');                //Set the error message colour to red
                setErrorMessage("Error in checking the result board availability");                //set error message to notify if there is an error in checking the result board availability
            }


            
        }
    }




    const loadCreatedResultBoardList = async () => {    //Load the created result board list
        try{
            const result = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getCreatedResultBoardList`);    //Call api to get the created result board list
            setCreatedResultBoardList(result.data);    //Set the created result board list
        }
        catch(e){
            toast.error("Error in loading the created result board list",{autoClose:2000});    //Display error message if there is an error in loading the created result board list
        }
    }



    const createResultBoard = async () => {    //Create the result board

        try{

            const notApprovedList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getNotApprovedCoursesByLevelSemester/${level}/${semester}/HOD/${academicYear}/${department}`);    //Call api to get the not approved course list
            
            if(notApprovedList.data.length>0){    //Check whether there are not approved courses
                
                toast.error("HOD have not approved all courses for this level and semester",{autoClose:2000});    //Display error message if there are not approved courses
                setErrorMessageColor('red')    //Set the error message colour to red
                setErrorMessage("HOD have not approved all courses for this level and semester");    //Set the error message to notify HOD have not approved all courses for this level and semester
            
            }else{

                try{

                    const abList = await axios.get(`http://localhost:9090/api/AssistantRegistrar/isABStudentAvailable/${academicYear}/${semester}/${level}/${department}`);    //Call api to check the AB student availability
                    
                    if(abList.data){            //If there are absent students

                        toast.error("There are students who were absent for the exams, please check the medicals and update their states",{autoClose:6000});    //Display error message if there are students who were absent for the exams
                    
                    }
                    else{

                        try{

                            const currentDateAndTime = new Date();  //Get the current date and time
                            const formattedDateTime = String(currentDateAndTime.getFullYear() + '-' + (currentDateAndTime.getMonth()+1) + '-' + currentDateAndTime.getDate() +' ' +  currentDateAndTime.getHours()+ ':'+ currentDateAndTime.getMinutes() +':' + currentDateAndTime.getSeconds()); //Format the date and time
                            console.log(formattedDateTime)
                            newResultBoard.created_date_time = formattedDateTime;    //Set the formatted date and time to the new result board object

                            await axios.post(`http://localhost:9090/api/AssistantRegistrar/saveResultBoard`,newResultBoard);    //Call api to create the result board
                            toast.success("Result board is created successfully");    //Display success message if the result board is created successfully
                            setButtonClicked(true);    //Set the button clicked status to true
                            setErrorMessageColor('blue')        //Set the error message colour to blue
                            setErrorMessage("Result board is created successfully");    //Set the error message to notify the result board is created successfully

                            setButtonColour('gray');    //Set the button colour to gray
                            setButtonAvailability(false);    //Disable the button

                        }catch(e){

                            toast.error("Error in creating the result board",{autoClose:2000});    //Display error message if there is an error in creating the result board

                        }

                    }

                }catch(e){

                    toast.error("Error with getting not approved course details",{autoClose:2000});    //Display error message if there is an error with getting not approved course details
                
                }

            }

        }catch(e){
            toast.error("Error with getting not approved course details",{autoClose:2000});    //Display error message if there is an error with getting not approved course details
        }

    }

    
    const [user, setUser] = useState({});   //Use state to store user data
    const storedData = localStorage.getItem('user');    //Get user data from local storage
  





    useEffect(()=>{

        if(storedData){   //Check if user is logged in
            setUser(JSON.parse(storedData));      //Set user data
            
            if(JSON.parse(storedData).role != "ar"){     //Check if user is not a valid type one
              localStorage.removeItem('user');        //Remove user data and re direct to login page
            }
            
          }else{                          //If user is not logged in
            history.push('/login');       //Redirect to login page
          }

          
        setButtonClicked(false);
        setAcademicYearList([]);
        setCreatedResultBoardList([]);
        setButtonAvailability(false);
        setButtonColour('gray');


        loadAcademicYear();
        loadCreatedResultBoardList();
        
    },[academicYear,department,level,semester,buttonClicked])

  return (
    <div className='div-body container' style={{marginTop:"20px",minWidth:"100%",paddingRight:"50px",paddingLeft:"50px",height:"100%"}}>

        <div className='row justify-content-between'>

            <div className='col-4 sub-div1' style={{width:"100%",minWidth:"450px",minHeight:"80px",boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.4)",borderRadius:"5px",marginBottom:"20px",overflowX:"auto" }}>

                <div className="row justify-content-between">
                <div className="col">
                        <select className='selection' style={{width:"180px",borderRadius:"5px",fontSize:"15px",textAlign:"center",lineHeight:"50px",marginTop:"20px"}} value={academicYear} onChange={handleAcademicYear}>                   {/* selection for semester */}
                            <option value='0' disabled>Academic Year</option>
                            {
                                academicYearList.map((element,index)=>(
                                    <option key={index} value={element}>{element}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col">
                        <select className='selection' style={{width:"180px",borderRadius:"5px",fontSize:"15px",textAlign:"center",lineHeight:"50px",marginTop:"20px"}} value={semester} onChange={handleSemester}>                   {/* selection for semester */}
                            <option value='0' disabled>Select Semester</option>
                            <option value='1'>Semester 1</option>
                            <option value='2'>Semester 2</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className='selection' style={{width:"180px",borderRadius:"5px",fontSize:"15px",textAlign:"center",lineHeight:"50px",marginTop:"20px"}} value={level} onChange={handleLevel}>                         {/* selection for level */}
                            <option value='0' disabled>Select level</option>
                            <option value='1'>Level 1</option>
                            <option value='2'>Level 2</option>
                            <option value='3'>Level 3</option>
                            <option value='4'>Level 4</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className='selection' style={{width:"180px",borderRadius:"5px",fontSize:"15px",textAlign:"center",lineHeight:"50px",marginTop:"20px"}} value={department} onChange={handleDepartment}>               {/* selection for department */}
                            <option value='0' disabled>Select department</option>
                            <option value='ICT'>ICT</option>
                            <option value='ET'>ET</option>
                            <option value='BST'>BST</option>
                        </select>
                    </div>
                    <div className="col">
                        <button className='btn btn-primary' style={{width:"Auto",height:"Auto",marginTop:"20px",backgroundColor:buttonColour,borderColor:buttonColour}} disabled={!buttonAvailability} onClick={createResultBoard}>Create Result Board</button>
                        
                        <ToastContainer/>
                    </div>
                    <div className="col">
                        
                    </div>
            
            
                </div>
                <div className='row justify-content-between'>
                    <div className="col">
                        
                        <label style={{color:errorMessageColor,marginTop:"10px",minWidth:"100%"}}>{errorMessage}</label>
                        <BackButton/>
                    </div>
                    
                </div>
                <hr style={{height:"3px", background:"blue"}}></hr>

                <div style={{marginLeft:"auto",marginRight:"auto",alignContent:'center'}}>
                    <table className="table table-striped existing-result-board-table">
                        <thead className='tableHead' style={{backgroundColor:"#ffffff",position:"sticky",top:"65px",zIndex:"1"}}>
                            <tr>
                                <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                                    Existing Result Boards <br/>
                                </th>
                            </tr>
                            <tr>              
                            <th scope="col">Academic Year</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Level</th>
                            <th scope="col">Department</th>
                            <th scope="col">State</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdResultBoardList.map((element) => (
                                <tr className="clickable-row" key={element.id} onClick={()=>{ 
                                    // if(element.status=="Ended"){                                          {/*Check whether the result board ended*/}
                                    //     toast.error("This result board is finished");
                                    // }else{
                                        selectedResultBoard.id = element.id;
                                        selectedResultBoard.department = element.department;
                                        selectedResultBoard.level = element.level;
                                        selectedResultBoard.semester = element.semester;
                                        selectedResultBoard.academic_year = element.academic_year;
                                        selectedResultBoard.status = element.status;
                                        selectedResultBoard.created_date_time = element.created_date_time;
                                        selectedResultBoard.conducted_date_time = element.conducted_date_time;
                                        history.push({pathname:`/arViewResultsBoard`,state:selectedResultBoard}) }}      //Else direct to view result board page
                                    // }
                                >
                                    <td>{element.academic_year}</td>
                                    <td>{element.semester}</td>
                                    <td>{element.level}</td>
                                    <td>{element.department}</td>
                                    <td>{element.status}</td>
                                    <td><button className="btn btn-primary btn-sm" disabled={false} >View Results Board</button></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
        

        
    </div>
  )
}

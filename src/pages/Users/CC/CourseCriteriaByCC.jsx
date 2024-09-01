import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomPopup from '../../../components/Users/CC/CustomPopup';
import MidTypePopup from '../../../components/Users/CC/MidTypePopup';

export default function CourseCriteriaByCC() {
    
    const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
    const [criteriaData, setCriteriaData] = useState([]); // State to hold the criteria data
    const [criteria_name, setCriteria_name] = useState([]); // State to hold the evaluation criteria name
    const asmntTypeRef = useRef(null); // Create a ref for the assessment type select element

    const [selectedTypeofAssessment, setSelectedTypeofAssessment] = useState('');
    const [newAssessmentType, setNewAssessmentType] = useState({
        assessment_type_name: '',
        ca_mid_end: '',
    }); // State to hold the new assessment type

    const [showButton, setShowButton] = useState(false);
    const [reloadButton, setReloadButton] = useState(false);
    
    const [assessmentTypesData, setAssessmentTypesData] = useState([]);
    const [cidsData, setCidsData] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isMidPopupVisible, setIsMidPopupVisible] = useState(false);
    const [sequence, setSequence] = useState(1); // Initialize sequence in state
    const [endSequence, setEndSequence] = useState(1); // Initialize endSequence in state
    const storedData = localStorage.getItem('user');
    const [email,setEmail] =useState();
    const [userData, setUserData] = useState([]);

    const [noOfConducted, setNoOfConducted] = useState('');
    const [noOfTaken, setNoOfTaken] = useState('');
    const [disableInputs, setDisableInputs] = useState(false);
    const [isMidSelected, setIsMidSelected] = useState(false);
    const [userSelectedMidType, setUserSelectedMidType] = useState('');
    const [selectedMainAssessmentValue, setSelectedMainAssessmentValue] = useState('');
    const [loader, setLoader] = useState(false);
    const [courseSelected, setCourseSelected] = useState(false);
    const [isAllDataNotLoaded, setIsAllDataNotLoaded] = useState(false);
    const [isChecked, setIsChecked] = useState(false); //variable for checkbox

    console.log(email);

    

    useEffect(() => {
        if(storedData){

          // setUserData(JSON.parse(storedData));
          fetchData(JSON.parse(storedData).email);
          setEmail(JSON.parse(storedData).email);
        }else{

          setUserData(null);
        }
        
    }, [email]);

    const fetchData = async (email)=>{      
        try{
            setLoader(true);

            try{
              const result2  = await axios.get(`http://localhost:9090/api/ccmanage/getAllCidToCourseCriteria/${email}`);
              setCidsData(result2.data.content);
              setIsAllDataNotLoaded(false);
            }catch(error){
              setLoader(false);
              setIsAllDataNotLoaded(true);
            }

            setLoader(false);
        }catch(error){
            // console.log(error);
        }

        }

        useEffect(() => {
            
        }, [showButton,reloadButton])

        // useEffect(() => {
        //   if (userSelectedMidType) {}
        // }, [userSelectedMidType]);
        
          // Function to handle Assessment Type selection
          const handleAssessmentTypeChange = (event) => {
            const selectedValue = event.target.value;
            setSelectedAssessmentType(selectedValue);
            // CheckingSelectedAssementType(event);
            }

            const selectedMainAssessment = (event) => {
              const selectedValue = event.target.value;
              setSelectedMainAssessmentValue(selectedValue);
              // Check if the selected value is "Final Assessment"
            if (selectedValue === 'End') {
              // Set the values to '1' and disable the inputs
              setNoOfConducted('1');
              setNoOfTaken('1');
              setDisableInputs(true);
            }else{
              setNoOfConducted('');
              setNoOfTaken('');
              setDisableInputs(false);
            }
          };
          
      
            // Function to handle form submission
        const handleSubmit = (event) => {
          event.preventDefault(); // Prevent the default form submission behavior
            const no_of_taken = parseInt(document.querySelector('input[name="no_of_taken"]').value);
          //no_of_conducted
            const no_of_conducted = parseInt(document.querySelector('input[name="no_of_conducted"]').value);
      
            let description = '';
            if (no_of_taken > 1) {
            description = `Best 0${no_of_taken} Average`; // Adjusted to use the variable no_of_taken
            } else {
            description = null;
            } 
      
            const course_id = document.querySelector('select[name="courseCode"]').value;
            let evaluationcriteria_id = `${course_id}`;
            if (asmntTypeRef.current.value === 'CA') {
            setSequence(prevSequence => prevSequence + 1);
            evaluationcriteria_id += 'CA';
            evaluationcriteria_id += sequence;
            console.log("evaluationcriteria_id : " + evaluationcriteria_id);            
            }
            if (asmntTypeRef.current.value === 'End') {
            setEndSequence(prevEndSequence => prevEndSequence + 1);
            evaluationcriteria_id += 'EN';
            evaluationcriteria_id += endSequence;
            }
      
            const newCriterion = {
            type: asmntTypeRef.current.value,
            assessment_type: selectedAssessmentType, // Use the ref to access the value
            no_of_conducted,
            no_of_taken,
            percentage: parseFloat(document.querySelector('input[name="percentage"]').value),
            description,
            course_id,
            evaluationcriteria_id,
          };
          setCriteriaData([...criteriaData, newCriterion]);
      
          // Add the evaluation criteria name to the criteria_name state
          if (typeof no_of_conducted === "number") {
            if (no_of_conducted!== 1) {

              
                if(userSelectedMidType === 'both'){
                  const newCriterion_name1 = {
                    evaluationcriteria_id,
                    assignment_name: 'Mid practical exam',
                    course_id,
                  };
                  const newCriterion_name2 = {
                    evaluationcriteria_id,
                    assignment_name: 'Mid theory exam',
                    course_id,
                  };
                  setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name1, newCriterion_name2]);
                }
                else{
                  
                for (let i = 1; i <= no_of_conducted; i++) {
                  const assignment_name = `${selectedAssessmentType}${i}`; // Corrected string concatenation
                  const newCriterion_name = {
                    evaluationcriteria_id,
                    assignment_name,
                    course_id,
                  };
                  setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name]); // Using functional update for state

                }
              }
            } else if (no_of_conducted === 1) {

              if(userSelectedMidType === 'Mid practical exam'){
                console.log("userSelectedMidType : " + userSelectedMidType);
                const assignment_name = userSelectedMidType; // Corrected string concatenation
                const  newCriterion_name = {
                  evaluationcriteria_id,
                  assignment_name,
                  course_id,
                };
                setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name]); // Using functional update for state

              }
              else if (userSelectedMidType === 'Mid theory exam'){
                console.log("userSelectedMidType : " + userSelectedMidType);
                const assignment_name = userSelectedMidType; // Corrected string concatenation
                const  newCriterion_name = {
                  evaluationcriteria_id,
                  assignment_name,
                  course_id,
                };
                setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name]); // Using functional update for state
              }
              else{
                const assignment_name = `${selectedAssessmentType}`;
                const newCriterion_name = {
                  evaluationcriteria_id,
                  assignment_name,
                  course_id,
                };
                setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name]); // Using functional update for state
              }

            }
          }
          // Clear the form after submission
          document.querySelector('input[name="percentage"]').value = '';
          setIsChecked(!isChecked);
          setNoOfConducted('');
          setNoOfTaken('');

        };
      
        const saveData = async () => {
          try {
            
        
            // Call the first API to insert criteria-name data
            await axios.post("http://localhost:9090/api/evaluationCriteriaName/insertcriterianame", criteria_name);
            // Now, call the second API to insert criteria data
            await axios.post("http://localhost:9090/api/evaluationCriteria/insertcriteria", criteriaData);
      
            setCriteriaData([]);
            setCriteria_name([]);
            setSelectedAssessmentType('');
      
            document.querySelector('input[name="no_of_conducted"]').value = '';
            document.querySelector('input[name="no_of_taken"]').value = '';
      
            toast.success("Data submitted successfully!");
      
            setShowButton(!showButton);
      

            setInterval(() => {
              window.location.reload();
            }, 2000);

          } catch (error) {
            console.error("Error saving data:", error);
            toast.error("Error submitting data. Please try again.");
          }

        };
      
        const onSave = async (newValue) => {
          try {
            setNewAssessmentType({ assessment_type_name: newValue.popupInputValue});
            // console.log("New Assessment Type : " + newValue.popupInputValue);
            // console.log("New Assessment Type : " + newValue.selectedType);

            await axios.post("http://localhost:9090/api/astylist/savenewasty", { assessment_type_name: newValue.popupInputValue,ca_mid_end: newValue.selectedType} );
            toast.success("New assessment type saved successfully!");
            setReloadButton(prevState =>!prevState);
            setSelectedAssessmentType(newValue);
            // Handle successful save here, e.g., update state or show success message
            setIsPopupVisible(false);
      
          } catch (error) {
            console.error("Error saving new assessment type:", error);
            toast.error("Error saving new assessment type. Please try again.");
            // Handle error, e.g., show error message
          }
        }


        const handleMidTypeSelection = (selectedOption) => {
          console.log(selectedOption);
          setIsMidPopupVisible(false);
          setIsMidSelected(true);
          setUserSelectedMidType(selectedOption);


          let conductValue = '';
          let takeValue = '';
          
          
          switch(selectedOption) {
            case 'Mid theory exam':
            case 'Mid practical exam':
              conductValue = '1';
              takeValue = '1';
              break;
            case 'both':
              conductValue = '2';
              takeValue = '2';
              break;
            default:
              return; // Do nothing if the option doesn't match
          }
        
          setNoOfConducted(conductValue);
          setNoOfTaken(takeValue);
          setDisableInputs(true); // Disable inputs based on condition

        };

        const handleCourseCodeChange = async (event) => {

            const result1  = await axios.get(`http://localhost:9090/api/astylist/get/allassessmenttypes`);
            setAssessmentTypesData(result1.data.content);
            setCourseSelected(true);
        };

        const handleDelete = (index) => {
          const updatedCriteriaData = [...criteriaData];
          const updatedCriteriaNames = [...criteria_name];
    
          updatedCriteriaData.splice(index, 1);
          updatedCriteriaNames.splice(index, 1);
    
          setCriteriaData(updatedCriteriaData);
          setCriteria_name(updatedCriteriaNames);
        };

  return (
    <div>
        <div className=' container' >
          {
            isAllDataNotLoaded ? (
              <div class="alert alert-warning" style={{marginTop:"70px"}} role="alert">
                No Any Course To Create Evaluation Criteria
              </div>
            ) : (

            <>

        {loader ? ( 
                    <div style={{margin:"100px",display:"flex"}}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className=' h4 mx-3' style={{color:"maroon"}}>Data is Loading...</div>
                    </div>
                ) : (<>

          <div className='h3' style={{marginTop:"70px",color:'maroon'}}>Evaluation Criteria Creation</div>
          <div className=' row ' style={{marginLeft:"auto",marginRight:"auto"}}>
            <div className=' col-9 mt-3 shadow p-5' >
              <form onSubmit={handleSubmit} >
                <label htmlFor="" className=' form-label'>Select a Course Code for Create Evaluation Criteria</label>
                <select className=' form-select m-2' name="courseCode" style={{width:"350px"}} required onChange={handleCourseCodeChange}>
                  <option selected disabled>Select Course Code</option>
                  {
                    cidsData.map((cid,index) => (
                      <option key={`cid-${index}`} value={cid.course_id}>{cid.course_id}</option>
                    ))
                  }
                </select>

                {courseSelected && (
                  
              <>

                <div className=' col-10 mt-5' style={{display:"flex",width:"auto"}}>
                  <div style={{marginRight:"80px"}} >
                    <label htmlFor="" className=' form-label'>Select The Assessment</label>
                    <select className=' form-select m-2' ref={asmntTypeRef} onChange={selectedMainAssessment} style={{width:"350px"}} required>
                      <option selected disabled>Select The Assessment</option>
                      <option value='CA' name="asmntType">Continuous Assessment</option>
                      <option value='End' name="asmntType">Final Assessment</option>
                    </select>
                  </div>

                  <div className=''>
                    <label htmlFor="" className=' form-label'>Select Assessment Type</label>
                    <label htmlFor="" className=' form-label small' style={{color:"red"}}>If's There a New Assessment Type Please Choose 'Add-New' Option</label>
                    <select className=' form-select m-2' style={{width:"350px"}} value={selectedAssessmentType} onChange={(e) => {
                        handleAssessmentTypeChange(e);
                        // CheckingSelectedAssementType(e);
                        if (e.target.value === 'Option') {
                          setIsPopupVisible(true);
                        }

                        if (e.target.value === 'Mid exam') {
                          setIsMidPopupVisible(true);
                        }
                        
                      }} required>
                      <option selected disabled>Select Assessment Type</option>
                      {
                        assessmentTypesData.map((assessmentType, index) => (
                          <option key={index} value={assessmentType.assessment_type_name}>{assessmentType.assessment_type_name}</option>
                        ))
                      }
                      <option value="Option">Add-New</option>
                    </select>
                  </div>
                  <CustomPopup
                    isVisible={isPopupVisible}
                    onClose={() => setIsPopupVisible(false)}
                    onSave={onSave}
                    
                  />
                  <MidTypePopup
                    isVisible={isMidPopupVisible}
                    onClose={() => setIsMidPopupVisible(false)}
                    onSave={handleMidTypeSelection}
                  />
                  
                </div>
                    <div className=' col-10 mt-4' style={{display:"flex"}}>
                        
                      <div style={{marginRight:"80px"}}>
                        <label htmlFor="" className=' form-label'>Enter Number of Conduct Selected Assessment</label>
                          <input
                            name="no_of_conducted"
                            type="number"
                            className='form-control m-2'
                            placeholder='No of Conduct'
                            
                            value={noOfConducted}
                            onChange={(e) => setNoOfConducted(e.target.value)}
                            disabled={disableInputs}
                            style={{width:"350px"}}
                          />
                      </div>
                      
                      <div>
                        <label htmlFor="" className=' form-label'>Enter Number of Take Selected Assessment</label>
                          <input
                            name="no_of_taken"
                            type="number"
                            className='form-control m-2'
                            placeholder='No of Take'
                            
                            value={noOfTaken}
                            onChange={(e) => setNoOfTaken(e.target.value)}
                            disabled={disableInputs}
                            style={{width:"350px"}}
                          />
                      </div>
                    </div>
                
                <div className=' col-10 mt-4' style={{display:"flex"}}>
                  <div style={{marginRight:"80px"}}>
                    <label htmlFor="" className=' form-label'>Enter Percentage (%) Get to CA Calculation</label>
                    <input 
                    name="percentage" 
                    style={{width:"350px",marginRight:"80px"}} 
                    type={"number"} 
                    className='form-control m-2' 
                    placeholder='Enter percentage (%)' 
                    required/>
                    
                  </div>
                  <div>
                    <div className=' form-check'>
                      <input type="checkbox" className='form-check-input'  onChange={(e) => setIsChecked(e.target.checked)} required/>
                      <label htmlFor="" className=' form-label'> Confirm All Details are Correct</label>
                    </div>
                    <button className='btn btn-outline-dark btn-sm m-2' style={{width:"100px"}} type="submit">Insert</button>
                  </div>
                </div>
              </>
              )}
              </form>
            </div>
            <div className=' col-9 mt-3 shadow p-5'>
              <div className=' h4 p-3' style={{color:"maroon"}}>The Criteria</div>
              <div className=' p-4'>
                <table className=' table'>
                  <thead>
                    <tr>
                      {/* <th>Type</th> */}
                      <th>Assessment Type</th>
                      <th>No of Conduct</th>
                      <th>No of Take</th>
                      <th>Percentage(%)</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaData.map((criterion, index) => (
                      <tr key={index}>
                        {/* <td>{criterion.type}</td> */}
                        <td>{criterion.assessment_type}</td>
                        <td>{criterion.no_of_conducted}</td>
                        <td>{criterion.no_of_taken}</td>
                        <td>{criterion.percentage}</td>
                        <td>{criterion.description}</td>
                        <td><button className='btn btn-danger btn-sm'  onClick={() => handleDelete(index)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              <button className=' btn btn-primary sm m-4' id='ctc' onClick={saveData}>Create The Criteria</button>
            </div>
          </div>

          </>)}
          
        </>)}

      </div>
      <ToastContainer />
    </div>
  )
}

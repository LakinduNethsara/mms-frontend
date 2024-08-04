import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomPopup from '../../../components/Users/CC/CustomPopup';

export default function CourseCriteriaByCC() {
    
    const [selectedAssessmentType, setSelectedAssessmentType] = useState('');
    const [criteriaData, setCriteriaData] = useState([]); // State to hold the criteria data
    const [criteria_name, setCriteria_name] = useState(''); // State to hold the evaluation criteria name
    const asmntTypeRef = useRef(null); // Create a ref for the assessment type select element
    const [newAssessmentType, setNewAssessmentType] = useState({
        assessment_type_name: '',
    }); // State to hold the new assessment type

    const [showButton, setShowButton] = useState(false);
    const [reloadButton, setReloadButton] = useState(false);
    
    const [assessmentTypesData, setAssessmentTypesData] = useState([]);
    const [cidsData, setCidsData] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [sequence, setSequence] = useState(1); // Initialize sequence in state
    const [endSequence, setEndSequence] = useState(1); // Initialize endSequence in state
    const storedData = localStorage.getItem('user');
    const [email,setEmail] =useState();
    useEffect(() => {
        if(storedData){

            setEmail(JSON.parse(storedData).email);
        }else{

            setEmail(null);
        }

    }, [email]);
    const fetchData = async ()=>{

        try{
            const result1  = await axios.get(`http://localhost:9090/api/astylist/get/allassessmenttypes`)
          // console.log(result1.data.content);
            setAssessmentTypesData(result1.data.content);
    
            const result2  = await axios.get(`http://localhost:9090/api/ccmanage/getAllCidToCourseCriteria/${email}`);
          // console.log(result2.data.content);
            setCidsData(result2.data.content);
        }catch(error){
            console.log(error);
        }
        
        }

        useEffect(() => {
            fetchData();
        }, [usernameofcc,showButton,reloadButton])
        
          // Function to handle Assessment Type selection
            const handleAssessmentTypeChange = (event) => {
            setSelectedAssessmentType(event.target.value);
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
            }
            if (asmntTypeRef.current.value === 'End') {
            setEndSequence(prevEndSequence => prevEndSequence + 1);
            evaluationcriteria_id += 'EN';
            evaluationcriteria_id += endSequence;
            }
      
          // For demonstration, we'll just add it to our local state 
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
              for (let i = 1; i <= no_of_conducted; i++) {
                const assignment_name = `${selectedAssessmentType}${i}`; // Corrected string concatenation
                const newCriterion_name = {
                  evaluationcriteria_id,
                  assignment_name,
                  course_id,
                };
                setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name]); // Using functional update for state
              }
            } else if (no_of_conducted === 1) {
              const assignment_name = `${selectedAssessmentType}`;
              const newCriterion_name = {
                evaluationcriteria_id,
                assignment_name,
                course_id,
              };
              setCriteria_name((prevCriteriaName) => [...prevCriteriaName, newCriterion_name]); // Using functional update for state
            }
          }
      
          // Clear the form after submission
          document.querySelectorAll('input').forEach(input => input.value = '');
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
      
          } catch (error) {
            console.error("Error saving data:", error);
            toast.error("Error submitting data. Please try again.");
          }
        };
      
        const onSave = async (newValue) => {
          try {
            setNewAssessmentType({ assessment_type_name: newValue });
            await axios.post("http://localhost:9090/api/astylist/savenewasty", { assessment_type_name: newValue } );
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
  return (
    <div>
        <div className=' container'>
          <div className='h2' style={{marginTop:"70px"}}>Evaluation Criteria Creation</div>
          <div style={{display:"flex"}}>
            <div className=' col-1 mt-5' style={{float:"left",width:"43%"}}>
              <form onSubmit={handleSubmit} >
                <select className=' form-select' name="courseCode">
                  <option selected>Select Course Code</option>
                  {
                    cidsData.map((cid,index) => (
                      <option key={`cid-${index}`} value={cid.course_id}>{cid.course_id}</option>
                    ))
                  }
                </select>
                <div className=' col-5 mt-5' style={{display:"flex",width:"auto"}}>
                  <select className=' form-select m-2' ref={asmntTypeRef}>
                    <option selected >Select The Assessment</option>
                    <option value='CA' name="asmntType">Continuous Assessment</option>
                    <option value='End' name="asmntType">Final Assessment</option>
                  </select>
                  <select className=' form-select m-2' value={selectedAssessmentType} onChange={(e) => {
                      handleAssessmentTypeChange(e);
                      if (e.target.value === 'Option') {
                        setIsPopupVisible(true);
                      }
                    }} >
                    <option selected>Select Assessment Type</option>
                    {
                      assessmentTypesData.map((assessmentType, index) => (
                        <option key={index} value={assessmentType.assessment_type_name}>{assessmentType.assessment_type_name}</option>
                      ))
                    }
                    <option value="Option">Option</option>
                  </select>
                  <CustomPopup
                    isVisible={isPopupVisible}
                    onClose={() => setIsPopupVisible(false)}
                    onSave={onSave}

                    
                  />
                  
                </div>
                <div className=' col-5' style={{display:"flex",width:"auto"}}>
                  
                  <input name="no_of_conducted" type={"number"} className='form-control m-2' placeholder='Select No of Conduct' required/>
                  <input name="no_of_taken" type={"number"} className='form-control m-2' placeholder='Select No of Take' required/>
                  
                </div>
                <div className=' col-5' style={{display:"flex",width:"auto"}}>
                <input name="percentage" type={"number"} className='form-control m-2' placeholder='Select percentage (%)' required/>
                <button className='btn btn-success m-2' style={{width:"100px" ,height:"auto"}} type="submit">Insert</button>
                </div>
              </form>
            </div>
            <div className=' col-1 m-5 shadow' style={{float:"right",width:"60%",borderRadius:"5px"}}>
              <div className=' h4 p-3 text-success'>The Criteria</div>
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
                        <td><button className='btn btn-danger btn-sm'>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              <button className=' btn btn-primary sm m-4' id='ctc' onClick={saveData}>Create The Criteria</button>
            </div>
          </div>

      </div>
      <ToastContainer />
    </div>
  )
}

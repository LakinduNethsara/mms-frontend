import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import EditValueModal from './EditValueModal';
import DateObject from 'react-date-object';
// Import Bootstrap modal components
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'


export default function MarksCheckingForm() {
  const[loading,setLoading]=useState(false);
  const history = useHistory();
  const [text, setText] = useState('');
  const[noData,setNoData]=useState('')
  const [editLogs, setEditlogs] = useState([]);
  const[updatebtn,setEnableupdatebtn]=useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({
    "key":"",
    "value":""
  });
  const [showModal, setShowModal] = useState(false);
  const[marksSheet,setMarksSheet]=useState({
    
      "student_id": "",
      "student_name": "",
      "course_id": "",
      "repeat": "",
      "ca": [],
      "end": []
  });
  const[grade,updateGrade]=useState('');
  const [data, setData] = useState([]);

  const [user, setUser] = useState({
        
  });
 

  const storedData = localStorage.getItem('user');
  useEffect(() => {
      if(storedData){
          setUser(JSON.parse(storedData));
      }else{
          setUser(null);
      }
  }, []);
   const userName = user?.email;

  const [attendanceEligibility, setAttendenceEligibility] = useState({
    id: "",
    student_id: "",
    course_id: "",
    percentage: "",
    eligibility: ""
  });



const {course_id, course_name,approval_level,student_id,academic_year,repeat } = useParams();


const fetchData = async () => {
  try {

    setLoading

    const response = await axios.get(`http://localhost:9090/api/marksReturnSheet/getMarks/${course_id}/${repeat}/${academic_year}`);

    const data = response.data;

    // Filter the data based on student_id
    const filteredData = data.filter((item) => item.student_id === student_id);

    // Check if there is matching data
    if (filteredData.length > 0) {
      // Set the marksSheet state with the first item from filtered data
      setMarksSheet(filteredData[0]);
    } else {
     
      setMarksSheet({
        // Optionally, set default values for the marksSheet state if no data is found
        student_id: "",
        student_name: "",
        course_id: "",
        repeat: "",
        ca: [],
        end: [],
        total_ca_mark: "",
        total_final_marks: "",
        total_rounded_marks: "",
        grade: "",
        ca_eligibility: ""
      });
    }

  } catch (error) {

    setNoData(true); // Set noData to true if there is an error
  }
  finally
  {
    setLoading(false);
  }
};


useEffect(() => {
  fetchData();
}, [course_id,academic_year,repeat]);





const endMarks={
  student_id:student_id,
  course_id:course_id,
  end:marksSheet.end};





  useEffect(() => {
    Eligi();
    getEditLogs();
  }, [course_id, student_id]);







  const Eligi = async () => {
    try {

      setLoading(true);

      const result = await axios.get(`http://localhost:9090/api/attendanceEligibility/getAttendanceEligibilityByStuIdCourseId/${course_id},${student_id}`);

      setAttendenceEligibility(result.data);
   
    } catch (error) {
      if (error.response && error.response.status === 404) {
   
      }
     
    }
    finally{
      setLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the function to get the course coordinator's ID
      const cc = await getCourseCoordinatorId(course_id);

      // Create the notification object
      const notification = {
        receiver_id: cc.data.content, // Course coordinator's ID
        course_id: course_id,
        student_id: student_id, // Student ID from useParams
        remark: text, // Remark from the text area
        status: "send", // Status set to "send"
      };

      // Send the notification
      const response = await axios.post(`http://localhost:9090/api/notifications/sendNotification`, notification);
      setText(''); // Clear the text area
     
      toast.success(response.data.message);
    } catch (error) {
  
      toast.error('Error sending notification');
    }
  };

  // Define the getCourseCoordinatorId function outside of handleSubmit
  const getCourseCoordinatorId = async (course_id) => {
    //API call to fetch course details

    setLoading(true);
  
    const cc = await axios.get(`http://localhost:9090/api/ccmanage/getCCByCourse/${course_id}`);
    setLoading(false);

    // Assuming the response includes the coordinator's ID
    return cc; // Return the response to be used in handleSubmit
  };

  const handleReturn = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    history.goBack(); // Navigate back
  };


  const textOnChange = async (key, value, reasons) => {

  
    let EditLog = null; // Initialize EditLog to null
  
    // Check if endMarks.end is an array and iterate over it
    if (Array.isArray(endMarks.end)) {
      endMarks.end.forEach((e) => {
        if (e.key === key) {
          EditLog = {
            user_id: userName,
            student_id: student_id,
            course_id: course_id,
            type: e.key,
            pre_mark: e.value,
            current_mark: value,
            date_time: new DateObject().format('YYYY-MM-DD'),
            reason: reasons,
          };
  
          // Update the value in endMarks.end
          e.value = value;
 
        }
      });
  
      // Combine data for API request
      const combinedData = {
        studentData: endMarks,
        marksEditLogDTO: EditLog,
      };
  
    
  
      try {
      
  
        // Make the API request
        const response = await axios.put(
          `http://localhost:9090/api/marksReturnSheet/updateMarks`,
          combinedData
        );
        
        window.location.reload();
  
        // Show success message and navigate back
        setTimeout(() => {
          toast.success("Successfully Updated");
        }, 1000);
        
       
      } catch (error) {
        
        toast.error('Error updating marks');
      }
    }
  };

  const getEditLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:9090/api/studentMarks/getEditLogs/${course_id}/${student_id}`);
      setEditlogs(response.data.content);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  };


  // Function to open the modal and set the editing item
  const handleEditClick = (key, value) => {
    
    setEditingItem({ key, value });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };



  const handleGradeChange = (newGrade) => {
  setShowModal(true);
  updateGrade(newGrade);
};

const handleConfirmChange = async (newGrade, reason) => {
  if (!reason) {
    toast.error('Reason is required');
    return;
  }else{
  try {
    const response = await axios.put(`http://localhost:9090/api/studentMarks/updateAGrade/${student_id}/${course_id}/${newGrade}/${reason}`);
    if (response.status === 200) {
      toast.success('Grade updated successfully');
      setMarksSheet({ ...marksSheet, grade: newGrade });
    } else {
      toast.error('Error updating grade');
      console.log(response);
    }
    setShowModal(false);
  } catch (error) {
    toast.error('Error updating grade');
    console.error(error);
  }}
};



  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) :  (
      
        marksSheet && marksSheet.student_id && marksSheet.course_id && marksSheet.ca && marksSheet.end && attendanceEligibility && (

      <div className=' bg-white' style={{marginTop:"70px",fontSize:"13px"}}>
      <h2 style={{marginLeft:"30px"}}>{student_id} {marksSheet.student_name}</h2>
      <h3 style={{marginLeft:"30px"}}>{course_id} {course_name}</h3>
      
        <div className="container bg-transparent">
          <div className="row">
            <div className="col text-center">
              <table className="table shadow  table-hover" style={{ marginTop: "50px" }}>
                <tbody>
                  <tr>
                    <th className='table-success' scope="col" ></th>
                    <th className='table-warning' scope="col"> Score</th>
                  </tr>


                  {
                    marksSheet.ca.map((e)=>
                    (<tr>
                     
                      <td className='table-primary' scope="col" style={{ textAlign: 'left',fontWeight: e.description === "score" ? 'normal' : 'bold' }}>{e.key}</td>
                      <td scope="col" style={{ textAlign: 'left',fontWeight:  e.description=="score"? 'normal' : 'bold'  }}>{e.value}</td>
                    
                    </tr>
                      
                    ))
                  }

                  {
                    

                   marksSheet.end.map((e)=>
                      (<tr>
                        <td className='table-primary' scope="col" style={{ textAlign: 'left',fontWeight: e.description === "score" ? 'normal' : 'bold' }}>{e.key}</td>
                        <td scope="col" style={{ textAlign: 'left',fontWeight: e.description === "score" ? 'normal' : 'bold' }}>{e.description=="score"&& (approval_level=="finalized" ||approval_level=="AssignedRB") &&e.key!="Final Marks"? 
                          <>
                          <input type="text" defaultValue={e.value} size={5} disabled ></input> 
                          {/* <button className=' btn btn-outline-dark btn-sm mx-4' style={{width:"80px"}} type='button' >Edit</button> */}
                          <button className='btn btn-outline-dark btn-sm mx-4' style={{width:"80px"}} type='button' onClick={() => handleEditClick(e.key, e.value)}>Edit</button>
                          </>
                          
                          :e.value}</td>
                        
                      </tr>
                        
                      ))
                  }

                </tbody>
              </table>
              
              {editLogs.length > 0 && (
                
                <div className="col mt-4 shadow p-4">
                  <h4>Edit Logs</h4>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Previous Value</th>
                        <th>Updated Value</th>
                        <th>Reason</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editLogs.map((log, index) => (
                        
                        <tr key={index}>
                          <td>{log.type}</td>
                          <td>{log.pre_mark}</td>
                          <td>{log.current_mark}</td>
                          <td>{log.reason}</td>
                          <td>{new Date(log.date_time).toISOString().slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

              
            </div>
              )}
              
            </div>

            
            <div className="col" style={{ marginTop: "50px" }}>
              <div className='shadow px-4 py-4'>
                <table className=' pt-4'>
                  <tr>
                    <th><h4>Eligibility</h4></th>
                  </tr>
                  <tr><th><br /></th></tr>
                  <tr>
                    <th>CA Marks</th>
                  </tr>
                  <tr>
                    <td>Total CA Marks</td>
                    <td>
                    <input className=' mx-4' size="10"  type='text' value={marksSheet.total_ca_mark} disabled />
                    </td>
                    <td>CA Eligibility</td>
                    <td><input type='text' className=' mx-4' size="10" value={marksSheet.ca_eligibility} disabled /></td>
                  </tr>
                  <tr><th><br /></th></tr>
                  <tr>
                    <th>Attendance Eligibility</th>
                  </tr>
                  <tr>
                    <td>Attendance</td>
                    <td><input type='text' className=' mx-4' size="10" value={attendanceEligibility.percentage} disabled /></td>
                    <td>Eligibility</td>
                    <td><input type='text' className=' mx-4' size="10" value={attendanceEligibility.eligibility} disabled /></td>
                  </tr>
                  <tr><th><br /></th></tr>
                  <tr>
                    <th>Overall Eligibility</th>
                  </tr>
                  <tr>
                    <td>Eligibility</td>
                    <td>
                      {(marksSheet.ca_eligibility == "Eligible" && attendanceEligibility.eligibility == "Eligible") ? <input type='text' className=' mx-4 bg-success' size="10" style={{color:"white"}} value="Eligible" disabled /> : <input type='text' className=' mx-4 bg-danger ' style={{color:"white"}} size="10" value="Not Eligible" disabled />}        
                     
                    </td>
                  </tr>
                </table>
              </div>
              <div>
                <div className="py-4 px-5">
                  <label> <b>Final Marks</b> </label>
                  <input type='text' size="10" className=' mx-3' value={marksSheet.total_rounded_marks} disabled />
                  <br />
                  <hr />  
                  <div style={{display:"flex"}}>
                    <label> <b>Grade</b> </label>
                    <input style={{marginLeft:"58px"}} type='text' size="10" value={marksSheet.grade} disabled />

                    <div style={{marginLeft:"20px"}}>
                    {
                      approval_level=="finalized" ||approval_level=="AssignedRB"
                      ?<div className="dropdown">
                      <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize:"12px"}}>
                        Change Grade
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li><a className="dropdown-item" onClick={() => handleGradeChange('MC')}>MC</a></li>
                        <li><a className="dropdown-item" onClick={() => handleGradeChange('AC')}>AC</a></li>
                      </ul>
                    </div>
                    :null

                    }
                    
                    </div>
                  </div>
                  
                </div>
              </div>
              {
                                approval_level === "course_coordinator" ||
                                approval_level === "lecturer" ? (
                                  <div className="col mt-4 shadow p-4">
                                  <form onSubmit={handleSubmit}>
                                    <div>
                                      <label for="exampleFormControlTextarea1" className="form-label"> <b>Notification</b> </label>
                                      <textarea
                                        value={text}
                                        className='form-control w-100 '
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Type your message here..."
                                      />
                                      <input type="submit" style={{width:'100px'}} className={`btn btn-outline-success btn-sm mt-3 ${text ? '' : 'disabled'}`} value="Send" />
                                    </div>
                                  </form>
                                </div>
                                ) : null}
                                {/* Modal */}
                                <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
                                <ModalHeader toggle={() => setShowModal(false)}>Confirm Grade Change</ModalHeader>
                                <ModalBody>
                                  Are you sure you want to change the grade to {grade}? This action cannot be undone.
                                  <input type="text" className="form-control" placeholder="Enter reason for grade change" required/>
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                  <Button color="primary" onClick={() => handleConfirmChange(grade, document.querySelector('.modal-body input').value)}>Confirm</Button>
                                </ModalFooter>
                              </Modal>


              
              <div>
                <input onClick={handleReturn} type="button" className="btn shadow btn-outline-success btn-sm w-25 float-end my-4" id="backbtn" value="Back" />
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      )
      )
      }
      {noData && <h1>No data found</h1>
    }
        <EditValueModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialValue={editingItem?.value}
        onSubmit={(newValue, reason) => textOnChange(editingItem.key, newValue, reason)}
        />
                              
        

    </>
  );
}

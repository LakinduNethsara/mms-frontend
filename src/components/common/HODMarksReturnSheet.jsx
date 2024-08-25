import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import SignatureForApproval from '../common/SignatureForApproval';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../common/AcademicYearManagerSingleton';
import { ToastContainer, toast } from 'react-toastify';
import DateObject from 'react-date-object';
import toastr from 'toastr';



export default function HODMarksReturnSheet(props) {
    const [noData, setNoData] = useState(false); // State to indicate if there is no data to display
    const { course_id, course_name,department,academicYear } = useParams();
    const {approved_level}=props;
    const history = useHistory();
    const[newSignature, setNewSignature] = useState();
    const[loading,setLoading]=useState(false);
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const[approval_level,setApprovalLevel]=useState(approved_level);
    const[marksSheet,setMarksSheet]=useState([]);
    const[repeatMarksSheet,setRepeatMarksSheet]=useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const[selectedlec,setSelectedEmail]=useState('')
    const [filteredData, setFilteredData] = useState([]);
    const[degree,setDegree]=useState("");
    var date = new DateObject({
        date: new Date(),
      });
    
      useEffect(() => {
        if (department === "ICT") {
            setDegree("Bachelor of Information and Communication Technology Honours Degree");
        } else if (department === "BST") {
            setDegree("Bachelor of Bio Systems Technology Honours Degree");
        } else if (department === "ET") {
            setDegree("Bachelor of Engineering Technology Honours Degree");
        }
    }, [department]);


    const seenKeys = new Set();
    const seenKeysFA = new Set();
    const seenKeysForTHFA = new Set();
    const seenKeysForTHCA = new Set();


    
    let forCA = 0;
    let forFA = 0;
    
    const [isCClevel,setISCClevel]=useState({
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    });
    const [isLeclevel,setISLeclevel]=useState({
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    });
    const [isHODlevel,setISHODlevel]=useState({
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    });
    
    const [signlist,setSignList]=useState([{
        id: "",
        course_id: "",
        approved_user_id:"",
        approval_level: "",
        academic_year: "",
        date_time: "",
        department_id: "",
        signature: ""
    }]);

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
    // const { oktaAuth, authState } = useOktaAuth();
     const userNameAuth = user?.full_name;

     
    
    const saveDigitalSignature = (url) => {
        setNewSignature(url); 
    };
    


    let CAAvailable = false;
    let ca_percentage=0;


    let headersData = [];
    let headerValue= [];

    let nextApprovedlevel = "";
         if(approval_level==="finalized") {
            nextApprovedlevel="course_coordinator";
         } else if (approval_level === "course_coordinator") {
           nextApprovedlevel = "lecturer";
         } else if (approval_level === "lecturer") {
           nextApprovedlevel = "HOD";
         }
         else if (approval_level === "HOD") {
            nextApprovedlevel = "RB";
          }

          let prevApprovedlevel = "";
         if (approval_level === "course_coordinator") {
            prevApprovedlevel = "finalized";
          } else if (approval_level === "lecturer") {
            prevApprovedlevel = "course_coordinator";
          }
          else if (approval_level === "HOD") {
            prevApprovedlevel = "lecturer";
           }

    const approval={
        "course_id": course_id,
        "approved_user_id":userNameAuth,
        "approval_level":nextApprovedlevel,
        "academic_year":academicYear,
        "date_time":date.format('YYYY-MM-DD'),
        "department_id":department,
        "signature":newSignature
    }
    
    const lecturerCertifyAssign={
        "lecturer_id":selectedlec,
        "course_id": course_id,
        "department_id":department,
    }

    const Returnapproval={
        "course_id": course_id,
        "approved_user_id":userNameAuth,
        "approval_level":"finalized",
        "academic_year":academicYear,
        "date_time": date.format(),
        "department_id":department,
        "signature":newSignature
    }

   



useEffect(() => {
    fetchData();
}, [course_id]);


    const fetchData = async () => {
        
        try {

            const response = await axios.get(`http://localhost:9090/api/marksReturnSheet/getMarks/${course_id}/0/${academicYear}`);
            const Repeatresponse = await axios.get(`http://localhost:9090/api/marksReturnSheet/getMarks/${course_id}/1/${academicYear}`);
            setMarksSheet(response.data);
            setRepeatMarksSheet(Repeatresponse.data);
            setLoading(false); // Set loading to false after all data is fetched
        } catch (error) {
            setNoData(true); // Set noData to true if there is an error
        }

    };

    const SignFunc = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/${academicYear}`);
            const signatures = response.data.content; // Adjust this based on your actual response structure
    
            const ccLevel = signatures.find(e => e.approval_level === "course_coordinator");
            const lecLevel = signatures.find(e => e.approval_level === "lecturer");
            const hodLevel = signatures.find(e => e.approval_level === "HOD");
    
            if (ccLevel) setISCClevel(ccLevel);
            if (lecLevel) setISLeclevel(lecLevel);
            if (hodLevel) setISHODlevel(hodLevel);
    
        } catch (error) {
            console.error('Error fetching signature data:', error);
        }
    };
    
    useEffect(() => {
        SignFunc();
    }, [course_id, academicYear]);
    

   
    



    const SigFunc = async () => {
        const fetchCCLevel = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/course_coordinator/${academicYear}`);
                setISCClevel(response.data.content);
            } catch (error) {
                console.error('Error fetching CC level data:', error);
            } 
        };
    
        const fetchLecLevel = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/lecturer/${academicYear}`);
                setISLeclevel(response.data.content);
            } catch (error) {
                console.error('Error fetching Lecturer level data:', error);
            } 
        };
    
        const fetchHODLevel = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${course_id}/HOD/${academicYear}`);
                setISHODlevel(response.data.content);
            } catch (error) {
                console.error('Error fetching HOD level data:', error);
            } 
        };
    
        // Execute each fetch function independently
        fetchCCLevel();
        fetchLecLevel();
        fetchHODLevel();
    };
    

    
        
      // Adding the beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (newSignature) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [newSignature]);

 
    const handleSubmit = async (e) => {
        
        if(newSignature==null|| newSignature==""){
            e.preventDefault();
      
            toast.error("Empty Signature");
        }
        if(searchTerm==null || searchTerm=="" && nextApprovedlevel==="course_coordinator" ){
            e.preventDefault();
         
            toast.error("Empty Signature");
        }
        else{
           
        try {
            e.preventDefault();
            
            if(approval_level==="finalized"){
                const lecturerAssign = await axios.post(`http://localhost:9090/api/approvalLevel/assignCertifyLecturer`,lecturerCertifyAssign);
            }
            const response = await axios.post(`http://localhost:9090/api/approvalLevel/updateApprovalLevel`,approval);
            if (response.status === 200) {
              
                setApprovalLevel(nextApprovedlevel)
                toast.success('Marks Sheet Sent successfully');
                history.goBack();
            } else {
                console.error("Failed to update approval level");
            }
        } catch (error) {
            console.error("Error updating approval level: ", error);
        }
        }
        
    };



    const handleReturn = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        
        try {
            const response = await axios.post(`http://localhost:9090/api/approvalLevel/return`,Returnapproval);
            if (response.status === 200) {
                toast.success("Result sheet approved successfully");
                 
                setTimeout(() => {
                    history.goBack();
                }, 3000);
            } else {
                console.error("Failed to update approval level");
                toast.error('Error Returning Marks Sheet');
            }
        } catch (error) {
            console.error("Error updating approval level: ", error);
        }
    };
    

 
    

    marksSheet.map((ele, index) => (
        ele.ca.map((caScore, idx) => {
            if (!seenKeysForTHCA.has(caScore.key)) {
                forCA++
                seenKeysForTHCA.add(caScore.key); // Mark this key as seen
            }
            
        })
    ))

    forCA++

    marksSheet.map((ele, index) => (
        ele.end.map((endScore, idx) => {
            if (!seenKeysForTHFA.has(endScore.key)) {
                forFA++
                seenKeysForTHFA.add(endScore.key); // Mark this key as seen
            }
            
        })
    ))

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(`http://localhost:9090/api/lecreg/get/alllecturersdetails/${department}`);
            setData(result.data.content);
            setFilteredData(result.data.content); // Initially, all data is considered as filtered
          } catch (error) {
          }
        };
    
        fetchData();
      }, []);

      const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    
        const filtered = data.filter(item =>
            item.name_with_initials && item.name_with_initials.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filtered);
    };

      const handleClick = (userId,email) => {
        setSearchTerm(userId);
        setSelectedEmail(email);
      }


    return (
        <>
            
           
          
            
            
            {loading ? (
                <div>Loading...</div> // Display a loading message or spinner here
            ) : (
                <>
                <div id="marks-return-sheet" style={{ width:"95%",marginLeft:"40px"}} className=' container'>
                <ToastContainer/>
                        <div >
                        <div>
                            <div >
                            {
                                approval_level === "course_coordinator" ||
                                approval_level === "lecturer" ? (
                                    <form onSubmit={handleReturn}>
                                    <input
                                        type='submit'
                                        value="Return Mark Sheet"
                                        className="btn shadow btn-outline-success btn-sm float-end my-4"
                                        id="submitbtn"
                                        style={{ float: 'right', width: '140px' }}
                                    />
                                </form>
                                ) : null}
                               
                            </div>
                            <div>
                                <div>
                                <div className='h2 mt-lg-5'>Mark Return Sheet</div>
                                    <table>
                                        {/* <tr>
                                            <td class=""><h2>Mark Return Sheet:</h2></td>
                                            
                                        </tr> */}
                                             <tr>
                                                <td><h5><b>Marks Obtained by the Candidate for:</b></h5></td>
                                             </tr>
                                    </table>
                                    <div style={{display:"flex"}}>
                                            <h6>Academic Year: <span className=' rounded-pill bg-success text-white'>&nbsp;&nbsp;{academicYear}&nbsp;&nbsp;</span></h6>
                                                <h6 className=' mx-5'>Degree: <span className=' rounded-pill bg-success text-white'>&nbsp;&nbsp;{degree}&nbsp;&nbsp;</span></h6>
                                                    {/* <h6 className=' rounded-pill bg-success text-white'>{current_semester === "1" ? "1st" : "2nd"} Semester Examination</h6>   */}
                                    </div>
                                                                            
                                                                        
                                    <h4>Course code and Title : <span className='rounded-pill bg-primary text-white'> &nbsp;&nbsp;{course_name} - {course_id}&nbsp;&nbsp; </span> </h4>
                            </div>

                         {marksSheet.length > 0 ? (
                        <div className=''>
                         {/*  style={{overflow:"auto",width:"100%",height:"500px"}} */}
                        <table className="table shadow table-bordered table-hover" style={{ marginTop: "30px", width: '80%' }}>
 
                             <thead>
                         
                             <tr>
                             
                                 <th rowSpan='2' className=' table-info'>Student_ID</th>
                                 <th colSpan={forCA} className=' table-warning ' style={{textAlign:"center"}}>Continuous Assessment</th>
                                 <th colSpan={forFA} className=' table-primary ' style={{textAlign:"center"}}>Semester End Exam</th>
                                 <th colSpan='3' className=' table-success ' style={{textAlign:"center"}}>Final Marks</th>
                                 <th rowSpan='2' className=' table-danger'>CA Eligibility</th>
                                 <th rowSpan='2' className='table-secondary' style={{textAlign:"center"}}>View</th>
                             </tr>
                             <tr>
                             {marksSheet.map((ele, index) =>
                                 ele.ca.map((caScore, idx) => {
                                
                                     if (!seenKeys.has(caScore.key)) {
                                
                                     seenKeys.add(caScore.key);
                                     
                                     if(caScore.description=="percentage")
                                         {
                                             let percentage=parseInt(caScore.key.slice(0, 2))
                                             ca_percentage=ca_percentage+percentage;
                                         }
                                    
                                     return <th key={`ca-${idx}`} className='table-warning'>{caScore.key}</th>;
                                     }
 
                                     return null;
                                 })
                                 
                                 )
                                 }
 
                                 
                                 <th className='table-warning'> {ca_percentage+"% From Final Continuous Assignment Marks"}</th>
                                 
 
 
 
                                 
                                 {marksSheet.map((ele, index) => (
                                     ele.end.map((endScore, idx) => {
                                       
                                         if (!seenKeysFA.has(endScore.key)) {
                                 
                                         seenKeysFA.add(endScore.key);
 
                                         return <th key={`end-${idx}`} className=' table-primary'>{endScore.key} </th>
                                         }
                                     })
                                 ))}
                              
                                 <th className=' table-success'>Total Final Marks</th>
                                 <th className=' table-success'>Total Rounded Marks</th>
                                 <th className=' table-success'>Results/Grades</th>
                                 {/* <th className=' table-success'>GPV</th> */}
                                 
                            
                                
                             </tr>
                     </thead>
                     
 
                       <tbody>
                       {marksSheet.map((ele, index) => (
                         <tr key={index}>
                             <td>{ele.student_id}</td>
 
 
                             {
                                Array.from(seenKeysForTHCA).map((c, idx) => {
                                     let caValue = ele.ca.find(ca => ca.key === c);
                                     return <td key={`ca-${idx}`}>{caValue!=null ? caValue.value : ''}</td>;
                                 }
                                 )
                             }
 
                             <td>{ele.total_ca_mark}</td>
                                 
                             {
                                 Array.from(seenKeysForTHFA).map((c, idx) => {
                                     let endValue = ele.end.find(end => end.key === c);
                                     return <td key={`end-${idx}`}>{endValue!=null ? endValue.value : ''}</td>;
                                 }
                                 )
                             }
                             
                            
                             
                             <td>{ele.total_final_marks}</td>
                             <td>{ele.total_rounded_marks}</td>
                             <td>{ele.grade}</td>
                             {/* <td>{ele.gpv}</td> */}
                             <td>{ele.ca_eligibility}</td>
                             {
 
                             }
 
                             <td><Link className=" btn btn-primary mx-3 btn-sm" to={{
                                 pathname: `/MarksCheckingForm/${course_id}/${course_name}/${approval_level}/${ele.student_id}/${academicYear}/0`
                                 
                             }}>View</Link></td>
                         </tr>))}
                         </tbody>
 
                     </table>
                 </div>
                    ) : null
                    }


                {repeatMarksSheet.length > 0 ? (
                         <div className=''>
                         {/*  style={{overflow:"auto",width:"100%",height:"500px"}} */}
                    <h4>Repeaters</h4>
                     <table className="table shadow table-bordered table-hover" style={{ marginTop: "30px", width: '80%' }}>
 
                     <thead>
                         
                             <tr>
                             
                                 <th rowSpan='2' className=' table-info'>Student_ID</th>
                                 <th colSpan={forCA} className=' table-warning ' style={{textAlign:"center"}}>Continuous Assessment</th>
                                 <th colSpan={forFA} className=' table-primary ' style={{textAlign:"center"}}>Semester End Exam</th>
                                 <th colSpan='3' className=' table-success ' style={{textAlign:"center"}}>Final Marks</th>
                                 <th rowSpan='2' className=' table-danger'>CA Eligibility</th>
                                 <th rowSpan='2' className='table-secondary' style={{textAlign:"center"}}>View</th>
                             </tr>
                             <tr>
                             {repeatMarksSheet.map((ele, index) =>
                                 ele.ca.map((caScore, idx) => {
                                
                                     if (!seenKeys.has(caScore.key)) {
                                
                                     seenKeys.add(caScore.key);
                                     
                                     if(caScore.description=="percentage")
                                         {
                                             let percentage=parseInt(caScore.key.slice(0, 2))
                                             ca_percentage=ca_percentage+percentage;
                                         }
                                    
                                     return <th key={`ca-${idx}`} className='table-warning'>{caScore.key}</th>;
                                     }
 
                                     return null;
                                 })
                                 
                                 )
                                 }
 
                                 
                                 <th className='table-warning'> {ca_percentage+"% From Final Continuous Assignment Marks"}</th>
                                 
 
 
 
                                 
                                 {repeatMarksSheet.map((ele, index) => (
                                     ele.end.map((endScore, idx) => {
                                       
                                         if (!seenKeysFA.has(endScore.key)) {
                                 
                                         seenKeysFA.add(endScore.key);
 
                                         return <th key={`end-${idx}`} className=' table-primary'>{endScore.key} </th>
                                         }
                                     })
                                 ))}
                              
                                 <th className=' table-success'>Total Final Marks</th>
                                 <th className=' table-success'>Total Rounded Marks</th>
                                 <th className=' table-success'>Results/Grades</th>
                                 {/* <th className=' table-success'>GPV</th> */}
                                 
                            
                                
                             </tr>
                     </thead>
                     
 
                       <tbody>
                       {repeatMarksSheet.map((ele, index) => (
                         <tr key={index}>
                             <td>{ele.student_id}</td>
 
 
                             {
                                Array.from(seenKeysForTHCA).map((c, idx) => {
                                     let caValue = ele.ca.find(ca => ca.key === c);
                                     return <td key={`ca-${idx}`}>{caValue!=null ? caValue.value : ''}</td>;
                                 }
                                 )
                             }
 
                             <td>{ele.total_ca_mark}</td>
                                 
                             {
                                 Array.from(seenKeysForTHFA).map((c, idx) => {
                                     let endValue = ele.end.find(end => end.key === c);
                                     return <td key={`end-${idx}`}>{endValue!=null ? endValue.value : ''}</td>;
                                 }
                                 )
                             }
                             
                            
                             
                             <td>{ele.total_final_marks}</td>
                             <td>{ele.total_rounded_marks}</td>
                             <td>{ele.grade}</td>
                             {/* <td>{ele.gpv}</td> */}
                             <td>{ele.ca_eligibility}</td>
                             {
 
                             }
 
                             <td><Link className=" btn btn-primary mx-3 btn-sm" to={{
                                 pathname: `/MarksCheckingForm/${course_id}/${course_name}/${approval_level}/${ele.student_id}/${academicYear}/1`,
                            
                             }}>View</Link></td>
                         </tr>))}
                         </tbody>
 
                     </table>
                 </div>
                    ) : null
                    }
                   



                
                <div className=' m-5'></div>
            <div className=' row shadow-lg' style={{width:"1500px",height:'320px', padding:'10px'}}>
                <div className=' col-5' style={{float:"left",marginTop:"50px",marginLeft:'20px'}}>
                            
                    <div>
                        <table>
                            
                                
                                
                                    {
                                         nextApprovedlevel == "course_coordinator" && newSignature != null ?
                                         <>
                                            <tr><td >Coordinator/ Examinar :</td></tr>
                                            <tr>
                                            <td>Sign:</td>
                                            <td> <img src={newSignature} style={{ width: '80px', height: '40px' }} /> </td>
                                            </tr>
                                            
                                         </>
                                         :
                                         null
                                          
                                    }

                               
                                
                          
                            
                                
                                    {nextApprovedlevel == "lecturer" &&
                                    isCClevel.signature != null ?
                                    <>
                                            <tr>
                                                <td >Coordinator/ Examinar :</td>
                                                <td></td>
                                                <td>Sign:</td>
                                                <td> <img src={isCClevel.signature} style={{ width: '80px', height: '40px' }} /> </td>
                                                <td>Date:</td>
                                                <td>{isCClevel.date_time != null ? isCClevel.date_time:null}</td>
                                            </tr>
                                            
                                            {newSignature != null ?
                                            <tr>
                                            <td>Checked by :</td>

                                            <td></td>
                                            <td>Sign:</td>
                                            <img src={newSignature} style={{ width: '80px', height: '40px' }} /> 
                                            </tr>:null
                                            }
                                            
                                    </>
                                    :null
                                    }

                                
                                    {
                                    nextApprovedlevel == "HOD" &&
                                    isCClevel.signature != null && isLeclevel.signature!=null ? 
                                    <>
                                    {isCClevel.signature != null || isCClevel.signature != ""?
                                    <tr>
                                    <td>Coordinator/ Examinar :</td>
                                    <td></td>
                                    <td>Sign:</td>
                                    <td> <img src={isCClevel.signature} style={{ width: '80px', height: '40px' }} /> </td>
                                    <td>Date:</td>
                                    <td>{isCClevel.date_time != null ? isCClevel.date_time:null}</td>
                            </tr>:null}
                                    
                                    <tr>
                                        {isLeclevel!=null?
                                        <>
                                        <td>Checked by :</td>

                                        <td></td>
                                        <td>Sign:</td>
                                        
                                        <img src={isLeclevel.signature} style={{ width: '80px', height: '40px' }} /> 
                                        <td>Date:</td>
                                        <td>{isLeclevel.date_time != null ? isLeclevel.date_time:null}</td>
                                        </>
                                        :null
                                        }
                                            
                                    </tr>
                                    <tr>{newSignature != null ?
                                        <>
                                                                <td>Head of the Department : </td>
                                                                <td></td>
                                                                <td>Sign:</td>
                                                                <img src={newSignature} style={{ width: '80px', height: '40px' }} /> 
                                                                
                                                                
                                        </>
                                        :null
                                }
                                        
                                    </tr> 
                                    </>:null
                                    }                                 
                                    {
                                        approved_level=="AssignedRB" || nextApprovedlevel == "RB" || nextApprovedlevel == "AR"  ? 
                                        <>
                                        <tr>
                                                <td>Coordinator/ Examinar :</td>
                                                <td></td>
                                                <td>Sign:</td>
                                                <td> <img src={isCClevel.signature} style={{ width: '80px', height: '40px' }} /> </td>
                                                <td>Date:</td>
                                                <td>{isCClevel.date_time != null ? isCClevel.date_time:null}</td>
                                        </tr>
                                        <tr>
                                            {isLeclevel!=null?
                                            <>
                                            <td>Checked by :</td>
    
                                            <td></td>
                                            <td>Sign:</td>
                                            <img src={isLeclevel.signature} style={{ width: '80px', height: '40px' }} /> 
                                            <td>Date:</td>
                                            <td>{isLeclevel.date_time != null ? isLeclevel.date_time:null}</td>
                                            </>
                                            :null
                                            }
                                                
                                        </tr>
                                        <tr>{isHODlevel.signature != null ?
                                            <>
                                                                    <td>Head of the Department : </td>
                                                                    <td></td>
                                                                    <td>Sign:</td>
                                                                    <img src={isHODlevel.signature} style={{ width: '80px', height: '40px' }} /> 
                                                                    <td>Date:</td>
                                                                    <td>{isHODlevel.date_time != null ? isHODlevel.date_time:null}</td>: 
                                                                    
                                            </>
                                            :null
                                    }
                                            
                                        </tr> 
                                        </>:null
                                    }
            
                            
                                
                               
                               

                        </table>

                    </div>
                    
                    {
                        nextApprovedlevel === "course_coordinator" ? 
                        <div>
                            <hr />
                            <div>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder="Search by Lecturer Name..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                
                                    
                                <div className='list-group'>
                                {filteredData.length > 0? (
                                    filteredData.map((item, index) => (
                                        searchTerm == ''?
                                        null
                                        : <button  key={index} type="button" className="list-group-item list-group-item-action"  onClick={() => handleClick(item.name_with_initials,item.email)}> {item.name_with_initials}</button >
                                    ))
                                    ) : (
                                        <button  type="button" className="list-group-item list-group-item-action">No results found.</button >
                                )}
                                </div>
                            </div>
                        </div>
                        :
                        null
                            
                    }
                  <hr />
                    <div style={{marginTop:"10px",float:"right"}}>
                    

                    {
                    approval_level === "finalized" ||
                    approval_level === "course_coordinator" ||
                    approval_level === "lecturer" ? (
                        <form onSubmit={handleSubmit}>
                       
                             <input to={``} type="submit" value="Send" className="btn btn-outline-success btn-sm"  id="submitbtn" style={{ width: '100px'}} disabled={!newSignature}/> <br /><br />
                        </form>
                    ) : null
                    }
                        
                       


                    </div>

              </div>
              <div className=' col-5' style={{marginTop:"50px"}}>
                {
                    approval_level === "finalized" ||
                    approval_level === "course_coordinator" ||
                    approval_level === "lecturer" ? (
                        <SignatureForApproval saveDigitalSignature={saveDigitalSignature} />
                    ) : null}
            </div>
            
            </div>
            </div>         
            </div>
             </div>

                
              
            
          </div>

          
                </>
            )}
        </>
    )
    
}

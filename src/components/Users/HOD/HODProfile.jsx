import React from 'react'

import { useState, useEffect } from 'react';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../components/common/AcademicYearManagerSingleton';

export default function HODProfile() {

    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const[current_semester,setCurrent_semester]=useState("")
    const[academicYear,setAcademicYear]=useState("")

  const levels =[1,2,3,4]

  

  useEffect(() => {
    const fetchAndSaveYear = async () => {
        const details = await fetchAcademicYear();
        if (details) {
            saveAcademicYearToLocal(details);
            setAcademicDetails(details);
        }
    };

    fetchAndSaveYear();
}, []);

useEffect(() => {
  setAcademicYear("2023-2024");
  setCurrent_semester("1");
    if (academicDetails) { // Check if academicDetails is not null or undefined
        // setAcademicYear(academicDetails.current_academic_year);
        // setCurrent_semester(academicDetails.current_semester);
        setAcademicYear("2023-2024");
        setCurrent_semester("1");
    }
}, [academicDetails]); // Depend on academicDetails to trigger this effect

console.log(academicDetails)
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
    
     const userNameAuth = user?.full_name;

    const department = user?.department_id;
   
    console.log(userNameAuth,department,current_semester,academicYear)



  return (
    <>
        
          
          {levels.map((level, index) => (
        
                      <>

                        <div className="col mb-4"> 
                            <div className="card text-center functionCard">
                            <div className="card-body">
                                <a href={`/CourseCard/${level}/${current_semester}/${department}`} className="btn btn-primary home-page-class-button">Level {level} Sem {current_semester}</a>
                            </div>
                            </div>
                        </div>
                      </>
                    
             ))}

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <a href="" className="btn btn-primary home-page-class-button">Results Board</a>
              </div>
            </div>
          </div>
    </>

  )
}

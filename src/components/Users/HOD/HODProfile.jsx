import React from 'react'
import { useState, useEffect } from 'react';
import { fetchAcademicYear, saveAcademicYearToLocal, loadAcademicYearFromLocal } from '../../../services/academicYearService';

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
    if (academicDetails) { // Check if academicDetails is not null or undefined
        setAcademicYear(academicDetails.current_academic_year);
        setCurrent_semester(academicDetails.current_semester);
    }
}, [academicDetails]); // Depend on academicDetails to trigger this effect


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
    
     const userNameAuth = user?.userName;

     console.log(userNameAuth)
    const department = user?.department;




  return (
    <>
        
          
          {levels.map((level, index) => {
        
                      <>

                        <div className="col mb-4"> 
                            <div className="card text-center functionCard">
                            <div className="card-body">
                                <a href={`/CourseCard/${level}/${current_semester}/${department}`} className="btn btn-primary home-page-class-button">Level {level} Sem {semester}</a>
                            </div>
                            </div>
                        </div>
                      </>
                    
             })}

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

import React, { useEffect } from 'react';
import { useState } from "react";
import axios from 'axios';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../common/AcademicYearManagerSingleton';


export default function SetAcademicYear({ isVisible, onClose ,status }) {
    const [popupInputValue, setPopupInputValue] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const [academicYear, setAcademicYear] = useState('');
    const [cSemester, setCSemester] = useState('');
    const [statusOfUpdate, setStatusOfUpdate] = useState(false);

    console.log(academicDetails);

    console.log(academicYear);

    useEffect(() => {
        const fetchAndSaveYear = async () => {
            const details = await fetchAcademicYear();
            if (details) {
                saveAcademicYearToLocal(details);
                setAcademicDetails(details);
                setAcademicYear(details.current_academic_year);
                setCSemester(details.current_semester);
                setPopupInputValue(details.current_academic_year);
            }
        };

        fetchAndSaveYear();
    }, []);



    const saveData = async () => {
        try {
            const response = await axios.put("http://192.248.50.155:9090/api/AssistantRegistrar/updateAcademicYearDetailsBySA/1", {
                current_academic_year: popupInputValue,
                current_semester: selectedType
            });
            status(statusOfUpdate);

            console.log(response);

        } catch (error) {
            setStatusOfUpdate(false);
            console.error("Error fetching data from API:", error);
        }
    };


    const handleSave = () => {

        setStatusOfUpdate(true);
        saveData();
        onClose();

    };

    const handleCancel = () => {
        onClose();
    };



    if (!isVisible) return null;

    return (
        <div className="modal-backdrop" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-content" style={{ backgroundColor: '#fefefe', padding: '20px', border: '1px solid #888', width: '600px', maxWidth: '100%', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}>
                <div className=" h4">Set Current Academic Year & Semester</div>

                <label htmlFor="" className=" form-label mt-3 text-danger">Enter Current Academic Year</label>

                <input
                    className=" form-control "
                    type="text"
                    value={popupInputValue}
                    onChange={(e) => setPopupInputValue(e.target.value)}
                    placeholder={"Current Academic Year : "+academicYear}
                    style={{
                        width: '100%', marginBottom: '10px',
                    }}
                />

                <label htmlFor="" className=" form-label mt-3 text-danger">Enter Current Semester</label>

                <input
                    className=" form-control"
                    type="number"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    placeholder={"Current Semester : "+cSemester}
                    style={{
                        width: '100%', marginBottom: '10px',
                    }}
                    max={2}
                    min={1}
                />

                <div style={{ display: "flex" }}>
                    <button style={{ width: "100px" }} className=" btn btn-dark btn-sm m-2" onClick={handleSave}>Submit</button>
                    <button style={{ width: "100px" }} className=" btn btn-danger btn-sm m-2" onClick={handleCancel}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

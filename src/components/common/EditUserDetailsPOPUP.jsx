import React, { useEffect } from 'react';
import { useState } from "react";
import axios from 'axios';

export default function EditUserDetailsPOPUP() {
    const [popupInputValue, setPopupInputValue] = useState('');
    const [selectedType, setSelectedType] = useState('');


    useEffect(() => {

        fetchAndSaveYear();
    }, []);



    const saveData = async () => {
        try {
            

        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    };


    const handleSave = () => {
        if (!popupInputValue.trim() || !selectedType) {
            alert("Please enter a value and select an assessment type");
            return;
        }
        onSave({ popupInputValue, selectedType });
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };



    if (!isVisible) return null;

    return (
        <div className="modal-backdrop" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-content" style={{ backgroundColor: '#fefefe', padding: '20px', border: '1px solid #888', width: '700px', maxWidth: '100%', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}>
                <div className=" h5">Profile Details</div>

                <label htmlFor="" className=" form-label mt-3 text-danger">Enter Old Password</label>

                <input
                    className=" form-control mt-2"
                    type="text"
                    value={popupInputValue}
                    onChange={(e) => setPopupInputValue(e.target.value)}
                    placeholder="Type New Academic Year Here"
                    style={{
                        width: '100%', marginBottom: '10px',
                    }}
                />

                <label htmlFor="" className=" form-label mt-3 text-danger">Enter New Password</label>

                <input
                    className=" form-control mt-2"
                    type="number"
                    value={popupInputValue}
                    onChange={(e) => setSelectedType(e.target.value)}
                    placeholder="Type New Semester Here"
                    style={{
                        width: '100%', marginBottom: '10px',
                    }}
                    max={2}
                    min={1}
                />

                <label htmlFor="" className=" form-label mt-3 text-danger">Confirm New Password</label>

                <input
                    className=" form-control mt-2"
                    type="number"
                    value={popupInputValue}
                    onChange={(e) => setSelectedType(e.target.value)}
                    placeholder="Type New Semester Here"
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

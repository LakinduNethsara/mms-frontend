import React from 'react';
import { useState } from "react";

export default function MidTypePopup({isVisible, onClose, onSave}) {
    const [selectedType, setSelectedType] = useState('');

    const handleSave = () => {
        if (!selectedType) {
            alert("Please enter a value and select an assessment type");
            return;
        }
        onSave(selectedType); // Call the passed callback function with the selected type
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleRadioChange = (e) => {
        setSelectedType(e.target.value);
    };

    if (!isVisible) return null;

    return (
        <div className="modal-backdrop" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-content" style={{ backgroundColor: '#fefefe',  padding: '20px', border: '1px solid #888', width: '400px', maxWidth: '100%', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}>
                <div className=" h5" style={{color:'maroon'}}>Select Mid Exam Type</div>

                    <div className="form-check form-check-inline mx-4 mt-3">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Mid theory exam" onChange={handleRadioChange} />
                        <label className="form-check-label" >Mid Thoery Exam</label>
                    </div>

                    <div className="form-check form-check-inline mx-4 mt-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Mid practical exam" onChange={handleRadioChange} />
                        <label className="form-check-label" >Mid Practical Exam</label>
                    </div>

                    <div className="form-check form-check-inline mx-4 mt-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="both" onChange={handleRadioChange} />
                        <label className="form-check-label" >Mid Thoery Exam & Mid Practical Exam</label>
                    </div>
                <div className="mt-3" style={{display:"flex"}}>
                    <button style={{width:"100px"}} className=" btn btn-dark btn-sm m-2" onClick={handleSave}>Save</button>
                    <button style={{width:"100px"}} className=" btn btn-danger btn-sm m-2" onClick={handleCancel}>Cancel</button>
                </div>
                
            </div>
        </div>
    )
}

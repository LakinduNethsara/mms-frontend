import React from 'react';
import { useState } from "react";

export default function CustomPopup({ isVisible, onClose, onSave }) {
    const [popupInputValue, setPopupInputValue] = useState('');
    const [selectedType, setSelectedType] = useState('');

    // console.log("selectedType : "+ selectedType);

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

    const handleRadioChange = (e) => {
        setSelectedType(e.target.value);
    };

    if (!isVisible) return null;

    return (
        <div className="modal-backdrop" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-content" style={{ backgroundColor: '#fefefe',  padding: '20px', border: '1px solid #888', width: '700px', maxWidth: '100%', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}>
                <div className=" h5">Enter New Assessment Type</div>
                <input
                    className=" form-control mt-2"
                    type="text"
                    value={popupInputValue}
                    onChange={(e) => setPopupInputValue(e.target.value)}
                    placeholder="Type New Assessment Type Here"
                    style={{
                        width: '100%', marginBottom: '10px',
                    }}
                />
                <label htmlFor="" className=" form-label mt-3 text-danger">Choose a Type of Assessment Type</label>
                <div style={{display:"flex"}}>

                    <div className="form-check form-check-inline mx-4">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="CA" onChange={handleRadioChange} />
                        <label className="form-check-label" >Continuous Assessment</label>
                    </div>

                    <div className="form-check form-check-inline mx-4">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Mid" onChange={handleRadioChange} />
                        <label className="form-check-label" >Mid Exam</label>
                    </div>

                    <div className="form-check form-check-inline mx-4">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="End" onChange={handleRadioChange} />
                        <label className="form-check-label" >Final Assessment</label>
                    </div>

                </div>
                
                <div style={{display:"flex"}}>
                    <button style={{width:"100px"}} className=" btn btn-dark btn-sm m-2" onClick={handleSave}>Submit</button>
                    <button style={{width:"100px"}} className=" btn btn-danger btn-sm m-2" onClick={handleCancel}>Cancel</button>
                </div>
                
            </div>
        </div>
    )
}

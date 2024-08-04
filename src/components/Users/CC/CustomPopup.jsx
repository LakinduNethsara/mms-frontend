import { useState } from "react";

export default function CustomPopup({ isVisible, onClose, onSave }) {
    const [popupInputValue, setPopupInputValue] = useState('');

    const handleSave = () => {
        if (!popupInputValue.trim()) {
            alert("Please enter a value");
            return;
        }
        onSave(popupInputValue);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isVisible) return null;

  return (
    <div className="modal-backdrop" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <div className="modal-content" style={{ backgroundColor: '#fefefe',  padding: '20px', border: '1px solid #888', width: '500px', maxWidth: '100%', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}>
            <div className=" h5">Enter New Assessment Type</div>
            <input
                className=" form-control mt-2"
                type="text"
                value={popupInputValue}
                onChange={(e) => setPopupInputValue(e.target.value)}
                placeholder="Enter new assessment type"
                style={{
                    width: '100%', marginBottom: '10px',
                }}
            />
            <div style={{display:"flex"}}>
                <button className=" btn btn-primary btn-sm m-2" onClick={handleSave}>Submit</button>
                <button className=" btn btn-danger btn-sm m-2" onClick={handleCancel}>Cancel</button>
            </div>
            
        </div>
    </div>
  )
}

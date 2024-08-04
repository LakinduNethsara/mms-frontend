import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditValueModal({ isOpen, onClose, initialValue, onSubmit }) {
    const [value, setValue] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleSubmit = () => {
        const numValue = parseFloat(value);

        // Validation: Check if value is a number between 0 and 100 or "MC"/"AB"
        if (
            (isNaN(numValue) || numValue < 0 || numValue > 100) && 
            value.toUpperCase() !== 'MC' && 
            value.toUpperCase() !== 'AB'
        ) {
            toast.error('Please enter a valid number for marks (0-100) or "MC"/"AB".');
            return;
        }

        if (!reason.trim()) {
            toast.error('Please provide a reason for changing the marks.');
            return;
        }

        // If both fields are valid, submit the form
        onSubmit(value, reason);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '500px', height: '350px' }}>
                
                <form>
                    
                    <div className="mb-3">
                        <label className="form-label">Enter Updated Marks</label>
                        <input
                            className="form-control"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Enter Reason for Changing Marks</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Reason for change..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-dark btn-sm m-2" onClick={handleSubmit}>Submit</button>
                        <button type="button" className="btn btn-outline-danger btn-sm m-2" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

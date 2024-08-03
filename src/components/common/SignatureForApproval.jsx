import SignatureCanvas from 'react-signature-canvas';
import { useDropzone } from 'react-dropzone';
import React, { useState, useRef, useEffect } from 'react';

export default function SignatureForApproval({ saveDigitalSignature }) {
    const [radioSelection, setRadioSelection] = useState('digitalSignature');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showSaveClearButtons, setShowSaveClearButtons] = useState(false);
    const [files, setFiles] = useState([]);
    const sign = useRef();
    const [url, setUrl] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => ({
                ...file,
                preview: URL.createObjectURL(file),
            })));
            setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
            setShowSaveClearButtons(true);
        },
    });

    console.log(url);   

    useEffect(() => {
        return () => {
            // Revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handleSave = async () => {
        if (files.length > 0) {
            const file = files[0];
            if (file instanceof Blob) {
                const imageUrl = await convertBlobToDataURL(file);
                setUrl(imageUrl);
                saveDigitalSignature(imageUrl);
            } else {
                console.error("File is not a Blob:", file);
            }
        }
        setSelectedImage(null);
        setShowSaveClearButtons(false);
        setFiles([]);
    };

    const handleClearImage = () => {
        setSelectedImage(null);
        setFiles([]);
        setShowSaveClearButtons(false);
        saveDigitalSignature(null);
    };

    const handleClearCanvas = () => {
        if (sign.current) {
            sign.current.clear();
        }
        saveDigitalSignature(null);
    };

    const handleGenerate = () => {
        if (sign.current) {
            const imageUrl = sign.current.getTrimmedCanvas().toDataURL('image/png');
            console.log(imageUrl)
            setUrl(imageUrl);
            saveDigitalSignature(imageUrl);
        }
    };

    const convertBlobToDataURL = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <div>
            <div className='container' style={{ display: 'flex', marginLeft: "200px", marginBottom: "80px" }}>
                <div style={{ float: "right" }}>
                    {radioSelection === 'digitalSignature' && (
                        <div className='shadow' style={{ border: '1px solid gray', width: 500, height: 200 }}>
                            <SignatureCanvas
                                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                ref={sign}
                            />
                            <br />
                            <button className='btn btn-outline-success btn-sm' style={{ width: "100px" }} onClick={handleGenerate}>Save</button>
                            <button className='btn btn-danger btn-sm mx-3' style={{ width: "100px" }} onClick={handleClearCanvas}>Clear</button>
                        </div>
                    )}
                    {radioSelection === 'uploadSignature' && (
                        <div style={{ border: '2px solid black', width: '500px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div {...getRootProps()} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <input {...getInputProps()} />
                                {isDragActive ? <p>Drop the files here...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                            </div>
                            {files.map(file => (
                                <div key={file.name}>
                                    <img src={file.preview} alt={file.name} style={{ width: '480px', height: '180px' }} />
                                </div>
                            ))}
                            {showSaveClearButtons && (
                                <div>
                                    <button className='btn btn-outline-success btn-sm shadow-lg' onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
                                    <button className='btn btn-danger btn-sm mx-3 shadow-lg' onClick={handleClearImage}>Clear</button>
                                </div>
                            )}
                            {selectedImage && (
                                <div style={{ width: '200px', height: '100px', border: '1px solid black', overflow: 'hidden' }}>
                                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='mx-2'>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" checked={radioSelection === 'digitalSignature'} onChange={() => setRadioSelection('digitalSignature')} />
                        <label className="btn btn-outline-primary" htmlFor="vbtn-radio1">Digital Signature</label>
                        {/* <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off" checked={radioSelection === 'uploadSignature'} onChange={() => setRadioSelection('uploadSignature')} />
                        <label className="btn btn-outline-primary" htmlFor="vbtn-radio2">Upload a Signature</label> */}
                    </div>
                </div>
                {/* <img src={url} style={{ width: '80px', height: '40px' }}/> */}
            </div>
        </div>
    );
}

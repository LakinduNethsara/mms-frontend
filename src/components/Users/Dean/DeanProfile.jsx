import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function DeanDashBoard() {
  const [department, setDepartment] = useState("");
  const [resultBoard, setResultBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (value) => {
    setDepartment(value);
  }

  const getResultBoard = async () => {
    try {
      if (!department || department === "") {
        return;
      }
      setLoading(true);
      const response = await axios.get(`http://localhost:9090/api/results_board/getAvailableResultsBoardsforDeanCC/${department}`);
      
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = response.data.content;
      
      if (!Array.isArray(content)) {
        throw new Error("Invalid response structure");
      }

      setResultBoard(content);
      setLoading(false);

      if (content.length > 0 && content[0].status === "Started") {
        history.push(`/ccAssignedResultSheet/${content[0].id}/${content[0].level}/${content[0].semester}/${content[0].department}/${content[0].academic_year}`);
      } else {
        toast.error("No result board available for this department or not started yet");
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || "Failed to fetch result boards");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (department) {
      getResultBoard();
    }
  }, [department]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
        </div>
      ) : (
        <>
        <div className="d-flex mb-4" style={{ margin: "100px" }}>
  <div className="col-md-3 mb-5" style={{ margin: "0 50px 0 0" }}>
    <div className="card shadow m-4" style={{ width: "100%", height: "100%" }}>
      <div className="card-body d-flex align-items-center justify-content-center">
        <a href="/pendingDeanCertifyMarksheet" className="btn btn-primary home-page-class-button">
          Certify Result Sheets
        </a>
      </div>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card shadow m-4" style={{ width: "80%", height: "80%" }}>
      <div className="card-body text-center d-flex flex-column justify-content-center">
                <h3>Results Board</h3>
                <select className="form-select home-page-class-button marksheet-select-box-button" style={{backgroundColor:"#0d6efd",color:"white",marginLeft:"auto",marginRight:"auto",textAlign:"center",width:"max-content"}} value={department} onChange={(e)=>{handleChange(e.target.value)}}>

                  <option value={""} disabled style={{color:"rgb(100, 100,100)"}}>
                    Select department
                  </option>

                  <option value='ICT'>
                    ICT
                  </option>

                  <option value='ET'>
                    ET
                  </option>

                  <option value='BST'>
                    BST
                  </option>

                </select>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </>
  );
}

export default DeanDashBoard;

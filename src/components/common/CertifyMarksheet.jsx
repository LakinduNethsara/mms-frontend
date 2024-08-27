import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../Users/AR/BackButton/BackButton';

export default function CertifyMarksheet(props) {
  const [user, setUser] = useState(null);
  const [finalMarksheetList, setFinalMarksheetList] = useState([]);
  const [status] = useState("Ended"); // status of the result board
  const { approved_level } = props; // Approved level for result board conducted courses
  const history = useHistory(); // for routing

  // Retrieve user data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  // Load available result sheets based on approved level
  useEffect(() => {
    if (user) {
      loadAvailableResultSheets(approved_level);
    }
  }, [approved_level, user]);

  const loadAvailableResultSheets = async (approval_level) => {
    try {
      let response;
      if (approval_level === "AR" || approved_level === "Dean") {
        response = await axios.get(`http://192.248.50.155:9090/api/AssistantRegistrar/getCertifyPendingResultBoards/${approval_level}/${status}`);
        setFinalMarksheetList(response.data);
      } else if (approval_level === "lecturer" && user?.department_id) {
        response = await axios.get(`http://192.248.50.155:9090/api/approvalLevel/getMarksReturnSheetsForHODCertify/${user.department_id}`);
        setFinalMarksheetList(response.data.content);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <BackButton />
      <div className='certify-div-1'>
        
        <div className='certify-div-2'>
          <table className='table table-striped certify-table'>
            <thead className='certify-table-head'>
              <tr>
                <th className='certify-table-heading' colSpan={100} style={{ textAlign: 'center', backgroundColor: '#ebe8e8', textAlignLast: 'center' }}>
                  Marks Sheets Available to Certify <br />
                </th>
              </tr>
              <tr>
                <th colSpan={100}></th>
              </tr>
            </thead>
            <tbody>
              {!finalMarksheetList.length ? (
                <tr>
                  <td colSpan={100} style={{ textAlign: 'center', color: "red" }}>No Marks Sheets Available to Certify</td>
                </tr>
              ) : (
                finalMarksheetList.map((item, index) => (
                  <tr key={index} className='clickable-row' onClick={() => {
                    if (approved_level === "AR") {
                      history.push(`/deanFinalMarkSheet/${item.level}/${item.semester}/${item.department}/${item.academic_year}`);
                    } else if (approved_level === "Dean") {
                      history.push(`/vcFinalMarkSheet/${item.level}/${item.semester}/${item.department}/${item.academic_year}`);
                    } else if (approved_level === "lecturer") {
                      history.push(`/HODMarksReturnSheet/${item[2]}/${item[3]}/${item[4]}/${item[5]}`);
                    }
                  }}>
                    {approved_level === "AR" || approved_level === "Dean" ? (
                      <>
                        <td>level {item.level}</td>
                        <td>semester {item.semester}</td>
                        <td>Dep. of {item.department}</td>
                      </>
                    ) : approved_level === "lecturer" ? (
                      <>
                        <td>Course: {item[2] }  - {item[3]}</td>
                        <td>Department: {item[4]}</td>
                        <td>Academic Year: {item[5]}</td>
                      </>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className='right-aligned-div back-button-div'>
            {/* <BackButton/>&nbsp; */}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { fetchAcademicYear, saveAcademicYearToLocal } from '../../../components/common/AcademicYearManagerSingleton';
import { ToastContainer,toast } from 'react-toastify';

const getFuzzyMatches = (input, list) => {
  const lowerInput = input.toLowerCase();
  return list.filter(course => course.code.toLowerCase().includes(lowerInput));
};

export default function GradeMarginChange() {
  const [courseCode, setCourseCode] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [academic_year, setAcademicYear] = useState('');
  const [margin, setMargin] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [courseList, setCourseList] = useState([]);
  const [grades, setGrades] = useState([]);
  const [academicDetails, setAcademicDetails] = useState('');
  const [current_academic_year, setCurrent_academic_year] = useState('');
  const [previous_academic_year, setPrevious_academic_year] = useState('');

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  console.log(academic_year,selectedCourse,grades);


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
    if (academicDetails) {
      setCurrent_academic_year(academicDetails.current_academic_year);
      setPrevious_academic_year(academicDetails.previous_academic_year);
    }
  }, [academicDetails]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://192.248.50.155:9090/api/courses/getallcourses');
        if (response.data.code === '00') {
          const courses = response.data.content;
          setCourseList(courses.map(course => ({
            code: course.course_id,
            name: course.course_name
          })));
        } else {
          console.error('Failed to fetch courses:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch grades when both academic year and course are selected
  useEffect(() => {
    const fetchGrades = async () => {
      if (selectedCourse && academic_year) {
        try {
          const response = await axios.get(`http://192.248.50.155:9090/api/courses/getGradeMargin/${selectedCourse}/${academic_year}`);
          setGrades(response.data.content || []);
        } catch (error) {
          console.error('Error fetching grades:', error);
        }
      } else {
        setGrades([]); // Clear grades if either condition is not met
      }
    };

    fetchGrades();
  }, [selectedCourse, academic_year]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (courseCode) {
        const matches = getFuzzyMatches(courseCode, courseList);
        setFilteredCourses(matches);
      } else {
        setFilteredCourses([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [courseCode, courseList]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        setFilteredCourses([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setCourseCode(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleCourseSelect = (code) => {
    setSelectedCourse(code);
    setCourseCode(courseList.find(course => course.code === code)?.name || '');
    setFilteredCourses([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => Math.min(filteredCourses.length - 1, prevIndex + 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleCourseSelect(filteredCourses[highlightedIndex].code);
      }
    }
  };

  const handleGradeChange = (e) => {
    const selectedGradeValue = e.target.value;
    setSelectedGrade(selectedGradeValue);
    const grade = grades.find(ele => ele.grade === selectedGradeValue);
    setMargin(grade ? grade.margin_of_grade : 0);
  };

  const handleMarginChange = (e) => {
    setMargin(parseFloat(e.target.value) || 0);
  };

  const decreaseMargin = () => {
    setMargin((prevMargin) => Math.max(prevMargin - 0.5, 0));
  };

  const increaseMargin = () => {
    setMargin((prevMargin) => prevMargin + 0.5);
  };

  const saveMargin = async () => {
    if (!selectedCourse || !selectedGrade) {
      toastr.error('Please select a course and grade');
      return;
    }   
    else if (margin > 100) {
        toastr.error('Margin cannot be greater than 100');
        return;
        }
    else{
        try {
            const response = await axios.put(`http://192.248.50.155:9090/api/courses/updateGradeMargins/${selectedCourse}/${academic_year}/${selectedGrade}/${margin}`);
    
            if (response.data.code === '00') {  
            toast.success('Grade margin updated successfully');
            } else {
            toast.error('Failed to update grade margin');
            }
        } catch (error) {
            console.error('Error updating grade margin:', error);
        }
    }

    };

  return (
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <ToastContainer/>
      <h1 style={{ marginBottom: '20px' }}>Adjust Grade</h1>

      <label style={{ marginRight: '10px' }}>Select Academic Year:</label>
      <div>
        <input
          type="radio"
          id="current"
          name="academicYear"
          value={academicDetails.current_academic_year}
          checked={academic_year === academicDetails.current_academic_year}
          onChange={(e) => setAcademicYear(e.target.value)}
        />
        <label htmlFor="current">Current {academicDetails.current_academic_year}</label>
        <input
          type="radio"
          id="previous"
          name="academicYear"
          value={academicDetails.previous_academic_year}
          checked={academic_year === academicDetails.previous_academic_year}
          onChange={(e) => setAcademicYear(e.target.value)}
        />
        <label htmlFor="previous">Previous {academicDetails.previous_academic_year}</label>
      </div>

      <div style={{ marginBottom: '20px', position: 'relative', display: 'inline-block', width: '300px' }}>
        <input
          type="text"
          value={courseCode}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Course Code"
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%'
          }}
          ref={inputRef}
        />
        {filteredCourses.length > 0 && (
          <ul
            ref={dropdownRef}
            style={{
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderTop: 'none',
              borderRadius: '0 0 4px 4px',
              maxHeight: '150px',
              overflowY: 'auto',
              zIndex: '1000'
            }}
          >
            {filteredCourses.map((course, index) => (
              <li
                key={index}
                onClick={() => handleCourseSelect(course.code)}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: index === highlightedIndex ? '#e0e0e0' : 'white',
                  borderBottom: '1px solid #ddd'
                }}
              >
                {course.code} - {course.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Grade Selection */}
      {grades.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Select Grade:</label>
          <select
            value={selectedGrade}
            onChange={handleGradeChange}
            style={{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100px'
            }}
          >
            <option value="">Select Grade</option>
            {grades.map((grade, index) => (
              <option key={index} value={grade.grade}>{grade.grade}</option>
            ))}
          </select>
        </div>
      )}

      {/* Margin Adjustment */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Margin:</label>
        <button onClick={decreaseMargin} style={{ marginRight: '10px' }}>-</button>
        <input
          type="text"
          value={margin}
          onChange={handleMarginChange}
          style={{
            width: '50px',
            textAlign: 'center',
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button onClick={increaseMargin} style={{ marginLeft: '10px' }}>+</button>
      </div>

      <button onClick={saveMargin} style={{ marginLeft: '10px' }}>Update</button>
    </div>
  );
}

// Function to fetch academic year from an API
async function fetchAcademicYear() {
    try {
      const response = await fetch(`http://localhost:9090/api/AssistantRegistrar/getAcademicYearDetails`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data[0]; // Return the entire object instead of just the academic year
    } catch (error) {
      console.error('Error fetching academic year:', error);
      return null;
    }
  }
  
  // Function to save academic year to local storage
  function saveAcademicYearToLocal(academicYearDetails) {
    localStorage.setItem('academicYearDetails', JSON.stringify(academicYearDetails));
  }
  
  // Function to load academic year from local storage
  function loadAcademicYearFromLocal() {
    const storedAcademicYearDetails = localStorage.getItem('academicYearDetails');
    if (storedAcademicYearDetails) {
      return JSON.parse(storedAcademicYearDetails);
    }
    return null;
  }
    
   
    export { fetchAcademicYear, saveAcademicYearToLocal, loadAcademicYearFromLocal };
    
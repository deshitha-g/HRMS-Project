// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Report2.css';
const Report2 = () => {
  const [selectedReport, setSelectedReport] = useState('HRManager');//new

  // State to store the employee data for HR Managers
  const [hrManagerData, setHRManagerData] = useState([]);
  const [softwareEngineerData, setSoftwareEngineerData] = useState([]);
  const [accountantData, setAccountantData] = useState([]);
  const [qaEngineerData, setQAEngineerData] = useState([]);
  
  // Function to fetch employee data for HR Managers from your API


    // Create an object to map report type to data
    const reportData = {
      HRManager: hrManagerData,
      SoftwareEngineer: softwareEngineerData,
      Accountant: accountantData,
      QAEngineear: qaEngineerData,
   
      
      
   
    };
    const handleDropdownChange = (event) => {
      setSelectedReport(event.target.value);
    };
    const renderDropdown = () => (
      <div>
        <label>Select a Report:</label>
        <select onChange={handleDropdownChange} value={selectedReport}>
          <option value="HRManager">HR Manager Employee Data</option>
          <option value="SoftwareEngineer">Software Engineer Employee Data</option>
          <option value="Accountant">Accountant Employee Data</option>
          <option value="QAEngineer">QA Engineer Employee Data</option>
   
        </select>
      </div>
    );
    const selectedReportData = reportData[selectedReport];

  useEffect(() => {
    fetchData();
  
  }, []); // Fetch data when the component mounts
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await axios.get(url);
      setDataFunction(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData('http://localhost:3000/employee_data_Title_HRManager',setHRManagerData);
  fetchData('http://localhost:3000/employee_data_Title_SoftwareEngineer',setSoftwareEngineerData);
  fetchData('http://localhost:3000/employee_data_Title_Accountant',setAccountantData);
  fetchData('http://localhost:3000/employee_data_Title_QA_Engineer',setQAEngineerData);
 

   const renderTable = (data, title) => (
    <div>
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Marital Status</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Employment Status</th>
            <th>Pay Grade ID</th>
            <th>Branch ID</th>
            <th>Department ID</th>
            <th>Dependent ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.Employee_ID}>
              <td>{employee.Employee_ID}</td>
              <td>{employee.First_Name}</td>
              <td>{employee.Last_Name}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Marital_Status}</td>
              <td>{formatDate(employee.Birthday)}</td>
              <td>{employee.Email}</td>
              <td>{employee.Employment_Status}</td>
              <td>{employee.Pay_Grade_ID}</td>
              <td>{employee.Branch_ID}</td>
              <td>{employee.Dept_ID}</td>
              <td>{employee.Dependent_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  

  return (
   
<dev>
{renderDropdown()}
{renderTable(selectedReportData,selectedReport)}
</dev>
  );
};

export default Report2;

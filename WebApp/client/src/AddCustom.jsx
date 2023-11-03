import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/PageHR.css'; // Import the CSS file
import NavBar from './Navbar';

function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

function AddCustom() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();
  const [customAttributes, setCustomAttributes] = useState([]);
  const [selectedAttributeID, setSelectedAttributeID] = useState('');
  const [customAttributeValue, setCustomAttributeValue] = useState('');
  const [customAttributeName, setCustomAttributeName] = useState('');
  const [employeeID, setEmployeeID] = useState(''); // Specify employee ID here
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessage2, setSuccessMessage2] = useState(''); 
  
  useEffect(() => {
    // Check user authentication using Axios
    axios.get("http://localhost:3000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.userID === id_to_transfer && response.data.jobTitle === 'HR Manager') {
        } else {
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate(`/`);
      });
  }, [id_to_transfer, navigate]);
  
  useEffect(() => {
    const storedSuccessMessage2 = localStorage.getItem('successMessage2');

    if (storedSuccessMessage2) {
      setSuccessMessage2(storedSuccessMessage2);
      localStorage.removeItem('successMessage2');
    }

    const storedSuccessMessage = localStorage.getItem('successMessage');

    if (storedSuccessMessage) {
      setSuccessMessage(storedSuccessMessage);
      localStorage.removeItem('successMessage');
    }

    axios.get('http://localhost:3000/customAttributes')
      .then((response) => {
        setCustomAttributes(response.data);
      })
      .catch((error) => console.error('Error fetching custom attributes:', error));
  }, []);

  const handleAddCustomAttributeDefinition = () => {
    if (customAttributeName) {
      axios.post('http://localhost:3000/createCustomAttribute', {
        attributeName: customAttributeName,
      })
        .then((response) => {
          console.log('Custom attribute definition added:', response.data);
          setCustomAttributes([...customAttributes, response.data]);
          setSelectedAttributeID(response.data.Attribute_ID);
          localStorage.setItem('successMessage', 'The Attribute added successfully');
          setSuccessMessage('The attribute was added successfully.');
        })
        .catch((error) => {
          console.error('Error adding custom attribute definition:', error);
          localStorage.setItem('successMessage', 'Error adding custom attribute to the employee.');
          setSuccessMessage('Error adding custom attribute to the employee.');
        });
    } else {
      console.error('Invalid input');
      localStorage.setItem('successMessage', 'Invalid input. Please check your input fields.');
      setSuccessMessage('Invalid input. Please check your input fields.');
    }
  };

  const handleAddCustomAttributeToEmployee = () => {
    if (employeeID && selectedAttributeID && customAttributeValue) {
      axios.post('http://localhost:3000/associateCustomAttribute', {
        employeeID: employeeID,
        attributeID: selectedAttributeID,
        value: customAttributeValue,
      })
        .then((response) => {
          console.log('Custom attribute added to the employee:', response.data);
          setSuccessMessage2('Custom attribute value added to the employee successfully.');
          localStorage.setItem('successMessage2', 'Custom attribute value added to the employee successfully.');
        })
        .catch((error) => {
          if (error.response.status === 400) {
            localStorage.setItem('successMessage2', 'Invalid input. Please check your input fields.');
            setSuccessMessage2('Invalid input. Please check your input fields.');
          } else if (error.response.status === 500) {
            localStorage.setItem('successMessage2', 'The provided Employee ID does not exist.');
            setSuccessMessage2('The provided Employee ID does not exist.');
          } else {            
            console.error('Error adding custom attribute to the employee:', error);
            localStorage.setItem('successMessage2', 'An error occurred while adding custom attribute to the employee.');
            setSuccessMessage2('An error occurred while adding custom attribute to the employee.');
          }
        });
    } else {
      console.error('Invalid input');
      localStorage.setItem('successMessage2', 'Invalid input. Please check your input fields.');
      setSuccessMessage2('Invalid input. Please check your input fields.');
    }
  };

  return (    
    <div className="page-container">      
        <div className="sidebar">    
      <div style={{ marginTop: '20px',marginBottom:'40px',display: 'flex',alignItems: 'center',textAlign: 'center' }}>
        <h2>Jupiter Apparels</h2></div>
        <ul>
        <li>
            <NavLink to={`/PageHR/${id_to_transfer}/`}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/EmployeeManagement/`}>
              Employee Management
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/AddCustom`}>
              Add Custom Attribute
            </NavLink>
          </li>
          <li>
            <NavLink to={`/PageHR/${id_to_transfer}/ReportGenaration/`}>
              Report Generation
            </NavLink>
          </li>
          <li>
            <NavLink to={`/`} activeClassName="active-link" onClick={handleLogout}>
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
            <div className="content">
             <NavBar text="Add Custom Attribute"/>            
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">         
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          <div className="container">
            <form>
              <div className="mb-3">
                <label htmlFor="customAttributeName" className="form-label">Custom Attribute Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="customAttributeName"
                  value={customAttributeName}
                  onChange={(e) => setCustomAttributeName(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleAddCustomAttributeDefinition}>Add Custom Attribute Definition</button>
            </form>
            <form>
              <div className="mt-3">
                <label htmlFor="employeeID" className="form-label">Employee ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeID"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />                
              </div>
              <div className="mt-3">
                <label htmlFor="selectAttribute" className="form-label">Select Attribute:</label>
                <select
                  className="form-select"
                  id="selectAttribute"
                  value={selectedAttributeID}
                  onChange={(e) => setSelectedAttributeID(e.target.value)}
                >
                  <option value="">Select Attribute</option>
                  {customAttributes.map((attribute) => (
                    <option key={attribute.Attribute_ID} value={attribute.Attribute_ID}>
                      {attribute.Attribute_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <label htmlFor="customAttributeValue" className="form-label">Custom Attribute Value:</label>
                <input
                  type="text"
                  className="form-control"
                  id="customAttributeValue"
                  value={customAttributeValue}
                  onChange={(e) => setCustomAttributeValue(e.target.value)}
                />
              </div>
              <button className="btn btn-primary mt-3" onClick={handleAddCustomAttributeToEmployee}>Add Custom Attribute to Employee</button>
            </form>
            {successMessage2 && (
              <div className="alert alert-success mt-3">{successMessage2}</div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default AddCustom;
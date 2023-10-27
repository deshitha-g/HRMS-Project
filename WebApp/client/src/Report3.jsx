import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Report3() {
  const [employeeData, setEmployeeData] = useState([]);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');

  useEffect(() => {
    // Fetch custom attributes from your API
    axios.get('http://localhost:3000/customAttributes')
      .then((response) => {
        setCustomAttributes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching custom attributes:', error);
      });

    // Fetch employee data with custom fields from your API
    axios.get('http://localhost:3000/employeeCustomAttributes')
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <div>
      <h1>Employee Custom Fields Report</h1>
      <div>
        <label htmlFor="customAttribute">Select Custom Attribute: </label>
        <select
          id="customAttribute"
          onChange={handleAttributeChange}
          value={selectedAttribute}
        >
          <option value="">Select an attribute</option>
          {customAttributes.map((attribute) => (
            <option key={attribute.Attribute_ID} value={attribute.Attribute_ID}>
              {attribute.Attribute_Name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {employeeData
            .filter((employee) =>
              selectedAttribute
                ? employee.Attribute_ID === parseInt(selectedAttribute)
                : true
            )
            .map((employee) => (
              <tr key={employee.Employee_ID}>
                <td>{employee.Employee_ID}</td>
                <td>{employee.Value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Report3;

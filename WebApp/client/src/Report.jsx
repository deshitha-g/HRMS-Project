import React, { useEffect } from "react";
import Axios from 'axios';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReportCard1 from "./Components/ReportCard1";
import ReportCard2 from "./Components/ReportCard2";
import ReportCard3 from "./Components/ReportCard3";
import ReportCard4 from "./Components/ReportCard4";
import ReportCard5 from "./Components/ReportCard5";
import './styles/PageHR.css'; // Import the CSS file
import NavBar from './Navbar';

function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

function ReportGeneration() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check user authentication using Axios
    Axios.get("http://localhost:3000/authenticate/isUserAuth", {
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

  return (
    <div className="page-container">
          <div className="sidebar">
      <div style={{ marginTop: '20px',marginBottom:'40px',display: 'flex',alignItems: 'center',textAlign: 'center' }}>
        <h2>Jupiter Apparels</h2></div>
        <ul>
        <li>
            <NavLink exact to={`/PageHR/${id_to_transfer}/`}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/PageHR/${id_to_transfer}/EmployeeManagement/`}>
              Employee Management
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/PageHR/${id_to_transfer}/AddCustom/`}>
              Add Custom Attribute
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/PageHR/${id_to_transfer}/ReportGenaration`}>
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
       <NavBar text='Report Generation'/>
  
      <div className="isara">       

        
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="dark-border"> {/* Apply the dark-border class */}
              <ReportCard1 />
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="dark-border"> {/* Apply the dark-border class */}
              <ReportCard2 />
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="dark-border"> {/* Apply the dark-border class */}
              <ReportCard3 />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="dark-border"> {/* Apply the dark-border class */}
              <ReportCard4 />
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="dark-border"> {/* Apply the dark-border class */}
              <ReportCard5 />
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>

  );
}

export default ReportGeneration;

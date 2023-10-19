import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';

function ReportCard1() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate(`/PageHR/${id_to_transfer}/ReportGenaration/Report1`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Leave Report</Card.Title>
        <Card.Text>Gives an overw</Card.Text>
        <Button variant="primary" onClick={handleGenerateReport}>Generate Report</Button>
      </Card.Body>
    </Card>
  );
}

export default ReportCard1;

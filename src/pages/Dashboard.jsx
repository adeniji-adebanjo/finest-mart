import React from "react";
import { Container } from "react-bootstrap";

const Dashboard = ({ username }) => {
  return (
    <>
      <Container>
        <h1>Hello {username}, welcome to your Dashboard</h1>
        {/* Add other dashboard content here */}
      </Container>
    </>
  );
};

export default Dashboard;

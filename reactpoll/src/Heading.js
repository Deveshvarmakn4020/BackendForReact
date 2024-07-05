import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Heading.css'; // Import the CSS file

const Heading = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate("/")}>
        FlyWeight Polls
      </h1>
    </header>
  );
}

export default Heading;

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const CreatePollBtn = ({ poll }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 425px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 425px)");
    const handleMediaQueryChange = (e) => setIsSmallScreen(e.matches);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navigate = useNavigate();
  const buttonStyle = {
    width: isSmallScreen ? '375px' : '250px', 
    marginRight: isSmallScreen ? '3px': '25px',
    outline: '2px skyblue',
    backgroundColor: isHovered ? '#80cbc4' : 'blue',
    color: isHovered ? 'black' : 'white',
    padding: '10px',
    borderRadius: '5px',
    border: isHovered ? '1px solid gold' : '1px solid green',
    transition: 'border-color 0.5s',
    marginLeft: '20px'
  };
  const outStyle ={
    padding: '5px'
  };

  const handleClick = () => {
    if (poll && poll.QuestionID) {
      navigate(`/createpoll/`);
    } else {
      console.error('Poll or Poll QuestionID is undefined');
    }
  };

  return (
    <div style ={outStyle}>
    <Button 
      variant="contained"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      style={buttonStyle} 
      onClick={handleClick}
    >
      CreatePoll
    </Button>
    </div>
  );
}

export default CreatePollBtn;

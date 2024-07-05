import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './CreatePoll.css'; // Import the CSS file

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
  const [buttonWidth, setButtonWidth] = useState('150px');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setButtonWidth('391px');
      } else {
        setButtonWidth('150px');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonStyle = {
    width: buttonWidth,
    outline: '2px skyblue',
    backgroundColor: '#0091ea',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid green',
    transition: 'border-color 0.5s',
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/polls/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_text: question,
          choices: options.filter(option => option), // Filter out empty options
          tags: tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (response.ok) {
        setMessage('Poll created successfully!');
        setTimeout(() => navigate('/'), 2000); // Redirect to home page after 2 seconds
      } else {
        const result = await response.json();
        setMessage(`Failed to create poll: ${result.msg}`);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
    } catch (error) {
      setMessage(`Failed to create poll: ${error.message}`);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  return (
    <div className="create-poll-container">
      <Box className="create-poll-box">
        <h3>Question</h3>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your poll question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
          sx={{ backgroundColor: 'white' }}
        />

        <h3>Answer Options</h3>
        {options.map((option, index) => (
          <TextField
            key={index}
            fullWidth
            variant="outlined"
            label={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            margin="normal"
            sx={{ backgroundColor: 'white' }}
          />
        ))}
        <Button variant="outlined" color="secondary" onClick={addOption} sx={{ marginTop: 2 }}>Add Option</Button>

        <h3 style={{ marginTop: 10 }}>Comma separated tags</h3>
        <TextField
          fullWidth
          variant="outlined"
          label="Tag1, Tag2, Tag3"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          margin="normal"
          sx={{ backgroundColor: 'white' }}
        />
      </Box>
      <Box className="create-poll-button-container">
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={handleSubmit}
        >
          Create Poll
        </Button>

        {message && <Box mt={2} color="error.main">{message}</Box>}
      </Box>
    </div>
  );
};

export default CreatePoll;

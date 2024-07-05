import React, { useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Vote = () => {
  const location = useLocation();
  const poll = location.state;
  const [searchParams] = useSearchParams();
  const poll_id = searchParams.get("id");
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    width: '100px',
    outline: '2px skyblue',
    backgroundColor: isHovered ? '#80cbc4' : '#0091ea',
    color: isHovered ? 'black' : 'white',
    padding: '5px',
    borderRadius: '5px',
    border: isHovered ? '1px solid gold' : '1px solid green',
    transition: 'border-color 0.5s',
    marginLeft: '1px',
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  };

  const handleVote = async () => {
    try {
      const response = await fetch(`http://localhost:8000/polls/${poll_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incrementOption: selectedOption }),
      });
      const text = await response.text(); // Get the response as text
      console.log('Raw response:', text);

      try {
        const result = JSON.parse(text); // Attempt to parse JSON
        if (response.ok) {
          setMessage('Vote successfully recorded!');
          setIsButtonDisabled(true);
          setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds
        } else {
          console.error('Failed to increment vote:', result.msg);
          setMessage(`Failed to increment vote: ${result.msg}`);
        }
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        setMessage('Failed to increment vote: Response was not JSON');
      }

    } catch (error) {
      console.error('Error occurred while incrementing vote:', error.message);
      setMessage(`Error occurred while incrementing vote: ${error.message}`);
    }
  };

  if (!poll) {
    return <div>No poll data found</div>;
  }

  return (
    <div style={{ marginLeft: '40px', marginTop: '16px', [theme.breakpoints.down('sm')]: { marginLeft: '1000px', marginTop: '8px' } }}>
      <Typography variant="h4">{poll.Question}</Typography>
      {message && <div>{message}</div>}
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="vote"
          name="vote"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {Object.keys(poll.OptionVote).map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div>
        <Button
          variant="contained"
          onClick={handleVote}
          disabled={isButtonDisabled}
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Vote
        </Button>
      </div>
    </div>
  );
};

export default Vote;

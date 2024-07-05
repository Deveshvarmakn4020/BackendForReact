import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const PollsDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const poll_id = searchParams.get("id");
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
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

  const buttonStyle = {
    width: isSmallScreen ? '100%' : '180px',
    outline: '2px skyblue',
    backgroundColor: isHovered ? '#80cbc4' : '#0091ea',
    color: isHovered ? 'black' : 'white',
    padding: '5px',
    borderRadius: '5px',
    border: isHovered ? '1px solid gold' : '1px solid green',
    transition: 'border-color 0.5s',
    marginLeft: isSmallScreen ? '0' : '1px',
    marginTop: '10px',
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8000/polls/detail/${poll_id}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setPoll(json.data); // Assuming the response JSON structure contains the poll data under 'data'
        } else {
          setError('Failed to fetch poll: ' + response.statusText);
        }
      } catch (error) {
        setError('Error fetching poll: ' + error.message);
      }
    };
    if (poll_id) {
      fetchData();
    }
  }, [poll_id]);

  const columns = [
    { field: 'option', headerName: 'Options', flex: 1 },
    { field: 'votes', headerName: 'Votes', flex: 1 },
  ];

  const rows = poll ? Object.entries(poll.OptionVote).map(([option, votes], index) => ({
    id: index, // MUI DataGrid requires a unique id field
    option,
    votes,
  })) : [];

  const handleVoteNavigate = () => {
    navigate('/vote?id=' + poll.QuestionID, { state: poll });
  };

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!poll) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        marginLeft: 3,
        [theme.breakpoints.down('sm')]: {
          marginLeft: 1,
          padding: 1,
        },
      }}
    >
      <Typography 
        variant="h4" 
        style={{ 
          textAlign: 'left',
          marginLeft: isSmallScreen ? '20px' : '-10px'  // Adjust the margin based on screen size
        }}
      >
        {poll.Question}
      </Typography>
      <Button
        variant="contained"
        onClick={handleVoteNavigate}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ mt: 2, mb: 2 }}
      >
        Vote on this poll
      </Button>
      <div style={{ height: 400, width: isSmallScreen ? '100%' : '70%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          hideFooterSelectedRowCount
          autoHeight
        />
        <Typography sx={{ marginTop: 2 }}>
          Tags: {poll.Tags ? poll.Tags.join(', ') : 'No tags available'}
        </Typography>
        {error && <Typography>{error}</Typography>}
      </div>
    </Box>
  );
};

export default PollsDetail;
